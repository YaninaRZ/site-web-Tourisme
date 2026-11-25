# ADR 0005 – Routing et structure du front

- **Statut** : Accepté
- **Date** : 2026-11-25

## Contexte

Le site passe d'une page unique à plusieurs pages : accueil, catalogue par catégorie, blog, article et présentation de l'application. Les données Supabase ne sont pas encore branchées.

## Décision

- **React Router** (`react-router`) en mode `BrowserRouter`, avec un layout commun (header, footer) :

| URL | Page |
|---|---|
| `/` | Accueil |
| `/categories/:slug` | Catalogue d'une catégorie |
| `/blog` | Liste des articles |
| `/blog/:slug` | Article |
| `/application` | Avantages et communauté (réservés à l'app) |
| `*` | Page introuvable |

- **Structure** de `FRONT/src/` : `components/` (layout, cartes), `pages/` (une page par route), `data/` (données), `types.ts` (types partagés).
- **Données d'exemple** dans `src/data/content.ts`, avec les mêmes slugs de catégories que la BDD. Les pages passent par des fonctions (`getCategory`, `getPlacesByCategory`, `getArticle`), qu'on remplacera par des requêtes Supabase sans toucher aux pages.

## Alternatives écartées

- **Une seule page avec ancres** : ne permet pas de partager le lien d'une catégorie ou d'un article.
- **Framework avec routing intégré (Next.js)** : changerait la stack décidée dans l'ADR 0001.

## Conséquences

- En production, l'hébergeur doit renvoyer `index.html` pour toutes les URL (règle de « fallback » SPA), sinon un rafraîchissement sur `/blog` renvoie une 404.
- L'espace communauté et les avantages ne sont que présentés sur le site : ils restent dans l'app.
