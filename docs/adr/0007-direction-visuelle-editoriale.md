# ADR 0007 – Direction visuelle éditoriale et saisonnière

- **Statut** : Remplacé par l’ADR 0008
- **Date** : 2026-11-25
- **Remplace** : ADR 0006 (pastel rétro)

## Contexte

L'équipe a choisi une nouvelle direction artistique (maquette « Riviera Lente ») : un ton lent, cinématographique et éditorial, comme un magazine de voyage plutôt qu'un annuaire. Les photos ne sont pas encore livrées.

## Décision

- **Couleurs** : tons sombres et texte crème (`--ink: #F3EFE8`), déclarés dans `FRONT/src/index.css`. Chaque saison a une teinte de fond et une palette de paysage (`FRONT/src/lib/season.ts`).
- **Typographies** (Google Fonts) : *Instrument Serif* pour les titres, les choix et les légendes, *Inter* pour le texte.
- **Visuel par défaut** : un paysage de Riviera dessiné en SVG (composant `Scene`), recoloré selon la saison et recadré pour varier les vignettes. Un événement prend la palette de la saison de sa date, un lieu permanent prend la saison en cours. Dès qu'un lieu a une photo (`imageUrl`), elle remplace le dessin.
- **Mise en page** :
  - **Accueil** : écran entier avec paysage de la saison, grand titre et catégories en gros liens serif.
  - **Pages intérieures** : en-tête visuel (`PageHead`), cartes en verre dépoli (`.uc`), barre de filtres collante avec pilules.
  - **Catalogue** : galerie d'images carrées (`Feed` / `Tile`) avec légende au survol, toujours visible sur écran tactile.
  - **Fiche lieu** (nouvelle route `/lieux/:id`) : grand visuel, étiquette « Éphémère » ou « Permanent », texte d'accroche en serif, encadré d'infos (où, quand, catégorie), galerie et suggestions.
- On garde **nos catégories** (événements, restos & bars, points de vue), le blog et la page app. On ne reprend pas l'organisation par saisons et « univers » de la maquette : elle changerait le modèle de données (ADR 0004).

## Alternatives écartées

- **Garder le pastel rétro (ADR 0006)** : abandonné au profit de la D.A choisie par l'équipe.
- **Images de remplacement génériques (photos libres)** : le paysage dessiné garde une identité cohérente tant que les vraies photos ne sont pas là.

## Conséquences

- Le bouton « Ajouter à mon carnet » de la fiche affiche seulement un message : le carnet est prévu dans l'app.
- Une navigation par saison reste possible plus tard : il faudrait ajouter les saisons d'un lieu dans la BDD.
- Les composants du pastel rétro (`Marquee`, `Carousel`, `PlaceCard`) sont supprimés.
