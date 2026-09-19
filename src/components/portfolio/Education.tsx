import { GraduationCap } from "lucide-react";
import { coursework, education } from "@/data/content";
import { Reveal, Section } from "./ui";
import { useReveal } from "./hooks";

/** CSS bar chart, animating from 0 when scrolled into view. */
function CourseworkChart() {
  const { ref, shown } = useReveal();
  return (
    <div ref={ref} className="surface p-6">
      <h3 className="font-mono text-xs tracking-widest text-primary">{coursework.title}</h3>
      <ul className="mt-5 space-y-3">
        {coursework.bars.map((bar, i) => (
          <li key={bar.label}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-xs text-muted-foreground">{bar.label}</span>
              <span className="font-mono text-xs text-foreground">{bar.value}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="gradient-line h-full rounded-full transition-[width] duration-1000 ease-out"
                style={{ width: shown ? `${bar.value}%` : "0%", transitionDelay: `${i * 90}ms` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Education() {
  return (
    <Section id="education" index="07" slug="education" title="Education">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          {education.map((e, i) => (
            <Reveal key={`${e.school}-${e.degree}`} delay={i * 70}>
              <div className="surface glow-hover p-5">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold sm:text-base">{e.school}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{e.degree}</p>
                <p className="mt-1 font-mono text-[11px] text-violet">{e.period}</p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">{e.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <CourseworkChart />
        </Reveal>
      </div>
    </Section>
  );
}
