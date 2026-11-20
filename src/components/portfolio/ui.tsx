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
    <section id={id} className="scroll-mt-16 py-16 sm:py-24">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-primary">
            &gt;{index}_{slug}
          </span>
          <span className="h-px w-16 bg-hairline sm:w-28" />
        </div>
        <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-[32px] sm:leading-tight">
          {title}
        </h2>
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

/** A faint ATGC sequence strip used as a section divider. */
export function SequenceDivider() {
  const bases = "ATGCGGATCTTAGCCGATACGTTAGCACGGATCCGTATTGCAAGCTTGACCGTAAGGCTTAC";
  return (
    <div aria-hidden className="select-none overflow-hidden py-1">
      <p className="whitespace-nowrap font-mono text-[11px] tracking-[0.4em] text-faint opacity-40">
        {bases}
      </p>
    </div>
  );
}

/** Small tag for a tool, method or topic. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-hairline bg-white/5 px-2.5 py-1 font-mono text-xs text-muted-foreground">
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
    "inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 ease-[var(--ease)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  if (!href) {
    if (!emptyLabel) return null;
    return (
      <span
        aria-disabled="true"
        className={`${base} cursor-not-allowed border border-hairline font-normal text-faint active:scale-100`}
      >
        {icon}
        {emptyLabel}
      </span>
    );
  }

  const style =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-[#ff6bbb]"
      : "border border-hairline bg-white/5 text-foreground hover:border-hairline-strong hover:bg-white/10";

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
