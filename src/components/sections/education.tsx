import Link from "next/link";

import { Section, SectionHeader } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { EDUCATION, hasEducationPlaceholders } from "@/data/education";
import { COMMUNITY, MEMBERSHIPS } from "@/data/community";
import { SITE } from "@/lib/site";

/**
 * Background: the about summary, every degree, then memberships and
 * community roles. One section rather than three because none of the three
 * blocks is big enough to carry a nav entry on its own, and together they
 * answer the one question a recruiter has here — who is this, and where did
 * they come from.
 *
 * While data/education.ts still holds [BRACKETED] placeholders the section
 * renders a visible warning. That is deliberate: silently shipping a
 * plausible-looking blank is worse than an obvious one.
 */
export function EducationSection() {
  const placeholders = hasEducationPlaceholders();

  return (
    <Section id="education" labelledBy="education-heading">
      <SectionHeader
        eyebrow="Background"
        title="Education"
        titleId="education-heading"
        description={SITE.about}
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
            <article className="glass-1 rounded-xl p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-medium text-foreground">
                  {entry.degree}, {entry.field}
                </h3>
                <p className="font-mono text-xs text-muted">
                  <time dateTime={entry.end}>{entry.period}</time>
                </p>
              </div>
              <p className="mt-1 text-sm text-foreground-2">
                {entry.institution}
                {entry.location && (
                  <span className="text-muted"> · {entry.location}</span>
                )}
              </p>

              {entry.highlights.length > 0 && (
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
              )}

              {entry.caseStudySlug && (
                <Link
                  href={`/work/${entry.caseStudySlug}`}
                  className="mt-5 inline-flex rounded text-xs font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  Read the capstone case study
                </Link>
              )}
            </article>
          </ScrollReveal>
        ))}
      </div>

      {/*
        Memberships as chips, community roles as one-liners. The event line
        says "Participant" on purpose — see the note in data/community.ts.
      */}
      <ScrollReveal delay={EDUCATION.length * 80}>
        <div className="mt-12 grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-12">
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              Memberships
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {MEMBERSHIPS.map((membership) => (
                <li
                  key={membership}
                  className="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-foreground-2"
                >
                  {membership}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              Community
            </h3>
            <dl className="mt-3 space-y-2.5 text-sm">
              {COMMUNITY.map((item) => (
                <div
                  key={item.role}
                  className="flex flex-col gap-0.5 sm:flex-row sm:gap-3"
                >
                  <dt className="shrink-0 text-foreground sm:w-28">
                    {item.role}
                  </dt>
                  <dd className="text-muted">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
