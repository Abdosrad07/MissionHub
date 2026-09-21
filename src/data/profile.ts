/**
 * Source unique de vérité du profil personnel — Signal Path Portfolio.
 *
 * Toutes les informations proviennent de PORTFOLIO_personnel.md.
 * Rien n'est inventé.
 */

export const profile = {
  name: "Abdourahim",
  handle: "Abdosrad",
  school: "SUP'PTIC Yaoundé",
  field: "Télécommunications — Informatique des Réseaux",
  baccalaureat: "Baccalauréat C",
  careerGoal: "Ingénieur NetDevOps spécialisé dans le Cloud",
  github: "https://github.com/Abdosrad07",

  tagline:
    "Un étudiant ingénieur en télécommunications qui construit progressivement un profil de futur NetDevOps spécialisé en Cloud.",

  origin:
    "Je viens des télécommunications. Mon parcours a commencé par les protocoles, les trames et les salles machines — et j'ai choisi de construire des outils à la croisée des réseaux, du logiciel et du cloud.",

  journey: [
    {
      id: "origin",
      label: "Origine",
      period: "Baccalauréat C",
      title: "Les bases scientifiques",
      detail:
        "Baccalauréat C — mathématiques, physique, chimie. Le socle scientifique qui ouvre la voie aux télécommunications.",
      phase: "acquis" as const,
    },
    {
      id: "telecom",
      label: "Télécommunications",
      period: "SUP'PTIC Yaoundé",
      title: "Entrer dans le monde des réseaux",
      detail:
        "Intégrer SUP'PTIC Yaoundé dans le domaine des télécommunications. Découvrir les fondements : TCP/IP, adressage, subnetting, les couches du modèle OSI.",
      phase: "acquis" as const,
    },
    {
      id: "networks",
      label: "Informatique des Réseaux",
      period: "Spécialisation",
      title: "Le réseau comme socle",
      detail:
        "VLAN, switching, routing, troubleshooting. Les réseaux deviennent le terrain de compréhension des systèmes distribués. Premiers pas avec Huawei et Cisco.",
      phase: "acquis" as const,
    },
    {
      id: "linux-python",
      label: "Linux + Python",
      period: "Fondations",
      title: "L'outil et le système",
      detail:
        "Linux comme socle — terminal, Bash, administration, virtualisation. Python comme outil — programmation, automatisation, scripting, APIs. Les deux pieds du futur ingénieur.",
      phase: "acquis" as const,
    },
    {
      id: "software",
      label: "Software",
      period: "Projets",
      title: "Construire des outils",
      detail:
        "Développement full-stack — React, FastAPI, Django, bases de données. Chaque projet est une étape : AgriPilote, PiMarket, VoiceOps. Du code qui résout des problèmes réels.",
      phase: "pratique" as const,
    },
    {
      id: "automation",
      label: "Automatisation",
      period: "En cours",
      title: "Répéter, pas reproduire",
      detail:
        "Netmiko, Paramiko, Ansible. Automatiser les tâches réseau, les déploiements, les tests. Passer de l'opérateur qui configure à l'ingénieur qui programme l'infrastructure.",
      phase: "apprentissage" as const,
    },
    {
      id: "ai",
      label: "Intelligence Artificielle",
      period: "Exploration",
      title: "Nouvelles dimensions",
      detail:
        "LLM, agents IA, interaction vocale. VoiceOps montre comment l'IA peut transformer le diagnostic réseau. Un domaine en pleine expansion à intégrer aux systèmes.",
      phase: "apprentissage" as const,
    },
    {
      id: "cloud",
      label: "Cloud",
      period: "Horizon",
      title: "L'infrastructure sans frontières",
      detail:
        "Cloud computing, architecture, services, automatisation. Docker, Terraform, CI/CD. L'infrastructure qui se provisionne elle-même, qui se surveille, qui s'adapte.",
      phase: "horizon" as const,
    },
    {
      id: "netdevops",
      label: "NetDevOps",
      period: "Destination",
      title: "La convergence",
      detail:
        "Network + Linux + Python + Automation + DevOps + Cloud + AI → NetDevOps. L'ingénieur qui comprend l'infrastructure et qui sait la programmer, l'automatiser et l'opérer dans le Cloud.",
      phase: "horizon" as const,
    },
  ],

  technicalFoundation: {
    networking: [
      "TCP/IP",
      "Adressage IP",
      "Subnetting",
      "VLAN",
      "Switching",
      "Routing",
      "Troubleshooting",
      "Équipements Huawei / Cisco",
      "HCIA Datacom (en cours)",
    ],
    linux: [
      "Environnement Linux",
      "Administration de base",
      "Terminal & Bash",
      "Gestion des fichiers",
      "Processus & services",
      "Réseau sous Linux",
      "Virtualisation / VMs",
      "Environnement serveur",
    ],
    python: [
      "Programmation",
      "Automatisation",
      "Scripting",
      "APIs (FastAPI)",
      "Backend",
      "Manipulation de données",
      "Projets IA",
      "Automatisation réseau (Netmiko, Paramiko)",
    ],
  },

  skills: {
    solid: [
      "Réseaux IP",
      "Switching",
      "Routing",
      "VLAN",
      "Troubleshooting",
      "Linux",
      "Bash",
      "Python",
    ],
    practical: [
      "React",
      "TypeScript",
      "FastAPI",
      "Django",
      "SQLAlchemy",
      "SQL",
      "Vite",
      "Leaflet",
      "Recharts",
      "Java",
    ],
    learning: [
      "Cloud computing",
      "Terraform",
      "Ansible",
      "Docker avancé",
      "CI/CD",
      "Prometheus",
      "Grafana",
    ],
    future: [
      "NetDevOps complet",
      "Cloud-native architectures",
      "Monitoring stacks",
      "Infrastructure as Code",
    ],
  },

  certifications: [
    {
      name: "Scientific Computing with Python",
      provider: "freeCodeCamp",
      significance:
        "Validation du parcours Python — de la programmation au calcul scientifique. Une étape clé vers l'automatisation et l'IA.",
      status: "obtenu" as const,
    },
    {
      name: "Certifications / Formations IA",
      provider: "Sololearn",
      significance:
        "Exploration de l'intelligence artificielle — LLM, modèles, concepts fondamentaux. Base pour comprendre comment l'IA s'applique aux systèmes.",
      status: "obtenu" as const,
    },
  ],

  hackathons: [
    {
      name: "Pi Network Hackathon",
      year: "2025–2026",
      project: "PiMarket",
      ongoing: true,
      detail:
        "Développer une marketplace complète pour l'écosystème Pi Network. Apprendre à construire rapidement, à concevoir un produit sous contrainte, à travailler en équipe.",
      skills: [
        "Développement rapide",
        "Conception de produit",
        "Travail sous contrainte",
        "Présentation de solution",
      ],
    },
    {
      name: "NASA Space Apps Challenge",
      year: "2025",
      project: "FarmNavigator",
      ongoing: false,
      detail:
        "Transformer des données d'observation de la Terre de la NASA en simulateur agricole interactif. Résoudre un problème réel avec des données ouvertes en 48 heures.",
      skills: [
        "Résolution de problème",
        "Utilisation de données",
        "Créativité",
        "Travail en équipe",
      ],
    },
    {
      name: "Hackverse — Polytech",
      year: "2025",
      project: "Participation",
      ongoing: false,
      detail:
        "Nouvelle étape dans l'apprentissage du développement de solutions dans un environnement de compétition et d'innovation.",
      skills: [
        "Innovation",
        "Compétition",
        "Apprentissage rapide",
      ],
    },
    {
      name: "LabLab.ai / AssemblyAI Voice Agent Hackathon",
      year: "2026",
      project: "VoiceOps",
      detail:
        "Un assistant vocal pour le diagnostic réseau — la convergence entre voix, IA, réseaux et automatisation. En cours de développement.",
      skills: [
        "Voice AI",
        "Tool calling",
        "RAG",
        "Architecture agentique",
      ],
      ongoing: true,
    },
  ],

  maintenanceAndTroubleshooting: {
    detail:
      "Maintenance informatique pratique — diagnostic matériel, diagnostic logiciel, résolution de problèmes réseau, configuration IP, DNS, passerelles, connectivité, périphériques. Cette expérience m'a appris à partir d'un symptôme, formuler des hypothèses, effectuer des vérifications et isoler progressivement la cause d'un problème.",
    skills: [
      "Diagnostic matériel",
      "Diagnostic logiciel",
      "Résolution problèmes réseau",
      "Configuration IP / DNS",
      "Recherche de causes",
    ],
  },

  softSkills: [
    {
      name: "Leadership",
      detail:
        "Développé à travers les projets et travaux collectifs — initatives, coordination, organisation, prise de responsabilités.",
    },
    {
      name: "Adaptabilité",
      detail:
        "Capacité à apprendre et à s'adapter à différents environnements techniques — des réseaux au développement, des hackathons à l'infrastructure.",
    },
    {
      name: "Humilité",
      detail:
        "Conscience de ce que je sais et de ce que je ne sais pas encore. Je construis mon expertise plutôt que de prétendre l'avoir atteinte.",
    },
    {
      name: "Sérieux",
      detail:
        "Discipline, volonté d'apprendre, capacité à aller au bout d'un projet, responsabilité.",
    },
    {
      name: "Curiosité",
      detail:
        "Passage des réseaux au software, puis à l'IA et au Cloud — une curiosité technique qui pousse à comprendre comment les systèmes fonctionnent.",
    },
    {
      name: "Autonomie",
      detail:
        "Capacité à construire progressivement mon propre chemin professionnel, à apprendre par la pratique et à livrer des projets concrets.",
    },
  ],

  internationalAspirations: {
    countries: [
      { name: "Maroc", flag: "🇲🇦" },
      { name: "Sénégal", flag: "🇸🇳" },
      { name: "États-Unis", flag: "🇺🇸" },
      { name: "Chine", flag: "🇨🇳" },
    ],
    goals: [
      "Découvrir différents écosystèmes technologiques",
      "Rencontrer des ingénieurs",
      "Comprendre différentes cultures professionnelles",
      "Participer à des événements internationaux",
      "Travailler dans des environnements internationaux",
      "Développer mon réseau",
      "Apprendre de nouvelles méthodes",
      "Élargir ma vision du monde",
    ],
  },

  remoteWorkGoal:
    "Rechercher progressivement des opportunités permettant de travailler dans un environnement international, notamment à distance — missions techniques, développement, automatisation, réseau, infrastructure, Cloud, NetDevOps.",

  dreams: [
    {
      title: "Devenir un ingénieur solide",
      detail:
        "Pas simplement accumuler des certificats, mais comprendre réellement les systèmes que je construis et administre.",
    },
    {
      title: "Construire",
      detail:
        "Créer des outils et des produits utiles — des solutions qui résolvent des problèmes concrets.",
    },
    {
      title: "Automatiser",
      detail:
        "Réduire les tâches répétitives et rendre les infrastructures plus intelligentes.",
    },
    {
      title: "Explorer l'IA",
      detail:
        "Comprendre comment l'IA peut être appliquée aux systèmes, aux réseaux et aux opérations techniques.",
    },
    {
      title: "Découvrir le monde",
      detail:
        "Travailler avec des personnes et des équipes provenant de différents pays.",
    },
    {
      title: "Construire une carrière internationale",
      detail:
        "Progressivement devenir capable de travailler sur des projets dépassant mon environnement local.",
    },
    {
      title: "Devenir autonome",
      detail:
        "Construire progressivement une expertise et une carrière qui me donnent davantage de liberté professionnelle.",
    },
  ],

  currentlyLearning: [
    "HCIA Datacom",
    "Python networking",
    "Netmiko",
    "Paramiko",
    "Ansible",
    "Linux avancé",
    "Docker",
    "Terraform",
    "Cloud",
    "Prometheus",
    "Grafana",
    "NetDevOps",
    "Technical English",
  ],

  photos: [
    { src: "/photos_abdourahim/IMG-20260720-WA0029.jpg", alt: "Abdourahim — portrait" },
    { src: "/photos_abdourahim/IMG_20260730_081348.jpg", alt: "Abdourahim — travail" },
    { src: "/photos_abdourahim/IMG-20260804-WA0009.jpeg", alt: "Abdourahim — quotidien" },
    { src: "/photos_abdourahim/IMG_20260813_070943.jpg", alt: "Abdourahim — études" },
    { src: "/photos_abdourahim/IMG_20260814_111501.jpg", alt: "Abdourahim — project" },
    { src: "/photos_abdourahim/IMG_20260914_153052.jpg", alt: "Abdourahim — récent" },
  ],

  stats: {
    projects: 4,
    commits: "72+",
    hackathons: 4,
  },
} as const;

export type Profile = typeof profile;
