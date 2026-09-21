"use client";

import type { ReactNode } from "react";

type Phase = "acquis" | "pratique" | "apprentissage" | "horizon";

const phaseColors: Record<Phase, string> = {
  acquis: "text-signal",
  pratique: "text-freq",
  apprentissage: "text-warn",
  horizon: "text-phase-horizon",
};

const phaseLabels: Record<Phase, string> = {
  acquis: "Acquis",
  pratique: "Pratique",
  apprentissage: "En apprentissage",
  horizon: "Horizon",
};

const nodeClasses: Record<Phase, string> = {
  acquis: "node-solid",
  pratique: "node-practice node-active",
  apprentissage: "node-learning",
  horizon: "node-horizon",
};

/** A single node in the signal path journey timeline. */
export function SignalNode({
  phase,
  period,
  title,
  detail,
  children,
}: {
  phase: Phase;
  period: string;
  title: string;
  detail: string;
  children?: ReactNode;
}) {
  return (
    <div className={`signal-node ${nodeClasses[phase]}`}>
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-muted">
            {period}
          </span>
          <span
            className={`phase-badge phase-${phase === "acquis" ? "solid" : phase === "pratique" ? "practice" : phase}`}
          >
            {phaseLabels[phase]}
          </span>
        </div>
        <h3 className="mt-1.5 font-display text-lg font-semibold text-ink">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{detail}</p>
        {children}
      </div>
    </div>
  );
}
