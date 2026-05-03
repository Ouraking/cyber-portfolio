"use client";

import { CheckCircle2, Circle, Target } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type MilestoneStatus = "completed" | "in-progress" | "planned";

interface Milestone {
  title: string;
  description: string;
  date: string;
  status: MilestoneStatus;
  items?: string[];
}

const MILESTONES: Milestone[] = [
  {
    title: "CompTIA Certifications",
    description:
      "Full CompTIA security track — from networking fundamentals through offensive testing and threat analysis.",
    date: "Completed",
    status: "completed",
    items: ["Security+", "Network+", "CySA+", "PenTest+"],
  },
  {
    title: "Rapid7 Certifications",
    description:
      "Certified across the Rapid7 Insight platform — vulnerability management, endpoint detection, and application security.",
    date: "Completed",
    status: "completed",
    items: ["InsightVM", "InsightIDR", "InsightAppSec"],
  },
  {
    title: "Microsoft Fundamentals",
    description:
      "Azure cloud, security/compliance, and AI fundamentals — demonstrating breadth across the Microsoft ecosystem.",
    date: "Completed",
    status: "completed",
    items: ["AZ-900", "SC-900", "AI-900"],
  },
  {
    title: "Cloud & IT Foundations",
    description:
      "Industry-recognized cloud and IT baseline certifications covering infrastructure, networking, and security principles.",
    date: "Completed",
    status: "completed",
    items: ["AWS Cloud Practitioner", "Google IT Support", "ISC2 CC"],
  },
  {
    title: "RHCSA (Red Hat Certified System Administrator)",
    description:
      "Linux system administration — managing users, storage, networking, and security on RHEL environments.",
    date: "2026",
    status: "in-progress",
  },
  {
    title: "OSCP (OffSec PEN-200)",
    description:
      "Hands-on penetration testing certification with a 24-hour practical exam. The gold standard for offensive security.",
    date: "2026",
    status: "planned",
  },
];

const STATUS_CONFIG: Record<
  MilestoneStatus,
  { icon: typeof CheckCircle2; colorClass: string; borderClass: string; bgClass: string; label: string }
> = {
  completed: {
    icon: CheckCircle2,
    colorClass: "text-accent-emerald",
    borderClass: "border-accent-emerald/30",
    bgClass: "bg-accent-emerald/10",
    label: "Completed",
  },
  "in-progress": {
    icon: Target,
    colorClass: "text-accent",
    borderClass: "border-accent/30",
    bgClass: "bg-accent/10",
    label: "In Progress",
  },
  planned: {
    icon: Circle,
    colorClass: "text-muted",
    borderClass: "border-border-light",
    bgClass: "bg-surface",
    label: "Planned",
  },
};

function TimelineMilestone({
  milestone,
  isLast,
}: {
  milestone: Milestone;
  isLast: boolean;
}) {
  const config = STATUS_CONFIG[milestone.status];
  const Icon = config.icon;

  return (
    <div className="relative flex gap-5">
      {/* Icon + line */}
      <div className="flex flex-col items-center">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${config.borderClass} ${config.bgClass} ${
            milestone.status === "in-progress" ? "animate-glow-pulse" : ""
          }`}
        >
          <Icon className={`h-4 w-4 ${config.colorClass}`} aria-hidden="true" />
        </div>
        {!isLast && (
          <div
            className={`w-px flex-1 mt-1 min-h-[24px] ${
              milestone.status === "completed"
                ? "bg-accent-emerald/25"
                : milestone.status === "in-progress"
                ? "bg-gradient-to-b from-accent/25 to-border-light/40"
                : "bg-border-light/30"
            }`}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Card */}
      <div className={`group pb-8 ${isLast ? "pb-0" : ""} flex-1 min-w-0`}>
        <div className="rounded-2xl border border-border-light bg-card/50 p-5 card-hover-lift hover:border-border-light/80">
          {/* Title + status badge */}
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <h3 className="text-sm font-semibold text-foreground">{milestone.title}</h3>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono ${config.colorClass} ${config.borderClass}`}
            >
              {config.label}
            </span>
          </div>

          <p className="text-xs text-muted-light leading-relaxed">{milestone.description}</p>

          {/* Cert badges */}
          {milestone.items && milestone.items.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {milestone.items.map((item) => (
                <span
                  key={item}
                  className={`rounded-md border px-2 py-1 text-[10px] font-mono ${
                    milestone.status === "completed"
                      ? "border-accent-emerald/20 bg-accent-emerald/5 text-accent-emerald"
                      : "border-border-light bg-surface text-muted"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          {/* Date */}
          <p className="mt-3 text-[10px] font-mono text-muted/50">{milestone.date}</p>
        </div>
      </div>
    </div>
  );
}

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="px-6 py-24"
      aria-labelledby="roadmap-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-14">
            <p className="font-mono text-xs text-accent/70 tracking-[0.2em] uppercase mb-3">
              Certifications
            </p>
            <h2
              id="roadmap-heading"
              className="text-3xl font-bold tracking-tight text-foreground text-balance"
            >
              Security Roadmap
            </h2>
            <p className="mt-3 text-muted-light max-w-lg leading-relaxed">
              Certifications earned, in progress, and on the horizon — mapping the
              journey from foundations to elite offensive security.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="mx-auto max-w-2xl">
          {MILESTONES.map((m, i) => (
            <ScrollReveal
              key={m.title}
              delay={i * 120}
              animation="animate-slide-in-left"
            >
              <TimelineMilestone milestone={m} isLast={i === MILESTONES.length - 1} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
