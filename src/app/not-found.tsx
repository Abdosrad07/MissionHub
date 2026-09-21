import Link from "next/link";
import { Terminal } from "@/components/terminal";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center px-4 pt-24 sm:px-6">
      <Terminal title="abdosrad — route inconnue">
        <div className="space-y-1.5 font-mono text-[13px] leading-relaxed">
          <p className="text-muted">$ traceroute --host {`<page>`}</p>
          <p className="text-alert">
            ! Destination unreachable — aucune route vers cette ressource.
          </p>
          <p className="text-muted">
            Le signal existe, mais pas à cette adresse. Retour au point
            d&apos;accès :
          </p>
          <p className="caret pt-1 text-signal">$&nbsp;</p>
        </div>
      </Terminal>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="border border-signal bg-signal/10 px-5 py-2.5 font-mono text-xs tracking-widest text-signal transition-colors hover:bg-signal hover:text-noir"
        >
          ← RETOUR À L&apos;ACCUEIL
        </Link>
        <Link
          href="/projects"
          className="border border-border px-5 py-2.5 font-mono text-xs tracking-widest text-muted transition-colors hover:border-border2 hover:text-ink"
        >
          INDEX DES PROJETS
        </Link>
      </div>
    </main>
  );
}
