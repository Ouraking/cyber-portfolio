"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SITE } from "@/lib/site";

const TERMINAL_LINES = [
  { prompt: "$ whoami", output: "security-engineer" },
  { prompt: "$ focus", output: "OSCP prep · AD attack paths" },
  { prompt: "$ next", output: "RHCSA, then PEN-200" },
];

function StatusTerminal() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [currentLine, setCurrentLine] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output">("typing");
  const [typedChars, setTypedChars] = useState(0);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  const isDone = currentLine >= TERMINAL_LINES.length;

  useEffect(() => {
    if (prefersReducedMotion || isDone) return;

    const line = TERMINAL_LINES[currentLine];

    if (phase === "typing") {
      if (typedChars < line.prompt.length) {
        const timeout = setTimeout(() => setTypedChars((c) => c + 1), 28);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => setPhase("output"), 160);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setCompletedLines((prev) => [...prev, currentLine]);
      setCurrentLine((l) => l + 1);
      setPhase("typing");
      setTypedChars(0);
    }, 500);
    return () => clearTimeout(timeout);
  }, [currentLine, phase, typedChars, isDone, prefersReducedMotion]);

  const showAll = prefersReducedMotion || isDone;
  const linesToRender = showAll
    ? TERMINAL_LINES
    : completedLines.map((idx) => TERMINAL_LINES[idx]);

  return (
    <div
      className="h-full rounded-xl border border-border bg-card overflow-hidden"
      role="img"
      aria-label="Status: studying OSCP and RHCSA"
    >
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span className="text-[11px] font-mono text-muted">status</span>
      </div>
      <div className="p-3 font-mono text-xs space-y-1.5">
        {linesToRender.map((line) => (
          <div key={line.prompt}>
            <div className="flex items-center gap-1 text-accent">
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span>{line.prompt}</span>
            </div>
            <p className="ml-4 text-secondary">{line.output}</p>
          </div>
        ))}
        {!showAll && currentLine < TERMINAL_LINES.length && (
          <div>
            <div className="flex items-center gap-1 text-accent">
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span>
                {TERMINAL_LINES[currentLine].prompt.slice(0, typedChars)}
              </span>
              {phase === "typing" && (
                <span
                  className="inline-block w-1.5 h-3.5 bg-accent animate-blink"
                  aria-hidden="true"
                />
              )}
            </div>
            {phase === "output" && (
              <p className="ml-4 text-secondary">
                {TERMINAL_LINES[currentLine].output}
              </p>
            )}
          </div>
        )}
        {showAll && (
          <div className="flex items-center gap-1 text-accent">
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span
              className="inline-block w-1.5 h-3.5 bg-accent animate-blink"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-[100svh] flex items-center px-6 pt-28 pb-16"
      aria-labelledby="hero-heading"
    >
      <div className="relative z-10 mx-auto max-w-6xl w-full grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p
            className="text-xs font-mono uppercase tracking-[0.16em] text-accent animate-reveal-in"
            style={{ animationDelay: "0ms" }}
          >
            Open to full-time roles
          </p>

          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[1.08] tracking-[-0.02em] text-foreground animate-reveal-in"
            style={{ animationDelay: "120ms" }}
          >
            {SITE.name}
          </h1>

          <p
            className="text-lg sm:text-xl text-secondary leading-snug animate-reveal-in"
            style={{ animationDelay: "220ms" }}
          >
            {SITE.primaryLine}
          </p>

          <div
            className="flex flex-wrap gap-2 animate-reveal-in"
            style={{ animationDelay: "300ms" }}
          >
            {SITE.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-accent"
              >
                {tag}
              </span>
            ))}
          </div>

          <p
            className="max-w-lg text-base text-muted leading-relaxed animate-reveal-in"
            style={{ animationDelay: "380ms" }}
          >
            I design identity and cloud controls that hold up under audit —
            Zero Trust IAM, vulnerability management, and detection with
            Rapid7. Secure-by-default is the default, not a slogan.
          </p>

          <div
            className="flex flex-wrap gap-3 animate-reveal-in"
            style={{ animationDelay: "460ms" }}
          >
            <a
              href="#work"
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium btn-primary btn-press"
            >
              View work
            </a>
            <Link
              href={SITE.resumeHref}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium btn-ghost btn-press"
            >
              Resume
            </Link>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-3 auto-rows-fr animate-reveal-in"
          style={{ animationDelay: "520ms" }}
        >
          <Link
            href="/work/zero-trust-iam"
            className="col-span-2 sm:col-span-1 sm:row-span-2 rounded-xl border border-border bg-card p-5 card-hover-lift border-l-2 border-l-accent flex flex-col justify-between min-h-[180px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-accent">
                Flagship
              </p>
              <p className="mt-2 text-lg font-medium text-foreground leading-snug">
                Zero Trust IAM
              </p>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                40,000 identities · Microsoft Entra ID · 100% Conditional Access
                enforcement in validation.
              </p>
            </div>
            <span className="mt-4 text-xs text-accent">Read the notes →</span>
          </Link>

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted">
              Availability
            </p>
            <p className="mt-2 text-sm text-foreground leading-snug">
              Open to security engineering and SOC analyst roles. Remote, US.
            </p>
          </div>

          <StatusTerminal />

          <div className="col-span-2 rounded-xl border border-border bg-card p-4">
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted mb-2">
              Stack in practice
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Rapid7 InsightVM",
                "InsightIDR",
                "InsightAppSec",
                "Security+",
                "CySA+",
                "PenTest+",
                "Entra ID",
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-md border border-border bg-elevated px-2 py-0.5 text-[11px] font-mono text-secondary"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
