# NOC://ABDOSRAD — Portfolio (V2)

Portfolio personnel d'Abdosrad, étudiant ingénieur en télécommunications.
Thème **NOC / Signal** : salle de contrôle réseau, palette sobre, typographie IBM Plex, détails façon console.

## V2 — ce qui change

- **Plus aucun pourcentage de compétences** : la section personnelle s'appuie sur des faits (dépôts, commits, hackathons, principes de travail) — ligne de vie comprise.
- **Pages détaillées** pour les trois projets : présentation longue, problème, solution, fonctionnalités, architecture interactive, technologies, médias, compétences, verdict honnête, liens.
- **Médias réels uniquement** : captures et vidéos servies directement depuis les dépôts GitHub (`pimarket/demo/…`, assets FarmNavigator). Aucune image recréée ; si le dépôt n'a pas de capture (VoiceOps), la fiche le dit.
- **Architecture technique interactive** : diagramme où chaque couche est sélectionnable et où ses connexions réseau sont mises en évidence (SVG recalculé au layout, liste tapable sur mobile).
- **Boutons GitHub / Démo proéminents** (`.btn` système) sur la page projet et en fil d'ariane Accueil → Projets → Projet → GitHub.
- **Animations discrètes** : révélation au scroll (IntersectionObserver), scanline, LEDs — désactivées si `prefers-reduced-motion`.
- **Responsive soigné** : menu mobile dans la barre de statut, grilles adaptatives, diagramme en liste sur petits écrans.

## Stack

- **Next.js 16** (App Router, Server Components, SSG)
- **TypeScript** strict
- **Tailwind CSS v4** (`@theme` dans `src/app/globals.css`)
- **IBM Plex Sans / Mono** via `next/font`
- Zéro dépendance UI externe (icônes SVG inline)

## Structure

```
src/
├── app/
│   ├── layout.tsx                # Shell global (fonts, StatusBar, Footer)
│   ├── page.tsx                  # Accueil : hero, canaux, index, profil, canal
│   ├── not-found.tsx             # 404 façon terminal
│   ├── icon.svg                  # Favicon (waveform)
│   ├── globals.css               # Design system NOC/Signal + composants V2
│   └── projects/[slug]/page.tsx  # Fiches projets V2 (SSG)
├── components/
│   ├── project-card.tsx          # Carte cliquable de l'index
│   ├── architecture-diagram.tsx  # Diagramme d'architecture interactif
│   ├── reveal.tsx                # Révélation discrète au scroll
│   ├── icons.tsx                 # Icônes SVG inline
│   ├── status-bar.tsx            # Nav + horloge UTC + menu mobile
│   ├── site-footer.tsx
│   └── terminal.tsx              # Terminal, Waveform, SectionHeading
└── data/
    └── projects.ts               # ⚠ Source unique de vérité des projets
```

## Données des projets

`src/data/projects.ts` centralise tout : carte de l'accueil, page
`/projects/<slug>`, navigation et 404 suivent automatiquement. Le contenu
provient de l'analyse réelle des dépôts GitHub (README, structure, historique
git, assets, présentation). Aucun code source des projets n'est copié : le
portfolio pointe exclusivement vers les dépôts.

Instantané d'activité utilisé (septembre 2026) : VoiceOps 17 commits (solo),
PiMarket 42 commits (binôme), FarmNavigator 13 commits (équipe GAIATECH).

## Commandes

```bash
bun install        # dépendances
bun run dev        # dev server (0.0.0.0:$PORT)
bun run build      # build de production (SSG)
bun run typecheck  # tsc --noEmit
```
