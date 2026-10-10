import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";

import { Section, SectionHeader } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { PROJECTS, type Project } from "@/data/projects";
import { BUILDING } from "@/data/building";

/**
 * The featured project gets the full Context / Approach / Outcome breakdown
 * across the width of the grid; the rest lead with context and outcome and
 * leave the method to their case-study page. Showing four equally weighted
 * cards told the reader nothing about which work mattered most.
 *
 * The tilt and glass styling sit on the TiltCard wrapper; the <article> inside
 * stays unstyled so the semantics are unchanged.
 */
function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const detail = featured
    ? ([
        ["Context", project.context],
        ["Approach", project.approach],
        ["Outcome", project.outcome],
      ] as const)
    : ([
        ["Context", project.context],
        ["Outcome", project.outcome],
      ] as const);

  return (
    <TiltCard className={`h-full ${featured ? "border-l-2 border-l-accent" : ""}`}>
      <article className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            {featured && (
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                Featured
              </p>
            )}
            <h3 className="text-lg font-medium text-foreground">
              <Link
                href={`/work/${project.slug}`}
                className="rounded transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                {project.title}
              </Link>
            </h3>
          </div>
          <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted">
            {project.category}
          </span>
        </div>

        <dl className="mt-5 space-y-4 text-sm leading-relaxed">
          {detail.map(([term, value]) => (
            <div key={term}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {term}
              </dt>
              <dd
                className={
                  term === "Outcome"
                    ? "mt-1 text-foreground"
                    : "mt-1 text-foreground-2"
                }
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-5 pt-6">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded text-xs font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            Case study
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only">for {project.title}</span>
          </Link>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded text-xs font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <GitBranch className="h-3 w-3" aria-hidden="true" />
              Repository
              <span className="sr-only">for {project.title}</span>
            </a>
          )}
        </div>
      </article>
    </TiltCard>
  );
}

export function WorkSection() {
  const featured = PROJECTS.find((project) => project.featured) ?? PROJECTS[0];
  const rest = PROJECTS.filter((project) => project.slug !== featured.slug);

  return (
    <Section id="work" labelledBy="work-heading">
      <SectionHeader
        eyebrow="Selected work"
        title="Case studies"
        titleId="work-heading"
        description="Applied security engineering across identity, cloud, network, and governance. Method and outcome, not exploit detail."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <ScrollReveal className="sm:col-span-2">
          <ProjectCard project={featured} featured />
        </ScrollReveal>
        {rest.map((project, index) => (
          <ScrollReveal key={project.slug} delay={index * 80}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>

      {/*
        Products and lab work, subordinate to the case studies: evidence of
        range for a security reader, not a second headline. See
        data/building.ts for what may and may not be claimed here.
      */}
      <h3 className="mt-14 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        Also building
      </h3>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        {BUILDING.map((item, index) => (
          <ScrollReveal key={item.name} delay={index * 80}>
            <TiltCard className="h-full">
              <h4 className="text-base font-medium text-foreground">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-foreground-2">
                {item.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
