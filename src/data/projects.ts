/**
 * Source unique de vérité des projets du portfolio — V2.
 *
 * ⚠ Règles éditoriales :
 * - Chaque donnée provient de l'analyse réelle des dépôts GitHub (README,
 *   structure, historique git, assets, présentation du dépôt) — rien d'inventé.
 * - `media` ne référence QUE des fichiers réellement présents dans les dépôts.
 * - `verdict` distingue ce que le dépôt montre de ce qu'il ne montre pas.
 * - Aucun code source des projets n'est copié ici : le portfolio pointe
 *   exclusivement vers les dépôts.
 *
 * NB : commits / contributeurs / dernières activités sont un instantané
 * (septembre 2026) — mettre à jour si les dépôts évoluent.
 */

export type MediaItem = {
  kind: "screenshot" | "video";
  src: string;
  alt: string;
  caption: string;
};

export type ArchitectureLayer = {
  layer: string;
  detail: string;
  /** Indices (dans ce tableau) des couches avec lesquelles cette couche échange. */
  connectsTo?: number[];
};

export type Project = {
  slug: string;
  channel: string;
  title: string;
  repoAlias?: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string[];
  category: string;
  accent: string;
  statusLevel: "live" | "active" | "prototype";
  statusLabel: string;
  timeframe: string;
  context: string;
  role: string;
  /** Instantané de l'activité du dépôt — aucun pourcentage, que du factuel. */
  repoStats: string[];
  problem: string[];
  solution: string[];
  features: { title: string; detail: string }[];
  architecture: ArchitectureLayer[];
  stack: { label: string; items: string[] }[];
  technologies: string[];
  highlights: string[];
  skills: string[];
  githubUrl: string;
  demoUrl?: string;
  docsLinks?: { label: string; url: string }[];
  media: MediaItem[];
  mediaNote?: string;
  verdict: {
    repoShows: string[];
    notShown: string[];
  };
  metrics: { value: string; label: string }[];
};

const GH = "https://github.com/Abdosrad07";
const PIMARKET_DEMO = `${GH}/pimarket/raw/main/demo`;
const FARM_ASSETS = `${GH}/projet-collectif/raw/main/assets/images`;

