"use client";

import {
  Swords,
  ShieldCheck,
  FileCheck,
  Bug,
  Lock,
  Eye,
  Server,
  Scale,
  ScanSearch,
  Cloud,
  Terminal,
  Cpu,
  UserX,
  Activity,
  Radio,
  ScrollText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

/**
 * Proficiency is expressed as one of three named tiers rather than a
 * percentage. A self-assigned "93%" implies a precision no self-assessment
 * has, and reads as inflated to anyone evaluating the claim; a named tier
 * says the same thing honestly.
 */
type Tier = "Advanced" | "Proficient" | "Working";

/** Filled pips per tier, used for the at-a-glance indicator. */
const TIER_RANK: Record<Tier, number> = {
  Working: 1,
  Proficient: 2,
  Advanced: 3,
};

const TIER_LEGEND: { tier: Tier; meaning: string }[] = [
  { tier: "Advanced", meaning: "applied across multiple projects" },
  { tier: "Proficient", meaning: "hands-on in project or lab work" },
  { tier: "Working", meaning: "coursework and guided labs" },
];

interface Skill {
  name: string;
  icon: LucideIcon;
  tier: Tier;
}

interface SkillCategory {
  title: string;
  subtitle: string;
  /** Tailwind color class tokens */
  accentColor: string;
  borderColor: string;
  bgColor: string;
  glowClass: string;
  skills: Skill[];
}

const CATEGORIES: SkillCategory[] = [
  {
    title: "Offensive Security",
    subtitle: "Penetration Testing & Exploitation",
    accentColor: "text-accent-red",
    borderColor: "border-accent-red/30",
    bgColor: "bg-accent-red/5",
    glowClass: "glow-hover-red",
    skills: [
      { name: "Penetration Testing", icon: Swords, tier: "Proficient" },
      { name: "Vulnerability Assessment", icon: Bug, tier: "Advanced" },
      { name: "Exploit Development", icon: Cpu, tier: "Working" },
      { name: "Social Engineering", icon: UserX, tier: "Working" },
      { name: "Metasploit & Burp Suite", icon: ScanSearch, tier: "Proficient" },
    ],
  },
  {
    title: "Defensive Security",
    subtitle: "Detection, Response & Hardening",
    accentColor: "text-accent-blue",
    borderColor: "border-accent-blue/30",
    bgColor: "bg-accent-blue/5",
    glowClass: "glow-hover-blue",
    skills: [
      { name: "Incident Response", icon: ShieldCheck, tier: "Proficient" },
      { name: "Threat Detection & Analysis", icon: Eye, tier: "Advanced" },
      { name: "SIEM Configuration", icon: Activity, tier: "Proficient" },
      { name: "Endpoint Protection", icon: Lock, tier: "Proficient" },
      { name: "Network Monitoring", icon: Radio, tier: "Proficient" },
    ],
  },
  {
    title: "GRC & Compliance",
    subtitle: "Governance, Risk & Regulatory",
    accentColor: "text-accent-amber",
    borderColor: "border-accent-amber/30",
    bgColor: "bg-accent-amber/5",
    glowClass: "glow-hover-amber",
    skills: [
      { name: "Risk Management", icon: Scale, tier: "Advanced" },
      { name: "Compliance Frameworks", icon: FileCheck, tier: "Advanced" },
      { name: "Security Auditing", icon: ScrollText, tier: "Proficient" },
      { name: "Regulatory Requirements", icon: FileCheck, tier: "Advanced" },
    ],
  },
  {
    title: "Tools & Platforms",
    subtitle: "Rapid7 Ecosystem & Infrastructure",
    accentColor: "text-accent-cyan",
    borderColor: "border-accent-cyan/30",
    bgColor: "bg-accent-cyan/5",
    glowClass: "glow-hover-cyan",
    skills: [
      { name: "Rapid7 InsightVM", icon: ScanSearch, tier: "Advanced" },
      { name: "Rapid7 InsightIDR", icon: Eye, tier: "Advanced" },
      { name: "Rapid7 InsightAppSec", icon: ShieldCheck, tier: "Advanced" },
      { name: "Cloud (AWS, Azure, GCP)", icon: Cloud, tier: "Proficient" },
      { name: "Linux & Windows Admin", icon: Server, tier: "Proficient" },
      { name: "Scripting & Automation", icon: Terminal, tier: "Proficient" },
    ],
  },
];

const PIP_COLORS: Record<string, string> = {
  "Offensive Security": "bg-accent-red/70",
  "Defensive Security": "bg-accent-blue/70",
  "GRC & Compliance": "bg-accent-amber/70",
  "Tools & Platforms": "bg-accent-cyan/70",
};

function SkillCard({ category }: { category: SkillCategory }) {
  const pipColorClass = PIP_COLORS[category.title] ?? "bg-accent-cyan/70";

  return (
    <div
      className={`group rounded-xl border ${category.borderColor} ${category.bgColor} p-6 card-hover-lift ${category.glowClass}`}
    >
      <h3 className={`text-lg font-semibold ${category.accentColor}`}>
        {category.title}
      </h3>
      <p className="mt-1 text-xs text-muted">{category.subtitle}</p>

      <ul className="mt-5 space-y-3">
        {category.skills.map((skill) => {
          const Icon = skill.icon;
          const filled = TIER_RANK[skill.tier];
          return (
            <li key={skill.name} className="flex items-center gap-3">
              <Icon
                className={`h-4 w-4 shrink-0 ${category.accentColor}`}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-foreground/80">{skill.name}</span>
                  {/*
                    Pips are decorative: the tier word below carries the meaning,
                    so screen readers get "Advanced" rather than a pip count.
                  */}
                  <span className="flex shrink-0 items-center gap-1" aria-hidden="true">
                    {[1, 2, 3].map((pip) => (
                      <span
                        key={pip}
                        className={`h-1.5 w-1.5 rounded-full ${
                          pip <= filled ? pipColorClass : "bg-border"
                        }`}
                      />
                    ))}
                  </span>
                </div>
                <span className="mt-0.5 block text-[10px] font-mono uppercase tracking-wider text-muted">
                  {skill.tier}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SkillMatrixSection() {
  return (
    <section
      id="skills"
      className="px-6 py-24"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2
              id="skills-heading"
              className="text-3xl font-bold tracking-tight text-foreground"
            >
              Skill Matrix
            </h2>
            <p className="mt-3 text-muted max-w-md mx-auto">
              Capabilities organized by security domain — from offensive
              operations to governance and tooling.
            </p>

            {/* Stating the scale up front is the point: it turns a vague
                self-rating into a claim a reader can actually interpret. */}
            <p className="mt-6 text-xs text-muted/70">
              Self-assessed depth of hands-on experience:
            </p>
            <dl className="mx-auto mt-2 flex max-w-3xl flex-col items-center gap-1.5 text-xs sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2">
              {TIER_LEGEND.map(({ tier, meaning }) => (
                <div key={tier} className="flex items-baseline gap-1.5 whitespace-nowrap">
                  <dt className="font-mono uppercase tracking-wider text-foreground/70">
                    {tier}
                  </dt>
                  <dd className="text-muted/80">{meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ScrollReveal>

        {/* Grid of skill categories */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat, index) => (
            <ScrollReveal key={cat.title} delay={index * 120}>
              <SkillCard category={cat} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
