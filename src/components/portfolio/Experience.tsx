import { Dna, MapPin } from "lucide-react";
import { experience } from "@/data/content";
import { Reveal, Section } from "./ui";

export default function Experience() {
  return (
    <Section id="experience" index="03" slug="experience" title="Experience">
      <div className="relative pl-12">
        {/* double-helix timeline, centred under the 28px DNA nodes */}
        <span
          className="helix-line absolute left-[7px] top-3 w-[14px] bg-primary/50"
          style={{ bottom: 8 }}
        />
        <div className="space-y-10">
          {experience.map((job, i) => (
            <Reveal key={job.role} delay={i * 80}>
              <div className="relative">
                <span className="absolute -left-12 -top-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-primary/60 bg-background">
                  <Dna className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
                </span>
                <h3 className="text-base font-medium sm:text-lg">{job.role}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{job.org}</p>
                <p className="mt-1 flex flex-wrap items-center gap-3 font-mono text-xs text-faint">
                  <span>{job.period}</span>
                  {job.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {job.location}
                    </span>
                  )}
                </p>
                <ul className="mt-4 space-y-2">
                  {job.bullets.map((b) => (
                    <li
                      key={b.slice(0, 24)}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-faint" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
