import type { Metadata } from "next";

import { PrintButton } from "@/components/ui/print-button";
import { SITE, displayUrl } from "@/lib/site";
import { PROJECTS } from "@/data/projects";
import { SKILL_DOMAINS } from "@/data/skills";
import {
  groupEarnedByVendor,
  upcomingCertifications,
} from "@/data/certifications";
import { EDUCATION, hasEducationPlaceholders } from "@/data/education";

/**
 * A print-to-PDF résumé rather than a hosted PDF file: one source of truth,
 * so it can never drift from the site the way a stale attachment does.
 *
 * noindex because a résumé competing with the home page in search results
 * splits the ranking for the same name, and this page is meant to be reached
 * from the site or a direct link.
 *
 * Print styling comes from the @media print token override in globals.css,
 * which repaints the palette light. Nothing here needs print-specific colours.
 */
export const metadata: Metadata = {
  title: `Resume | ${SITE.name}`,
  description: `${SITE.name} — ${SITE.primaryLine}`,
  robots: { index: false, follow: true },
};

function Heading({ children }: { children: string }) {
  return (
    <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const education = EDUCATION[0];
  const certGroups = groupEarnedByVendor();
  const upcoming = upcomingCertifications();

  return (
    <article className="px-6 pb-24 pt-28 print:pt-0">
      <div className="mx-auto max-w-3xl">
        <div className="print:hidden">
          <PrintButton />
        </div>

        {hasEducationPlaceholders() && (
          <p
            className="mt-6 rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 font-mono text-xs text-danger print:hidden"
            role="note"
          >
            Education still holds placeholders — fill in src/data/education.ts.
          </p>
        )}

        <header className="mt-8 print:mt-0">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {SITE.name}
          </h1>
          <p className="mt-2 text-foreground-2">{SITE.primaryLine}</p>
          <p className="mt-3 text-sm text-muted">
            <a href={`mailto:${SITE.email}`} className="hover:text-accent">
              {SITE.email}
            </a>
            {" · "}
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              {displayUrl(SITE.github)}
            </a>
            {" · "}
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              LinkedIn
            </a>
            {" · "}
            {SITE.location}
          </p>
        </header>

        <section className="mt-10">
          <Heading>Summary</Heading>
          <p className="mt-3 leading-relaxed text-foreground-2">
            {SITE.description}
          </p>
        </section>

        <section className="mt-8">
          <Heading>Education</Heading>
          <div className="mt-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-medium text-foreground">
                {education.degree}, {education.field}
              </h3>
              <p className="font-mono text-xs text-muted">{education.period}</p>
            </div>
            <p className="mt-0.5 text-sm text-foreground-2">
              {education.institution} · {education.location}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
              {education.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-8">
          <Heading>Selected projects</Heading>
          <ul className="mt-3 space-y-5">
            {PROJECTS.map((project) => (
              <li key={project.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-medium text-foreground">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-muted">
                    {project.category}
                  </p>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground-2">
                  {project.approach}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">
                  {project.outcome}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <Heading>Certifications</Heading>
          <ul className="mt-3 space-y-1.5 text-sm text-foreground-2">
            {certGroups.map((group) => (
              <li key={group.label}>
                <span className="text-muted">{group.label}: </span>
                {group.items
                  .map((cert) =>
                    group.label === "Cloud and foundations"
                      ? `${cert.vendor} ${cert.name}`
                      : cert.name
                  )
                  .join(", ")}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">
            In progress and next:{" "}
            {upcoming
              .map((cert) =>
                cert.target ? `${cert.name} (${cert.target})` : cert.name
              )
              .join(", ")}
            .
          </p>
        </section>

        <section className="mt-8">
          <Heading>Skills</Heading>
          <ul className="mt-3 space-y-1.5 text-sm text-foreground-2">
            {SKILL_DOMAINS.map((domain) => (
              <li key={domain.title}>
                <span className="text-muted">{domain.title}: </span>
                {domain.skills.map((skill) => skill.name).join(", ")}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
