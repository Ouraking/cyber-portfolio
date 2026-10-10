"use client";

import { useEffect, useRef } from "react";

/** RGB triplets of the three accent stops, as used in `rgb(r g b / a)`. */
const PALETTE = ["34 211 238", "167 139 250", "244 114 182"] as const;

/** Distance in CSS px under which two particles are joined by a line. */
const LINK_DISTANCE = 125;
const MAX_PARTICLES = 70;
const MIN_PARTICLES = 18;
/** One particle per this many px² of hero area. */
const AREA_PER_PARTICLE = 16000;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: (typeof PALETTE)[number];
}

/**
 * Hero backdrop: a static aurora (CSS) with a drifting particle mesh (canvas)
 * on top.
 *
 * - The aurora always renders, so first paint has a background even before
 *   this component hydrates, and under `prefers-reduced-motion` it is the
 *   whole effect — the canvas loop is never started.
 * - The loop runs only while the hero is on screen and the tab is visible, so
 *   it costs nothing once the reader scrolls past or switches tabs.
 * - `pointer-events-none` and `aria-hidden`: it never intercepts a click or
 *   reaches a screen reader. It is hidden from print.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const host = canvas?.parentElement;
    if (!canvas || !ctx || !host) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let inView = true;
    let tabVisible = !document.hidden;

    const seed = () => {
      const count = Math.min(
        MAX_PARTICLES,
        Math.max(MIN_PARTICLES, Math.round((width * height) / AREA_PER_PARTICLE))
      );
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 1 + Math.random() * 1.4,
        color: PALETTE[index % PALETTE.length],
      }));
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      // Capped at 2: a 3x canvas on a phone is pure fill-rate cost for dots
      // that are a couple of pixels across.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      const linkSq = LINK_DISTANCE * LINK_DISTANCE;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > linkSq) continue;
          const alpha = (1 - Math.sqrt(distSq) / LINK_DISTANCE) * 0.22;
          ctx.strokeStyle = `rgb(${a.color} / ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgb(${p.color} / 0.7)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(step);
    };

    /** Start or stop the loop to match "on screen and tab visible". */
    const sync = () => {
      const shouldRun = inView && tabVisible;
      if (shouldRun && !frame) {
        frame = requestAnimationFrame(step);
      } else if (!shouldRun && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    const onVisibility = () => {
      tabVisible = !document.hidden;
      sync();
    };
    const resizeObserver = new ResizeObserver(resize);

    resize();
    intersection.observe(host);
    resizeObserver.observe(host);
    document.addEventListener("visibilitychange", onVisibility);
    sync();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      intersection.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hero-bg pointer-events-none absolute inset-0 -z-10 print:hidden"
    >
      <div className="hero-aurora absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
