import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { Reveal } from "@/components/reveal";
import { SectionHeading, Terminal, Waveform } from "@/components/terminal";
import {
  ArrowUpRight,
  CameraIcon,
  GitHubIcon,
  PlayIcon,
} from "@/components/icons";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

const statusColor: Record<string, string> = {
  live: "#00e5c7",
  active: "#00e5c7",
  prototype: "#60a5fa",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const featured = project.media[0];

  return (
    <main>
      {/* ══ HERO ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 sm:pt-32">
        <nav
          aria-label="Fil d'ariane"
          className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-widest text-muted"
        >
          <Link href="/" className="transition-colors hover:text-signal">
            ACCUEIL
          </Link>
          <span aria-hidden>/</span>
          <Link href="/projects" className="transition-colors hover:text-signal">
            PROJETS
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{project.title.toUpperCase()}</span>
        </nav>

        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-widest">
              <span className="border border-border px-2 py-1 text-muted">
                {project.channel}
              </span>
              <span
                className="flex items-center gap-2 px-2 py-1"
                style={{ color: statusColor[project.statusLevel] }}
              >
                <i className="led led-pulse" aria-hidden />
                {project.statusLabel.toUpperCase()}
              </span>
            </div>

            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {project.title}
              {project.repoAlias && (
                <span className="ml-3 align-middle font-mono text-sm font-normal text-muted">
                  ({project.repoAlias})
                </span>
              )}
            </h1>

            <p
              className="mt-3 font-mono text-xs tracking-widest"
              style={{ color: project.accent }}
            >
              {project.category}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {project.tagline}
            </p>

            <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              <div className="bg-surface p-4">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Contexte
                </dt>
                <dd className="mt-1.5 text-sm text-ink">{project.context}</dd>
              </div>
              <div className="bg-surface p-4">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Mon rôle
                </dt>
                <dd className="mt-1.5 text-sm text-ink">{project.role}</dd>
              </div>
            </dl>

            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] tracking-wide text-muted">
              {project.repoStats.map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  {i > 0 && (
                    <span aria-hidden className="text-border2">
                      ·
                    </span>
                  )}
                  {s}
                </span>
              ))}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <GitHubIcon className="h-4 w-4" />
                VOIR LE CODE
                <ArrowUpRight className="h-4 w-4" />
              </a>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent btn-lg"
                  style={{ color: project.accent }}
                >
                  DÉMO LIVE
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Featured media */}
          <div>
            {featured ? (
              <figure className="media-frame scanline">
                {featured.kind === "video" ? (
                  <video
                    src={featured.src}
                    controls
                    preload="metadata"
                    playsInline
                  />
                ) : (
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={featured.src}
                      alt={featured.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                )}
                <figcaption className="flex items-center justify-between gap-3 font-mono text-[11px] tracking-wide text-muted">
                  <span className="flex items-center gap-2">
                    {featured.kind === "video" ? (
                      <PlayIcon
                        className="h-3.5 w-3.5"
                        style={{ color: project.accent }}
                      />
                    ) : (
                      <CameraIcon
                        className="h-3.5 w-3.5"
                        style={{ color: project.accent }}
                      />
                    )}
                    {featured.caption}
                  </span>
                  <span className="flex-none font-mono text-[9.5px] tracking-widest">
                    CAPTURE RÉELLE
                  </span>
                </figcaption>
              </figure>
            ) : (
              <Terminal title={`${project.slug} — monitoring`} className="scanline">
                <div className="space-y-4">
                  <div className="h-12">
                    <Waveform bars={36} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="border border-border bg-surface2 p-3">
                        <p
                          className="font-mono text-xl font-semibold"
                          style={{ color: project.accent }}
                        >
                          {m.value}
                        </p>
                        <p className="mt-1 font-mono text-[9.5px] uppercase leading-snug tracking-wider text-muted">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-2 font-mono text-[11px] leading-relaxed text-muted">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span style={{ color: project.accent }}>▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Terminal>
            )}
          </div>
        </div>
      </section>

      {/* ══ FULL DESCRIPTION ═══════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <SectionHeading cmd={`man ${project.slug}`} title="Le projet" />
        </Reveal>
        <Reveal>
          <div className="panel space-y-5 p-6 sm:p-8">
            {project.fullDescription.map((para) => (
              <p key={para} className="text-[15px] leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ PROBLEM ════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <SectionHeading
            cmd={`grep -n "probleme" ${project.slug}.log`}
            title="Le problème"
          />
        </Reveal>
        <Reveal>
          <div className="panel divide-y divide-border">
            {project.problem.map((p, i) => (
              <div key={p} className="flex gap-4 px-6 py-4">
                <span className="font-mono text-xs text-alert">P{i + 1}</span>
                <p className="text-sm leading-relaxed text-muted">{p}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ SOLUTION ═══════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <SectionHeading
            cmd={`./${project.slug} --mode solution`}
            title="La solution"
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {project.solution.map((s, i) => (
            <Reveal key={s} delay={i * 70}>
              <div className="panel h-full p-5">
                <p
                  className="font-mono text-[11px] tracking-widest"
                  style={{ color: project.accent }}
                >
                  S{i + 1}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ═══════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <SectionHeading cmd="cat features.md" title="Fonctionnalités" />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {project.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 2) * 60}>
              <div className="panel h-full p-5">
                <div className="flex items-center gap-2">
                  <i className="led" style={{ color: project.accent }} aria-hidden />
                  <h3 className="text-sm font-semibold text-ink">{f.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ ARCHITECTURE ═══════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <SectionHeading
            cmd={`trace --layers ${project.slug}`}
            title="Architecture"
          />
        </Reveal>
        <Reveal>
          <p className="mb-5 max-w-2xl font-mono text-[11px] leading-relaxed tracking-wide text-muted">
            {"// Interactif : sélectionnez une couche pour voir ses connexions."}
          </p>
          <ArchitectureDiagram
            layers={project.architecture}
            accent={project.accent}
          />
        </Reveal>
      </section>

      {/* ══ TECHNOLOGIES ═══════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <SectionHeading cmd="dpkg --list" title="Technologies" />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.stack.map((g, i) => (
            <Reveal key={g.label} delay={(i % 3) * 60}>
              <div className="panel h-full p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {g.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((t) => (
                    <span key={t} className="skill-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ MEDIA GALLERY ══════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <SectionHeading cmd="open ./captures" title="Captures" />
        </Reveal>
        {project.media.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {project.media.map((m, i) => (
              <Reveal key={m.src} delay={(i % 2) * 60}>
                <figure className="media-frame h-full">
                  {m.kind === "video" ? (
                    <video
                      src={m.src}
                      controls
                      preload="metadata"
                      playsInline
                    />
                  ) : (
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={m.src}
                        alt={m.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <figcaption className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-muted">
                    {m.kind === "video" ? (
                      <PlayIcon
                        className="h-3.5 w-3.5 flex-none"
                        style={{ color: project.accent }}
                      />
                    ) : (
                      <CameraIcon
                        className="h-3.5 w-3.5 flex-none"
                        style={{ color: project.accent }}
                      />
                    )}
                    {m.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="panel flex flex-col items-center gap-2 px-6 py-10 text-center">
            <p className="font-mono text-[11px] tracking-widest text-warn">
              [ NO-CAPTURE ]
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              {project.mediaNote}
            </p>
          </div>
        )}
      </section>

      {/* ══ SKILLS LEARNED ═════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <SectionHeading cmd="tail -f competences.log" title="Ce que j&apos;ai appris" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {project.skills.map((s, i) => (
            <Reveal key={s} delay={(i % 3) * 60}>
              <div className="panel h-full p-5">
                <p
                  className="font-mono text-[11px] tracking-widest"
                  style={{ color: project.accent }}
                >
                  SKILL-{String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ VERDICT ════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <SectionHeading
            cmd="audit --honest"
            title="Ce que le dépôt montre — et ne montre pas"
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="panel h-full p-6">
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-signal">
                <i className="led" aria-hidden />
                CE QUE LE DÉPÔT MONTRE
              </p>
              <ul className="mt-4 space-y-3">
                {project.verdict.repoShows.map((v) => (
                  <li
                    key={v}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-0.5 flex-none text-signal" aria-hidden>
                      ✓
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="panel h-full p-6">
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-warn">
                <i className="led" aria-hidden />
                CE QU&apos;IL NE MONTRE PAS
              </p>
              <ul className="mt-4 space-y-3">
                {project.verdict.notShown.map((v) => (
                  <li
                    key={v}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-0.5 flex-none text-warn" aria-hidden>
                      —
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ LINKS ══════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <SectionHeading
            cmd="netstat -tlnp | grep abdosrad"
            title="Liens"
          />
        </Reveal>
        <Reveal>
          <div className="panel divide-y divide-border">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-surface2"
            >
              <div className="flex items-center gap-3">
                <GitHubIcon className="h-5 w-5 flex-none text-signal" />
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Dépôt GitHub — {project.title}
                  </p>
                  <p className="font-mono text-[11px] text-muted">
                    {project.githubUrl}
                  </p>
                </div>
              </div>
              <span className="flex flex-none items-center gap-1.5 font-mono text-[11px] tracking-widest text-signal">
                OUVRIR
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
            {project.docsLinks?.map((d) => (
              <a
                key={d.url}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-surface2"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">{d.label}</p>
                  <p className="truncate font-mono text-[11px] text-muted">
                    {d.url}
                  </p>
                </div>
                <span className="flex flex-none items-center gap-1.5 font-mono text-[11px] tracking-widest text-freq">
                  OUVRIR
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ NAVIGATION ═════════════════════════════════════ */}
      <nav
        className="mx-auto mt-24 max-w-6xl px-4 sm:px-6"
        aria-label="Autres projets"
      >
        <Link
          href="/projects"
          className="mb-5 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-muted transition-colors hover:text-signal"
        >
          ← RETOUR À L&apos;INDEX
        </Link>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { p: prev, label: "PRÉCÉDENT" },
            { p: next, label: "SUIVANT" },
          ].map(({ p, label }) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="panel group px-5 py-4 transition-colors hover:border-border2"
            >
              <p className="font-mono text-[10px] tracking-widest text-muted">
                {label} · {p.channel}
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-ink transition-colors group-hover:text-signal">
                {label === "PRÉCÉDENT" ? "← " : ""}
                {p.title}
                {label === "SUIVANT" ? " →" : ""}
              </p>
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}
