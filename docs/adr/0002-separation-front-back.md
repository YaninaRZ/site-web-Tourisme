# ADR 0002 – Séparation des dossiers FRONT et BACK

- **Statut** : Accepté
- **Date** : 2026-11-25

## Contexte

Le dépôt `site-web-Tourisme` doit contenir la partie site web et la partie backend, avec des responsabilités et des outils différents (Vite côté front, CLI Supabase côté back).

## Décision

Le dépôt est organisé en deux dossiers distincts :

- `FRONT/` : application React + Vite + TypeScript, avec son propre `package.json`.
- `BACK/` : configuration Supabase (`supabase/config.toml`, `migrations/`, `seed.sql`).

Chaque dossier a son README. Les secrets (`.env`) ne sont jamais commités.

## Conséquences

- Les dépendances Node restent dans `FRONT/`, le schéma SQL reste dans `BACK/`.
- Toute modification de la BDD passe par une migration dans `BACK/supabase/migrations/`.
