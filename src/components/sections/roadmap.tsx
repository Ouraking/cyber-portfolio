"use client";

import { CheckCircle2, Circle, Target } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type MilestoneStatus = "completed" | "in-progress" | "planned";

interface Milestone {
  title: string;
  description: string;
  date: string;
  status: MilestoneStatus;
  /** Optional list of individual certs within a grouped milestone */
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
  { icon: typeof CheckCircle2; color: string; label: string }
> = {
  completed: {
    icon: CheckCircle2,
    color: "text-accent-emerald",
    label: "Completed",
  },
  "in-progress": {
    icon: Target,
    color: "text-accent-cyan",
    label: "In Progress",
  },
  planned: {
    icon: Circle,
    color: "text-muted",
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
    <div className="relative flex gap-6">
      {/* Vertical line + icon */}
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
            milestone.status === "completed"
              ? "border-accent-emerald/30 bg-accent-emerald/10"
              : milestone.status === "in-progress"
              ? "border-accent-cyan/30 bg-accent-cyan/10 glow-cyan"
              : "border-border bg-card"
          }`}
        >
          <Icon className={`h-5 w-5 ${config.color}`} aria-hidden="true" />
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-border" aria-hidden="true" />
        )}
      </div>

      {/* Content */}
      <div className={`pb-10 ${isLast ? "pb-0" : ""}`}>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-base font-semibold text-foreground">
            {milestone.title}
          </h3>
          <span
            className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
              milestone.status === "completed"
                ? "border-accent-emerald/30 text-accent-emerald"
                : milestone.status === "in-progress"
                ? "border-accent-cyan/30 text-accent-cyan"
                : "border-border text-muted"
            }`}
          >
            {config.label}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted leading-relaxed max-w-md">
          {milestone.description}
        </p>

        {/* Render individual cert badges when grouped */}
        {milestone.items && milestone.items.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {milestone.items.map((item) => (
              <span
                key={item}
                className={`rounded-md border px-2.5 py-1 text-xs font-mono ${
                  milestone.status === "completed"
                    ? "border-accent-emerald/20 bg-accent-emerald/5 text-accent-emerald"
                    : "border-border bg-card text-muted"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <span className="mt-2 inline-block text-xs font-mono text-muted/60">
          {milestone.date}
        </span>
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
          <div className="text-center mb-12">
            <h2
              id="roadmap-heading"
              className="text-3xl font-bold tracking-tight text-foreground"
            >
              Security Roadmap
            </h2>
            <p className="mt-3 text-muted max-w-md mx-auto">
              Certifications earned, in progress, and on the horizon.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="mx-auto max-w-2xl">
          {MILESTONES.map((m, i) => (
            <ScrollReveal key={m.title} delay={i * 150} animation="animate-slide-in-left">
              <TimelineMilestone
                milestone={m}
                isLast={i === MILESTONES.length - 1}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
