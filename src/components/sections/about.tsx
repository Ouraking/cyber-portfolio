"use client";

import {
  GraduationCap,
  MapPin,
  Briefcase,
  Target,
  CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const HIGHLIGHTS = [
  "Penetration Testing & Vulnerability Management",
  "Cloud Security — Azure & AWS",
  "Security Governance, Risk & Compliance (GRC)",
  "Threat Detection, SIEM & SOC Operations",
  "Identity & Access Management (IAM)",
  "Incident Response & Digital Forensics",
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="px-6 py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-14">
            <p className="font-mono text-xs text-accent/70 tracking-[0.2em] uppercase mb-3">
              About
            </p>
            <h2
              id="about-heading"
              className="text-3xl font-bold tracking-tight text-foreground text-balance"
            >
              Who I Am
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* ── Left: Bio & highlights ── */}
          <ScrollReveal className="lg:col-span-3 space-y-6">
            <p className="text-base text-muted-light leading-relaxed">
              I&apos;m a{" "}
              <span className="text-foreground font-semibold">
                Cybersecurity Engineer
              </span>{" "}
              with a deep commitment to building secure, resilient systems. My
              approach combines offensive and defensive mindsets — understanding
              how attackers think to architect defenses that hold under pressure.
            </p>
            <p className="text-base text-muted-light leading-relaxed">
              I specialize in translating technical security findings into
              actionable risk insights for both engineering teams and business
              stakeholders, bridging the gap between deep technical work and
              strategic governance.
            </p>

            {/* Capability highlights */}
            <div className="pt-2">
              <p className="text-xs font-mono text-muted uppercase tracking-widest mb-4">
                Core Capabilities
              </p>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="h-4 w-4 text-accent mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-muted-light leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* ── Right: Credential cards ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Education card — featured */}
            <ScrollReveal delay={100}>
              <div className="relative rounded-2xl border border-accent/30 bg-accent/5 p-6 overflow-hidden">
                {/* Glow accent top-right */}
                <div
                  className="absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-20 blur-2xl bg-accent pointer-events-none"
                  aria-hidden="true"
                />
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-accent/70 uppercase tracking-widest mb-1">
                      Education
                    </p>
                    <h3 className="text-sm font-bold text-foreground leading-snug">
                      Master of Science
                    </h3>
                    <p className="text-sm text-accent font-semibold mt-0.5">
                      Cybersecurity
                    </p>
                    <p className="text-xs text-muted mt-2 leading-relaxed">
                      Graduate-level studies covering network security, cryptography,
                      ethical hacking, digital forensics, and enterprise risk management.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Status card */}
            <ScrollReveal delay={200}>
              <div className="rounded-2xl border border-border-light bg-card/50 p-5 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-emerald/25 bg-accent-emerald/10 text-accent-emerald">
                  <Briefcase className="h-4.5 w-4.5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-muted uppercase tracking-widest mb-1">
                    Status
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Open to Full-Time Roles
                  </p>
                  <p className="text-xs text-muted mt-1">
                    Security Engineering &middot; Penetration Testing &middot; GRC
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Focus card */}
            <ScrollReveal delay={300}>
              <div className="rounded-2xl border border-border-light bg-card/50 p-5 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-amber/25 bg-accent-amber/10 text-accent-amber">
                  <Target className="h-4.5 w-4.5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-muted uppercase tracking-widest mb-1">
                    Current Focus
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    OSCP Preparation
                  </p>
                  <p className="text-xs text-muted mt-1">
                    Offensive security labs &middot; Active directory attacks &middot; CVE research
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Location card */}
            <ScrollReveal delay={400}>
              <div className="rounded-2xl border border-border-light bg-card/50 p-5 flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-blue/25 bg-accent-blue/10 text-accent-blue">
                  <MapPin className="h-4.5 w-4.5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-muted uppercase tracking-widest mb-1">
                    Location
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Available Globally &middot; Remote Ready
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
