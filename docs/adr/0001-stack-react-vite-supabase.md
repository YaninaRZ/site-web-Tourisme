# ADR 0001 – Stack : React + Vite + TypeScript, Expo, Supabase

- **Statut** : Accepté
- **Date** : 2026-11-25

## Contexte

Le projet Tourisme livre un site web et une application mobile qui utilisent les mêmes données et les mêmes comptes utilisateurs. L'équipe connaît déjà React et TypeScript, et a déjà utilisé Expo et Supabase sur un projet précédent. Le projet dispose de 11 séances.

## Décision

- **Site web** : React + Vite + TypeScript (dossier `FRONT/`).
- **App mobile** : Expo + React Native + TypeScript (repo séparé `App-tourisme`).
- **Back + BDD** : Supabase (PostgreSQL, authentification et API), dossier `BACK/`.
- Un seul projet Supabase est partagé par le site et l'app.

## Alternatives écartées

- Back codé à la main : plus de temps de mise en place pour un résultat équivalent sur 11 séances.
- Autres frameworks mobiles : courbe d'apprentissage nouvelle pour l'équipe.

## Conséquences

- Le projet dépend d'un service externe (Supabase). C'est jugé acceptable à l'échelle du projet.
- Le code est partagé en TypeScript entre le site et l'app, ce qui facilite l'entraide.
- Les schémas de BDD sont versionnés dans `BACK/supabase/migrations/`.
