-- Données de test chargées par `supabase db reset` (local uniquement).
-- Les catégories sont créées par la migration initiale.

insert into public.places (category_id, title, description, city, starts_at, ends_at, is_published)
select id, 'Marché de Noël (exemple)', 'Chalets, artisans et animations pendant les fêtes.', 'Nice',
       '2026-12-01', '2026-12-31', true
from public.categories where slug = 'evenements';

insert into public.places (category_id, title, description, city, is_published)
select id, 'Restaurant insolite (exemple)', 'Description courte du lieu.', 'Antibes', true
from public.categories where slug = 'restos-bars-insolites';

insert into public.places (category_id, title, description, city, is_published)
select id, 'Point de vue (exemple)', 'Description courte du panorama.', 'Èze', true
from public.categories where slug = 'points-de-vue';

insert into public.articles (slug, title, excerpt, content, published_at) values
  ('premier-article', 'Premier article (exemple)', 'Le blog UNSPYR est rédigé par l''équipe admin.',
   'Ceci est un article d''exemple.', now());
