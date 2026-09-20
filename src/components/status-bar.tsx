"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GitHubIcon } from "@/components/icons";

const links = [
  { href: "/", label: "ACCUEIL" },
  { href: "/#projets", label: "PROJETS" },
  { href: "/#operateur", label: "OPÉRATEUR" },
  { href: "/#canal", label: "CANAL" },
];

export function StatusBar() {
  const [clock, setClock] = useState<string>("--:--:-- UTC");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const tick = () => {
      setClock(`${new Date().toISOString().slice(11, 19)} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-noir/90 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-xs tracking-widest"
          onClick={() => setOpen(false)}
        >
          <span className="text-signal led led-pulse" aria-hidden />
          <span className="text-ink transition-colors group-hover:text-signal">NOC://ABDOSRAD</span>
        </Link>

        <nav className="hidden items-center gap-5 font-mono text-[11px] tracking-widest text-muted md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-signal">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 font-mono text-[11px] tracking-wider text-muted">
          <span className="hidden sm:inline">{clock}</span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <span className="text-signal led" aria-hidden />
            SYS&nbsp;OK
          </span>
          <a
            href="https://github.com/Abdosrad07"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub d'Abdosrad07"
            className="hidden items-center gap-1.5 border border-line px-2 py-1 text-ink transition-colors hover:border-signal hover:text-signal sm:flex"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            GITHUB
          </a>

          {/* bouton menu mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-8 w-8 flex-col items-center justify-center gap-1 border border-line text-ink transition-colors hover:border-line2 md:hidden"
          >
            <span className={`h-px w-4 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      {/* panneau mobile */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-line bg-noir/95 backdrop-blur-sm transition-[max-height] duration-200 md:hidden ${
          open ? "max-h-64" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-3 sm:px-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-line/60 py-3 font-mono text-xs tracking-widest text-muted transition-colors last:border-0 hover:text-signal"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/Abdosrad07"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 py-3 font-mono text-xs tracking-widest text-signal"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            GITHUB ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
