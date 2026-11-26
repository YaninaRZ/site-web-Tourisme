-- Données de test chargées par `supabase db reset` (local uniquement).
-- Les catégories sont créées par les migrations. Le jeu complet de la démo
-- (16 lieux, 10 articles, 4 vidéos) est dans FRONT/src/data/seed.ts.

insert into public.places (category_id, title, description, address, city, opening_hours, prices,
                           image_url, stroller_friendly, wheelchair_accessible, is_published)
select id, 'Yoga au lever du jour (exemple)', 'Une heure de yoga sur les galets, face au soleil qui se lève.',
       'Plage Mala, 06320 Cap-d''Ail', 'Cap-d''Ail', 'Mardi, jeudi et samedi · 7 h – 8 h 15', '15 € la séance',
       'https://images.unsplash.com/photo-1775169726139-82f78b87b8a4', false, false, true
from public.categories where slug = 'sport-wellness';

insert into public.places (category_id, title, description, address, city, opening_hours, prices,
                           image_url, stroller_friendly, wheelchair_accessible, starts_at, ends_at, is_published)
select id, 'Marché de Noël du Vieux-Nice (exemple)', 'Chalets, vin chaud et artisans sous les guirlandes.',
       'Cours Saleya, 06300 Nice', 'Nice', 'Tous les jours · 11 h – 21 h', 'Entrée libre',
       'https://images.unsplash.com/photo-1490113355845-cdc3b65f0189', true, true,
       '2026-12-01', '2026-12-31', true
from public.categories where slug = 'spots';

insert into public.places (category_id, title, description, address, city, opening_hours, prices,
                           image_url, stroller_friendly, wheelchair_accessible, is_published)
select id, 'La Librairie du Port (exemple)', 'Une librairie salon de thé où l''on peut lire des heures sans rien commander.',
       '12 rue Bonaparte, 06300 Nice', 'Nice', 'Du mardi au samedi · 10 h – 19 h', 'Thé 4 €',
       'https://images.unsplash.com/photo-1619447998478-8d09f6a4948b', true, true, true
from public.categories where slug = 'safe-place';

insert into public.places (category_id, title, description, address, city, opening_hours, prices,
                           image_url, stroller_friendly, wheelchair_accessible, is_published, visibility)
select id, 'La crique sans nom (exemple, app)', 'Lieu privé : visible uniquement dans l''app.',
       'Accès communiqué dans l''app', 'Cap d''Antibes', 'Accès libre', 'Gratuit',
       'https://images.unsplash.com/photo-1630485738052-f4716a3faa78', false, false, true, 'app'
from public.categories where slug = 'spots';

insert into public.place_tips (place_id, tip)
select id, 'Venez avant 7 h : la plage est encore vide.'
from public.places where title = 'Yoga au lever du jour (exemple)';

insert into public.videos (title, description, profile, poster_url, duration, is_published) values
  ('L''heure bleue (exemple)', 'Le port de Villefranche entre chien et loup.', 'Contemplatif',
   'https://images.unsplash.com/photo-1693948882616-727d7a9f7934', '1 min 20', true);

insert into public.articles (slug, title, excerpt, content, cover_url, published_at) values
  ('petit-guide-du-slow-tourism', 'Petit guide du slow tourism (exemple)',
   'Voyager moins vite pour voir davantage.',
   'Ceci est un article d''exemple.', 'https://images.unsplash.com/photo-1758972574715-bcb23a467697', now());
