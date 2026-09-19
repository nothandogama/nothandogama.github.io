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
              <div className="surface glow-hover h-full p-6">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <h3 className="font-mono text-xs tracking-widest">{group.heading}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item, j) => (
                    <Chip key={item} tone={j % 3 === 0 ? "violet" : "pink"}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={120}>
        <p className="mt-5 flex items-start gap-2 font-mono text-xs leading-relaxed text-muted-foreground">
          <Server className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
          <span>
            <span className="text-foreground">High-performance computing — </span>
            {skills.hpcNote}
          </span>
        </p>
      </Reveal>
    </Section>
  );
}
