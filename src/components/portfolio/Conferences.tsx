import { Microscope, Presentation } from "lucide-react";
import { conferences } from "@/data/content";
import { Reveal, Section } from "./ui";


export default function Conferences() {
  return (
    <Section id="conferences" index="08" slug="conferences" title="Conferences & development">
      <div className="grid gap-5 md:grid-cols-2">
        {conferences.map((c, i) => {
          const Icon = i % 2 === 0 ? Presentation : Microscope;
          return (
            <Reveal key={c.title} delay={i * 80}>
              <div className="surface glow-hover h-full p-6">
                <Icon className="h-4 w-4 text-primary" />
                <h3 className="mt-3 font-mono text-sm">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
