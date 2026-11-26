# ADR 0010 – Back-office, recherche et store de démonstration

- **Statut** : Accepté
- **Date** : 2026-11-26

## Contexte

Le brief demande :

- un back-office autonome, où l'admin ajoute, modifie et supprime les lieux, les articles et les vidéos, et modère les posts ;
- une recherche ;
- les pages contact et mentions légales ;
- au moins 10 lieux et 10 articles pour la démo.

Supabase n'est pas encore branché : la clé n'est pas fournie et la migration n'a pas encore été exécutée.

## Décision

- **Store unique** (`FRONT/src/data/store.tsx`, hook `useContent()`) :
  - toutes les pages lisent les contenus par ce store ;
  - il part des données d'exemple (`seed.ts` : 16 lieux dont 2 privés app, 10 articles, 4 vidéos, 4 posts) ;
  - il garde les modifications dans le navigateur (`localStorage`).
- **Back-office** `/admin` :
  - sections Lieux, Articles, Vidéos, Modération, Messages ;
  - formulaires d'ajout et de modification ;
  - suppression avec confirmation ;
  - bouton « Réinitialiser la démo ».
  - Les médias sont saisis par URL en attendant l'envoi de fichiers vers Supabase Storage.
- **Recherche** `/recherche?q=` : dans les lieux publics, les articles et les vidéos. Insensible aux accents et à la casse ; tous les mots doivent être trouvés.
- **Nouvelles routes** :
  - `/videos` (filtre par profil) ;
  - `/contact` ;
  - `/mentions-legales` ;
  - `/confidentialite` (brouillons à compléter).
- **Catégories** : elles restent une constante du front, car l'admin ne les gère pas.

## Alternatives écartées

- **Brancher Supabase tout de suite** : bloqué tant que la CLI n'est pas installée et que la clé n'est pas fournie.
- **Back-office externe** (Supabase Studio, CMS) : moins simple pour l'admin, et le brief veut un back-office intégré.

## Conséquences

- La démo est entièrement utilisable, mais les modifications restent propres à chaque navigateur.
- Le back-office n'a pas de connexion pour l'instant : il ne doit pas être mis en ligne tel quel.
- Pour passer à Supabase, il faut :
  - remplacer l'intérieur de `store.tsx` par des requêtes ;
  - ajouter la connexion admin (Supabase Auth, rôle `admin`) devant `/admin`.

  Les pages ne changent pas.
- RGPD : le site ne pose aucun cookie de mesure ni de publicité, donc pas de bandeau à prévoir aujourd'hui. Ce point est à revoir si on ajoute des statistiques.
