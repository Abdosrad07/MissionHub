import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading, Terminal, Waveform } from "@/components/terminal";
import {
  ArrowUpRight,
  ClockIcon,
  GitHubIcon,
  RouteIcon,
  ShieldIcon,
  TerminalIcon,
} from "@/components/icons";
import { projects } from "@/data/projects";

/* ── Données personnelles — faits vérifiables, aucun pourcentage ── */

const operator = {
  identity: "Abdosrad — étudiant ingénieur en télécommunications",
  baseline:
    "Je viens des réseaux. J'ai grandi avec les protocoles, les trames et les salles machines — et j'ai choisi de construire des outils à la croisée des télécoms, du cloud et de l'IA.",
  signals: [
    "Le réflexe système : comprendre la couche 2 avant d'abstraire la couche 7.",
    "Le réflexe produit : transformer un problème technique en outil utilisable.",
    "Le réflexe ingénieur : documenter, tester, versionner — puis publier.",
  ],
  timeline: [
    {
      period: "2025",
      title: "NASA Space Apps Challenge",
      detail:
        "Prototype FarmNavigator en équipe — NASA POWER API, simulation SciPy, livré sur le délai du hackathon.",
    },
    {
      period: "2025 → 2026",
      title: "Pi Network Hackathon",
      detail:
        "Marketplace PiMarket en binôme — Django, escrow, paiements Pi/Stripe, stack Docker complète.",
    },
    {
      period: "2026",
      title: "AssemblyAI Voice Agent Hackathon",
      detail:
        "VoiceOps en solo — agent vocal temps réel, tool calling réseau, pipeline RAG, MVP démontrable.",
    },
  ],
  principles: [
    {
      title: "Les preuves d'abord",
      detail:
        "Pas de barre de compétences en pourcentage ici : trois dépôts ouverts, des commits datés, de la documentation. Le code parle, je commente.",
    },
    {
      title: "Le réseau comme socle",
      detail:
        "VLAN, DHCP, DNS, OSPF : la couche réseau n'est pas un détail d'implémentation, c'est le terrain d'origine. VoiceOps en est la démonstration.",
    },
    {
      title: "Livrer, pas seulement apprendre",
      detail:
        "Chaque hackathon s'est terminé par quelque chose qui tourne : un MVP démontrable, une API documentée, un prototype jouable.",
    },
  ],
};

