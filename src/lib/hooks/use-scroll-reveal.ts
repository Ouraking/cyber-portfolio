"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealOptions {
  /** Fraction of the element that must be visible, 0–1. */
  threshold?: number;
  /** Shrinks or grows the viewport used for the intersection test. */
  rootMargin?: string;
}

/**
 * Adds `.is-visible` to the element the first time it scrolls into view, and
 * never removes it — the entrance plays once and does not replay on scroll
 * back. Returns a ref to attach to the element.
 *
 * The class is toggled on the DOM node rather than held in state, so a reveal
 * costs no re-render. Under reduced motion the class is added immediately:
 * `.scroll-reveal` starts at opacity 0, so without that the content would stay
 * invisible instead of merely unanimated.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -50px 0px",
}: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
