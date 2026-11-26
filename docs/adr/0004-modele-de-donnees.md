# ADR 0004 – Modèle de données initial (Supabase)

- **Statut** : Proposé, complété par l’ADR 0009 (catégories et fiche lieu)
- **Date** : 2026-11-25

## Contexte

UNSPYR présente des contenus par catégories (événements sur la Côte d'Azur, restos et bars insolites, points de vue), un blog rédigé par l'admin, des avantages et un espace communauté réservés à l'application. Dans la communauté, une publication exige une photo et un commentaire. Le site et l'app partagent le même projet Supabase.

## Décision

Migration `BACK/supabase/migrations/20261125140000_schema_initial.sql` :

| Table | Rôle | Lecture | Écriture |
|---|---|---|---|
| `profiles` | Profil lié à `auth.users`, avec un rôle `visiteur` / `adherent` / `admin` | soi-même, admin | soi-même (nom, avatar uniquement) |
| `categories` | Catégories du catalogue | tout le monde | admin |
| `places` | Lieux et événements (dates optionnelles) | tout le monde si publié | admin |
| `articles` | Blog | tout le monde si publié | admin |
| `advantages` | Avantages partenaires | adhérents | admin |
| `community_posts` | Publications de la communauté | adhérents | adhérent auteur |

- **Une seule table `places`** pour les lieux et les événements. Un événement est un lieu avec `starts_at` / `ends_at`. Une contrainte vérifie que la fin n'est pas avant le début.
- **Rôles dans `profiles.role`**. Un profil `visiteur` est créé automatiquement à l'inscription. Un utilisateur ne peut pas modifier son propre rôle : seules les colonnes `display_name` et `avatar_url` lui sont ouvertes en écriture. Le passage en `adherent` ou `admin` se fait côté admin (dashboard Supabase ou clé service).
- **Photo + commentaire obligatoires** : `photo_url` et `comment` sont `not null` et ne peuvent pas être vides (contrainte `check`), en plus du contrôle côté app.
- **Toutes les tables ont la RLS activée.** Les droits ci-dessus sont appliqués par la base, pas seulement par le front.
- Les catégories sont insérées par la migration (données de référence). Les exemples de lieux et d'articles sont dans `seed.sql` (local uniquement).

## Alternatives écartées

- **Tables séparées `events` et `places`** : duplique la plupart des colonnes. On pourra séparer plus tard si les événements ont beaucoup de champs propres.
- **Rôles dans les métadonnées JWT** : modifiables plus facilement par erreur et moins lisibles dans le dashboard.

## Conséquences

- « Réservé à l'application » est appliqué par le rôle adhérent, pas par le type de client : techniquement, un adhérent connecté sur le site pourrait lire ces données via l'API. Le site ne les affiche simplement pas.
- Le stockage des photos (bucket Supabase Storage et ses règles) reste à faire.
- La migration n'a pas encore été exécutée : elle doit être testée avec `supabase db reset` en local avant `supabase db push`.
