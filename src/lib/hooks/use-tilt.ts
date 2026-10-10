"use client";

import { useEffect, useRef } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

interface TiltOptions {
  /** Maximum rotation in degrees at the card edge. */
  maxTilt?: number;
}

/**
 * 3D tilt toward the cursor. Returns a ref to attach to the card.
 *
 * The hook only writes `--tilt-x` / `--tilt-y` and a `data-tilting` flag; the
 * transform and its transitions live in `.tilt-card` (globals.css). That split
 * keeps the spring-back in CSS, where it needs no per-frame JS.
 *
 * Does nothing — attaches no listeners — on touch-only devices or when the
 * reader has asked for reduced motion, so a tap never leaves a card stuck
 * mid-tilt.
 */
export function useTilt<T extends HTMLElement = HTMLElement>({
  maxTilt = 6,
}: TiltOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia(FINE_POINTER).matches ||
      window.matchMedia(REDUCED_MOTION).matches
    ) {
      return;
    }

    let frame = 0;
    let pending: { x: number; y: number } | null = null;
    // Cached while hovering: reading the rect of an already-rotated element
    // would feed the tilt back into its own input.
    let rect: DOMRect | null = null;

    const flush = () => {
      frame = 0;
      if (!pending || !rect) return;
      const px = (pending.x - rect.left) / rect.width - 0.5;
      const py = (pending.y - rect.top) / rect.height - 0.5;
      // rotateY(+) turns the face toward +x; rotateX(−) turns it toward +y.
      el.style.setProperty("--tilt-y", `${(px * 2 * maxTilt).toFixed(2)}deg`);
      el.style.setProperty("--tilt-x", `${(-py * 2 * maxTilt).toFixed(2)}deg`);
    };

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      rect = el.getBoundingClientRect();
      el.dataset.tilting = "true";
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (!rect) rect = el.getBoundingClientRect();
      pending = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      pending = null;
      rect = null;
      delete el.dataset.tilting;
      el.style.removeProperty("--tilt-x");
      el.style.removeProperty("--tilt-y");
    };

    // A scroll while hovering moves the card under a stale cached rect.
    const invalidate = () => {
      rect = null;
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    el.addEventListener("pointercancel", reset);
    window.addEventListener("scroll", invalidate, { passive: true });

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      el.removeEventListener("pointercancel", reset);
      window.removeEventListener("scroll", invalidate);
      reset();
    };
  }, [maxTilt]);

  return ref;
}
