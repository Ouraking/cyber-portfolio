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

type Tier = "Advanced" | "Proficient" | "Working";

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
  skills: Skill[];
}

const CATEGORIES: SkillCategory[] = [
  {
    title: "Offensive Security",
    subtitle: "Penetration testing & exploitation",
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
    subtitle: "Detection, response & hardening",
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
    subtitle: "Governance, risk & regulatory",
    skills: [
      { name: "Risk Management", icon: Scale, tier: "Advanced" },
      { name: "Compliance Frameworks", icon: FileCheck, tier: "Advanced" },
      { name: "Security Auditing", icon: ScrollText, tier: "Proficient" },
      { name: "Regulatory Requirements", icon: FileCheck, tier: "Advanced" },
    ],
  },
  {
    title: "Tools & Platforms",
    subtitle: "Rapid7 ecosystem & infrastructure",
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

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 h-full card-hover-lift">
      <h3 className="text-lg font-medium text-foreground">{category.title}</h3>
      <p className="mt-1 text-xs text-muted">{category.subtitle}</p>

      <ul className="mt-5 space-y-3">
        {category.skills.map((skill) => {
          const Icon = skill.icon;
          const filled = TIER_RANK[skill.tier];
          return (
            <li key={skill.name} className="flex items-center gap-3">
              <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-secondary">{skill.name}</span>
                  <span className="flex shrink-0 items-center gap-1" aria-hidden="true">
                    {[1, 2, 3].map((pip) => (
                      <span
                        key={pip}
                        className={`h-1.5 w-1.5 rounded-full ${
                          pip <= filled ? "bg-accent" : "bg-border"
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
    <section id="skills" className="px-6 py-24" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-12 max-w-2xl">
            <h2
              id="skills-heading"
              className="font-display text-3xl sm:text-4xl tracking-tight text-foreground"
            >
              Skills
            </h2>
            <p className="mt-3 text-muted">
              Capabilities by domain — from offensive operations to governance
              and tooling.
            </p>
            <dl className="mt-5 flex flex-col gap-1.5 text-xs sm:flex-row sm:flex-wrap sm:gap-x-6">
              {TIER_LEGEND.map(({ tier, meaning }) => (
                <div key={tier} className="flex items-baseline gap-1.5">
                  <dt className="font-mono uppercase tracking-wider text-secondary">
                    {tier}
                  </dt>
                  <dd className="text-muted">{meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-2">
          {CATEGORIES.map((cat, index) => (
            <ScrollReveal key={cat.title} delay={index * 80}>
              <SkillCard category={cat} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
