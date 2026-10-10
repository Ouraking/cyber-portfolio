"use client";

import type { ReactNode } from "react";

import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  /** Intersection threshold 0-1 */
  threshold?: number;
  /** CSS animation class to apply on reveal */
  animation?: string;
}

/**
 * Wraps content so it rises, scales and fades in with a spring the first time
 * it scrolls into view. The observer lives in `useScrollReveal`; this is the
 * markup half.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
  animation = "animate-reveal-spring",
}: ScrollRevealProps) {
  const ref = useScrollReveal<HTMLDivElement>({ threshold });

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${animation} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
