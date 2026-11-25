# ADR 0003 – CSS simple avec variables, sans framework CSS

- **Statut** : Accepté
- **Date** : 2026-11-25

## Contexte

Le site doit avoir une base visuelle rapide à mettre en place, facile à lire et à faire évoluer pendant le projet. L'équipe connaît React et TypeScript, mais le projet n'a pas encore de charte graphique définie.

## Décision

- Le style est écrit en **CSS natif** dans `FRONT/src/`, sans framework (pas de Tailwind, Bootstrap ou CSS-in-JS).
- Les couleurs, la police et les rayons sont des **variables CSS** déclarées sur `:root` dans `index.css`.
- La mise en page (header, sections, cartes, footer) est dans `App.css`, avec une règle `@media (max-width: 600px)` pour mobile.

## Alternatives écartées

- **Tailwind CSS** : rapide à écrire, mais ajoute une syntaxe à apprendre et à relire, et une étape de configuration.
- **Bibliothèque de composants (MUI, Chakra)** : impose un style visuel et alourdit le bundle.

## Conséquences

- Changer le thème se fait à un seul endroit (`index.css`).
- Pas de dépendance CSS à maintenir, et le bundle reste petit (CSS d'environ 2 kB).
- À partir d'un certain nombre de composants, il faudra peut-être revoir ce choix ou découper les fichiers CSS par composant.
