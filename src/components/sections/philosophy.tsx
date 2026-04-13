"use client";

import { ShieldCheck, Layers, RefreshCw } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Secure by Default",
    description: "Building systems with security as the foundation, not an afterthought. Every layer is hardened from day one.",
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
  },
  {
    icon: Layers,
    title: "Defense in Depth",
    description: "Implementing multiple overlapping security controls so no single point of failure compromises the system.",
    color: "text-accent-emerald",
    bg: "bg-accent-emerald/10",
  },
  {
    icon: RefreshCw,
    title: "Continuous Learning",
    description: "Staying ahead of evolving threats through ongoing research, certifications, and hands-on lab work.",
    color: "text-accent-blue",
    bg: "bg-accent-blue/10",
  },
];

export function PhilosophySection() {
  return (
    <section id="philosophy" className="px-6 py-24" aria-labelledby="philosophy-heading">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 id="philosophy-heading" className="text-3xl font-bold tracking-tight text-foreground">
              Security Philosophy
            </h2>
            <p className="mt-3 text-muted max-w-lg mx-auto">
              Core principles that guide my approach to cybersecurity.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon;
            return (
              <ScrollReveal key={p.title} delay={i * 120}>
                <div className="rounded-xl border border-border bg-card p-6 card-hover-lift glow-hover-cyan hover:border-accent-cyan/20 text-center h-full">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${p.bg} mb-4`}>
                    <Icon className={`h-6 w-6 ${p.color}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
