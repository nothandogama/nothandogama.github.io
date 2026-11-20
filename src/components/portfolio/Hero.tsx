import { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { hero, links } from "@/data/content";
import HeroSilhouette from "./HeroSilhouette";
import { LinkButton } from "./ui";
import { useReducedMotion } from "./hooks";

/** Typing effect that resolves to the full name once, then stops. */
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
    }, 70);
    return () => clearInterval(id);
  }, [text, reduced]);

  return shown;
}

const icon = "h-4 w-4";

export default function Hero() {
  const typed = useTyped(hero.name);
  const typing = typed.length < hero.name.length;

  return (
    <header
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-hairline"
    >
      <HeroSilhouette />

      <div className="relative mx-auto w-full max-w-[1100px] px-5 pb-24 pt-32">
        <p className="font-mono text-sm text-primary">{hero.prompt}</p>
        <h1
          aria-label={hero.name}
          className="mt-4 text-[44px] font-medium leading-[1.05] tracking-[-0.02em] sm:text-7xl sm:tracking-[-0.03em]"
        >
          <span aria-hidden>{typed}</span>
          <span
            aria-hidden
            className={`ml-1 inline-block h-[0.8em] w-[2px] translate-y-[0.08em] bg-primary transition-opacity duration-300 ${
              typing ? "opacity-100" : "opacity-0"
            }`}
          />
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-7 text-foreground/90 sm:text-xl sm:leading-8">
          {hero.subtitle}
        </p>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          {hero.sentence}
        </p>

        <p className="mt-6 flex items-start gap-2 font-mono text-xs leading-4 text-faint">
          <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-status" />
          {hero.status}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href={`mailto:${links.email}`} variant="primary" icon={<Mail className={icon} strokeWidth={1.5} />}>
            Email me
          </LinkButton>
          {links.github || links.linkedin ? (
            <>
              <LinkButton href={links.github} icon={<Github className={icon} strokeWidth={1.5} />}>
                GitHub
              </LinkButton>
              <LinkButton href={links.linkedin} icon={<Linkedin className={icon} strokeWidth={1.5} />}>
                LinkedIn
              </LinkButton>
            </>
          ) : (
            <LinkButton href="#research" icon={<ArrowDown className={icon} strokeWidth={1.5} />}>
              Read the research
            </LinkButton>
          )}
        </div>
      </div>
    </header>
  );
}