const channels = [
  {
    icon: RouteIcon,
    label: "TROUBLESHOOTING",
    detail: "VoiceOps — diagnostic réseau orchestré par la voix",
  },
  {
    icon: ShieldIcon,
    label: "PAIEMENTS & CONFIANCE",
    detail: "PiMarket — escrow, paiements Pi/fiat, litiges",
  },
  {
    icon: TerminalIcon,
    label: "DONNÉES & SIMULATION",
    detail: "FarmNavigator — NASA POWER API, modèles EDO",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* ══ 1. HERO — LE SIGNAL ════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="font-mono text-xs tracking-widest text-signal">
                {"// PORTFOLIO — ÉTUDIANT INGÉNIEUR, TÉLÉCOMMUNICATIONS"}
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                Opérateur de réseaux,
                <br />
                <span className="text-signal">constructeur d&apos;outils.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Je conçois des systèmes qui parlent, diagnostiquent, paient et simulent.
                Trois projets réels — un copilote vocal pour le troubleshooting réseau,
                une marketplace sous escrow, un simulateur agricole nourri par la NASA.
                Ce portfolio ne raconte pas : il pointe vers les dépôts.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/#projets" className="btn btn-primary">
                  OUVRIR L&apos;INDEX DES PROJETS
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://github.com/Abdosrad07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GITHUB.COM/ABDOSRAD07
                </a>
              </div>
            </div>

            {/* console de session */}
            <Reveal>
              <Terminal title="voiceops — session@live" className="scanline">
                <div className="space-y-1.5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
                  <p className="text-muted">$ voiceops --listen</p>
                  <p>
                    <span className="text-freq">[STT]&nbsp;&nbsp;&nbsp;</span>
                    <span className="text-ink">« Le PC du bureau 204 n&apos;a plus accès au réseau. »</span>
                  </p>
                  <p>
                    <span className="text-signal">[AGENT]&nbsp;</span>
                    <span className="text-muted">La connexion Ethernet est-elle active ?</span>
                  </p>
                  <p>
                    <span className="text-freq">[USER]&nbsp;&nbsp;</span>
                    <span className="text-muted">Oui. Adresse 169.254.14.23.</span>
                  </p>
                  <p>
                    <span className="text-warn">[TOOL]&nbsp;&nbsp;</span>
                    <span className="text-muted">check_ip_configuration(pc-b204) → APIPA détectée</span>
                  </p>
                  <p>
                    <span className="text-warn">[TOOL]&nbsp;&nbsp;</span>
                    <span className="text-muted">check_vlan(pc-b204) → VLAN 10 · attendu : 20</span>
                  </p>
                  <p>
                    <span className="text-signal">[AGENT]&nbsp;</span>
                    <span className="text-muted">Cause probable : configuration VLAN incorrecte du port.</span>
                  </p>
                  <p>
                    <span className="text-alert">[REPORT]&nbsp;</span>
                    <span className="text-muted">INCIDENT #VO-001 généré — sévérité : medium</span>
                  </p>
                  <p className="caret pt-1 text-signal">$&nbsp;</p>
                </div>
              </Terminal>
              <div className="mt-4 h-10 opacity-70">
                <Waveform bars={44} />
              </div>
              <p className="mt-2 text-right font-mono text-[10px] tracking-widest text-muted">
                SESSION RÉELLE REJOUÉE — SCÉNARIO DÉMO VOICEOPS
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 2. BANDEAU DES CANAUX ══════════════════════════ */}
      <section aria-label="Domaines couverts" className="border-y border-line bg-panel/40">
        <div className="mx-auto grid max-w-6xl divide-line px-4 sm:grid-cols-3 sm:divide-x sm:px-6">
          {channels.map((c) => (
            <div key={c.label} className="flex items-start gap-3 px-2 py-5 sm:px-6">
              <c.icon className="mt-0.5 h-4 w-4 flex-none text-signal" />
              <div>
                <p className="font-mono text-[11px] tracking-widest text-ink">{c.label}</p>
                <p className="mt-1 text-[13px] leading-snug text-muted">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 3. INDEX DES PROJETS ═══════════════════════════ */}
      <section id="projets" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 sm:px-6">
        <Reveal>
          <SectionHeading cmd="ls ~/projects --all" title="Index des signaux" />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 font-mono text-[11px] leading-relaxed tracking-wide text-muted">
            {"// Chaque fiche est générée depuis l'analyse réelle du dépôt correspondant : README, structure, historique git, assets. Aucune information inventée — et aucune capture qui n'existe pas."}
          </p>
        </Reveal>
      </section>

      {/* ══ 4. PROFIL OPÉRATEUR — SECTION PERSONNELLE ═════ */}
      <section id="operateur" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 sm:px-6">
        <Reveal>
          <SectionHeading cmd="whoami && cat profil.sys" title="Profil opérateur" />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          {/* identité */}
          <Reveal>
            <div className="panel flex h-full flex-col p-6 sm:p-7">
              <p className="font-mono text-[11px] tracking-widest text-signal">
                {operator.identity.toUpperCase()}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink">{operator.baseline}</p>
              <ul className="mt-6 space-y-3">
                {operator.signals.map((s) => (
                  <li key={s} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-signal" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2 pt-7">
                {["Networks", "Télécommunications", "Cloud", "AI", "Automation", "Software Engineering", "NetDevOps"].map(
                  (i) => (
                    <span
                      key={i}
                      className="border border-line bg-panel2 px-2.5 py-1 font-mono text-[11px] tracking-wider text-muted"
                    >
                      {i}
                    </span>
                  )
                )}
              </div>
            </div>
          </Reveal>

          {/* ligne de vie */}
          <Reveal delay={80}>
            <div className="panel h-full p-6 sm:p-7">
              <p className="font-mono text-[11px] tracking-widest text-muted">
                {"// LIGNE DE VIE — 3 HACKATHONS, 3 PROJETS LIVRÉS"}
              </p>
              <ol className="timeline mt-6 space-y-7">
                {operator.timeline.map((t) => (
                  <li key={t.title} className="timeline-item">
                    <p className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-signal">
                      <ClockIcon className="h-3.5 w-3.5" />
                      {t.period}
                    </p>
                    <h3 className="mt-1.5 text-base font-semibold text-ink">{t.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{t.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        {/* principes */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {operator.principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <div className="panel h-full p-6">
                <p className="font-mono text-[10px] tracking-widest" style={{ color: "#3ce6a6" }}>
                  PRINCIPE-{String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-base font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 5. CANAL OUVERT ════════════════════════════════ */}
      <section id="canal" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 sm:px-6">
        <Reveal>
          <SectionHeading cmd="ping abdosrad" title="Canal ouvert" />
        </Reveal>
        <Reveal>
          <div className="panel flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="max-w-2xl leading-relaxed text-muted">
                Le meilleur point d&apos;entrée reste <span className="text-ink">GitHub</span> :
                issues, pull requests, historique de commits. Les dépôts parlent
                d&apos;eux-mêmes — ouvrez un ticket ou explorez le code directement.
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-wide text-muted">
                {"// Aucun code source n'est copié dans ce portfolio : chaque fiche pointe exclusivement vers son dépôt."}
              </p>
            </div>
            <a
              href="https://github.com/Abdosrad07"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex-none"
            >
              <GitHubIcon className="h-4 w-4" />
              GITHUB/ABDOSRAD07
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
