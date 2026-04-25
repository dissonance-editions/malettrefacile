# MaLettreFacile — Modèles de lettres gratuits & personnalisables

Plateforme de modèles de lettres et courriers types avec générateur IA.  
Exploité par MARCANT SAS.

## Stack

- **Framework** : Next.js 15 (App Router, TypeScript)
- **Styling** : Tailwind CSS v4
- **Base de données** : Supabase
- **Paiement** : Stripe
- **IA** : API Anthropic (Claude Sonnet)
- **Hébergement** : Vercel

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier d'environnement
cp .env.example .env.local
# → Remplir les variables (Supabase, Stripe, Anthropic)

# 3. Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
src/
├── app/                          # Routes (App Router)
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Layout global
│   ├── lettres/
│   │   ├── page.tsx              # Index des catégories
│   │   ├── [categorie]/
│   │   │   ├── page.tsx          # Page catégorie
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # ★ Page lettre (SEO clé)
│   ├── generateur/page.tsx       # Générateur IA (Phase 2)
│   ├── tarifs/page.tsx           # Pricing
│   ├── mentions-legales/page.tsx # Pages légales
│   ├── api/                      # API routes (Phase 2)
│   ├── sitemap.ts                # Sitemap XML dynamique
│   └── robots.ts                 # robots.txt
├── components/                   # Composants réutilisables
├── content/lettres/              # Contenus JSON des lettres
├── data/                         # Categories + letter registry
└── lib/                          # Clients Supabase/Stripe/Anthropic
```

## Roadmap

- [x] **Phase 0** — Setup projet, layout, structure de routes
- [ ] **Phase 1** — 20 premières lettres, indexation Google
- [ ] **Phase 2** — Générateur IA, paiement Stripe, export PDF
- [ ] **Phase 3** — Scaling à 100 lettres
- [ ] **Phase 4** — 200 lettres, blog SEO, A/B testing

## Ajouter une lettre

1. Créer un fichier JSON dans `src/content/lettres/[categorie]/`
2. Suivre le format de `resiliation-mutuelle-sante.json`
3. Importer dans `src/data/letters.ts` et ajouter au tableau `allLetters`

## Déploiement

```bash
# Push sur GitHub → Vercel déploie automatiquement
git push origin main
```

## Licence

Propriétaire — MARCANT SAS — Tous droits réservés.
