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
  accentClass: string;
  borderClass: string;
  bgClass: string;
  barClass: string;
  glowClass: string;
  skills: Skill[];
}

const CATEGORIES: SkillCategory[] = [
  {
    title: "Offensive",
    subtitle: "Penetration Testing & Exploitation",
    accentClass: "text-accent-red",
    borderClass: "border-accent-red/20",
    bgClass: "bg-accent-red/5",
    barClass: "bg-accent-red/70",
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
    title: "Defensive",
    subtitle: "Detection, Response & Hardening",
    accentClass: "text-accent-blue",
    borderClass: "border-accent-blue/20",
    bgClass: "bg-accent-blue/5",
    barClass: "bg-accent-blue/70",
    glowClass: "glow-hover-blue",
    skills: [
      { name: "Incident Response", icon: ShieldCheck, level: 85 },
      { name: "Threat Detection", icon: Eye, level: 90 },
      { name: "SIEM Configuration", icon: Activity, level: 83 },
      { name: "Endpoint Protection", icon: Lock, level: 80 },
      { name: "Network Monitoring", icon: Radio, level: 87 },
    ],
  },
  {
    title: "GRC",
    subtitle: "Governance, Risk & Regulatory",
    accentClass: "text-accent-amber",
    borderClass: "border-accent-amber/20",
    bgClass: "bg-accent-amber/5",
    barClass: "bg-accent-amber/70",
    glowClass: "glow-hover-amber",
    skills: [
      { name: "Risk Management", icon: Scale, level: 88 },
      { name: "Compliance Frameworks", icon: FileCheck, level: 92 },
      { name: "Security Auditing", icon: ScrollText, level: 85 },
      { name: "Regulatory Requirements", icon: FileCheck, level: 90 },
    ],
  },
  {
    title: "Tools",
    subtitle: "Rapid7 & Infrastructure",
    accentClass: "text-accent",
    borderClass: "border-accent/20",
    bgClass: "bg-accent/5",
    barClass: "bg-accent/70",
    glowClass: "glow-hover-cyan",
    skills: [
      { name: "Rapid7 InsightVM", icon: ScanSearch, level: 93 },
      { name: "Rapid7 InsightIDR", icon: Eye, level: 90 },
      { name: "Rapid7 InsightAppSec", icon: ShieldCheck, level: 88 },
      { name: "Cloud (AWS, Azure, GCP)", icon: Cloud, level: 82 },
      { name: "Linux & Windows Admin", icon: Server, level: 85 },
      { name: "Scripting & Automation", icon: Terminal, level: 78 },
    ],
  },
];

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div
      className={`group rounded-2xl border ${category.borderClass} ${category.bgClass} p-6 card-hover-lift ${category.glowClass}`}
    >
      {/* Header */}
      <div className="mb-5">
        <h3 className={`text-base font-semibold ${category.accentClass}`}>
          {category.title}
        </h3>
        <p className="mt-0.5 text-[11px] text-muted tracking-wide">{category.subtitle}</p>
      </div>

      {/* Skills */}
      <ul className="space-y-3.5" role="list">
        {category.skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <li key={skill.name} className="flex items-center gap-3">
              <Icon
                className={`h-3.5 w-3.5 shrink-0 ${category.accentClass} opacity-80`}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs text-foreground/80 truncate">{skill.name}</span>
                  <span className={`text-[10px] font-mono ${category.accentClass} shrink-0`}>
                    {skill.level}%
                  </span>
                </div>
                <div className="h-0.5 w-full rounded-full bg-border-light overflow-hidden">
                  <div
                    className={`h-full rounded-full animate-bar-fill ${category.barClass}`}
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
      className="px-6 py-24 relative"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-14">
            <p className="font-mono text-xs text-accent/70 tracking-[0.2em] uppercase mb-3">
              Capabilities
            </p>
            <h2
              id="skills-heading"
              className="text-3xl font-bold tracking-tight text-foreground text-balance"
            >
              Skill Matrix
            </h2>
            <p className="mt-3 text-muted-light max-w-lg leading-relaxed">
              Capabilities organized by security domain — from offensive operations
              to governance and tooling.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat, index) => (
            <ScrollReveal key={cat.title} delay={index * 100}>
              <SkillCard category={cat} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
