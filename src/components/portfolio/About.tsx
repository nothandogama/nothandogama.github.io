import { about } from "@/data/content";
import { Chip, Reveal, Section } from "./ui";

export default function About() {
  return (
    <Section id="about" index="01" slug="about" title="About">
      <Reveal className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {about.paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </Reveal>

      <Reveal delay={60} className="mt-10 flex max-w-3xl flex-wrap gap-2">
        {about.tools.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </Reveal>
    </Section>
  );
}
