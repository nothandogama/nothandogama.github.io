import { useEffect, useRef } from "react";

/**
 * Animated bipartite miRNA (pink) – mRNA (violet) network, plain canvas.
 * Performance-safe: DPR aware, pauses off-screen, ~60fps cap, static when
 * prefers-reduced-motion is on.
 */

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  kind: "miRNA" | "mRNA";
};

const PINK = "255, 79, 163";
const VIOLET = "157, 107, 255";

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
    const pointer = { x: -9999, y: -9999 };
    let predicted: { a: number; b: number; t: number } | null = null;
    let lastPredict = 0;
    let running = true;
    let raf = 0;
    let last = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const make = (count: number, kind: Node["kind"], xMin: number, xMax: number): Node[] =>
        Array.from({ length: count }, () => ({
          x: xMin + Math.random() * (xMax - xMin),
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
          r: kind === "miRNA" ? 2.4 : 1.8,
          kind,
        }));

      nodes = [
        ...make(22, "miRNA", 0, width * 0.45),
        ...make(34, "mRNA", width * 0.5, width),
      ];
    };

    const draw = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(draw);
      if (now - last < 1000 / 60) return;
      last = now;

      ctx.clearRect(0, 0, width, height);

      // motion
      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          if (hasPointer) {
            const dx = n.x - pointer.x;
            const dy = n.y - pointer.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 16000 && d2 > 1) {
              const f = 0.35 / Math.sqrt(d2);
              n.x += dx * f;
              n.y += dy * f;
            }
          }
        }

        // occasionally pick a new "predicted interaction"
        if (now - lastPredict > 3200) {
          lastPredict = now;
          const a = Math.floor(Math.random() * 22);
          const b = 22 + Math.floor(Math.random() * 34);
          predicted = { a, b, t: now };
        }
      }

      // edges between nearby miRNA–mRNA pairs
      for (let i = 0; i < 22; i++) {
        for (let j = 22; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          if (!a || !b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 170) continue;
          const alpha = (1 - dist / 170) * 0.16;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${PINK}, ${alpha})`);
          grad.addColorStop(1, `rgba(${VIOLET}, ${alpha})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // the glowing predicted edge: fade in, pulse once, settle
      if (predicted) {
        const a = nodes[predicted.a];
        const b = nodes[predicted.b];
        if (a && b) {
          const age = (now - predicted.t) / 2400;
          const pulse = age < 1 ? Math.sin(age * Math.PI) : 0;
          const alpha = 0.16 + pulse * 0.55;
          ctx.strokeStyle = `rgba(${PINK}, ${alpha})`;
          ctx.lineWidth = 1 + pulse;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle =
          n.kind === "miRNA" ? `rgba(${PINK}, 0.55)` : `rgba(${VIOLET}, 0.45)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();
    draw(0);

    const io = new IntersectionObserver((entries) => {
      const visible = entries[0]?.isIntersecting ?? false;
      if (visible && !running) {
        running = true;
        raf = requestAnimationFrame(draw);
      } else if (!visible) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    if (hasPointer) {
      canvas.addEventListener("pointermove", onPointer);
      canvas.addEventListener("pointerleave", onLeave);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
