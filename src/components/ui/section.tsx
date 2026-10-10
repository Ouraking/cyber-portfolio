import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared section shell. Every home-page section uses it, so vertical rhythm
 * and container width are defined once rather than re-typed per file — which
 * is how the previous build ended up with sections at three different
 * paddings.
 *
 * Sections carry no border of their own. page.tsx places a GradientDivider
 * between them, so the separator is defined in one place and a section can be
 * reordered without leaving a stray rule behind.
 */
export function Section({
  id,
  labelledBy,
  label,
  className,
  children,
}: {
  id: string;
  /** id of the heading that names this section. */
  labelledBy?: string;
  /** Use instead of labelledBy when the section has no visible heading. */
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cn(className)}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">{children}</div>
    </section>
  );
}

/**
 * Left-aligned heading block. Centred headings on a wide container force the
 * eye back to the middle on every section; left alignment keeps one reading
 * edge down the page.
 */
export function SectionHeader({
  eyebrow,
  title,
  titleId,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  titleId: string;
  description?: string;
  /** Optional extra content under the description, e.g. a legend. */
  children?: ReactNode;
}) {
  return (
    <div className="mb-10 max-w-2xl sm:mb-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 leading-relaxed text-muted">{description}</p>
      )}
      {children}
    </div>
  );
}
