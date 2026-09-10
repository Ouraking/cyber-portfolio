import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, GitBranch } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getNextProject, getProject, getWriteupProjects } from "@/data/projects";
import { SITE } from "@/lib/site";

/**
 * Every project has a writeup, so all four pages are prerendered at build
 * time. `dynamicParams = false` means an unknown slug 404s from the static
 * shell rather than attempting a runtime render — there is no data source to
 * render it from.
 */
export function generateStaticParams() {
  return getWriteupProjects().map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

// Next 16: `params` is a Promise and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.writeup) return { title: "Case study" };

  return {
    title: `${project.title} | ${SITE.name}`,
    description: project.outcome,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${SITE.name}`,
      description: project.outcome,
      url: `/work/${project.slug}`,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.writeup) notFound();

  const { writeup } = project;
  const next = getNextProject(project.slug);

  const body = [
    ["Context", writeup.context],
    ["Approach", writeup.approach],
    ["Outcome", writeup.outcome],
  ] as const;

  return (
    <article className="px-6 pb-24 pt-28">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 rounded text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to work
        </Link>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          {project.category}
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground-2">
          {project.outcome}
        </p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        {body.map(([heading, text]) => (
          <section key={heading} className="mt-12">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {heading}
            </h2>
            <p className="mt-3 leading-relaxed text-foreground-2">{text}</p>
          </section>
        ))}

        {writeup.notes.length > 0 && (
          <section className="mt-12 rounded-xl border border-border bg-card p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              Scope and caveats
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
              {writeup.notes.map((note) => (
                <li key={note} className="flex gap-2.5">
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border-strong"
                    aria-hidden="true"
                  />
                  {note}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.repoUrl && (
          <Button variant="outline" className="mt-10" asChild>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitBranch aria-hidden="true" />
              View repository
            </a>
          </Button>
        )}

        {next && (
          <nav
            className="mt-16 border-t border-border pt-8"
            aria-label="Next case study"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              Next case study
            </p>
            <Link
              href={`/work/${next.slug}`}
              className="mt-2 inline-flex items-center gap-2 rounded text-lg font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {next.title}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}
