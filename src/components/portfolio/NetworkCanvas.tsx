import { useEffect, useRef } from "react";

/**
 * Full-page fluorescent backdrop: slowly drifting glowing "cells", fixed behind
 * every section so the glass cards have colour to frost. Plain canvas, DPR
 * aware, ~60fps cap, dims below the hero, static when prefers-reduced-motion is on.
 */

type Cell = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  phase: number;
};

const CELL_COLORS = ["255, 80, 180", "120, 90, 255", "94, 255, 216", "255, 140, 220"];

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cells: Cell[] = [];
    let raf = 0;
    let last = 0;

    const build = () => {
      // iOS Safari fires resize when the address bar shows/hides; only rebuild on width changes.
      if (window.innerWidth === width) {
        height = window.innerHeight;
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cells = Array.from({ length: width < 700 ? 6 : 9 }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 70 + Math.random() * 130,
        color: CELL_COLORS[i % CELL_COLORS.length] ?? "255, 80, 180",
        phase: Math.random() * 6,
      }));
    };

    const draw = (now: number) => {
      if (!reduced) raf = requestAnimationFrame(draw);
      if (now - last < 1000 / 60) return;
      last = now;

      ctx.clearRect(0, 0, width, height);

      // glowing cells: soft body, membrane ring, nucleus
      for (const c of cells) {
        if (!reduced) {
          c.x += c.vx;
          c.y += c.vy;
        }
        if (c.y < -c.r) c.y = height + c.r;
        if (c.y > height + c.r) c.y = -c.r;
        if (c.x < -c.r || c.x > width + c.r) c.vx *= -1;

        const a = 0.3 * (0.6 + 0.4 * Math.sin(now / 1500 + c.phase));
        const grad = ctx.createRadialGradient(c.x, c.y, c.r * 0.05, c.x, c.y, c.r);
        grad.addColorStop(0, `rgba(${c.color}, ${a * 1.3})`);
        grad.addColorStop(0.25, `rgba(${c.color}, ${a * 0.5})`);
        grad.addColorStop(0.7, `rgba(${c.color}, ${a * 0.6})`);
        grad.addColorStop(1, `rgba(${c.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(${c.color}, ${a * 1.4})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r * 0.7, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(c.x - c.r * 0.12, c.y - c.r * 0.1, c.r * 0.12, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onResize = () => {
      build();
      if (reduced) draw(performance.now());
    };

    // Full strength in the hero, dimmed behind the reading sections.
    const wrap = canvas.parentElement;
    const onScroll = () => {
      if (!wrap) return;
      const t = Math.min(window.scrollY / window.innerHeight, 1);
      wrap.style.opacity = String(1 - t * 0.55);
    };

    build();
    onScroll();
    raf = requestAnimationFrame(draw);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background: [
          "radial-gradient(60% 50% at 85% 10%, rgb(200 40 170 / 0.6), transparent 65%)",
          "radial-gradient(55% 55% at 0% 100%, rgb(90 40 210 / 0.65), transparent 65%)",
          "linear-gradient(160deg, #3b1366, #250b45)",
        ].join(", "),
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
