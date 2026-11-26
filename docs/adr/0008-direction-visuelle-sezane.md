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
- **Accueil** :
  - bannière divisée : feed 3 × 4 à gauche, photo plein cadre à droite avec le titre ;
  - « Nos univers » : 4 grandes photos de catégories ;
  - « Les pépites du moment » : défilement horizontal de cartes ;
  - le journal à la une, puis les micro-métrages sur fond sable.
- **Pages intérieures** : toutes s'ouvrent sur une bannière photo (`Banner`). Cela couvre les catégories, le journal, les articles, les vidéos, la recherche, le contact, les pages légales et la page 404.
  - Style « lookbook » Sézane : photo sur toute la hauteur de l'écran (`small` pour les pages utilitaires), voile léger uniforme, deux lignes de titre centrées au milieu en Instrument Serif majuscule espacée (classe `.lookbook`), sans italique.
  - Le texte d'introduction passe sous la photo.
  - La carte postale de l'accueil suit le même style.
- **Fiche lieu** : photo ou vidéo à gauche, infos collantes à droite.

## Photos de démonstration

Photos **Unsplash** (licence Unsplash : utilisation libre, y compris commerciale), chargées depuis `images.unsplash.com` à la taille utile. Les images Pinterest n'ont pas été utilisées : elles appartiennent à leurs auteurs et le brief demande des contenus fictifs ou libres de droits.

## Alternatives écartées

- **Garder les paysages SVG** : pas assez photographique pour la référence Sézane.
- **Thème sombre** : la référence sombre du brief concerne l'app mobile, pas le site.

## Conséquences

- Le site dépend des photos : il faudra les vraies photos de l'équipe avant la mise en ligne.
- Les photos et les polices viennent de serveurs tiers (Unsplash, Google Fonts). À héberger nous-mêmes avant la production, pour la vitesse et le RGPD.
