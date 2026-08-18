import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, GitBranch } from "lucide-react";
import { getProject, getWriteupProjects } from "@/data/projects";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getWriteupProjects().map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.writeup) {
    return { title: "Work" };
  }
  return {
    title: `${project.title} | ${SITE.name}`,
    description: project.outcome,
    alternates: { canonical: `/work/${project.slug}` },
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

  return (
    <article className="px-6 pt-28 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to work
        </Link>

        <p className="mt-8 text-[11px] font-mono uppercase tracking-wider text-accent">
          {project.category}
        </p>
        <h1 className="mt-2 font-display text-[clamp(2rem,4vw,3.25rem)] font-medium tracking-tight text-foreground leading-tight">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-secondary leading-relaxed">
          {project.outcome}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-card px-2 py-0.5 text-[11px] font-mono text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-sm font-medium text-foreground">Context</h2>
          <p className="mt-3 text-secondary leading-relaxed">{writeup.context}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-medium text-foreground">Approach</h2>
          <p className="mt-3 text-secondary leading-relaxed">{writeup.approach}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-medium text-foreground">Outcome</h2>
          <p className="mt-3 text-secondary leading-relaxed">{writeup.outcome}</p>
        </section>

        {writeup.notes.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-medium text-foreground">Notes</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted leading-relaxed">
              {writeup.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        )}

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium btn-ghost btn-press"
          >
            <GitBranch className="h-4 w-4" aria-hidden="true" />
            View repository
          </a>
        )}
      </div>
    </article>
  );
}
