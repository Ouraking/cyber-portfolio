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
    date: "May–June 2025",
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
      <div className="relative flex gap-5">
        {/* Timeline indicator */}
        <div className="flex flex-col items-center shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/25 bg-accent/8">
            <BookOpen className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          </div>
          {index < ENTRIES.length - 1 && (
            <div className="w-px flex-1 bg-border-light/40 mt-2" aria-hidden="true" />
          )}
        </div>

        {/* Card */}
        <div className="pb-8 flex-1">
          <div className="rounded-2xl border border-border-light bg-card/50 p-5 card-hover-lift glow-hover-cyan">
            <div className="flex items-center gap-2 text-[11px] text-muted font-mono mb-2.5">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              <time>{entry.date}</time>
            </div>

            <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug">
              {entry.title}
            </h3>

            <p className="text-sm text-muted-light leading-relaxed mb-3.5">
              {entry.summary}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-accent/20 bg-accent/8 px-2 py-0.5 text-[10px] font-mono text-accent"
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
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-14">
            <p className="font-mono text-xs text-accent/70 tracking-[0.2em] uppercase mb-3">
              Growth
            </p>
            <h2
              id="learning-heading"
              className="text-3xl font-bold tracking-tight text-foreground text-balance"
            >
              Learning Log
            </h2>
            <p className="mt-3 text-muted-light max-w-lg leading-relaxed">
              Documenting the journey — labs, certifications, and continuous
              skill development in cybersecurity.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl">
          {ENTRIES.map((entry, index) => (
            <EntryCard key={entry.title} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