export const projects: Project[] = [
  {
    slug: "voiceops",
    channel: "CH-01",
    title: "VoiceOps",
    tagline:
      "Assistant vocal intelligent pour le diagnostic des incidents réseau — « Your network. Your voice. Your copilot. »",
    shortDescription:
      "Un copilote vocal qui écoute un problème réseau, pose les bonnes questions, exécute les diagnostics et rédige le rapport d'incident.",
    fullDescription: [
      "VoiceOps est né d'un constat simple : le troubleshooting réseau reste un métier d'artisan — des CLI, des documentations dispersées et beaucoup d'expérience individuelle. L'idée : un copilote vocal qui écoute le problème, pose les bonnes questions, exécute les diagnostics et rédige le rapport.",
      "Techniquement, le projet articule trois mondes : une interface React/TypeScript qui capture et diffuse la voix, un backend FastAPI qui gère les sessions, la sécurité et les incidents, et l'agent AssemblyAI qui orchestre STT, LLM, TTS et tool calling par WebSocket. Les outils de diagnostic s'appuient sur un simulateur réseau (VLAN, DHCP, DNS, gateway) et une knowledge base RAG locale (TF-IDF) construite sur de la documentation Cisco et networking.",
      "Développé en solo pour l'AssemblyAI Voice Agent Hackathon 2026, le projet a atteint un MVP démontrable : un scénario complet — de la phrase « le PC du bureau 204 n'a plus accès au réseau » au rapport d'incident structuré — rejouable de bout en bout.",
    ],
    category: "AI × Networks × Voice",
    accent: "#3ce6a6",
    statusLevel: "active",
    statusLabel: "MVP fonctionnel — démo prête",
    timeframe: "2026",
    context: "AssemblyAI — Voice Agent Hackathon 2026",
    role: "Développement complet (projet solo) — architecture, agent vocal, backend, frontend",
    repoStats: ["17 commits", "dépôt solo", "activité 09/2026"],
    problem: [
      "Le troubleshooting réseau repose encore sur des interfaces complexes, des commandes CLI et une documentation technique dispersée.",
      "La qualité du diagnostic dépend de l'expérience individuelle du technicien et de procédures manuelles.",
      "La rédaction des rapports d'incident est manuelle, lente et peu standardisée.",
    ],
    solution: [
      "Une approche voice-first : le technicien décrit oralement le problème (« le PC du bureau 204 n'a plus accès au réseau »).",
      "L'agent pose des questions ciblées, appelle ses outils de diagnostic, consulte la base de connaissances puis identifie une cause probable.",
      "Chaque diagnostic se termine par un rapport d'incident structuré, généré automatiquement.",
    ],
    features: [
      {
        title: "Agent vocal temps réel",
        detail:
          "Capture micro, speech-to-text, réponse vocale, détection des tours de parole et interruptions via l'AssemblyAI Voice Agent API (WebSocket + AudioWorklet).",
      },
      {
        title: "Tool calling réseau",
        detail:
          "check_ip_configuration, check_vlan, check_dhcp, check_dns, check_gateway, ping_host… Le LLM décide quand appeler chaque outil et exploite ses résultats.",
      },
      {
        title: "Simulateur réseau",
        detail:
          "Routeurs, switches, PC, serveurs DHCP/DNS, VLANs et incidents prédéfinis (échec DHCP, VLAN mismatch, gateway inaccessible…) — reproductibles et sans risque.",
      },
      {
        title: "Knowledge base / RAG",
        detail:
          "Base documentaire Cisco, VLAN, DHCP, DNS, ARP, TCP/IP, OSPF, STP, Linux networking, télécoms — index TF-IDF local et recherche sémantique.",
      },
      {
        title: "Gestion des incidents",
        detail:
          "Chaque diagnostic devient un incident : équipement, symptômes, sévérité, statut (OPEN → INVESTIGATING → RESOLVED → CLOSED), conversation associée.",
      },
      {
        title: "Rapports d'incident",
        detail:
          "Génération automatique d'un compte rendu structuré : diagnostic, cause probable, actions recommandées.",
      },
      {
        title: "Sécurité by design",
        detail:
          "Clé AssemblyAI côté serveur uniquement, tokens temporaires pour le navigateur, aucune commande système arbitraire exécutée par le LLM.",
      },
      {
        title: "Qualité & CI",
        detail:
          "Tests backend et frontend, Makefile, pipeline GitHub Actions (lint + tests + build) sur chaque push et PR.",
      },
    ],
    architecture: [
      {
        layer: "Interface vocale — React + TypeScript",
        detail:
          "Voice interface, transcript, tool calls et panneau d'incident. Communique avec l'API en REST et avec l'agent vocal en WebSocket direct.",
        connectsTo: [1, 2],
      },
      {
        layer: "API — FastAPI (Python 3.12)",
        detail:
          "REST, sessions, génération de tokens temporaires AssemblyAI, logique métier, résilience. Persiste les incidents et rapports.",
        connectsTo: [0, 4],
      },
      {
        layer: "Agent — AssemblyAI Voice Agent API",
        detail:
          "STT, LLM, TTS, détection de tours de parole, tool calling — relié au navigateur par WebSocket.",
        connectsTo: [0, 3],
      },
      {
        layer: "Outils — Simulateur + Knowledge Base",
        detail:
          "Diagnostic réseau simulé (VLAN, DHCP, DNS, gateway) et RAG TF-IDF local sur la documentation technique.",
        connectsTo: [2],
      },
      {
        layer: "Persistance — SQLite",
        detail:
          "Incidents, sessions, tool calls et rapports (SQLAlchemy) — choix assumé pour le MVP du hackathon.",
        connectsTo: [1],
      },
    ],
    stack: [
      { label: "Frontend", items: ["React", "TypeScript", "Vite", "CSS vanilla"] },
      { label: "Backend", items: ["Python 3.12", "FastAPI", "Uvicorn", "Pydantic", "SQLAlchemy"] },
      { label: "Voice & IA", items: ["AssemblyAI Voice Agent API", "WebSocket", "AudioWorklet", "RAG TF-IDF"] },
      { label: "Données & qualité", items: ["SQLite", "Pytest", "Makefile", "GitHub Actions"] },
    ],
    technologies: [
      "AssemblyAI",
      "FastAPI",
      "React",
      "TypeScript",
      "Python",
      "WebSocket",
      "AudioWorklet",
      "RAG",
      "TF-IDF",
      "SQLite",
      "SQLAlchemy",
      "Pytest",
      "GitHub Actions",
    ],
    highlights: [
      "Flux vocal complet de bout en bout : micro → token temporaire → WebSocket → transcription → tool calling → réponse vocale.",
      "Diagnostic réel simulé : adresse APIPA (169.254.x.x) + VLAN mismatch détectés sans toucher d'équipement physique.",
      "7 phases de la roadmap réalisées sur 8 : foundation, voice agent, agentique, simulateur, knowledge, incidents, UI.",
    ],
    skills: [
      "Concevoir une architecture agentique : LLM + outils + garde-fous",
      "Orchestrer la voix temps réel (WebSocket, AudioWorklet, tours de parole)",
      "Construire un pipeline RAG local (chunking, vectorisation TF-IDF, retrieval)",
      "Structurer une API FastAPI robuste (routes, sécurité, résilience)",
      "Modéliser un domaine réseau (VLAN, DHCP, DNS) en données testables",
    ],
    githubUrl: `${GH}/voiceops`,
    docsLinks: [
      { label: "DEMO.md — guide de démonstration", url: `${GH}/voiceops/blob/main/DEMO.md` },
      { label: "docs/architecture.md", url: `${GH}/voiceops/blob/main/docs/architecture.md` },
      { label: "docs/api.md", url: `${GH}/voiceops/blob/main/docs/api.md` },
    ],
    media: [],
    mediaNote:
      "Aucune capture d'écran ni vidéo dans le dépôt — le prototype se démontre en direct. Le scénario complet (live et scripté) est documenté dans DEMO.md.",
    verdict: {
      repoShows: [
        "Un pipeline vocal complet de bout en bout : capture micro, token temporaire, WebSocket, tool calling, réponse vocale — testé en démo.",
        "Un simulateur réseau avec incidents prédéfinis (APIPA, VLAN mismatch, DHCP en échec) qui rend le diagnostic reproductible.",
        "Une discipline d'ingénierie visible : tests backend/frontend, Makefile, GitHub Actions, documentation (DEMO.md, docs/).",
      ],
      notShown: [
        "Pas de capture d'écran ni de vidéo dans le dépôt : l'interface se démontre en direct ou via le scénario de DEMO.md.",
        "Pas de déploiement public exposé — l'application se lance en local (backend + frontend).",
      ],
    },
    metrics: [
      { value: "08", label: "outils de diagnostic réseau" },
      { value: "05", label: "scénarios d'incident prédéfinis" },
      { value: "14", label: "étapes dans le flux vocal" },
    ],
  },
  {
    slug: "pimarket",
    channel: "CH-02",
    title: "PiMarket",
    tagline:
      "Marketplace full-stack pour l'écosystème Pi Network — paiements Pi et fiat sous escrow.",
    shortDescription:
      "Une marketplace Django complète : boutiques, commandes, litiges et un escrow qui séquestre le paiement jusqu'à la livraison.",
    fullDescription: [
      "PiMarket est une marketplace complète pour l'écosystème Pi Network : boutiques, catalogue de produits physiques et numériques, commandes, litiges — et surtout un système d'escrow qui séquestre le paiement jusqu'à confirmation de livraison.",
      "Le backend Django/DRF expose une API REST documentée couvrant comptes, boutiques, produits, commandes, paiements et litiges. Les paiements Pi et fiat (Stripe) passent par des providers interchangeables avec webhooks signés ; les tâches de fond (vérification des paiements, auto-release d'escrow, notifications) tournent sur Celery + Redis ; l'ensemble est orchestré par Docker Compose avec Nginx en frontal.",
      "Développé à deux pour le Pi Network Hackathon (Open Mainnet), le projet est allé jusqu'au MVP « production-ready » : comptes de démonstration, données seedées, captures d'écran et vidéos de démonstration documentées dans le dépôt.",
    ],
    category: "Full-stack × Payments × Pi Network",
    accent: "#ffc857",
    statusLevel: "active",
    statusLabel: "MVP complet — prêt pour les clés de production",
    timeframe: "2025 → 2026",
    context: "Pi Network Hackathon — Open Mainnet",
    role: "Développeur principal — conception, API, paiements, infrastructure (projet d'équipe)",
    repoStats: ["42 commits", "équipe de 2", "activité 09/2026"],
    problem: [
      "Acheter et vendre en Pi suppose de la confiance entre inconnus : qui libère le paiement, et quand ?",
      "Sans infrastructure, pas d'adoption marchande réelle : boutiques, catalogue, commandes, litiges et notifications doivent exister.",
      "Le Pi doit cohabiter avec les paiements fiat pour servir des usages du monde réel.",
    ],
    solution: [
      "Une marketplace Django complète : authentification téléphone + OTP, boutiques, produits physiques et numériques, géolocalisation.",
      "Un système d'escrow : le paiement est séquestré à la commande, libéré à la confirmation de livraison (ou automatiquement pour le numérique), remboursable en cas de litige.",
      "Paiements Pi et fiat (Stripe) derrière une même API, avec webhooks signés et providers interchangeables.",
    ],
    features: [
      {
        title: "Auth téléphone + OTP",
        detail:
          "Inscription par numéro de téléphone, vérification OTP (Twilio/MTN ou console en mode démo), sessions JWT rafraîchissables.",
      },
      {
        title: "Paiements multi-providers",
        detail:
          "Pi Network, Stripe (fiat) et mode démo simulé — création, suivi de statut et webhooks par provider.",
      },
      {
        title: "Escrow transactionnel",
        detail:
          "Statuts held / released / refunded, libération automatique des produits numériques et date d'auto-release planifiée par Celery.",
      },
      {
        title: "Boutiques & catalogue",
        detail:
          "Création de boutiques, produits physiques/numériques, prix en Pi et en fiat, stock, catégories, découverte par géolocalisation.",
      },
      {
        title: "Cycle de commande complet",
        detail:
          "created → pending_payment → paid_in_escrow → shipped → delivered → released, avec expédition, suivi et confirmation acheteur.",
      },
      {
        title: "Résolution de litiges",
        detail:
          "Ouverture de dispute, fil de messages entre acheteur et vendeur, arbitrage côté admin.",
      },
      {
        title: "API REST documentée",
        detail:
          "Django REST Framework : comptes, boutiques, produits, commandes, paiements, litiges, webhooks — avec documentation intégrée.",
      },
      {
        title: "Tâches asynchrones",
        detail:
          "Celery worker + beat : vérification des paiements, auto-release d'escrow, notifications.",
      },
      {
        title: "Déploiement Docker",
        detail:
          "docker-compose : Nginx, Django, PostgreSQL 15, Redis 7, Celery — et un compose.prod prêt pour la production.",
      },
    ],
    architecture: [
      {
        layer: "Clients — web / mobile",
        detail:
          "Templates Django + JavaScript côté web, intégrations Stripe.js et SDK Pi. Consomment l'API REST avec JWT.",
        connectsTo: [1],
      },
      {
        layer: "Reverse proxy — Nginx",
        detail: "TLS, routage vers l'application Django et les endpoints de webhooks.",
        connectsTo: [0, 2],
      },
      {
        layer: "Application — Django + DRF",
        detail:
          "Apps accounts, shops, payments, messaging : modèles, sérialiseurs, permissions, webhooks signés.",
        connectsTo: [1, 3, 4, 5],
      },
      {
        layer: "Workers — Celery + Redis",
        detail:
          "Tâches de fond (vérification paiements, auto-release d'escrow, notifications) et planification via Celery beat.",
        connectsTo: [2, 4],
      },
      {
        layer: "Données — PostgreSQL",
        detail:
          "Utilisateurs, boutiques, produits, commandes, paiements, transactions d'escrow, litiges.",
        connectsTo: [2, 3],
      },
      {
        layer: "Externes — Stripe · Pi API · SMS",
        detail: "Paiements fiat et Pi, OTP par SMS (Twilio/MTN).",
        connectsTo: [2],
      },
    ],
    stack: [
      { label: "Backend", items: ["Django", "Django REST Framework", "JWT", "Celery"] },
      { label: "Front", items: ["Templates Django", "JavaScript", "Stripe.js"] },
      { label: "Données", items: ["PostgreSQL", "Redis"] },
      { label: "Paiements", items: ["Pi Network API", "Stripe", "Webhooks signés"] },
      { label: "Infra & qualité", items: ["Docker", "Docker Compose", "Nginx", "Pytest", "Flake8", "Black"] },
    ],
    technologies: [
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Docker",
      "Nginx",
      "Stripe",
      "Pi Network",
      "JWT",
      "Pytest",
      "Python",
    ],
    highlights: [
      "Un cycle escrow complet, de la séquestration à la libération, testé de bout en bout (paiements simulés + cartes de test Stripe).",
      "25+ endpoints REST documentés, couverts par pytest et lintés (flake8, black, isort).",
      "Une stack de production réelle — PostgreSQL, Redis, Celery, Nginx — orchestrée en Docker Compose.",
    ],
    skills: [
      "Modéliser un domaine métier transactionnel (commandes, escrow, litiges)",
      "Intégrer plusieurs providers de paiement derrière une API unique",
      "Sécuriser une API : JWT, OTP, rate limiting, vérification de webhooks",
      "Industrialiser avec Celery, Redis et Docker Compose",
      "Écrire une API REST documentée, testable et maintenable",
    ],
    githubUrl: `${GH}/pimarket`,
    docsLinks: [
      { label: "docs/ARCHITECTURE.md", url: `${GH}/pimarket/blob/main/docs/ARCHITECTURE.md` },
      { label: "docs/API.md", url: `${GH}/pimarket/blob/main/docs/API.md` },
      { label: "docs/CONFIGURATION.md", url: `${GH}/pimarket/blob/main/docs/CONFIGURATION.md` },
    ],
    media: [
      {
        kind: "video",
        src: `${PIMARKET_DEMO}/Capture%20vid%C3%A9o%20du%202025-10-14%2016-53-26.webm`,
        alt: "Vidéo de démonstration du parcours d'achat sur Pi Market",
        caption: "Parcours d'achat — de la boutique au paiement en escrow",
      },
      {
        kind: "screenshot",
        src: `${PIMARKET_DEMO}/Screenshot%202025-10-14%20at%2016-54-53%20Connexion%20-%20Pi%20Market.png`,
        alt: "Écran de connexion de Pi Market",
        caption: "Authentification — connexion par numéro de téléphone",
      },
      {
        kind: "screenshot",
        src: `${PIMARKET_DEMO}/Screenshot%202025-10-14%20at%2017-00-26%20Votre%20Panier%20-%20Pi%20Market.png`,
        alt: "Panier d'achat de Pi Market",
        caption: "Panier — prix affichés en Pi et en fiat",
      },
      {
        kind: "screenshot",
        src: `${PIMARKET_DEMO}/Screenshot%202025-10-14%20at%2017-10-04%20Ma%20Boutique%20-%20Pi%20Market.png`,
        alt: "Gestion de boutique dans Pi Market",
        caption: "Boutique vendeur — gestion des produits",
      },
      {
        kind: "video",
        src: `${PIMARKET_DEMO}/Capture%20vid%C3%A9o%20du%202025-10-14%2017-09-00.webm`,
        alt: "Vidéo de démonstration de la gestion de boutique",
        caption: "Espace boutique — gestion du catalogue et des commandes",
      },
      {
        kind: "screenshot",
        src: `${PIMARKET_DEMO}/Screenshot%202025-10-14%20at%2017-11-06%20Tableau%20de%20bord%20Pi%20Market%20Admin.png`,
        alt: "Tableau de bord administrateur de Pi Market",
        caption: "Back-office admin — commandes, paiements, litiges",
      },
      {
        kind: "video",
        src: `${PIMARKET_DEMO}/Capture%20vid%C3%A9o%20du%202025-10-14%2017-12-39.webm`,
        alt: "Vidéo de démonstration de l'administration Pi Market",
        caption: "Administration — supervision des paiements et litiges",
      },
      {
        kind: "video",
        src: `${PIMARKET_DEMO}/Capture%20vid%C3%A9o%20du%202025-10-14%2017-15-13.webm`,
        alt: "Vidéo de démonstration des paiements côté admin",
        caption: "Suivi des paiements — statuts escrow et webhooks",
      },
    ],
    verdict: {
      repoShows: [
        "Une stack de production réelle : PostgreSQL, Redis, Celery, Nginx, Docker Compose (compose.prod) — pas un prototype SQLite.",
        "Des preuves visuelles fournies par le projet lui-même : captures d'écran et vidéos de démonstration dans demo/.",
        "42 commits, deux contributeurs, une documentation d'architecture et d'API (docs/ARCHITECTURE.md, docs/API.md).",
      ],
      notShown: [
        "Aucune URL de déploiement public : l'application attend ses clés de production (Stripe, Pi Network, Twilio).",
        "Le front-end Django/JS est fonctionnel mais utilitaire — l'API est le cœur du projet.",
      ],
    },
    metrics: [
      { value: "25+", label: "endpoints REST documentés" },
      { value: "06", label: "états dans le cycle de commande" },
      { value: "03", label: "providers de paiement" },
    ],
  },
  {
    slug: "farmnavigator",
    channel: "CH-03",
    title: "FarmNavigator",
    repoAlias: "dépôt « projet-collectif »",
    tagline:
      "Simulateur agricole interactif piloté par les données d'observation de la Terre de la NASA.",
    shortDescription:
      "Un jeu de gestion agricole où le climat vient de la NASA POWER API et la croissance des cultures d'équations différentielles.",
    fullDescription: [
      "FarmNavigator transforme les données d'observation de la Terre en expérience de jeu : l'utilisateur gère une exploitation virtuelle — parcelles, cultures, saisons — et voit l'impact de chaque décision (irrigation, fertilisation, sol) sur le rendement et la durabilité.",
      "Les conditions climatiques proviennent de la NASA POWER API (température, précipitations, humidité, rayonnement solaire, vent). La croissance des cultures est modélisée par des équations différentielles résolues avec SciPy et NumPy, et un assistant à règles guide les choix en temps réel. Les résultats — journaux quotidiens et bilans finaux — sont exportés en CSV pour analyse.",
      "Présenté au NASA Space Apps Challenge 2025 sur le thème « Leveraging Earth Observation Data for Informed Agricultural Decision-Making », le prototype couvre 13 cultures avec 5 stades de croissance illustrés, et sert de support pédagogique pour l'agriculture durable.",
    ],
    category: "Data × Simulation × Agriculture",
    accent: "#5ea8ff",
    statusLevel: "prototype",
    statusLabel: "Prototype présenté — Space Apps 2025",
    timeframe: "2025",
    context:
      "NASA Space Apps Challenge 2025 — thème « Leveraging Earth Observation Data for Informed Agricultural Decision-Making »",
    role:
      "Développeur principal & Designer UI/UX — équipe GAIATECH (3 membres), d'après la présentation du dépôt",
    repoStats: ["13 commits", "équipe GAIATECH", "activité 04/2025"],
    problem: [
      "Les données d'observation de la Terre restent opaques pour le grand public — et les décisions agricoles se prennent souvent sans elles.",
      "Comprendre l'impact réel de l'irrigation, de la fertilisation et du climat demande des modèles difficilement accessibles.",
      "Il fallait un support pédagogique concret pour les établissements scolaires, les formations STEM et les ateliers technologiques.",
    ],
    solution: [
      "Un jeu de gestion : parcelles, régions françaises, cultures, saisons — chaque décision (eau, engrais, sol) a un impact mesurable.",
      "Les conditions climatiques proviennent de la NASA POWER API : température, précipitations, humidité, rayonnement solaire, vent.",
      "La croissance des cultures est simulée par des équations différentielles résolues avec SciPy, et un assistant à règles guide les choix.",
    ],
    features: [
      {
        title: "Simulation agricole dynamique",
        detail:
          "Création de parcelles, choix de la région (data/regions_fr.json) et des cultures (data/samples/crops.json), paramétrage des saisons.",
      },
      {
        title: "Données climatiques réelles",
        detail:
          "Intégration de la NASA POWER API : température, précipitations, humidité, rayonnement solaire, vitesse du vent.",
      },
      {
        title: "Modélisation scientifique",
        detail:
          "Croissance des cultures modélisée par des équations différentielles (dG/dt) résolues avec SciPy et NumPy.",
      },
      {
        title: "Gestion de l'eau",
        detail:
          "Irrigation manuelle, drainage, périodes de sécheresse et risques liés au sur-arrosage.",
      },
      {
        title: "Fertilité du sol",
        detail:
          "Utilisation des engrais, dégradation progressive du sol, arbitrage entre rendement immédiat et durabilité.",
      },
      {
        title: "Assistant intelligent",
        detail:
          "Système de recommandations en temps réel : conseils d'arrosage, optimisation des ressources, alertes environnementales.",
      },
      {
        title: "Tableau de bord final",
        detail:
          "Rendement, score de durabilité, qualité finale du sol et bilan des décisions — exportés en CSV (dossier rapports/).",
      },
    ],
    architecture: [
      {
        layer: "Interface — Pygame",
        detail:
          "Boucle de jeu, menu, widgets et écran de résultats (ui/game.py, ui/menu.py, ui/results.py). Affiche les bilans exportés.",
        connectsTo: [1, 4],
      },
      {
        layer: "Moteur — core/farm_logic.py",
        detail:
          "Modèle de croissance, eau, engrais et sol ; équations différentielles résolues avec SciPy.",
        connectsTo: [0, 2, 3],
      },
      {
        layer: "Données — NASA POWER API",
        detail:
          "core/nasa_api.py interroge les relevés climatiques quotidiens de la localisation choisie.",
        connectsTo: [1],
      },
      {
        layer: "Contenu — JSON",
        detail:
          "Régions françaises (data/regions_fr.json) et cultures (data/samples/crops.json).",
        connectsTo: [1],
      },
      {
        layer: "Analyse — rapports/",
        detail:
          "Journaux quotidiens (rendement, qualité du sol) et bilans finaux exportés en CSV pour analyse.",
        connectsTo: [0],
      },
    ],
    stack: [
      { label: "Langage", items: ["Python 3"] },
      { label: "Interface", items: ["Pygame"] },
      { label: "Calcul scientifique", items: ["NumPy", "SciPy"] },
      { label: "Données & analyse", items: ["Requests", "Matplotlib", "JSON"] },
      { label: "Conception", items: ["Figma", "Git / GitHub"] },
    ],
    technologies: [
      "Python",
      "Pygame",
      "NumPy",
      "SciPy",
      "NASA POWER API",
      "Requests",
      "Matplotlib",
      "JSON",
      "Figma",
    ],
    highlights: [
      "Des données satellites ouvertes transformées en expérience de jeu compréhensible.",
      "Une vraie modélisation scientifique : la croissance dépend du climat réel via des EDO, pas de nombres aléatoires.",
      "Un outil pensé pour l'enseignement : sensibilisation à l'agriculture durable et à la décision par la donnée.",
    ],
    skills: [
      "Consommer une API scientifique publique (NASA POWER) et la rendre pédagogique",
      "Traduire un phénomène réel en modèle mathématique (équations différentielles, SciPy)",
      "Structurer une application Pygame (logique / UI / données)",
      "Analyser et exporter des résultats de simulation (CSV, Matplotlib)",
      "Livrer un prototype en équipe sur le délai serré d'un hackathon",
    ],
    githubUrl: `${GH}/projet-collectif`,
    docsLinks: [
      { label: "README.md du dépôt", url: `${GH}/projet-collectif#readme` },
      { label: "FarmNavigator.pptx — présentation du projet", url: `${GH}/projet-collectif/blob/main/FarmNavigator.pptx` },
    ],
    media: [
      {
        kind: "screenshot",
        src: `${FARM_ASSETS}/Cacao/Cacao_0.png`,
        alt: "Culture de cacao au stade initial dans FarmNavigator",
        caption: "Stade de croissance 0 — semis (asset du jeu, cacao)",
      },
      {
        kind: "screenshot",
        src: `${FARM_ASSETS}/Cacao/Cacao_4.png`,
        alt: "Culture de cacao au stade final dans FarmNavigator",
        caption: "Stade de croissance 4 — plante mature (asset du jeu, cacao)",
      },
      {
        kind: "screenshot",
        src: `${FARM_ASSETS}/Tomate/Tomate_4.png`,
        alt: "Culture de tomate au stade final dans FarmNavigator",
        caption: "13 cultures × 5 stades — ici la tomate à maturité",
      },
    ],
    mediaNote:
      "Le dépôt fournit les assets du jeu (13 cultures × 5 stades de croissance) mais aucune capture d'écran d'une partie en cours — le simulateur se lance en local via « python main.py ».",
    verdict: {
      repoShows: [
        "13 cultures × 5 stades de croissance illustrés (assets/images/) : le contenu visuel du jeu existe et est structuré.",
        "Un pipeline scientifique réel : NASA POWER API interrogée par core/nasa_api.py, croissance résolue par EDO avec SciPy, exports CSV dans rapports/.",
        "Un pitch produit formalisé (FarmNavigator.pptx) : problème, solution, marché, validation — présenté au Space Apps 2025.",
      ],
      notShown: [
        "Aucune capture d'écran d'une partie en cours — le simulateur se lance en local via « python main.py ».",
        "Le dépôt est resté au stade prototype : pas de version web, pas de build publié (main.spec PyInstaller présent mais non exploité).",
      ],
    },
    metrics: [
      { value: "13", label: "cultures simulées (5 stades)" },
      { value: "05", label: "variables climatiques NASA POWER" },
      { value: "CSV", label: "journaux et bilans exportés" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
