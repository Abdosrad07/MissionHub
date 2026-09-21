import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading, Waveform } from "@/components/terminal";
import {
  ArrowUpRight,
  CameraIcon,
  GitHubIcon,
  PlayIcon,
} from "@/components/icons";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const featured = project.media[0];

  return (
    <Reveal delay={index * 80}>
      <Link href={`/projects/${project.slug}`} className="group block">
        <article className="project-editorial">
          <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
            {/* Media side */}
            <div className="relative overflow-hidden bg-surface2">
              {featured ? (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={featured.src}
                    alt={featured.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/40 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center">
                  <div className="w-3/4 opacity-20">
                    <Waveform bars={48} />
                  </div>
                </div>
              )}
              <span className="media-badge">
                {featured?.kind === "video" ? (
                  <PlayIcon className="h-2.5 w-2.5" />
                ) : (
                  <CameraIcon className="h-2.5 w-2.5" />
                )}
                {featured ? featured.caption : "AUCUN CAPTURE"}
              </span>
            </div>

            {/* Info side */}
            <div className="flex flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-widest">
                  <span className="text-muted">{project.channel}</span>
                  <span
                    className="flex items-center gap-2"
                    style={{ color: project.accent }}
                  >
                    <i className="led led-pulse" aria-hidden />
                    {project.statusLabel.toUpperCase()}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-signal sm:text-3xl">
                  {project.title}
                  {project.repoAlias && (
                    <span className="ml-2 font-mono text-sm font-normal text-muted">
                      ({project.repoAlias})
                    </span>
                  )}
                </h2>

                <p
                  className="mt-2 font-mono text-[11px] tracking-widest"
                  style={{ color: project.accent }}
                >
                  {project.category}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  {project.tagline}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 6).map((t) => (
                    <span key={t} className="skill-tag">
                      {t}
                    </span>
                  ))}
                  {project.technologies.length > 6 && (
                    <span className="font-mono text-[10px] text-muted">
                      +{project.technologies.length - 6}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted">
                  {project.repoStats.join(" · ").toUpperCase()}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-signal opacity-0 transition-opacity duration-200 group-hover:opacity-100 max-sm:opacity-100">
                  EXPLORER
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}

export const metadata = {
  title: "Projets",
  description:
    "Index des projets d'Abdourahim — AgriPilote, VoiceOps, PiMarket, FarmNavigator.",
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 sm:pt-36">
        <nav
          aria-label="Fil d'ariane"
          className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-widest text-muted"
        >
          <Link href="/" className="transition-colors hover:text-signal">
            ACCUEIL
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink">PROJETS</span>
        </nav>

        <Reveal>
          <div className="mt-8 max-w-2xl">
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Les <span className="text-signal">projets</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Quatre projets réels, quatre dépôts ouverts. Chaque fiche est
              générée depuis l&apos;analyse réelle du dépôt — README, structure,
              historique git, assets. Aucune information inventée.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 space-y-6">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>

        <Reveal>
          <div className="mt-16 panel flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                Le meilleur point d&apos;entrée reste{" "}
                <span className="text-ink">GitHub</span> : issues, pull requests,
                historique de commits. Les dépôts parlent d&apos;eux-mêmes.
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
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
