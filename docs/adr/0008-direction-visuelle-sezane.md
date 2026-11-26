# ADR 0008 – Direction visuelle photographique, inspirée de Sézane

- **Statut** : Accepté
- **Date** : 2026-11-26
- **Remplace** : ADR 0007 (éditoriale et saisonnière)

## Contexte

Le brief cite Sézane comme référence d'univers de marque : chaleureux, narratif, très imagé. Pour l'accueil, il demande une bannière divisée en deux, avec un feed façon Instagram en 3 × 4 d'un côté et une photo carte postale (ou une vidéo) de l'autre. Les paysages SVG de l'ADR 0007 ne correspondent plus à cette demande.

## Décision

- **Photos partout** : chaque lieu, article, catégorie et vidéo a une vraie photo. Le composant `Scene` (paysage SVG) et la logique de saisons (`season.ts`) sont supprimés.
- **Couleurs** (`FRONT/src/index.css`) : fond crème `#FBF8F3`, texte presque noir `#1D1B18`, bloc sable `#F2ECE2`. Un accent terracotta, réservé aux badges et aux alertes.
- **Typographies** : *Instrument Serif* pour les titres et le logo, *Inter* pour le texte. Les petites étiquettes sont en capitales espacées (`.kicker`), comme sur Sézane.
- **Images sans cadre** : les photos vont bord à bord, séparées par un fin espace de 2 px. Pas de bordure, pas d'ombre, pas d'ornement (demande de l'équipe : un rendu plus homogène).
- **En-tête** : bandeau d'annonce noir, logo centré, catégories à gauche, média et recherche à droite. Sous 1100 px, un menu burger.
- **Accueil** : une suite de bannières pleine largeur, comme sur Sézane. La bannière divisée du brief (feed 3 × 4 et carte postale) a été remplacée à la demande de l'équipe.
  1. Bannière « Bons baisers / de la Côte d'Azur »
  2. « Nos univers » : 4 grandes photos de catégories
  3. Bannière « Le journal »
  4. « Les pépites du moment » : défilement horizontal de cartes
  5. Bannière « Micro-métrages »
  6. Feed façon Instagram, bord à bord : 6 × 2 sur ordinateur, 3 × 4 sur mobile
- **Pages intérieures** : toutes s'ouvrent sur une bannière photo (`Banner`). Cela couvre les catégories, le journal, les articles, les vidéos, la recherche, le contact, les pages légales et la page 404.
  - Style « lookbook » Sézane : photo sur toute la hauteur de l'écran (`small` pour les pages utilitaires), voile léger uniforme, deux lignes de titre centrées au milieu en Instrument Serif majuscule espacée (classe `.lookbook`), sans italique.
  - Le texte d'introduction passe sous la photo.
- **Visuels de bannière abstraits** : pas de paysages « carte postale ». On prend des ombres de palmier sur un mur, du lin dans la lumière, des textures d'eau, un parasol face à la mer. Ils sont listés dans `HERO_IMAGE`, `PAGE_IMAGES` et `categories[].image` (`seed.ts`). Les photos concrètes restent réservées aux lieux et aux articles.
- **Étalonnage commun** : toutes les photos passent par le même filtre (`--grade` : désaturé, légèrement chaud) pour un rendu homogène.
- **Lisibilité** : voile radial, plus dense derrière le titre et léger sur les bords.
- **Fiche lieu** : photo ou vidéo à gauche, infos collantes à droite.
- **Appel à télécharger l'app** (`AppCta`) : en bas de chaque page, juste avant le pied de page. Absent du back-office.
  - À gauche : titre lookbook, avantages de l'app, boutons App Store et Google Play. Ils pointent vers `/application` tant que l'app n'est pas publiée.
  - À droite : deux iPhones posés sur une photo abstraite.
  - Les iPhones sont dessinés en HTML/CSS plutôt qu'exportés de Figma. Ils restent nets à toute taille, reprennent les vraies photos, polices et couleurs du site, et se modifient dans le code.
  - **Icônes** (`components/Icons.tsx`) : une icône au trait par catégorie (soleil sur les vagues, repère, feuille, verre à cocktail) et des icônes pour la barre d'onglets de l'app, toutes du même trait (1,5 px). Les boutons des stores portent les logos Apple et Google Play. Ces logos sont des marques : avant la mise en ligne, il faudra utiliser les badges officiels (« Download on the App Store », « Get it on Google Play ») en respectant leurs règles d'usage.

## Photos de démonstration

Photos **Unsplash** (licence Unsplash : utilisation libre, y compris commerciale), chargées depuis `images.unsplash.com` à la taille utile. Les images Pinterest n'ont pas été utilisées : elles appartiennent à leurs auteurs et le brief demande des contenus fictifs ou libres de droits.

## Alternatives écartées

- **Garder les paysages SVG** : pas assez photographique pour la référence Sézane.
- **Thème sombre** : la référence sombre du brief concerne l'app mobile, pas le site.

## Conséquences

- Le site dépend des photos : il faudra les vraies photos de l'équipe avant la mise en ligne.
- Les photos et les polices viennent de serveurs tiers (Unsplash, Google Fonts). À héberger nous-mêmes avant la production, pour la vitesse et le RGPD.
