import Link from "next/link";
import Image from "next/image";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading, Waveform } from "@/components/terminal";
import { SignalNode } from "@/components/signal-node";
import { PhotoFrame } from "@/components/photo-frame";
import { SkillMap } from "@/components/skill-map";
import { ArrowUpRight, GitHubIcon } from "@/components/icons";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <main>
      {/* ════════════════════════════════════════════════════
          1. HERO — THE PERSON AT THE CENTER
         ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Subtle radial glow behind the photo */}
        <div className="pointer-events-none absolute left-1/2 top-32 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-signal/[0.04] blur-[120px] max-lg:hidden" />

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-36 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
          <div>
            <Reveal>
              <p className="font-mono text-xs tracking-widest text-signal">
                ÉTUDIANT INGÉNIEUR · TÉLÉCOMMUNICATIONS
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                <span className="text-ink">Abdourahim</span>
                <br />
                <span className="text-muted text-[0.65em]">
                  Construit l&apos;ingénieur
                </span>
                <br />
                <span className="text-signal">qu&apos;il veut devenir.</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Étudiant en télécommunications à{" "}
                <span className="text-ink">SUP&apos;PTIC Yaoundé</span>.
                Mon parcours va des réseaux au cloud — en passant par le
                software, l&apos;automatisation et l&apos;IA.
              </p>
            </Reveal>

            {/* Progression chain — the signal path */}
            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-wider">
                {[
                  { label: "NETWORK", color: "#00e5c7" },
                  { label: "LINUX", color: "#34d399" },
                  { label: "PYTHON", color: "#60a5fa" },
                  { label: "AUTOMATION", color: "#f59e0b" },
                  { label: "AI", color: "#f472b6" },
                  { label: "CLOUD", color: "#a78bfa" },
                ].map((item, i, arr) => (
                  <span key={item.label} className="flex items-center gap-2">
                    <span style={{ color: item.color }}>{item.label}</span>
                    {i < arr.length - 1 && (
                      <span className="text-border2">→</span>
                    )}
                  </span>
                ))}
                <span className="ml-1 flex items-center gap-2">
                  <span className="text-border2">→</span>
                  <span className="font-semibold text-signal">NETDEVOPS</span>
                </span>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/projects" className="btn btn-primary">
                  VOIR LES PROJETS
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GITHUB
                </a>
              </div>
            </Reveal>
          </div>

          {/* Hero photo — integrated as a network node */}
          <Reveal delay={100}>
            <div className="relative mt-12 flex justify-center lg:mt-0">
              {/* Orbital rings */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
                <div className="hero-orbit hero-orbit-1" />
                <div className="hero-orbit hero-orbit-2" />
                <div className="hero-orbit hero-orbit-3" />
              </div>

              {/* Connection lines radiating from photo */}
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <svg className="h-full w-full" viewBox="0 0 400 400" fill="none">
                  <line x1="200" y1="80" x2="200" y2="0" stroke="var(--color-signal)" strokeOpacity="0.15" strokeWidth="1" />
                  <line x1="200" y1="320" x2="200" y2="400" stroke="var(--color-signal)" strokeOpacity="0.15" strokeWidth="1" />
                  <line x1="80" y1="200" x2="0" y2="200" stroke="var(--color-freq)" strokeOpacity="0.12" strokeWidth="1" />
                  <line x1="320" y1="200" x2="400" y2="200" stroke="var(--color-freq)" strokeOpacity="0.12" strokeWidth="1" />
                  <line x1="115" y1="115" x2="30" y2="30" stroke="var(--color-warn)" strokeOpacity="0.08" strokeWidth="1" />
                  <line x1="285" y1="285" x2="370" y2="370" stroke="var(--color-warn)" strokeOpacity="0.08" strokeWidth="1" />
                  {/* Small node dots at endpoints */}
                  <circle cx="200" cy="0" r="3" fill="var(--color-signal)" fillOpacity="0.4" />
                  <circle cx="200" cy="400" r="3" fill="var(--color-signal)" fillOpacity="0.4" />
                  <circle cx="0" cy="200" r="3" fill="var(--color-freq)" fillOpacity="0.3" />
                  <circle cx="400" cy="200" r="3" fill="var(--color-freq)" fillOpacity="0.3" />
                  <circle cx="30" cy="30" r="2.5" fill="var(--color-warn)" fillOpacity="0.3" />
                  <circle cx="370" cy="370" r="2.5" fill="var(--color-warn)" fillOpacity="0.3" />
                </svg>
              </div>

              {/* Central node — the photo */}
              <div className="hero-photo-node">
                <Image
                  src="/photos_abdourahim/IMG_20260813_070943.jpg"
                  alt="Abdourahim devant un baie de serveurs réseau"
                  fill
                  sizes="(max-width: 1024px) 260px, 300px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Node label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-surface/90 px-4 py-2 font-mono text-[10px] tracking-widest text-muted backdrop-blur-sm">
                YAOUNDÉ · SUP&apos;PTIC · RÉSEAU
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. STATS — VERIFIABLE FACTS
         ════════════════════════════════════════════════════ */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-border px-4 sm:px-6">
          {[
            { value: String(profile.stats.projects), label: "PROJETS LIVRÉS", color: "#00e5c7" },
            { value: profile.stats.commits, label: "COMMITS DOCUMENTÉS", color: "#60a5fa" },
            { value: String(profile.stats.hackathons), label: "HACKATHONS", color: "#f59e0b" },
          ].map((s) => (
            <div key={s.label} className="px-2 py-6 text-center sm:px-6 sm:py-8">
              <p className="stat-value" style={{ color: s.color }}>
                {s.value}
              </p>
              <p className="mt-2 font-mono text-[10px] tracking-widest text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. ORIGIN — WHERE IT ALL BEGAN
         ════════════════════════════════════════════════════ */}
      <section id="origine" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 sm:px-6">
        <Reveal>
          <SectionHeading label="ORIGINE" title="L'origine" />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                Tout a commencé par un{" "}
                <span className="text-ink font-medium">Baccalauréat C</span> —
                mathématiques, physique, chimie. Le socle scientifique qui ouvre
                la voie aux télécommunications.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Puis{" "}
                <span className="text-ink font-medium">SUP&apos;PTIC Yaoundé</span> —
                l&apos;entrée dans le monde des réseaux. TCP/IP, adressage,
                subnetting, les couches du modèle OSI. Le début d&apos;une
                construction.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {profile.technicalFoundation.networking.slice(0, 6).map((s) => (
                  <span key={s} className="skill-tag skill-tag-signal">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative">
              <PhotoFrame
                src={profile.photos[1].src}
                alt={profile.photos[1].alt}
                className="mx-auto max-w-sm"
              />
              <div className="absolute -bottom-4 -right-4 rounded-lg border border-border bg-surface px-4 py-2 font-mono text-[10px] tracking-widest text-muted sm:right-4">
                YAOUNDÉ · SUP&apos;PTIC
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. JOURNEY — THE SIGNAL PATH
         ════════════════════════════════════════════════════ */}
      <section id="parcours" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 sm:px-6">
        <Reveal>
          <SectionHeading label="PARCOURS" title="Le parcours" />
        </Reveal>

        <Reveal>
          <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Chaque étape est un nœud dans un réseau qui s&apos;étend. Le signal
            traverse les couches — des télécommunications au cloud, en passant
            par les réseaux, le software, l&apos;automatisation et l&apos;IA.
          </p>
        </Reveal>

        <div className="relative">
          {/* Vertical signal line */}
          <div className="absolute left-[1.25rem] top-0 bottom-0 w-px bg-gradient-to-b from-signal/40 via-freq/30 to-phase-horizon/30" />

          <div className="space-y-8">
            {profile.journey.map((step, i) => (
              <Reveal key={step.id} delay={i * 50}>
                <SignalNode
                  phase={step.phase}
                  period={step.period}
                  title={step.title}
                  detail={step.detail}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. PROJECTS — STEPS IN MY EVOLUTION
         ════════════════════════════════════════════════════ */}
      <section id="projets" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 sm:px-6">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading label="PROJETS" title="Les projets" />
            <Link
              href="/projects"
              className="mb-1 hidden items-center gap-1.5 font-mono text-[11px] tracking-widest text-signal transition-colors hover:text-glow sm:flex"
            >
              TOUS LES PROJETS
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Chaque projet est une étape de mon évolution. Pas des cartes
            isolées — des nœuds connectés qui construisent progressivement mon
            profil.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-6 font-mono text-[11px] leading-relaxed tracking-wide text-muted">
            {"// Chaque fiche est générée depuis l'analyse réelle du dépôt correspondant. Aucune information inventée."}
          </p>
        </Reveal>
      </section>

      {/* ════════════════════════════════════════════════════
          6. VOICEOPS — THE CONVERGENCE MOMENT
         ════════════════════════════════════════════════════ */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <SectionHeading label="CONVERGENCE" title="VoiceOps" />
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <div>
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  VoiceOps représente un moment de convergence dans mon
                  parcours.{" "}
                  <span className="text-ink">
                    Network + Python + AI + Voice + Automation + Software
                  </span>{" "}
                  — tout se connecte dans un seul projet.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                  Un assistant vocal qui diagnostic les problèmes réseau. Pas
                  une démo technique — une vision de la direction vers laquelle
                  je me dirige :{" "}
                  <span className="text-signal">
                    des opérations réseau de plus en plus automatisées et
                    intelligentes.
                  </span>
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Voice AI", "Tool calling", "RAG", "FastAPI", "AssemblyAI", "Automation"].map((s) => (
                    <span key={s} className="skill-tag skill-tag-signal">
                      {s}
                    </span>
                  ))}
                </div>

                <p className="mt-6 font-mono text-[11px] leading-relaxed tracking-wide text-muted">
                  {"// Pas une expertise professionnelle déjà acquise — une direction en construction."}
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="relative">
                <PhotoFrame
                  src={profile.photos[2].src}
                  alt={profile.photos[2].alt}
                  className="mx-auto max-w-sm"
                  aspect="4/5"
                />
                <div className="absolute -bottom-4 left-4 rounded-lg border border-border bg-surface px-4 py-2 font-mono text-[10px] tracking-widest text-muted sm:left-auto sm:right-4">
                  CONVERGENCE · EN CONSTRUCTION
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          7. SKILLS — COMPETENCE MAP
         ════════════════════════════════════════════════════ */}
      <section id="competences" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 sm:px-6">
        <Reveal>
          <SectionHeading label="COMPÉTENCES" title="Ce que je maîtrise" />
        </Reveal>

        <Reveal>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Pas de barres de pourcentage. Chaque technologie est classée selon
            ce que mon parcours permet réellement de présenter.
          </p>
        </Reveal>

        <SkillMap
          categories={[
            {
              label: "Networking",
              phase: "solid",
              items: profile.skills.solid,
            },
            {
              label: "Programming",
              phase: "practical",
              items: profile.skills.practical,
            },
            {
              label: "DevOps & Cloud",
              phase: "learning",
              items: profile.skills.learning,
            },
            {
              label: "NetDevOps",
              phase: "future",
              items: profile.skills.future,
            },
          ]}
        />

        {/* Technical foundation pillars */}
        <Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Linux",
                detail: profile.technicalFoundation.linux.slice(0, 4).join(" · "),
                color: "#00e5c7",
              },
              {
                title: "Python",
                detail: profile.technicalFoundation.python.slice(0, 4).join(" · "),
                color: "#60a5fa",
              },
              {
                title: "Réseaux",
                detail: profile.technicalFoundation.networking.slice(0, 4).join(" · "),
                color: "#f59e0b",
              },
            ].map((pillar) => (
              <div key={pillar.title} className="panel p-5">
                <p
                  className="font-mono text-[11px] tracking-widest"
                  style={{ color: pillar.color }}
                >
                  {pillar.title.toUpperCase()}
                </p>
                <p className="mt-2 text-sm text-muted">{pillar.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ════════════════════════════════════════════════════
          8. CERTIFICATIONS
         ════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <Reveal>
          <SectionHeading label="CERTIFICATIONS" title="Certifications" />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {profile.certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 60}>
              <div className="panel h-full p-5">
                <div className="flex items-center gap-2">
                  <i className="led text-signal" aria-hidden />
                  <p className="font-mono text-[11px] tracking-widest text-signal">
                    {cert.provider.toUpperCase()}
                  </p>
                </div>
                <h3 className="mt-2 font-display text-base font-semibold text-ink">
                  {cert.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {cert.significance}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          9. HACKATHONS — MOMENTS OF LEARNING
         ════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <Reveal>
          <SectionHeading label="HACKATHONS" title="Hackathons" />
        </Reveal>

        <Reveal>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Chaque hackathon est un moment où j&apos;apprends à construire
            rapidement, à résoudre des problèmes sous contrainte et à
            transformer une idée en prototype.
          </p>
        </Reveal>

        <div className="space-y-4">
          {profile.hackathons.map((h, i) => (
            <Reveal key={h.name} delay={i * 60}>
              <div className="panel flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-ink">
                      {h.name}
                    </h3>
                    {h.ongoing && (
                      <span className="phase-badge phase-learning">
                        EN COURS
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-[10px] tracking-widest text-muted">
                    {h.year} · PROJET : {h.project}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {h.detail}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {h.skills.map((s) => (
                      <span key={s} className="skill-tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          10. CURRENTLY — SYSTEM IN MOTION
         ════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <Reveal>
          <SectionHeading
            label="EN CE MOMENT"
            title="Ce que j'apprends"
          />
        </Reveal>

        <Reveal>
          <div className="panel p-6 sm:p-8">
            <p className="font-mono text-[11px] tracking-widest text-signal">
              {"// SYSTÈME EN MOUVEMENT — apprentissages actuels"}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.currentlyLearning.map((item) => (
                <span key={item} className="skill-tag skill-tag-signal">
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
              Mon parcours n&apos;est pas terminé. Chaque technologie ci-dessus
              est un nœud en cours de connexion — certaines sont déjà actives
              dans mes projets, d&apos;autres sont en train de se construire.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ════════════════════════════════════════════════════
          11. DIRECTION — NETDEVOPS × CLOUD
         ════════════════════════════════════════════════════ */}
      <section id="direction" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 sm:px-6">
        <Reveal>
          <SectionHeading label="DIRECTION" title="La direction" />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div>
              <h3 className="font-display text-2xl font-bold text-ink">
                NetDevOps <span className="text-signal">×</span> Cloud
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Les différentes briques de mon parcours convergent vers un
                profil hybride : un ingénieur qui comprend l&apos;infrastructure
                et qui sait la programmer, l&apos;automatiser et
                progressivement l&apos;intégrer aux environnements Cloud.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  { label: "NETWORK", color: "#00e5c7" },
                  { label: "+ LINUX", color: "#34d399" },
                  { label: "+ PYTHON", color: "#60a5fa" },
                  { label: "+ AUTOMATION", color: "#f59e0b" },
                  { label: "+ DEVOPS", color: "#a78bfa" },
                  { label: "+ CLOUD", color: "#60a5fa" },
                  { label: "+ AI", color: "#f472b6" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span
                      className="h-px flex-none"
                      style={{
                        width: "2rem",
                        background: item.color,
                        opacity: 0.6,
                      }}
                    />
                    <span
                      className="font-mono text-sm tracking-wider"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-3 pt-2">
                  <span className="h-0.5 flex-none bg-signal" style={{ width: "2rem" }} />
                  <span className="font-display text-lg font-bold text-signal">
                    → NetDevOps
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative">
              <PhotoFrame
                src={profile.photos[3].src}
                alt={profile.photos[3].alt}
                className="mx-auto max-w-sm"
                aspect="3/4"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          12. INTERNATIONAL HORIZON
         ════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <Reveal>
          <SectionHeading label="HORIZON" title="Horizon international" />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                Je souhaite progressivement découvrir et travailler dans
                différents environnements techniques. Pas pour voyager — pour
                apprendre, rencontrer, et construire une vision plus large de
                l&apos;ingénierie.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {profile.internationalAspirations.countries.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3"
                  >
                    <span className="text-2xl">{c.flag}</span>
                    <span className="font-mono text-sm text-ink">{c.name}</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-sm text-muted">
                + opportunités remote — travail à distance, missions techniques,
                collaboration internationale.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="panel p-6">
              <p className="font-mono text-[11px] tracking-widest text-signal">
                {"// OBJECTIFS D'EXPÉRIENCE"}
              </p>
              <ul className="mt-4 space-y-3">
                {profile.internationalAspirations.goals.map((g) => (
                  <li
                    key={g}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-signal/50" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          13. SOFT SKILLS
         ════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <Reveal>
          <SectionHeading label="QUALITÉS" title="Qualités" />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.softSkills.map((qs, i) => (
            <Reveal key={qs.name} delay={i * 50}>
              <div className="panel h-full p-5">
                <h3 className="font-display text-base font-semibold text-ink">
                  {qs.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {qs.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          14. DREAMS
         ════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <Reveal>
          <SectionHeading label="RÊVES" title="Mes rêves" />
        </Reveal>

        <Reveal>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Pas de discours motivationnel générique. Ce que je veux construire,
            explorer et devenir.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.dreams.map((d, i) => (
            <Reveal key={d.title} delay={i * 50}>
              <div className="dream-card h-full">
                <h3 className="font-display text-base font-semibold text-ink">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {d.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          15. PHOTOS — HUMAN MOMENTS
         ════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <Reveal>
          <SectionHeading label="MOMENTS" title="Quelques moments" />
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {profile.photos.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 60}>
              <PhotoFrame
                src={photo.src}
                alt={photo.alt}
                aspect={i % 3 === 0 ? "3/4" : "4/3"}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          16. CONTACT — OPEN CHANNEL
         ════════════════════════════════════════════════════ */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 pb-12 sm:px-6">
        <Reveal>
          <SectionHeading label="CONTACT" title="Canal ouvert" />
        </Reveal>

        <Reveal>
          <div className="panel overflow-hidden">
            <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  Le meilleur point d&apos;entrée reste{" "}
                  <span className="text-ink">GitHub</span> : issues, pull
                  requests, historique de commits. Les dépôts parlent
                  d&apos;eux-mêmes.
                </p>
                <p className="mt-3 font-mono text-[11px] tracking-wide text-muted">
                  {"// Aucun code source n'est copié dans ce portfolio : chaque fiche pointe vers son dépôt."}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GITHUB
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link href="/projects" className="btn btn-ghost">
                  INDEX DES PROJETS
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="border-t border-border bg-surface2/50 px-8 py-3">
              <div className="h-8">
                <Waveform bars={64} />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
