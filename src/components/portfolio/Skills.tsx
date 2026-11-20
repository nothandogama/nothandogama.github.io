import { BrainCircuit, Dna, Server, Sigma, Terminal } from "lucide-react";
import { skills } from "@/data/content";
import { Chip, Reveal, Section } from "./ui";

const icons = { BrainCircuit, Dna, Sigma, Terminal };

export default function Skills() {
  return (
    <Section id="skills" index="05" slug="skills" title="Skills">
      <div className="grid gap-5 md:grid-cols-2">
        {skills.groups.map((group, i) => {
          const Icon = icons[group.icon as keyof typeof icons] ?? Terminal;
          return (
            <Reveal key={group.heading} delay={i * 70}>
              <div className="surface h-full p-6">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-faint" strokeWidth={1.5} />
                  <h3 className="text-sm font-medium">{group.heading}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={120}>
        <p className="mt-6 flex items-start gap-2 font-mono text-xs leading-relaxed text-faint">
          <Server className="h-4 w-4 shrink-0 text-faint" strokeWidth={1.5} />
          <span>
            <span className="text-foreground">High-performance computing — </span>
            {skills.hpcNote}
          </span>
        </p>
      </Reveal>
    </Section>
  );
}
