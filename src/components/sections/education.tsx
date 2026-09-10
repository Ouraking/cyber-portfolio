import Link from "next/link";

import { Section, SectionHeader } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { EDUCATION, hasEducationPlaceholders } from "@/data/education";

/**
 * The degree was previously visible only as a code comment ("Masters in
 * Cybersecurity Projects") above the project array — the single largest
 * content gap on a site aimed at recruiters.
 *
 * While data/education.ts still holds [BRACKETED] placeholders the section
 * renders a visible warning. That is deliberate: silently shipping a
 * plausible-looking blank is worse than an obvious one, and this is the last
 * thing standing between the rebuild and a deploy.
 */
export function EducationSection() {
  const placeholders = hasEducationPlaceholders();

  return (
    <Section id="education" labelledBy="education-heading">
      <SectionHeader
        eyebrow="Background"
        title="Education"
        titleId="education-heading"
      />

      {placeholders && (
        <p
          className="mb-5 rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 font-mono text-xs text-danger"
          role="note"
        >
          Placeholder content — fill in src/data/education.ts before deploying.
        </p>
      )}

      <div className="space-y-5">
        {EDUCATION.map((entry, index) => (
          <ScrollReveal key={entry.degree + entry.field} delay={index * 80}>
            <article className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-medium text-foreground">
                  {entry.degree}, {entry.field}
                </h3>
                <p className="font-mono text-xs text-muted">{entry.period}</p>
              </div>
              <p className="mt-1 text-sm text-foreground-2">
                {entry.institution}
                <span className="text-muted"> · {entry.location}</span>
              </p>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2.5">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              <Link
                href="/work/zero-trust-iam"
                className="mt-5 inline-flex rounded text-xs font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                Read the capstone case study
              </Link>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
