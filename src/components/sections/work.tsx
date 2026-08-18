import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { PROJECTS } from "@/data/projects";

function ProjectCard({
  project,
  featured = false,
}: {
  project: (typeof PROJECTS)[number];
  featured?: boolean;
}) {
  return (
    <article
      className={`flex h-full flex-col rounded-xl border border-border bg-card p-6 card-hover-lift ${
        featured ? "border-l-2 border-l-accent sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          {featured && (
            <p className="text-[11px] font-mono uppercase tracking-wider text-accent mb-2">
              Flagship
            </p>
          )}
          <h3 className="text-lg font-medium text-foreground">{project.title}</h3>
        </div>
        <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted">
          {project.category}
        </span>
      </div>

      <dl className="mt-5 space-y-4 text-sm leading-relaxed">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Context
          </dt>
          <dd className="mt-1 text-secondary">{project.context}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Approach
          </dt>
          <dd className="mt-1 text-secondary">{project.approach}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Outcome
          </dt>
          <dd className="mt-1 text-foreground/90">{project.outcome}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-elevated px-2 py-0.5 text-[11px] font-mono text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-5 flex flex-wrap gap-4">
        {project.writeup && (
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            Read notes
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <GitBranch className="h-3 w-3" aria-hidden="true" />
            Repository
          </a>
        )}
      </div>
    </article>
  );
}

export function WorkSection() {
  const featured = PROJECTS.find((project) => project.featured) ?? PROJECTS[0];
  const rest = PROJECTS.filter((project) => project.slug !== featured.slug);

  return (
    <section id="work" className="px-6 py-24" aria-labelledby="work-heading">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-12 max-w-2xl">
            <h2
              id="work-heading"
              className="font-display text-3xl sm:text-4xl tracking-tight text-foreground"
            >
              Work
            </h2>
            <p className="mt-3 text-muted">
              Applied security engineering — identity, cloud, and governance.
              Method and outcome, not exploit detail.
            </p>
          </div>
        </ScrollReveal>

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
      </div>
    </section>
  );
}
