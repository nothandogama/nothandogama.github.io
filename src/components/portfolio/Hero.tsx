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
      className="relative flex min-h-[100svh] flex-col border-b border-hairline"
    >
      <div className="mx-auto grid w-full max-w-[1100px] flex-1 items-center gap-12 px-5 pb-16 pt-28 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16 lg:pt-32">
        <div>
          <p className="font-mono text-sm text-primary">{hero.prompt}</p>
          <h1
            aria-label={hero.name}
            className="mt-4 whitespace-nowrap text-[44px] font-medium leading-[1.05] tracking-[-0.02em] sm:text-7xl sm:tracking-[-0.03em]"
          >
            <span aria-hidden>{typed}</span>
            <span
              aria-hidden
              className={`ml-1 inline-block h-[0.8em] w-[2px] translate-y-[0.08em] bg-primary transition-opacity duration-300 ${
                typing ? "opacity-100" : "opacity-0"
              }`}
            />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-7 text-foreground sm:text-xl sm:leading-8">
            {hero.headline}
          </p>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            {hero.sentence}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton
              href={`mailto:${links.email}`}
              variant="primary"
              icon={<Mail className={icon} strokeWidth={1.5} />}
            >
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

        <figure className="w-full max-w-[400px] lg:max-w-none">
          <HeroSilhouette className="w-full" />
          <figcaption className="mt-4 font-mono text-xs text-faint">
            {hero.figureCaption}
          </figcaption>
        </figure>
      </div>

      <dl className="relative border-t border-hairline">
        <div className="mx-auto grid max-w-[1100px] gap-4 px-5 py-6 sm:grid-cols-[auto_auto_1fr] sm:gap-12">
          {hero.facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-1">
              <dt className="font-mono text-xs text-faint">{f.label}</dt>
              <dd className="flex items-start gap-2 text-sm text-muted-foreground">
                {"live" in f && f.live && (
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-status" />
                )}
                {f.value}
              </dd>
            </div>
          ))}
        </div>
      </dl>
    </header>
  );
}
