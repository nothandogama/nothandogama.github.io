import { useEffect, useRef } from "react";

/**
 * Full-page fluorescent backdrop: glowing "cells" plus an animated bipartite
 * miRNA (pink) – mRNA (violet) network, fixed behind every section so the
 * glass cards have colour to frost. Plain canvas, DPR aware, ~60fps cap,
 * gentle scroll parallax, static when prefers-reduced-motion is on.
 */

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  kind: "miRNA" | "mRNA";
};

type Cell = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  phase: number;
  depth: number;
};

const PINK = "255, 95, 190";
const VIOLET = "190, 150, 255";
const CELL_COLORS = ["255, 80, 180", "120, 90, 255", "94, 255, 216", "255, 140, 220"];

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let cells: Cell[] = [];
    let miCount = 0;
    const pointer = { x: -9999, y: -9999 };
    let predicted: { a: number; b: number; t: number } | null = null;
    let lastPredict = 0;
    let lastScroll = window.scrollY;
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

      const density = width < 700 ? 0.55 : 1;
      const make = (count: number, kind: Node["kind"]): Node[] =>
        Array.from({ length: Math.round(count * density) }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: kind === "miRNA" ? 3.4 : 2.6,
          kind,
        }));

      const mi = make(26, "miRNA");
      miCount = mi.length;
      nodes = [...mi, ...make(40, "mRNA")];
      cells = Array.from({ length: width < 700 ? 6 : 9 }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 70 + Math.random() * 130,
        color: CELL_COLORS[i % CELL_COLORS.length] ?? PINK,
        phase: Math.random() * 6,
        depth: 0.2 + Math.random() * 0.5,
      }));
    };

    const draw = (now: number) => {
      if (!reduced) raf = requestAnimationFrame(draw);
      if (now - last < 1000 / 60) return;
      last = now;

      const scrollDelta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      ctx.clearRect(0, 0, width, height);

      // glowing cells: soft body, membrane ring, nucleus
      for (const c of cells) {
        if (!reduced) {
          c.x += c.vx;
          c.y += c.vy - scrollDelta * c.depth * 0.3;
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

      // motion
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy - scrollDelta * 0.15;
        }
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;

        if (hasPointer) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22000 && d2 > 1) {
            const f = 0.7 / Math.sqrt(d2);
            n.x += dx * f;
            n.y += dy * f;
          }
        }
      }

      // occasionally pick a nearby pair as the new "predicted interaction"
      if (!reduced && now - lastPredict > 1800) {
        lastPredict = now;
        const a = Math.floor(Math.random() * miCount);
        const near: number[] = [];
        const na = nodes[a];
        for (let j = miCount; j < nodes.length; j++) {
          const nb = nodes[j];
          if (na && nb && Math.hypot(na.x - nb.x, na.y - nb.y) < 220) near.push(j);
        }
        const b = near[Math.floor(Math.random() * near.length)];
        predicted = b === undefined ? null : { a, b, t: now };
      }

      // edges between nearby miRNA–mRNA pairs
      ctx.lineWidth = 1.2;
      for (let i = 0; i < miCount; i++) {
        for (let j = miCount; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          if (!a || !b) continue;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > 170) continue;
          const alpha = (1 - dist / 170) * 0.42;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${PINK}, ${alpha})`);
          grad.addColorStop(1, `rgba(${VIOLET}, ${alpha})`);
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // the glowing predicted edge: fade in, pulse once, fade out
      if (predicted) {
        const a = nodes[predicted.a];
        const b = nodes[predicted.b];
        const age = (now - predicted.t) / 1600;
        const pulse = age < 1 ? Math.sin(age * Math.PI) : 0;
        if (a && b && pulse > 0) {
          ctx.shadowBlur = 22 * pulse;
          ctx.shadowColor = `rgb(${PINK})`;
          ctx.strokeStyle = `rgba(255, 200, 235, ${0.3 + pulse * 0.7})`;
          ctx.lineWidth = 1.5 + pulse * 2.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // nodes
      ctx.shadowBlur = 12;
      for (const n of nodes) {
        const color = n.kind === "miRNA" ? PINK : VIOLET;
        ctx.shadowColor = `rgb(${color})`;
        ctx.fillStyle = `rgb(${color})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onResize = () => {
      build();
      if (reduced) draw(performance.now());
    };

    build();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", onResize);
    if (hasPointer) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
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
