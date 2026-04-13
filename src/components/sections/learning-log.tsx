"use client";

import { BookOpen, Calendar } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface LogEntry {
  date: string;
  title: string;
  tags: string[];
  summary: string;
}

const ENTRIES: LogEntry[] = [
  {
    date: "April 2026",
    title: "OSCP Lab Progress: Active Directory Attacks",
    tags: ["OSCP", "Active Directory", "Kerberoasting"],
    summary:
      "Completed AD attack chains including Kerberoasting, AS-REP roasting, and Pass-the-Hash. Documented enumeration methodology using BloodHound and PowerView for lateral movement in lab environments.",
  },
  {
    date: "March 2026",
    title: "Zero Trust IAM Capstone Completed",
    tags: ["Zero Trust", "Microsoft Entra ID", "MFA"],
    summary:
      "Designed and validated a centralized IAM solution for 40,000 identities. Achieved 100% Conditional Access policy enforcement across all test scenarios. Published full documentation to GitHub.",
  },
  {
    date: "May-June 2025",
    title: "Rapid7 InsightIDR: Detection Rule Tuning",
    tags: ["Rapid7", "SIEM", "Detection Engineering"],
    summary:
      "Configured custom detection rules in InsightIDR for identifying suspicious PowerShell execution and lateral movement patterns. Reduced false positive rate by tuning alert thresholds.",
  },
  {
    date: "December 2025",
    title: "NIST CSF 2.0 Deep Dive",
    tags: ["NIST", "GRC", "Compliance"],
    summary:
      "Studied the updated NIST Cybersecurity Framework 2.0 including the new Govern function. Applied framework mapping to real-world scenarios in capstone preparation.",
  },
];

function EntryCard({ entry, index }: { entry: LogEntry; index: number }) {
  return (
    <ScrollReveal delay={index * 100}>
      <div className="relative flex gap-4">
        {/* Timeline dot + connector */}
        <div className="flex flex-col items-center shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-accent-cyan/30 bg-accent-cyan/10">
            <BookOpen className="h-4 w-4 text-accent-cyan" aria-hidden="true" />
          </div>
          {index < ENTRIES.length - 1 && (
            <div className="w-px flex-1 bg-border/50 mt-2" aria-hidden="true" />
          )}
        </div>

        {/* Content card */}
        <div className="pb-8 flex-1">
          <div className="rounded-xl border border-border bg-card p-5 card-hover-lift glow-hover-cyan hover:border-accent-cyan/20">
            <div className="flex items-center gap-2 text-xs text-muted font-mono mb-2">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              <time>{entry.date}</time>
            </div>

            <h3 className="text-base font-semibold text-foreground mb-2">
              {entry.title}
            </h3>

            <p className="text-sm text-muted leading-relaxed mb-3">
              {entry.summary}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-accent-cyan/10 px-2 py-0.5 text-[10px] font-mono text-accent-cyan border border-accent-cyan/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function LearningLogSection() {
  return (
    <section
      id="learning"
      className="px-6 py-24"
      aria-labelledby="learning-heading"
    >
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2
              id="learning-heading"
              className="text-3xl font-bold tracking-tight text-foreground"
            >
              Learning Log
            </h2>
            <p className="mt-3 text-muted max-w-lg mx-auto">
              Documenting the journey — certifications, labs, and continuous
              skill development in cybersecurity.
            </p>
          </div>
        </ScrollReveal>

        <div>
          {ENTRIES.map((entry, index) => (
            <EntryCard key={entry.title} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
