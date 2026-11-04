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
                fill="color-mix(in oklab, var(--primary) 10%, transparent)"
                stroke="color-mix(in oklab, var(--primary) 35%, transparent)"
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
                  className="dash-flow"
                  x1={x + boxW + 3}
                  y1={22}
                  x2={x + boxW + gap - 3}
                  y2={22}
                  stroke="var(--secondary)"
                  strokeWidth="1.4"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Decorative heatmap grid motif. */
function HeatmapMotif() {
  const cells = Array.from({ length: 48 });
  return (
    <svg aria-hidden viewBox="0 0 132 44" className="h-11 w-36">
      {cells.map((_, i) => {
        const col = i % 12;
        const row = Math.floor(i / 12);
        const mix = (Math.sin(i * 1.7) + 1) / 2;
        return (
          <rect
            key={i}
            x={col * 11}
            y={row * 11}
            width={9}
            height={9}
            rx={2}
            fill={mix > 0.5 ? "var(--primary)" : "var(--secondary)"}
            opacity={Number((0.18 + mix * 0.55).toFixed(2))}
          />
        );
      })}
    </svg>
  );
}

export default function Projects() {
  return (
    <Section id="projects" index="04" slug="projects" title="Projects">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <article className="surface glow-hover flex h-full flex-col p-6">
              <h3 className="text-base font-semibold sm:text-lg">{p.title}</h3>
              <p className="mt-1 font-mono text-xs text-violet">{p.meta}</p>

              <div className="mt-5">
                {p.visual === "pipeline" && p.pipeline ? (
                  <PipelineDiagram steps={p.pipeline} />
                ) : (
                  <HeatmapMotif />
                )}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t, j) => (
                  <Chip key={t} tone={j % 2 ? "violet" : "pink"}>
                    {t}
                  </Chip>
                ))}
              </div>

              <div className="mt-6">
                <LinkButton
                  href={p.repoUrl}
                  emptyLabel="Code coming soon"
                  icon={<GitBranch className="h-4 w-4" />}
                >
                  View on GitHub
                </LinkButton>
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal delay={160}>
          <article className="flex h-full min-h-[160px] items-center justify-center rounded-xl border border-dashed border-border p-6 opacity-50">
            <p className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground">
              <Plus className="h-4 w-4" />
              More projects coming soon
            </p>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
