import { FlaskConical, Network, Sigma, Workflow } from "lucide-react";
import { research } from "@/data/content";
import { Chip, Reveal, Section } from "./ui";

const icons = { FlaskConical, Network, Sigma, Workflow };

/** Small decorative heterogeneous graph: pink miRNA nodes, violet mRNA nodes. */
function HetGraph() {
  const pink = [
    [20, 24],
    [20, 60],
    [20, 96],
  ];
  const violet = [
    [140, 16],
    [140, 52],
    [140, 88],
    [140, 118],
  ];
  return (
    <svg aria-hidden viewBox="0 0 160 134" className="h-28 w-40">
      {pink.map(([x1, y1]) =>
        violet.map(([x2, y2]) => (
          <line
            key={`${x1}-${y1}-${x2}-${y2}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--secondary)"
            strokeWidth="0.8"
            opacity="0.5"
          />
        )),
      )}
      {pink.map(([cx, cy]) => (
        <circle key={`p${cy}`} cx={cx} cy={cy} r="5" fill="var(--primary)" opacity="0.85" />
      ))}
      {violet.map(([cx, cy]) => (
        <circle key={`v${cy}`} cx={cx} cy={cy} r="4" fill="var(--secondary)" opacity="0.8" />
      ))}
    </svg>
  );
}

export default function Research() {
  return (
    <Section id="research" index="02" slug="research" title="Research">
      <Reveal>
        <article className="surface p-6 sm:p-8">
          <p className="font-mono text-xs text-faint">{research.label}</p>
          <h3 className="mt-3 max-w-3xl text-xl font-medium leading-snug sm:text-2xl">
            {research.title}
          </h3>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {research.columns.map((col) => {
              const Icon = icons[col.icon as keyof typeof icons] ?? Network;
              return (
                <div key={col.heading}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-faint" strokeWidth={1.5} />
                    <h4 className="text-sm font-medium text-foreground">
                      {col.heading}
                    </h4>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{col.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {research.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <p className="font-mono text-xs text-faint">{research.badge}</p>
            <div className="opacity-80">
              <HetGraph />
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
