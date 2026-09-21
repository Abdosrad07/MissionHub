"use client";

import { Reveal } from "@/components/reveal";

type SkillCategory = {
  label: string;
  phase: "solid" | "practical" | "learning" | "future";
  items: readonly string[];
};

const phaseStyles: Record<string, { border: string; text: string; dot: string }> = {
  solid: {
    border: "border-signal/30",
    text: "text-signal",
    dot: "bg-signal",
  },
  practical: {
    border: "border-freq/30",
    text: "text-freq",
    dot: "bg-freq",
  },
  learning: {
    border: "border-warn/30",
    text: "text-warn",
    dot: "bg-warn",
  },
  future: {
    border: "border-phase-horizon/30",
    text: "text-phase-horizon",
    dot: "bg-phase-horizon",
  },
};

const phaseLabels: Record<string, string> = {
  solid: "Acquis",
  practical: "Pratique",
  learning: "En apprentissage",
  future: "Horizon",
};

/** Visual skill map organized by proficiency phase. */
export function SkillMap({ categories }: { categories: SkillCategory[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {categories.map((cat, i) => {
        const style = phaseStyles[cat.phase];
        return (
          <Reveal key={cat.label} delay={i * 60}>
            <div className="panel h-full p-5">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                <p className={`font-mono text-[11px] tracking-widest ${style.text}`}>
                  {cat.label.toUpperCase()}
                </p>
                <span className="ml-auto font-mono text-[9px] tracking-widest text-muted">
                  {phaseLabels[cat.phase]}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className={`skill-tag skill-tag-${cat.phase === "solid" ? "signal" : cat.phase === "practical" ? "freq" : cat.phase === "learning" ? "warn" : "horizon"}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
