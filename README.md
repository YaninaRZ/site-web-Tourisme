# Ynspire

Site web et backend d’Ynspire : événements, restos & bars insolites et points de vue de la Côte d’Azur. L'app mobile (Expo) vit dans un dépôt séparé et partage le même projet Supabase.

## Structure

```
site-web-Tourisme/
├── FRONT/   # Site web : React + Vite + TypeScript
└── BACK/    # Backend : Supabase (PostgreSQL, Auth, API)
```

## Stack

| Partie   | Techno                          |
|----------|---------------------------------|
| Site web | React + Vite + TypeScript       |
| Back+BDD | Supabase (PostgreSQL)           |

## Démarrage rapide

```bash
cd FRONT
cp .env.example .env     # renseigner VITE_SUPABASE_ANON_KEY
npm install
npm run dev
```

Voir `FRONT/README.md` et `BACK/README.md` pour le détail.

## Liens

- Repo site : https://github.com/YaninaRZ/site-web-Tourisme
- Repo app : https://github.com/YaninaRZ/App-tourisme
- Figma (conception BDD) : https://www.figma.com/design/PiyQ7nRPJNcjQFjJPfNrsp/BDD-Conception?node-id=0-1
