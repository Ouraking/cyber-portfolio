"use client";

import { ShieldCheck, Layers, RefreshCw } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Secure by Default",
    description:
      "Building systems with security as the foundation, not an afterthought. Every layer is hardened from day one.",
    accentClass: "text-accent",
    bgClass: "bg-accent/10 border-accent/20",
    glowClass: "glow-hover-cyan",
    number: "01",
  },
  {
    icon: Layers,
    title: "Defense in Depth",
    description:
      "Implementing multiple overlapping security controls so no single point of failure compromises the system.",
    accentClass: "text-accent-emerald",
    bgClass: "bg-accent-emerald/10 border-accent-emerald/20",
    glowClass: "glow-hover-emerald",
    number: "02",
  },
  {
    icon: RefreshCw,
    title: "Continuous Learning",
    description:
      "Staying ahead of evolving threats through ongoing research, certifications, and hands-on lab work.",
    accentClass: "text-accent-blue",
    bgClass: "bg-accent-blue/10 border-accent-blue/20",
    glowClass: "glow-hover-blue",
    number: "03",
  },
];

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="px-6 py-24"
      aria-labelledby="philosophy-heading"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-14">
            <p className="font-mono text-xs text-accent/70 tracking-[0.2em] uppercase mb-3">
              Principles
            </p>
            <h2
              id="philosophy-heading"
              className="text-3xl font-bold tracking-tight text-foreground text-balance"
            >
              Security Philosophy
            </h2>
            <p className="mt-3 text-muted-light max-w-lg leading-relaxed">
              Core principles that guide my approach to cybersecurity —
              from architecture decisions to daily practice.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-3">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon;
            return (
              <ScrollReveal key={p.title} delay={i * 120}>
                <div
                  className={`group relative rounded-2xl border border-border-light bg-card/50 p-7 card-hover-lift ${p.glowClass} h-full overflow-hidden`}
                >
                  {/* Large number watermark */}
                  <span
                    className="absolute top-4 right-5 font-mono text-5xl font-bold text-border-light/30 select-none pointer-events-none transition-all duration-300 group-hover:text-border-light/50"
                    aria-hidden="true"
                  >
                    {p.number}
                  </span>

                  {/* Icon */}
                  <div
                    className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${p.bgClass} ${p.accentClass}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className={`text-base font-semibold ${p.accentClass} mb-2`}>
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-light leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
