import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import type { Project } from "@/data/projects";

/**
 * Carte du projet — cliquable en entier, hover sobre.
 * Les % ont disparu : place aux faits (stack, rôle, activité du dépôt).
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group panel block h-full overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-line2 hover:shadow-[0_18px_50px_-24px_rgba(60,230,166,0.25)]"
      aria-label={`Ouvrir la fiche du projet ${project.title}`}
    >
      {/* bandeau canal */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
        <span className="font-mono text-[11px] tracking-widest text-muted">
          {project.channel} · {project.title.toUpperCase()}
        </span>
        <span
          className="flex items-center gap-2 font-mono text-[10px] tracking-widest"
          style={{ color: project.accent }}
        >
          <i className="led led-pulse" aria-hidden />
          {project.statusLevel === "prototype" ? "PROTO" : "ACTIF"}
        </span>
      </div>

      <div className="px-5 py-5">
        <p className="font-mono text-[10px] tracking-widest" style={{ color: project.accent }}>
          {project.category}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-signal">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.shortDescription}</p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 px-5 pb-4">
        {project.technologies.slice(0, 4).map((t) => (
          <span
            key={t}
            className="border border-line bg-panel2 px-2 py-0.5 font-mono text-[10px] tracking-wider text-muted"
          >
            {t}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="font-mono text-[10px] text-muted">
            +{project.technologies.length - 4}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3">
        <span className="font-mono text-[10px] tracking-widest text-muted">
          {project.repoStats.join(" · ").toUpperCase()}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-signal opacity-0 transition-opacity duration-200 group-hover:opacity-100 max-sm:opacity-100">
          TRACER
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
