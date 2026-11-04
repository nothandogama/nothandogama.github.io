import { useEffect, useState } from "react";
import { ChevronDown, Github, Linkedin } from "lucide-react";
import { hero, links } from "@/data/content";
import HeroSilhouette from "./HeroSilhouette";
import { LinkButton } from "./ui";
import { useReducedMotion } from "./hooks";

/** Typing effect that resolves to the full name. */
function useTyped(text: string) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (reduced) {
      setShown(text);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 85);
    return () => clearInterval(id);
  }, [text, reduced]);

  return shown;
}

export default function Hero() {
  const typed = useTyped(hero.name);

  return (
    <header
      id="hero"
      className="relative flex min-h-[88vh] items-center overflow-hidden border-b border-border"
    >
      <HeroSilhouette />

      <div className="relative mx-auto w-full max-w-[1100px] px-5 py-24">
        <p className="font-mono text-sm text-primary">{hero.prompt}</p>
        <h1 className="glow-text mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
          {typed}
          <span className="ml-1 inline-block w-[2px] animate-pulse bg-primary align-middle text-transparent shadow-[0_0_10px_var(--primary)]">
            |
          </span>
        </h1>
        <p className="mt-4 max-w-2xl font-mono text-sm text-violet sm:text-base">{hero.subtitle}</p>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {hero.sentence}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 backdrop-blur">
          <span className="status-dot h-2 w-2 rounded-full bg-status" />
          <span className="font-mono text-xs text-muted-foreground">{hero.status}</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href={links.github} icon={<Github className="h-4 w-4" />}>
            GitHub
          </LinkButton>
          <LinkButton href={links.linkedin} icon={<Linkedin className="h-4 w-4" />}>
            LinkedIn
          </LinkButton>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </header>
  );
}
