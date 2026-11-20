import { GitBranch, Plus } from "lucide-react";
import { projects } from "@/data/content";
import { Chip, LinkButton, Reveal, Section } from "./ui";

/** Horizontal pipeline diagram with animated "data flowing" dashes. */
function PipelineDiagram({ steps }: { steps: string[] }) {
  const boxW = 84;
  const gap = 26;
  const width = steps.length * boxW + (steps.length - 1) * gap;

  return (
    <div className="-mx-1 overflow-x-auto pb-1">
      <svg viewBox={`0 0 ${width} 46`} className="h-12" style={{ minWidth: width / 1.6 }}>
        {steps.map((step, i) => {
          const x = i * (boxW + gap);
          return (
            <g key={step}>
              <rect
                x={x}
                y={8}
                width={boxW}
                height={28}
                rx={7}
                fill="rgb(255 255 255 / 0.05)"
                stroke="var(--hairline-strong)"
              />
              <text
                x={x + boxW / 2}
                y={26}
                textAnchor="middle"
                fontSize="11"
                fontFamily="var(--font-mono)"
                fill="var(--foreground)"
              >
                {step}
              </text>
              {i < steps.length - 1 && (
                <line
                  x1={x + boxW + 3}
                  y1={22}
                  x2={x + boxW + gap - 3}
                  y2={22}
                  stroke="var(--faint)"
                  strokeWidth="1.2"
                  opacity="0.6"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" index="04" slug="projects" title="Projects">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <article className="surface flex h-full flex-col p-6">
              <h3 className="text-base font-medium sm:text-lg">{p.title}</h3>
              <p className="mt-1 font-mono text-xs text-faint">{p.meta}</p>

              {p.visual === "pipeline" && p.pipeline && (
                <div className="mt-5">
                  <PipelineDiagram steps={p.pipeline} />
                </div>
              )}

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>

              <div className="mt-6">
                <LinkButton
                  href={p.repoUrl}
                  emptyLabel="Code coming soon"
                  icon={<GitBranch className="h-4 w-4" strokeWidth={1.5} />}
                >
                  View on GitHub
                </LinkButton>
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal delay={160}>
          <article className="flex h-full min-h-[160px] items-center justify-center rounded-xl border border-dashed border-hairline p-6">
            <p className="inline-flex items-center gap-2 font-mono text-xs text-faint">
              <Plus className="h-4 w-4" strokeWidth={1.5} />
              More projects coming soon
            </p>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
