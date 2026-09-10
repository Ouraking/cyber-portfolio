import { Check, Circle, Target } from "lucide-react";

import { Section, SectionHeader } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  groupEarnedByVendor,
  upcomingCertifications,
  earnedCertifications,
} from "@/data/certifications";

/**
 * Earned credentials as vendor-grouped chips, then the two still in flight.
 *
 * The old roadmap rendered this as a six-node vertical timeline, which spent a
 * full screen of height to say "thirteen certs, two pending". Chips say it in
 * a quarter of the space and are easier to scan for a specific vendor.
 */
export function CertificationsSection() {
  const groups = groupEarnedByVendor();
  const upcoming = upcomingCertifications();
  const earnedCount = earnedCertifications().length;

  return (
    <Section id="certs" labelledBy="certs-heading">
      <SectionHeader
        eyebrow="Credentials"
        title="Certifications"
        titleId="certs-heading"
        description={`${earnedCount} earned across CompTIA, Rapid7, Microsoft, and the cloud foundations, plus the two in progress.`}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {groups.map((group, index) => (
          <ScrollReveal key={group.label} delay={index * 60}>
            <div className="h-full rounded-xl border border-border bg-card p-5">
              <h3 className="text-sm font-medium text-foreground">
                {group.label}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((cert) => (
                  <li
                    key={`${cert.vendor}-${cert.name}`}
                    className="inline-flex items-center gap-1.5 rounded-md border border-success/25 bg-success/5 px-2.5 py-1 font-mono text-xs text-success"
                  >
                    <Check className="h-3 w-3" aria-hidden="true" />
                    {group.label === "Cloud and foundations"
                      ? `${cert.vendor} ${cert.name}`
                      : cert.name}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <h3 className="mt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        In progress and next
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {upcoming.map((cert, index) => {
          const inProgress = cert.status === "in-progress";
          const Icon = inProgress ? Target : Circle;
          return (
            <ScrollReveal key={cert.name} delay={index * 80}>
              <div className="flex h-full gap-4 rounded-xl border border-border bg-card p-5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                    inProgress
                      ? "border-accent/30 bg-accent/10 text-accent"
                      : "border-border text-muted"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-medium text-foreground">
                      {cert.name}
                    </h4>
                    <span
                      className={`rounded-full border px-2 py-0.5 font-mono text-[11px] ${
                        inProgress
                          ? "border-accent/30 text-accent"
                          : "border-border text-muted"
                      }`}
                    >
                      {inProgress ? "In progress" : "Planned"}
                      {cert.target && ` · ${cert.target}`}
                    </span>
                  </div>
                  {cert.note && (
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {cert.note}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}
