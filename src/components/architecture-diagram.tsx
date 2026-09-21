"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ArchitectureLayer } from "@/data/projects";

/**
 * Diagramme d'architecture interactif.
 * — Sélection d'une couche → détails + connexions mises en évidence.
 * — Vue mobile (< md) : liste tapable, connexions listées en texte.
 * — Les lignes SVG sont recalculées après layout (getBoundingClientRect),
 *   au montage et à chaque redimensionnement.
 */
export function ArchitectureDiagram({
  layers,
  accent,
}: {
  layers: ArchitectureLayer[];
  accent: string;
}) {
  const [selected, setSelected] = useState(0);
  const [paths, setPaths] = useState<string[]>([]);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const connections = useMemo(() => {
    const conns: { from: number; to: number }[] = [];
    layers.forEach((l, i) => {
      l.connectsTo?.forEach((j) => {
        // une seule ligne par paire (i<j) même si déclarée deux fois
        if (!conns.some((c) => (c.from === i && c.to === j) || (c.from === j && c.to === i))) {
          conns.push({ from: Math.min(i, j), to: Math.max(i, j) });
        }
      });
    });
    return conns;
  }, [layers]);

  const measure = useCallback(() => {
    const svg = svgRef.current;
    if (!svg || !svg.clientWidth || !svg.clientHeight) return;
    const box = svg.getBoundingClientRect();
    const next = connections.map(({ from, to }) => {
      const a = nodeRefs.current[from]?.getBoundingClientRect();
      const b = nodeRefs.current[to]?.getBoundingClientRect();
      if (!a || !b) return "";
      const x1 = a.left + a.width / 2 - box.left;
      const y1 = a.top + a.height / 2 - box.top;
      const x2 = b.left + b.width / 2 - box.left;
      const y2 = b.top + b.height / 2 - box.top;
      const mx = (x1 + x2) / 2;
      return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
    });
    setPaths(next);
  }, [connections]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const isConnected = (i: number) => {
    const sel = connections.some(
      (c) => (c.from === selected && c.to === i) || (c.to === selected && c.from === i)
    );
    return i === selected || sel;
  };

  const connIdx = (from: number, to: number) =>
    connections.findIndex((c) => c.from === from && c.to === to);

  const selectedLayer = layers[selected];
  const selectedConns = layers.map((l, i) => ({ l, i })).filter(
    ({ i }) =>
      connections.some(
        (c) => (c.from === selected && c.to === i) || (c.to === selected && c.from === i)
      )
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
      {/* ── Diagramme / liste ──────────────────────────── */}
      <div className="relative min-h-[340px] rounded-lg border border-border bg-surface2/60 p-4 sm:p-6">
        {/* Desktop : couches empilées + connexions SVG */}
        <div className="hidden md:block">
          <svg
            ref={svgRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
          >
            {paths.map((d, i) => {
              const c = connections[i];
              const active = selected === c.from || selected === c.to;
              return (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={active ? accent : "var(--color-border)"}
                  strokeWidth={active ? 1.6 : 1}
                  strokeDasharray={active ? "none" : "3 4"}
                  opacity={active ? 0.9 : 0.5}
                  style={{ transition: "stroke 200ms, opacity 200ms" }}
                />
              );
            })}
          </svg>

          <div className="relative flex flex-col gap-3">
            {layers.map((l, i) => (
              <button
                key={l.layer}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
                className={`group relative rounded-md border px-4 py-3 text-left transition-all duration-200 ${
                  selected === i
                    ? "border-transparent bg-noir"
                    : isConnected(i)
                      ? "border-border2 bg-surface"
                      : "border-border bg-surface opacity-80 hover:opacity-100"
                }`}
                style={selected === i ? { borderColor: accent, boxShadow: `0 0 0 1px ${accent}33` } : undefined}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="flex h-6 w-6 flex-none items-center justify-center rounded border border-border bg-surface2 font-mono text-[10px]"
                    style={selected === i ? { color: accent, borderColor: `${accent}55` } : undefined}
                  >
                    L{i}
                  </span>
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      selected === i ? "text-ink" : "text-muted group-hover:text-ink"
                    }`}
                  >
                    {l.layer}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile : même liste, connexions indiquées en texte */}
        <div className="flex flex-col gap-2.5 md:hidden">
          {layers.map((l, i) => (
            <button
              key={l.layer}
              type="button"
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              className={`rounded-md border px-3.5 py-2.5 text-left transition-colors ${
                selected === i ? "bg-noir" : "bg-surface"
              }`}
              style={selected === i ? { borderColor: accent } : undefined}
            >
              <span className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 flex-none items-center justify-center rounded border border-border bg-surface2 font-mono text-[9px] text-muted">
                  L{i}
                </span>
                <span
                  className={`text-[13px] font-semibold ${selected === i ? "text-ink" : "text-muted"}`}
                >
                  {l.layer}
                </span>
              </span>
              {selected === i && (
                <span className="mt-2 block border-t border-line pt-2 font-mono text-[10.5px] leading-relaxed text-muted">
                  {selectedConns.length > 0
                    ? `↔ ${selectedConns.map(({ i: j }) => `L${j} ${shortLayer(layers[j].layer)}`).join(" · ")}`
                    : "couche terminale"}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Détail de la couche ────────────────────────── */}
      <aside
        className="flex flex-col rounded-lg border border-border bg-surface p-5 sm:p-6"
        aria-live="polite"
      >
        <p className="font-mono text-[10px] tracking-widest text-muted">
          COUCHE L{selected} — {String(selected + 1).padStart(2, "0")}/{String(layers.length).padStart(2, "0")}
        </p>
        <h3 className="mt-2 text-base font-semibold leading-snug text-ink">
          {selectedLayer.layer}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{selectedLayer.detail}</p>

        <div className="mt-auto pt-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Connexions</p>
          {selectedConns.length > 0 ? (
            <ul className="mt-2 space-y-1.5">
              {selectedConns.map(({ l, i }) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    className="flex w-full items-center gap-2 rounded border border-border bg-surface2 px-2.5 py-1.5 text-left font-mono text-[11px] text-muted transition-colors hover:border-border2 hover:text-ink"
                  >
                    <span style={{ color: accent }}>↔</span>
                    L{i} — {shortLayer(l.layer)}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 font-mono text-[11px] text-muted">
              couche terminale du flux
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

/** Raccourcit un libellé de couche pour les listes compactes. */
function shortLayer(layer: string): string {
  const idx = layer.indexOf("—");
  return (idx > 0 ? layer.slice(0, idx) : layer).trim();
}
