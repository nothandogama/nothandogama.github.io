import { about } from "@/data/content";
import { Chip, Reveal, Section } from "./ui";
import { useReducedMotion } from "./hooks";

export default function About() {
  const reduced = useReducedMotion();

  return (
    <Section id="about" index="01" slug="about" title="About">
      <Reveal className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {about.paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </Reveal>

      {/* tools ticker */}
      <div className="mt-10 overflow-hidden">
        {reduced ? (
          <div className="flex flex-wrap gap-2">
            {about.tools.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        ) : (
          <div className="marquee-track flex w-max gap-2">
            {[...about.tools, ...about.tools].map((t, i) => (
              <Chip key={`${t}-${i}`} tone={i % 3 === 0 ? "violet" : "pink"}>
                {t}
              </Chip>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
