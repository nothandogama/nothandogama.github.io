/**
 * Hero figure: a line-art profile of a Black woman with an afro-textured hair
 * outline. A double helix rises from the hair and opens into the graph the
 * dissertation studies: miRNA nodes (pink) on one side, mRNA nodes (violet) on
 * the other, known interactions as faint edges and one predicted interaction
 * drawn in the accent. Lines draw in once on load; static with reduced motion.
 */

const MIRNA: [number, number][] = [
  [312, 72],
  [324, 148],
  [312, 224],
  [328, 300],
];
const MRNA: [number, number][] = [
  [440, 52],
  [440, 116],
  [440, 180],
  [440, 244],
  [440, 308],
  [440, 372],
];
/** Known interactions, as [miRNA index, mRNA index]. */
const KNOWN: [number, number][] = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [2, 2],
  [2, 4],
  [3, 3],
  [3, 4],
  [3, 5],
];
const PREDICTED: [number, number] = [1, 3];

const line = "var(--muted-foreground)";

export default function HeroSilhouette({ className = "" }: { className?: string }) {
  const [pa, pb] = PREDICTED;
  const from = MIRNA[pa]!;
  const to = MRNA[pb]!;

  return (
    <svg
      aria-hidden
      viewBox="48 24 412 396"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* profile and hair */}
      <g stroke={line} strokeWidth="1.5" opacity="0.9">
        {[
          "M214 148c-10-26-34-40-60-36-30 5-50 30-52 60-1 17 4 30 3 42-1 9-8 13-8 20 0 6 7 8 8 13 1 6-3 9-2 15 1 7 9 9 10 15 1 8-2 12 2 18 6 9 22 10 38 8 12-2 21-6 26-13",
          "M104 186c7-4 15-3 20 2",
          "M110 199c4-3 10-3 13 1",
          "M96 216c-6 8-12 14-12 20 0 5 6 7 12 6",
          "M92 258c7 3 15 3 21 0",
          "M96 288c6 5 14 6 21 3",
          "M156 340c2 22-2 34-10 44 22 14 52 22 86 26",
          "M214 148c22-14 34-42 26-68-9-30-40-50-74-48-38 2-70 26-84 58-10 22-10 44-2 62",
          "M80 152c-14 6-22 20-20 36 2 14 12 24 24 28",
          "M86 108c-16-2-28 8-30 24",
          "M120 62c-18 2-32 14-38 30",
          "M186 58c-16-12-38-16-58-12",
          "M232 96c4-16-2-32-14-42",
        ].map((d) => (
          <path key={d} d={d} pathLength={1} className="draw-in" />
        ))}
      </g>

      {/* helix rising from the hair: pink strand for miRNA, violet for mRNA */}
      <path
        d="M244 96c22 14 22 34 0 48s-22 34 0 48 22 34 0 48"
        stroke="var(--secondary)"
        strokeWidth="1.5"
        pathLength={1}
        className="draw-in"
        style={{ animationDelay: "300ms" }}
      />
      <path
        d="M280 96c-22 14-22 34 0 48s22 34 0 48-22 34 0 48"
        stroke="var(--primary)"
        strokeWidth="1.5"
        pathLength={1}
        className="draw-in"
        style={{ animationDelay: "300ms" }}
      />
      <g stroke={line} strokeWidth="1" opacity="0.35">
        {[112, 136, 160, 184, 208, 232].map((y) => (
          <path key={y} d={`M250 ${y}h24`} />
        ))}
      </g>

      {/* known interactions */}
      <g stroke={line} strokeWidth="1" opacity="0.22">
        {KNOWN.map(([a, b]) => {
          const [x1, y1] = MIRNA[a]!;
          const [x2, y2] = MRNA[b]!;
          return (
            <line
              key={`${a}-${b}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              pathLength={1}
              className="draw-in"
              style={{ animationDelay: `${700 + b * 60}ms` }}
            />
          );
        })}
      </g>

      {/* the predicted interaction */}
      <line
        x1={from[0]}
        y1={from[1]}
        x2={to[0]}
        y2={to[1]}
        stroke="var(--primary)"
        strokeWidth="2"
        pathLength={1}
        className="draw-in"
        style={{ animationDelay: "1500ms", animationDuration: "700ms" }}
      />
      <circle
        cx={to[0]}
        cy={to[1]}
        r="11"
        stroke="var(--primary)"
        strokeWidth="1"
        className="fade-in"
        style={{ animationDelay: "2000ms" }}
      />

      {/* nodes */}
      {MIRNA.map(([cx, cy], i) => (
        <circle
          key={`mi${i}`}
          cx={cx}
          cy={cy}
          r="5"
          fill="var(--primary)"
          className="fade-in"
          style={{ animationDelay: `${500 + i * 60}ms` }}
        />
      ))}
      {MRNA.map(([cx, cy], i) => (
        <circle
          key={`m${i}`}
          cx={cx}
          cy={cy}
          r="4"
          fill="var(--secondary)"
          className="fade-in"
          style={{ animationDelay: `${700 + i * 60}ms` }}
        />
      ))}
    </svg>
  );
}
