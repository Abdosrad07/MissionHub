# Signal Path — Portfolio d'Abdourahim

Portfolio personnel d'Abdourahim, étudiant ingénieur en télécommunications.
Thème **Signal Path** : le parcours comme un signal qui traverse les couches — des télécommunications au cloud.

## Concept

Le portfolio raconte une histoire : un étudiant en télécommunications qui construit progressivement un profil de futur NetDevOps spécialisé en Cloud. Chaque section est un nœud dans un réseau qui s'étend.

**Structure narrative :**
Origine → Parcours → Projets → Compétences → Hackathons → Direction → Horizon → Rêves

## Stack

- **Next.js 16** (App Router, Server Components, SSG)
- **TypeScript** strict
- **Tailwind CSS v4** (`@theme` dans `src/app/globals.css`)
- **Space Grotesk** (display) + **IBM Plex Sans / Mono** via `next/font`
- Zéro dépendance UI externe (icônes SVG inline)

## Structure

```
src/
├── app/
│   ├── layout.tsx                # Shell global (fonts, StatusBar, Footer)
│   ├── page.tsx                  # Accueil narratif (14 sections)
│   ├── not-found.tsx             # 404
│   ├── icon.svg                  # Favicon (waveform)
│   ├── globals.css               # Design system Signal Path
│   └── projects/
│       ├── page.tsx              # Index des projets
│       └── [slug]/page.tsx       # Fiche projet détaillée
├── components/
│   ├── project-card.tsx          # Carte éditoriale de projet
│   ├── architecture-diagram.tsx  # Diagramme d'architecture interactif
│   ├── reveal.tsx                # Révélation au scroll
│   ├── icons.tsx                 # Icônes SVG inline
│   ├── status-bar.tsx            # Nav + horloge UTC + menu mobile
│   ├── site-footer.tsx
│   ├── terminal.tsx              # Terminal, Waveform, SectionHeading
│   ├── signal-node.tsx           # Nœud de parcours (timeline)
│   ├── photo-frame.tsx           # Photo personnelle avec cadre
│   └── skill-map.tsx             # Carte visuelle des compétences
└── data/
    ├── projects.ts               # Source unique de vérité des projets
    └── profile.ts                # Source unique de vérité du profil
```

## Projets

4 projets documentés :
- **AgriPilote** — Agriculture de précision (React, Express, SQLite)
- **VoiceOps** — Assistant vocal diagnostic réseau (FastAPI, React, AssemblyAI)
- **PiMarket** — Marketplace Pi Network (Django, DRF, escrow)
- **FarmNavigator** — Simulateur agricole NASA (Python, Pygame, SciPy)

## Données

`src/data/projects.ts` et `src/data/profile.ts` centralisent tout. Le contenu provient de l'analyse réelle des dépôts GitHub et du profil personnel. Aucune information inventée.

## Commandes

```bash
npm install        # dépendances
npm run dev        # dev server (0.0.0.0:3000)
npm run build      # build de production (SSG)
npm run typecheck  # tsc --noEmit
```

## Déploiement Vercel

Ce portfolio est conçu pour Vercel :
- SSG (Static Site Generation) — pas de serveur nécessaire
- Images servies depuis le dossier `public/`
- Aucune variable d'environnement requise

```bash
# Déploiement via CLI Vercel
npx vercel --prod
```

Ou connectez le dépôt GitHub sur vercel.com pour un déploiement automatique.
