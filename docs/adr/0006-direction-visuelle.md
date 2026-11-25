# ADR 0006 – Direction visuelle : pastel rétro, stickers et serif

- **Statut** : Accepté
- **Date** : 2026-11-25
- **Complète** : ADR 0003 (CSS natif avec variables)

## Contexte

L'équipe a fourni une maquette de référence au style « pastel rétro » : fond aqua et rose, grand titre serif, stickers et emoji qui flottent, bandeau défilant, cartes en carrousel sur fond rose, photos en polaroïd, boutons pilules de couleur. Les visuels définitifs d'Ynspire ne sont pas encore livrés.

## Décision

- **Palette** pastel déclarée en variables dans `FRONT/src/index.css` : aqua, rose, vert, bleu, jaune, crème, avec un trait sombre (`--ink`) pour les bordures et les ombres décalées.
- **Typographies** (Google Fonts) : *Fraunces* pour les titres, *Inter* pour le texte, *Space Mono* pour les étiquettes et la navigation.
- **Composants** réutilisables, tous en CSS natif : pilules (`.pill`, `.pill-pink`…), étiquettes inclinées (`.sticker-label`, `.tag-tilt`), bandes de section (`.band-paper`, `.band-grid`, `.band-pink`), cartes à ombre décalée.
- **Interactions** : bandeau défilant (`Marquee`), carrousel avec flèches et défilement tactile natif (`Carousel`), animations de flottement. Toutes les animations sont coupées si l'utilisateur a activé « réduire les animations ».
- **Images** : en attendant les photos, des emoji sur dégradés pastel servent d'emplacements (classes `.g-pink`, `.g-blue`…).
- Chaque catégorie a une couleur et un emoji (`categories` dans `src/data/content.ts`), réutilisés dans les étiquettes, onglets et boutons.

## Alternatives écartées

- **Reprendre les images de la maquette** : ce sont les visuels d'une autre marque, on ne peut pas les réutiliser.
- **Bibliothèque d'animation (Framer Motion…)** : inutile pour des animations en boucle simples, CSS suffit.

## Conséquences

- Le site charge trois polices depuis Google Fonts (requête externe). On pourra les héberger nous-mêmes si besoin (RGPD, performance).
- Le formulaire « le Récap » (newsletter) n'envoie rien pour l'instant : il affiche seulement un message « bientôt disponible ».
- Remplacer les emoji par les vraies photos se fera dans les composants `PlaceCard`, `Community` et `NextEvent`, sans changer le CSS.
