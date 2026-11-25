-- Schéma initial Ynspire
-- Voir docs/adr/0004-modele-de-donnees.md pour les choix.
--
-- Tables :
--   profiles         profil lié à auth.users, avec un rôle (visiteur / adherent / admin)
--   categories       catégories du catalogue (événements, restos & bars insolites, points de vue)
--   places           contenus du catalogue (lieux et événements)
--   articles         blog, écrit uniquement par les admins
--   advantages       avantages partenaires, visibles uniquement par les adhérents (app)
--   community_posts  publications de la communauté (photo + commentaire obligatoires)

-- ---------------------------------------------------------------------------
-- Profils et rôles
-- ---------------------------------------------------------------------------

create type public.user_role as enum ('visiteur', 'adherent', 'admin');

create table public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url   text,
  role         public.user_role not null default 'visiteur',
  created_at   timestamptz not null default now()
);

-- Crée automatiquement un profil à l'inscription
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Fonctions utilitaires pour les règles RLS
create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create function public.is_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('adherent', 'admin')
  );
$$;

-- ---------------------------------------------------------------------------
-- Catalogue
-- ---------------------------------------------------------------------------

create table public.categories (
  id          smallint generated always as identity primary key,
  slug        text not null unique,
  name        text not null,
  description text,
  position    smallint not null default 0
);

create table public.places (
  id           uuid primary key default gen_random_uuid(),
  category_id  smallint not null references public.categories (id) on delete restrict,
  title        text not null,
  description  text,
  address      text,
  city         text,
  latitude     double precision,
  longitude    double precision,
  image_url    text,
  -- Renseignés uniquement pour les événements
  starts_at    timestamptz,
  ends_at      timestamptz,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint places_dates_check
    check (ends_at is null or (starts_at is not null and ends_at >= starts_at))
);

create index places_category_id_idx on public.places (category_id);
create index places_starts_at_idx on public.places (starts_at);

-- ---------------------------------------------------------------------------
-- Blog (admin uniquement)
-- ---------------------------------------------------------------------------

create table public.articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  excerpt      text,
  content      text not null default '',
  cover_url    text,
  author_id    uuid references public.profiles (id) on delete set null,
  -- null = brouillon
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Application : avantages et communauté
-- ---------------------------------------------------------------------------

create table public.advantages (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text,
  partner_name text,
  place_id     uuid references public.places (id) on delete set null,
  valid_until  date,
  created_at   timestamptz not null default now()
);

create table public.community_posts (
  id         uuid primary key default gen_random_uuid(),
  author_id  uuid not null references public.profiles (id) on delete cascade,
  place_id   uuid references public.places (id) on delete set null,
  -- Condition de publication : une photo ET un commentaire
  photo_url  text not null check (length(trim(photo_url)) > 0),
  comment    text not null check (length(trim(comment)) > 0),
  created_at timestamptz not null default now()
);

create index community_posts_author_id_idx on public.community_posts (author_id);
create index community_posts_created_at_idx on public.community_posts (created_at desc);

-- ---------------------------------------------------------------------------
-- updated_at automatique
-- ---------------------------------------------------------------------------

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger places_set_updated_at
  before update on public.places
  for each row execute function public.set_updated_at();

create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profiles        enable row level security;
alter table public.categories      enable row level security;
alter table public.places          enable row level security;
alter table public.articles        enable row level security;
alter table public.advantages      enable row level security;
alter table public.community_posts enable row level security;

-- profiles : chacun lit et modifie son profil, l'admin lit tout.
create policy "profiles_select_own_or_admin" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));

create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Un utilisateur ne peut pas changer son propre rôle : seules ces colonnes sont modifiables.
revoke update on public.profiles from authenticated;
grant update (display_name, avatar_url) on public.profiles to authenticated;

-- categories : lecture publique, écriture admin.
create policy "categories_select_all" on public.categories
  for select to anon, authenticated
  using (true);

create policy "categories_write_admin" on public.categories
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- places : lecture publique des contenus publiés, écriture admin.
create policy "places_select_published" on public.places
  for select to anon, authenticated
  using (is_published or (select public.is_admin()));

create policy "places_write_admin" on public.places
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- articles : lecture publique des articles publiés, écriture admin.
create policy "articles_select_published" on public.articles
  for select to anon, authenticated
  using ((published_at is not null and published_at <= now()) or (select public.is_admin()));

create policy "articles_write_admin" on public.articles
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- advantages : réservés aux adhérents, écriture admin.
create policy "advantages_select_members" on public.advantages
  for select to authenticated
  using ((select public.is_member()));

create policy "advantages_write_admin" on public.advantages
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- community_posts : lecture et publication par les adhérents,
-- suppression par l'auteur ou un admin.
create policy "community_posts_select_members" on public.community_posts
  for select to authenticated
  using ((select public.is_member()));

create policy "community_posts_insert_member" on public.community_posts
  for insert to authenticated
  with check ((select public.is_member()) and author_id = (select auth.uid()));

create policy "community_posts_update_author" on public.community_posts
  for update to authenticated
  using (author_id = (select auth.uid()))
  with check (author_id = (select auth.uid()));

create policy "community_posts_delete_author_or_admin" on public.community_posts
  for delete to authenticated
  using (author_id = (select auth.uid()) or (select public.is_admin()));

-- ---------------------------------------------------------------------------
-- Données de référence
-- ---------------------------------------------------------------------------

insert into public.categories (slug, name, description, position) values
  ('evenements', 'Événements Côte d''Azur', 'Marchés de Noël, festivals et rendez-vous à ne pas manquer.', 1),
  ('restos-bars-insolites', 'Restos & bars insolites', 'Des adresses originales pour manger et boire un verre.', 2),
  ('points-de-vue', 'Points de vue', 'Les plus beaux panoramas de la région.', 3);
