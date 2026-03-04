"use client";

import { useEffect, useState, useCallback } from "react";
import { Terminal as TerminalIcon, ChevronRight } from "lucide-react";

/**
 * Terminal-style status component with character-by-character typing.
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
        const timeout = setTimeout(() => {
          setTypedChars((c) => c + 1);
        }, 35);
        return () => clearTimeout(timeout);
      } else {
        // Prompt fully typed, pause then show output
        const timeout = setTimeout(() => {
          setPhase("output");
        }, 200);
        return () => clearTimeout(timeout);
      }
    }

    if (phase === "output") {
      // Output appears instantly, then pause before next line
      const timeout = setTimeout(() => {
        setCompletedLines((prev) => [...prev, currentLine]);
        setCurrentLine((l) => l + 1);
        setPhase("typing");
        setTypedChars(0);
      }, line.delay);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, phase, typedChars]);

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
        {/* Completed lines */}
        {completedLines.map((idx) => (
          <div key={idx}>
            <div className="flex items-center gap-1 text-accent-emerald">
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span>{TERMINAL_LINES[idx].prompt}</span>
            </div>
            <p className="ml-4 text-foreground/80">{TERMINAL_LINES[idx].output}</p>
          </div>
        ))}

        {/* Currently typing line */}
        {currentLine < TERMINAL_LINES.length && (
          <div>
            <div className="flex items-center gap-1 text-accent-emerald">
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span>{TERMINAL_LINES[currentLine].prompt.slice(0, typedChars)}</span>
              {phase === "typing" && (
                <span className="inline-block w-2 h-4 bg-accent-cyan animate-blink" aria-hidden="true" />
              )}
            </div>
            {phase === "output" && (
              <p className="ml-4 text-foreground/80">{TERMINAL_LINES[currentLine].output}</p>
            )}
          </div>
        )}

        {/* Final cursor after all lines are done */}
        {phase === "done" && (
          <div className="flex items-center gap-1 text-accent-emerald">
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="inline-block w-2 h-4 bg-accent-cyan animate-blink" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-mono text-accent-cyan transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0ms" }}
          >
            <TerminalIcon className="h-3 w-3" aria-hidden="true" />
            <span>Available for internships &amp; collaborations</span>
          </div>

          <h1
            id="hero-heading"
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <span className="text-foreground">Koffi Jean-Marie</span>
            <br />
            <span className="text-foreground">Amedjonekou</span>
          </h1>

          <p
            className={`text-xl sm:text-2xl font-medium text-accent-cyan font-mono tracking-wide transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "250ms" }}
          >
            Security Researcher
          </p>

          <p
            className={`max-w-lg text-lg text-muted leading-relaxed mx-auto lg:mx-0 transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            Dedicated cybersecurity professional with hands-on expertise across
            penetration testing, vulnerability management, cloud security, and
            governance frameworks. Committed to the principle of
            &lsquo;secure-by-default&rsquo; in every technical decision.
          </p>

          <div
            className={`flex flex-wrap gap-4 justify-center lg:justify-start transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <a
              href="#labs"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 px-5 py-2.5 text-sm font-medium text-accent-cyan btn-press hover:bg-accent-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted btn-press hover:text-foreground hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Terminal widget */}
        <div
          className={`flex-1 flex justify-center lg:justify-end w-full transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          <LiveTerminal />
        </div>
      </div>
    </section>
  );
}
