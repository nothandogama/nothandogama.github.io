import type { ReactNode } from "react";
import { useReveal } from "./hooks";

/** Wraps children in a fade-up-on-scroll container. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, shown } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** A page section with a FASTA-style header, e.g. `>01_about`. */
export function Section({
  id,
  index,
  slug,
  title,
  children,
}: {
  id: string;
  index: string;
  slug: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-24">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-primary sm:text-sm">
            &gt;{index}_{slug}
          </span>
          <span className="gradient-line h-px w-16 opacity-70 sm:w-28" />
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

/** A tiny ATGC sequence strip used as a section divider. */
export function SequenceDivider() {
  const bases = "ATGCGGATCTTAGCCGATACGTTAGCACGGATCCGTATTGCAAGCTTGACCGTAAGGCTTAC";
  const colors = ["text-primary", "text-violet", "text-status", "text-foreground"];
  return (
    <div aria-hidden className="select-none overflow-hidden py-1 opacity-75 [text-shadow:0_0_6px_currentColor]">
      <p className="whitespace-nowrap font-mono text-[10px] tracking-[0.4em]">
        {bases.split("").map((b, i) => (
          <span key={i} className={colors[i % colors.length]}>
            {b}
          </span>
        ))}
      </p>
    </div>
  );
}

/** Pill chip styled like a heatmap cell. */
export function Chip({ children, tone = "pink" }: { children: ReactNode; tone?: "pink" | "violet" }) {
  const toneClass =
    tone === "pink"
      ? "border-primary/45 bg-primary/20 text-foreground hover:border-primary hover:shadow-[0_0_18px_-6px_var(--primary)]"
      : "border-violet/45 bg-violet/20 text-foreground hover:border-violet hover:shadow-[0_0_18px_-6px_var(--secondary)]";
  return (
    <span
      className={`rounded-md border px-2.5 py-1 font-mono text-xs transition-all ${toneClass}`}
    >
      {children}
    </span>
  );
}

/** Link button; renders a muted disabled pill when the URL is empty. */
export function LinkButton({
  href,
  children,
  variant = "outline",
  emptyLabel,
  icon,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  emptyLabel?: string;
  icon?: ReactNode;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  if (!href) {
    if (!emptyLabel) return null;
    return (
      <span
        aria-disabled="true"
        className={`${base} cursor-not-allowed border border-border bg-muted/40 text-muted-foreground opacity-70`}
      >
        {icon}
        {emptyLabel}
      </span>
    );
  }

  const style =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:shadow-[0_0_28px_-8px_var(--primary)]"
      : "border border-border text-foreground hover:border-primary/60 hover:shadow-[0_0_22px_-10px_var(--primary)]";

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={`${base} ${style}`}
    >
      {icon}
      {children}
    </a>
  );
}
