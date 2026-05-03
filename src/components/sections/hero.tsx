"use client";

import { useEffect, useState } from "react";
import {
  ChevronRight,
  ArrowRight,
  Download,
  Shield,
  Cpu,
  Globe,
  Lock,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Terminal Lines
   ──────────────────────────────────────────────────────────── */
const TERMINAL_LINES = [
  { prompt: "$ whoami", output: "security-researcher & engineer", delay: 600 },
  { prompt: "$ cat /etc/status", output: "[ ACTIVE ] Studying for OSCP", delay: 800 },
  { prompt: "$ uptime", output: "365+ days in cybersecurity", delay: 700 },
  {
    prompt: "$ nmap -sV portfolio",
    output: "All services secured. 0 vulnerabilities found.",
    delay: 900,
  },
];

function LiveTerminal() {
  const [currentLine, setCurrentLine] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output" | "done">("typing");
  const [typedChars, setTypedChars] = useState(0);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  useEffect(() => {
    if (currentLine >= TERMINAL_LINES.length) {
      setPhase("done");
      return;
    }
    const line = TERMINAL_LINES[currentLine];

    if (phase === "typing") {
      if (typedChars < line.prompt.length) {
        const t = setTimeout(() => setTypedChars((c) => c + 1), 32);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("output"), 180);
      return () => clearTimeout(t);
    }

    if (phase === "output") {
      const t = setTimeout(() => {
        setCompletedLines((prev) => [...prev, currentLine]);
        setCurrentLine((l) => l + 1);
        setPhase("typing");
        setTypedChars(0);
      }, line.delay);
      return () => clearTimeout(t);
    }
  }, [currentLine, phase, typedChars]);

  return (
    <div
      className="w-full rounded-xl border border-border-light bg-card overflow-hidden animate-glow-pulse"
      role="img"
      aria-label="Terminal showing live status information"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border-light/60 px-4 py-3 bg-surface/60">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-red/60" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-amber/60" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-emerald/60" aria-hidden="true" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-[11px] text-muted font-mono tracking-wide">
            status@portfolio ~ bash
          </span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm space-y-3 terminal-scrollbar min-h-[180px]">
        {completedLines.map((idx) => (
          <div key={idx} className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-accent">
              <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
              <span>{TERMINAL_LINES[idx].prompt}</span>
            </div>
            <p className="ml-5 text-muted-light text-xs">{TERMINAL_LINES[idx].output}</p>
          </div>
        ))}

        {currentLine < TERMINAL_LINES.length && (
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-accent">
              <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
              <span>{TERMINAL_LINES[currentLine].prompt.slice(0, typedChars)}</span>
              {phase === "typing" && (
                <span
                  className="inline-block w-1.5 h-[14px] bg-accent animate-blink"
                  aria-hidden="true"
                />
              )}
            </div>
            {phase === "output" && (
              <p className="ml-5 text-muted-light text-xs">
                {TERMINAL_LINES[currentLine].output}
              </p>
            )}
          </div>
        )}

        {phase === "done" && (
          <div className="flex items-center gap-1.5 text-accent">
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="inline-block w-1.5 h-[14px] bg-accent animate-blink" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Floating Badge
   ──────────────────────────────────────────────────────────── */
function FloatingBadge({
  icon: Icon,
  label,
  sub,
  color,
  className,
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute hidden lg:flex items-center gap-2.5 rounded-xl border border-border-light bg-card/90 backdrop-blur-sm px-3 py-2.5 shadow-xl animate-float ${className}`}
      aria-hidden="true"
    >
      <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-foreground/90 leading-none">{label}</p>
        <p className="text-[10px] text-muted mt-0.5 leading-none">{sub}</p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Hero Section
   ──────────────────────────────────────────────────────────── */
export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-20"
      aria-labelledby="hero-heading"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-100" aria-hidden="true" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,229,255,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(5,8,16,0.8))",
        }}
        aria-hidden="true"
      />

      {/* Floating skill badges */}
      <FloatingBadge
        icon={Shield}
        label="Penetration Testing"
        sub="Offensive Security"
        color="bg-accent-red/10 text-accent-red"
        className="top-28 left-8 xl:left-16 animation-delay-0"
      />
      <FloatingBadge
        icon={Globe}
        label="Cloud Security"
        sub="Azure & AWS"
        color="bg-accent-blue/10 text-accent-blue"
        className="top-48 right-8 xl:right-16"
        style={{ animationDelay: "1.2s" } as React.CSSProperties}
      />
      <FloatingBadge
        icon={Lock}
        label="Zero Trust"
        sub="IAM & Identity"
        color="bg-accent-emerald/10 text-accent-emerald"
        className="bottom-36 left-12 xl:left-24"
        style={{ animationDelay: "0.8s" } as React.CSSProperties}
      />
      <FloatingBadge
        icon={Cpu}
        label="SIEM & SOC"
        sub="Threat Detection"
        color="bg-accent-amber/10 text-accent-amber"
        className="bottom-48 right-12 xl:right-24"
        style={{ animationDelay: "1.8s" } as React.CSSProperties}
      />

      <div className="relative z-10 mx-auto max-w-5xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* ── Left: Text content ── */}
        <div className="flex-1 text-center lg:text-left space-y-7">
          {/* Status badge */}
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/6 px-3.5 py-1.5 text-xs font-mono text-accent transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            Open to Full-Time Security Roles
          </div>

          {/* Name */}
          <div
            className={`transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] text-balance"
            >
              <span className="text-foreground">Koffi Jean-Marie</span>
              <br />
              <span className="text-accent glow-text">Amedjonekou</span>
            </h1>
          </div>

          {/* Role chip */}
          <div
            className={`transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "220ms" }}
          >
            <span className="inline-block font-mono text-sm tracking-[0.18em] uppercase text-muted-light border-l-2 border-accent pl-3">
              Cybersecurity Engineer
            </span>
          </div>

          {/* Bio */}
          <p
            className={`max-w-md text-base text-muted-light leading-relaxed mx-auto lg:mx-0 transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "320ms" }}
          >
            Dedicated cybersecurity professional with hands-on expertise across
            penetration testing, vulnerability management, cloud security, and
            governance frameworks. Committed to{" "}
            <span className="text-foreground/90 font-medium">secure-by-default</span>{" "}
            in every technical decision.
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-wrap gap-3 justify-center lg:justify-start transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "420ms" }}
          >
            <a
              href="#labs"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background btn-press hover:bg-accent-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              View My Work
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border-light bg-surface/50 px-5 py-2.5 text-sm font-medium text-muted-light btn-press hover:text-foreground hover:border-border-light/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Get in Touch
            </a>
          </div>

          {/* Micro stats row */}
          <div
            className={`flex flex-wrap gap-6 justify-center lg:justify-start transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            {[
              { value: "10+", label: "Certifications" },
              { value: "4+", label: "Projects" },
              { value: "6", label: "Security Domains" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center lg:text-left">
                <p className="text-xl font-bold font-mono text-foreground">{value}</p>
                <p className="text-xs text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Terminal ── */}
        <div
          className={`flex-1 flex justify-center lg:justify-end w-full max-w-xl transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <LiveTerminal />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-all duration-700 ease-out ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "800ms" }}
        aria-hidden="true"
      >
        <div className="h-8 w-px bg-gradient-to-b from-transparent to-accent/40" />
        <span className="text-[10px] font-mono text-muted/50 tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}
