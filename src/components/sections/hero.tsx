"use client";

import { useEffect, useState } from "react";
import { Terminal as TerminalIcon, ChevronRight } from "lucide-react";

/**
 * Terminal-style status component.
 * Lines are typed out sequentially for a "live system" feel.
 * All content is static — no user-controlled input is rendered,
 * eliminating XSS risk in this component.
 */
const TERMINAL_LINES = [
  { prompt: "$ whoami", output: "security-researcher", delay: 600 },
  { prompt: "$ cat /etc/status", output: "[ ACTIVE ] Studying for OSCP", delay: 800 },
  { prompt: "$ uptime", output: "365+ days in cybersecurity", delay: 700 },
  { prompt: "$ nmap -sV portfolio", output: "All services secured. 0 vulnerabilities found.", delay: 900 },
];

function LiveTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= TERMINAL_LINES.length) return;

    const timeout = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, TERMINAL_LINES[visibleLines].delay);

    return () => clearTimeout(timeout);
  }, [visibleLines]);

  return (
    <div
      className="w-full max-w-xl rounded-lg border border-border bg-card overflow-hidden glow-cyan"
      role="img"
      aria-label="Terminal showing live status information"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 bg-card">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/70" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-amber-400/70" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/70" aria-hidden="true" />
        </div>
        <span className="ml-2 text-xs text-muted font-mono">status@portfolio ~ </span>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-sm space-y-2 terminal-scrollbar min-h-[160px]">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i}>
            <div className="flex items-center gap-1 text-accent-emerald">
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span>{line.prompt}</span>
            </div>
            <p className="ml-4 text-foreground/80">{line.output}</p>
          </div>
        ))}
        {visibleLines < TERMINAL_LINES.length && (
          <span className="inline-block w-2 h-4 bg-accent-cyan animate-blink" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16"
      aria-labelledby="hero-heading"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-mono text-accent-cyan">
            <TerminalIcon className="h-3 w-3" aria-hidden="true" />
            <span>Available for internships &amp; collaborations</span>
          </div>

          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            <span className="text-foreground">Koffi Jean-Marie</span>
            <br />
            <span className="text-foreground">Amedjonekou</span>
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-accent-cyan font-mono tracking-wide">
            Security Researcher
          </p>

          <p className="max-w-lg text-lg text-muted leading-relaxed mx-auto lg:mx-0">
            Dedicated cybersecurity professional with hands-on expertise across
            penetration testing, vulnerability management, cloud security, and
            governance frameworks. Committed to the principle of
            &lsquo;secure-by-default&rsquo; in every technical decision.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="#labs"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 px-5 py-2.5 text-sm font-medium text-accent-cyan transition-colors hover:bg-accent-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Terminal widget */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <LiveTerminal />
        </div>
      </div>
    </section>
  );
}
