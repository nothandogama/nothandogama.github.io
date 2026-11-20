import { GraduationCap } from "lucide-react";
import { coursework, education } from "@/data/content";
import { Reveal, Section } from "./ui";
import { useReveal } from "./hooks";

/** CSS bar chart, animating from 0 when scrolled into view. */
function CourseworkChart() {
  const { ref, shown } = useReveal();
  return (
    <div ref={ref} className="surface p-6">
      <h3 className="text-sm font-medium">{coursework.title}</h3>
      <ul className="mt-5 space-y-3">
        {coursework.bars.map((bar, i) => (
          <li key={bar.label}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm text-muted-foreground">{bar.label}</span>
              <span className="font-mono text-xs tabular-nums text-foreground">{bar.value}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full origin-left rounded-full bg-primary transition-transform duration-700 ease-[var(--ease)]"
                style={{
                  width: `${bar.value}%`,
                  transform: shown ? "scaleX(1)" : "scaleX(0)",
                  transitionDelay: `${i * 50}ms`,
                }}
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
              <div className="surface p-6">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-faint" strokeWidth={1.5} />
                  <h3 className="text-sm font-medium sm:text-base">{e.school}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{e.degree}</p>
                <p className="mt-2 font-mono text-xs text-faint">{e.period}</p>
                <p className="mt-1 font-mono text-xs text-faint">{e.note}</p>
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
