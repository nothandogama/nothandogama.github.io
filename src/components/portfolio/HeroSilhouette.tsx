/**
 * Decorative line-art silhouette of a Black woman in profile with an
 * afro-textured hair outline; network nodes and a faint double helix trail
 * out from the hair. Purely decorative, hidden on small screens.
 */
export default function HeroSilhouette() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 420 520"
      fill="none"
      className="pointer-events-none absolute right-0 top-1/2 hidden h-[80%] max-h-[520px] -translate-y-1/2 opacity-[0.15] lg:block"
      stroke="var(--primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      {/* face profile */}
      <path d="M214 148c-10-26-34-40-60-36-30 5-50 30-52 60-1 17 4 30 3 42-1 9-8 13-8 20 0 6 7 8 8 13 1 6-3 9-2 15 1 7 9 9 10 15 1 8-2 12 2 18 6 9 22 10 38 8 12-2 21-6 26-13" />
      {/* brow, eye, nose, lips, chin details */}
      <path d="M104 186c7-4 15-3 20 2" />
      <path d="M110 199c4-3 10-3 13 1" />
      <path d="M96 216c-6 8-12 14-12 20 0 5 6 7 12 6" />
      <path d="M92 258c7 3 15 3 21 0" />
      <path d="M96 288c6 5 14 6 21 3" />
      {/* neck and shoulder */}
      <path d="M156 340c2 22-2 34-10 44 22 14 52 22 86 26" />
      {/* afro hair outline */}
      <path d="M214 148c22-14 34-42 26-68-9-30-40-50-74-48-38 2-70 26-84 58-10 22-10 44-2 62" />
      <path d="M80 152c-14 6-22 20-20 36 2 14 12 24 24 28" />
      <path d="M86 108c-16-2-28 8-30 24" />
      <path d="M120 62c-18 2-32 14-38 30" />
      <path d="M186 58c-16-12-38-16-58-12" />
      <path d="M232 96c4-16-2-32-14-42" />
      {/* helix trailing from the hair */}
      <path
        d="M244 96c22 14 22 34 0 48s-22 34 0 48 22 34 0 48"
        stroke="var(--secondary)"
        opacity="0.9"
      />
      <path
        d="M280 96c-22 14-22 34 0 48s22 34 0 48-22 34 0 48"
        stroke="var(--primary)"
        opacity="0.9"
      />
      {/* base-pair rungs */}
      {[112, 136, 160, 184, 208, 232].map((y) => (
        <path key={y} d={`M250 ${y}h24`} opacity="0.6" />
      ))}
      {/* nodes and edges drifting off from the hair */}
      <path d="M236 70l48-18 42 22 40-10" stroke="var(--secondary)" opacity="0.8" />
      <path d="M284 52l18 44 44 6" opacity="0.8" />
      {[
        [236, 70],
        [284, 52],
        [326, 74],
        [366, 64],
        [302, 96],
        [346, 102],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="var(--primary)" stroke="none" />
      ))}
    </svg>
  );
}
