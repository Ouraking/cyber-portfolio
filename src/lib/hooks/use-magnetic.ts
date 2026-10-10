"use client";

import { useEffect, useRef } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

interface MagneticOptions {
  /** Fraction of the cursor's offset from centre that the element follows. */
  strength?: number;
  /** Hard cap on displacement, in px, so a large element cannot wander. */
  maxOffset?: number;
}

/**
 * Magnetic pull toward the cursor while hovering. Returns a ref to attach to
 * the element.
 *
 * Uses the individual `translate` property, so it composes with any
 * `transform` already on the element. The element's own displacement is
 * subtracted when finding its centre; otherwise the target would chase the
 * element it just moved.
 *
 * Inert on touch-only devices and under reduced motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>({
  strength = 0.35,
  maxOffset = 10,
}: MagneticOptions = {}) {
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

    let offsetX = 0;
    let offsetY = 0;
    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const clamp = (value: number) =>
      Math.max(-maxOffset, Math.min(maxOffset, value));

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const rect = el.getBoundingClientRect();
      const centreX = rect.left + rect.width / 2 - offsetX;
      const centreY = rect.top + rect.height / 2 - offsetY;
      offsetX = clamp((pending.x - centreX) * strength);
      offsetY = clamp((pending.y - centreY) * strength);
      el.style.translate = `${offsetX.toFixed(1)}px ${offsetY.toFixed(1)}px`;
    };

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      el.dataset.magnetic = "true";
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pending = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      pending = null;
      offsetX = 0;
      offsetY = 0;
      delete el.dataset.magnetic;
      el.style.removeProperty("translate");
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    el.addEventListener("pointercancel", reset);

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      el.removeEventListener("pointercancel", reset);
      reset();
    };
  }, [strength, maxOffset]);

  return ref;
}
