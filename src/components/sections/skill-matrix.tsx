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

interface Skill {
  name: string;
  icon: LucideIcon;
  level: number;
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
      { name: "Penetration Testing", icon: Swords, level: 82 },
      { name: "Vulnerability Assessment", icon: Bug, level: 88 },
      { name: "Exploit Development", icon: Cpu, level: 72 },
      { name: "Social Engineering", icon: UserX, level: 75 },
      { name: "Metasploit & Burp Suite", icon: ScanSearch, level: 80 },
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
      { name: "Incident Response", icon: ShieldCheck, level: 85 },
      { name: "Threat Detection & Analysis", icon: Eye, level: 90 },
      { name: "SIEM Configuration", icon: Activity, level: 83 },
      { name: "Endpoint Protection", icon: Lock, level: 80 },
      { name: "Network Monitoring", icon: Radio, level: 87 },
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
      { name: "Risk Management", icon: Scale, level: 88 },
      { name: "Compliance Frameworks", icon: FileCheck, level: 92 },
      { name: "Security Auditing", icon: ScrollText, level: 85 },
      { name: "Regulatory Requirements", icon: FileCheck, level: 90 },
    ],
  },
  {
    title: "Tools & Platforms",
    subtitle: "Infrastructure & Automation",
    accentColor: "text-accent-cyan",
    borderColor: "border-accent-cyan/30",
    bgColor: "bg-accent-cyan/5",
    glowClass: "glow-hover-cyan",
    skills: [
      { name: "Rapid7 InsightVM", icon: ScanSearch, level: 93 },
      { name: "Cloud (AWS, Azure, GCP)", icon: Cloud, level: 82 },
      { name: "Linux & Windows Admin", icon: Server, level: 85 },
      { name: "Scripting & Automation", icon: Terminal, level: 78 },
    ],
  },
];

const BAR_COLORS: Record<string, string> = {
  "Offensive Security": "bg-accent-red/60",
  "Defensive Security": "bg-accent-blue/60",
  "GRC & Compliance": "bg-accent-amber/60",
  "Tools & Platforms": "bg-accent-cyan/60",
};

function SkillCard({ category }: { category: SkillCategory }) {
  const barColorClass = BAR_COLORS[category.title] ?? "bg-accent-cyan/60";

  return (
    <div
      className={`group rounded-xl border ${category.borderColor} ${category.bgColor} p-6 card-hover-lift ${category.glowClass}`}
    >
      <h3 className={`text-lg font-semibold ${category.accentColor}`}>
        {category.title}
      </h3>
      <p className="mt-1 text-xs text-muted">{category.subtitle}</p>

      <ul className="mt-5 space-y-3" role="list">
        {category.skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <li key={skill.name} className="flex items-center gap-3">
              <Icon
                className={`h-4 w-4 shrink-0 ${category.accentColor}`}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-foreground/80">{skill.name}</span>
                  <span className="text-[10px] font-mono text-muted">{skill.level}%</span>
                </div>
                <div className="mt-1 h-1 w-full rounded-full bg-border/50 overflow-hidden">
                  <div
                    className={`h-full rounded-full animate-bar-fill ${barColorClass}`}
                    style={{ width: `${skill.level}%` }}
                    role="meter"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency: ${skill.level}%`}
                  />
                </div>
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
