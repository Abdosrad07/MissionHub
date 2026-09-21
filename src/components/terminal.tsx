import type { ReactNode } from "react";

/** Terminal window — stylized console frame. */
export function Terminal({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`term ${className}`}>
      <div className="term-head">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-alert/70" />
          <i className="h-2.5 w-2.5 rounded-full bg-warn/70" />
          <i className="h-2.5 w-2.5 rounded-full bg-signal/70" />
        </span>
        <span className="font-mono text-[11px] tracking-wider text-muted">
          {title}
        </span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

/** Animated signal waveform. */
export function Waveform({
  bars = 28,
  className = "",
}: {
  bars?: number;
  className?: string;
}) {
  return (
    <div className={`wave ${className}`} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          style={{
            height: `${28 + Math.abs(Math.sin(i * 1.7)) * 62}%`,
            animationDelay: `${(i % 9) * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Section heading — editorial style with signal accent. */
export function SectionHeading({
  cmd,
  title,
  level = 2,
}: {
  cmd: string;
  title: string;
  level?: 2 | 3;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <div className="mb-8">
      <p className="font-mono text-xs tracking-widest text-signal">$ {cmd}</p>
      <Tag className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {title}
      </Tag>
    </div>
  );
}
