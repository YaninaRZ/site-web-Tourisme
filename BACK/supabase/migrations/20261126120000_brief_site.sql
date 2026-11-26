-- Intégration du brief site (voir docs/adr/0009-modele-de-donnees-brief.md et 0011-hebergement-videos.md)
--
--   categories       nouvelles catégories : Sport & wellness, Spots, Safe place, Clubs & restaurants
--   places           fiche lieu complète (horaires, tarifs, accessibilité, galerie, vidéo) + visibilité site / app
--   place_tips       tips de l'équipe, réservés aux adhérents (app)
--   videos           micro-métrages par profil, publiés par l'admin
--   articles         lien optionnel vers une vidéo
--   contact_messages formulaire de contact du site
--   community_posts  masquage par l'admin (modération depuis le back-office)
--   storage          bucket public « media » pour les photos et vidéos, écriture admin

-- ---------------------------------------------------------------------------
-- Catégories
-- ---------------------------------------------------------------------------

-- Les anciennes catégories n'ont jamais servi en production : on les remplace.
delete from public.places;
delete from public.categories;

insert into public.categories (slug, name, description, position) values
  ('sport-wellness', 'Sport & wellness', 'Bouger, respirer, nager : des rendez-vous pour prendre soin de soi face à la mer.', 1),
  ('spots', 'Spots', 'Belvédères, ruelles et coins cachés qu''on garde pour soi.', 2),
  ('safe-place', 'Safe place', 'Des lieux calmes et bienveillants où l''on se sent bien, seul ou accompagné.', 3),
  ('clubs-restaurants', 'Clubs & restaurants', 'Tables, bars et nuits de la Riviera, choisis pour leur caractère.', 4);

-- ---------------------------------------------------------------------------
-- Fiche lieu
-- ---------------------------------------------------------------------------

create type public.place_visibility as enum ('public', 'app');

alter table public.places
  add column opening_hours         text,
  add column prices                text,
  add column gallery_urls          text[] not null default '{}',
  add column video_url             text,
  add column stroller_friendly     boolean not null default false,
  add column wheelchair_accessible boolean not null default false,
  -- « app » : lieu privé, visible uniquement des adhérents dans l'application
  add column visibility            public.place_visibility not null default 'public';

drop policy "places_select_published" on public.places;

create policy "places_select_published" on public.places
  for select to anon, authenticated
  using (
    (is_published and (visibility = 'public' or (select public.is_member())))
    or (select public.is_admin())
  );

-- Tips : table séparée pour que le site public ne puisse jamais les lire.
create table public.place_tips (
  place_id   uuid primary key references public.places (id) on delete cascade,
  tip        text not null check (length(trim(tip)) > 0),
  updated_at timestamptz not null default now()
);

create trigger place_tips_set_updated_at
  before update on public.place_tips
  for each row execute function public.set_updated_at();

alter table public.place_tips enable row level security;

create policy "place_tips_select_members" on public.place_tips
  for select to authenticated
  using ((select public.is_member()));

create policy "place_tips_write_admin" on public.place_tips
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- Vidéos (micro-métrages)
-- ---------------------------------------------------------------------------

create table public.videos (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text,
  -- Profil visé (Contemplatif, Sportif, Épicurien, Noctambule…), liste à valider
  profile      text not null,
  -- Fichier du bucket « media » ou lien externe
  video_url    text,
  poster_url   text,
  duration     text,
  place_id     uuid references public.places (id) on delete set null,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index videos_profile_idx on public.videos (profile);

create trigger videos_set_updated_at
  before update on public.videos
  for each row execute function public.set_updated_at();

alter table public.videos enable row level security;

create policy "videos_select_published" on public.videos
  for select to anon, authenticated
  using (is_published or (select public.is_admin()));

create policy "videos_write_admin" on public.videos
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

alter table public.articles
  add column video_id uuid references public.videos (id) on delete set null;

-- ---------------------------------------------------------------------------
-- Contact
-- ---------------------------------------------------------------------------

create table public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (length(trim(name)) > 0),
  email      text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject    text,
  message    text not null check (length(trim(message)) between 1 and 5000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Tout le monde peut écrire, seul l'admin lit et supprime.
create policy "contact_messages_insert_all" on public.contact_messages
  for insert to anon, authenticated
  with check (true);

create policy "contact_messages_select_admin" on public.contact_messages
  for select to authenticated
  using ((select public.is_admin()));

create policy "contact_messages_delete_admin" on public.contact_messages
  for delete to authenticated
  using ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- Modération de la communauté
-- ---------------------------------------------------------------------------

alter table public.community_posts
  add column is_hidden boolean not null default false;

-- L'auteur ne peut modifier que le contenu de son post, pas son statut de modération.
revoke update on public.community_posts from authenticated;
grant update (photo_url, comment, place_id) on public.community_posts to authenticated;

drop policy "community_posts_select_members" on public.community_posts;

create policy "community_posts_select_members" on public.community_posts
  for select to authenticated
  using (
    ((select public.is_member()) and not is_hidden)
    or author_id = (select auth.uid())
    or (select public.is_admin())
  );

-- Masquer / réafficher un post : réservé à l'admin.
create function public.set_post_hidden(post_id uuid, hidden boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'Réservé aux administrateurs' using errcode = '42501';
  end if;
  update public.community_posts set is_hidden = hidden where id = post_id;
end;
$$;

revoke execute on function public.set_post_hidden(uuid, boolean) from public, anon;
grant execute on function public.set_post_hidden(uuid, boolean) to authenticated;

-- ---------------------------------------------------------------------------
-- Stockage des médias (photos et vidéos)
-- ---------------------------------------------------------------------------

-- Bucket public en lecture, 50 Mo max par fichier.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true, 52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm']
);

create policy "media_insert_admin" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and (select public.is_admin()));

create policy "media_update_admin" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));

create policy "media_delete_admin" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));
