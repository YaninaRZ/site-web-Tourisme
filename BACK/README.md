# BACK – Supabase (PostgreSQL)

Backend du projet : base de données PostgreSQL, authentification et API, fournis par Supabase.
Le site (`FRONT/`) et l'app mobile partagent ce même projet Supabase (mêmes données, mêmes comptes).

## Structure

```
BACK/
├── supabase/
│   ├── config.toml        # Configuration du projet Supabase local
│   ├── migrations/        # Schéma SQL versionné (une migration = un changement)
│   └── seed.sql           # Données de test
└── README.md
```

## Liens

- Projet Supabase : https://ljakognrgfbsibgcgixb.supabase.co
- Conception BDD (Figma) : https://www.figma.com/design/PiyQ7nRPJNcjQFjJPfNrsp/BDD-Conception?node-id=0-1

## Utilisation

Installer la CLI Supabase, puis :

```bash
supabase login
supabase link --project-ref ljakognrgfbsibgcgixb
supabase db pull            # récupère le schéma distant dans migrations/
supabase migration new nom_de_la_migration
supabase db push            # applique les migrations sur le projet distant
```

En local (Docker requis) :

```bash
supabase start
supabase db reset          # rejoue migrations + seed.sql
```

Ne jamais committer les clés API ni le fichier `.env`.
