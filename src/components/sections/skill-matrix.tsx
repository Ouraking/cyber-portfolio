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
      { name: "Penetration Testing", icon: Swords },
      { name: "Vulnerability Assessment", icon: Bug },
      { name: "Exploit Development", icon: Cpu },
      { name: "Social Engineering", icon: UserX },
      { name: "Metasploit & Burp Suite", icon: ScanSearch },
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
      { name: "Incident Response", icon: ShieldCheck },
      { name: "Threat Detection & Analysis", icon: Eye },
      { name: "SIEM Configuration", icon: Activity },
      { name: "Endpoint Protection", icon: Lock },
      { name: "Network Monitoring", icon: Radio },
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
      { name: "Risk Management", icon: Scale },
      { name: "Compliance Frameworks", icon: FileCheck },
      { name: "Security Auditing", icon: ScrollText },
      { name: "Regulatory Requirements", icon: FileCheck },
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
      { name: "Rapid7 InsightVM", icon: ScanSearch },
      { name: "Cloud (AWS, Azure, GCP)", icon: Cloud },
      { name: "Linux & Windows Admin", icon: Server },
      { name: "Scripting & Automation", icon: Terminal },
    ],
  },
];

function SkillCard({ category }: { category: SkillCategory }) {
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
                className={`h-4 w-4 shrink-0 ${category.accentColor} transition-transform duration-200 group-hover:scale-110`}
                aria-hidden="true"
              />
              <span className="text-sm text-foreground/80">{skill.name}</span>
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
