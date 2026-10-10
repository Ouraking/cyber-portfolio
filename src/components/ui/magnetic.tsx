"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useMagnetic } from "@/lib/hooks/use-magnetic";

/**
 * Wraps an interactive element (a button or link) so it drifts toward the
 * cursor on hover. A client boundary of its own so the hero stays a Server
 * Component.
 */
export function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useMagnetic<HTMLDivElement>();

  return (
    <div ref={ref} className={cn("magnetic inline-flex", className)}>
      {children}
    </div>
  );
}
