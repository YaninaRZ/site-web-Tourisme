# ADR 0011 – Hébergement des vidéos et des photos

- **Statut** : Proposé (question ouverte dans le brief : « dev ou admin ? »)
- **Date** : 2026-11-26

## Contexte

Le brief prévoit des micro-métrages hébergés par nos soins, mais ne dit pas qui s'en charge, le dev ou l'admin. L'objectif est un back-office autonome : l'admin doit pouvoir publier sans passer par un développeur.

## Décision proposée

- **C'est l'admin qui héberge**, depuis le back-office. Les fichiers vont dans un bucket Supabase Storage public, `media`, créé par la migration du 2026-11-26 :
  - lecture publique ;
  - écriture réservée au rôle admin ;
  - 50 Mo maximum par fichier ;
  - formats acceptés : JPEG, PNG, WebP, MP4 et WebM.
- La table `videos` garde l'URL du fichier et son image d'aperçu. Un lien externe reste possible (YouTube ou Vimeo) si une vidéo dépasse la limite.
- Les micro-métrages sont courts et verticaux (9:16), et on les exporte en MP4 H.264 de moins de 50 Mo.

## Alternatives écartées

- **YouTube ou Vimeo seulement** : on perd le contrôle du lecteur et du design. YouTube ajoute aussi des cookies tiers, ce qui oblige à un bandeau de consentement.
- **Fichiers dans le dépôt Git** : trop lourds, et l'admin dépendrait d'un développeur pour publier.

## Conséquences

- L'offre gratuite de Supabase donne 1 Go de stockage : à surveiller, ou passer à l'offre payante si le catalogue vidéo grossit.
- L'envoi de fichiers dans le back-office est à brancher avec Supabase. En démo, on colle une URL.
