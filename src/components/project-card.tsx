import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import type { Project } from "@/data/projects";

/**
 * Editorial project card — immersive, not a grid card.
 * Each project gets its own visual identity within the same universe.
 */
export function ProjectCard({ project }: { project: Project }) {
  const featured = project.media[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group project-editorial block"
      aria-label={`Ouvrir la fiche du projet ${project.title}`}
    >
      {/* Visual header */}
      <div className="relative overflow-hidden bg-surface2">
        {featured ? (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={featured.src}
              alt={featured.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="flex aspect-[16/9] items-center justify-center bg-surface2">
            <div className="w-2/3 opacity-20">
              <div className="wave h-16">
                {Array.from({ length: 32 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      height: `${28 + Math.abs(Math.sin(i * 1.7)) * 62}%`,
                      animationDelay: `${(i % 9) * 0.12}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Channel badge */}
        <span className="media-badge">
          {project.channel} · {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span
            className="flex items-center gap-2 font-mono text-[10px] tracking-widest"
            style={{ color: project.accent }}
          >
            <i className="led led-pulse" aria-hidden />
            {project.statusLabel.toUpperCase()}
          </span>
          <span className="font-mono text-[10px] tracking-widest text-muted">
            {project.timeframe}
          </span>
        </div>

        <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-signal">
          {project.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
          {project.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((t) => (
            <span key={t} className="skill-tag">
              {t}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="font-mono text-[10px] text-muted">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="font-mono text-[10px] tracking-widest text-muted">
            {project.repoStats.join(" · ").toUpperCase()}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-signal opacity-0 transition-opacity duration-200 group-hover:opacity-100 max-sm:opacity-100">
            EXPLORER
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
