"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useTilt } from "@/lib/hooks/use-tilt";

/**
 * A glass card that tilts toward the cursor. Exists as its own client
 * component so the sections that use it (work, skills) can stay Server
 * Components — they pass their markup in as `children`.
 */
export function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useTilt<HTMLDivElement>();

  return (
    <div ref={ref} className={cn("tilt-card glass-1 rounded-xl p-6", className)}>
      {children}
    </div>
  );
}
