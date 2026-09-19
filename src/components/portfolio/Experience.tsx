import { MapPin } from "lucide-react";
import { experience } from "@/data/content";
import { Reveal, Section } from "./ui";

export default function Experience() {
  return (
    <Section id="experience" index="03" slug="experience" title="Experience">
      <div className="relative pl-6">
        {/* gradient timeline line */}
        <span className="gradient-line absolute left-0 top-2 w-px opacity-60" style={{ bottom: 8 }} />
        <div className="space-y-10">
          {experience.map((job, i) => (
            <Reveal key={job.role} delay={i * 80}>
              <div className="relative">
                <span className="absolute -left-[26px] top-1.5 h-3 w-3 rounded-full bg-primary shadow-[0_0_14px_0_var(--primary)]" />
                <h3 className="text-base font-semibold sm:text-lg">{job.role}</h3>
                <p className="mt-1 font-mono text-xs text-violet">{job.org}</p>
                <p className="mt-1 flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted-foreground">
                  <span>{job.period}</span>
                  {job.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
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
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
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
