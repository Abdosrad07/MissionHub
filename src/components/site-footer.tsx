import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="font-mono text-xs leading-relaxed text-muted">
          <p className="text-ink">
            NOC://ABDOSRAD <span className="text-signal">— signal stable</span>
          </p>
          <p>Portfolio statique · Next.js + Tailwind CSS · aucune donnée collectée</p>
          <p>© 2026 Abdosrad — tous les projets restent sur leurs dépôts GitHub.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] tracking-widest">
          <Link href="/" className="text-muted transition-colors hover:text-signal">
            ACCUEIL
          </Link>
          <Link href="/#projets" className="text-muted transition-colors hover:text-signal">
            PROJETS
          </Link>
          <Link href="/#operateur" className="text-muted transition-colors hover:text-signal">
            OPÉRATEUR
          </Link>
          <a
            href="https://github.com/Abdosrad07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-signal"
          >
            GITHUB ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
