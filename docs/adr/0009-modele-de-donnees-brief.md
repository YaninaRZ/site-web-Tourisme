# ADR 0009 – Modèle de données issu du brief

- **Statut** : Proposé (migration écrite, pas encore exécutée faute de CLI Supabase)
- **Date** : 2026-11-26
- **Complète** : ADR 0004

## Contexte

Le brief de l'équipe précise la partie site :

- nouvelles catégories ;
- contenu d'une fiche lieu ;
- lieux privés réservés à l'app ;
- vidéos ;
- formulaire de contact ;
- modération des posts depuis le back-office.

La partie app (contenu d'un post, likes, profils, signalements automatiques) est volontairement laissée de côté pour l'instant.

## Décision

Nouvelle migration `BACK/supabase/migrations/20261126120000_brief_site.sql` :

- **Catégories** : Sport & wellness, Spots, Safe place, Clubs & restaurants. Elles remplacent les trois anciennes, qui n'ont jamais servi en production.
- **Fiche lieu** (`places`) : ajout de `opening_hours`, `prices`, `gallery_urls`, `video_url`, `stroller_friendly` (poussettes) et `wheelchair_accessible` (PMR).
- **Lieux éphémères** : on garde `starts_at` / `ends_at`. Ils activent le bouton « Ajouter au calendrier » : fichier `.ics` pour Apple et Android, lien pour Google Agenda.
- **Lieux privés** : colonne `visibility` (`public` / `app`). La règle RLS ne montre les lieux `app` qu'aux adhérents.
- **Tips** : table séparée `place_tips`, lisible seulement par les adhérents. Le site public ne peut donc jamais les lire, même par erreur. Sur le site, la fiche affiche seulement « Le tip est réservé à l'app ».
- **Vidéos** (`videos`) :
  - micro-métrages avec un `profile` (Contemplatif, Sportif, Épicurien, Noctambule ; liste à valider) ;
  - un fichier ou un lien, et une image d'aperçu ;
  - un article peut pointer vers une vidéo (`articles.video_id`).
- **Contact** (`contact_messages`) : tout le monde peut écrire, seul l'admin lit et supprime.
- **Modération** :
  - colonne `community_posts.is_hidden` ;
  - fonction `set_post_hidden()`, réservée à l'admin ;
  - l'auteur ne peut plus modifier le statut de son post : droits d'écriture limités aux colonnes photo, commentaire et lieu.

## Alternatives écartées

- **Tip dans une colonne de `places`** : RLS filtre des lignes, pas des colonnes, donc le tip serait visible de tous.
- **Catégories multiples par lieu** : rien dans le brief ne le demande.

## Conséquences

- Les données d'exemple du front (`FRONT/src/data/seed.ts`) suivent ce modèle champ par champ.
- À faire avec la partie app : signalements (`post_reports`) et masquage automatique au-delà de X signalements, likes, profils.
- La migration doit être testée (`supabase db reset`) dès que la CLI est installée.
