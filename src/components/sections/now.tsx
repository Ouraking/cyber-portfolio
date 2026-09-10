import { Section, SectionHeader } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { NOW } from "@/data/now";

/**
 * Replaces the four-entry learning log and the six-node certification
 * roadmap. Both were timelines of the same underlying facts, and a reader
 * evaluating someone for a role wants the current state, not the history.
 *
 * The "updated" stamp is shown rather than hidden: an undated claim of
 * currency is worth less than a dated one the reader can judge for themselves.
 */
export function NowSection() {
  return (
    <Section id="now" labelledBy="now-heading">
      <SectionHeader
        eyebrow="Currently"
        title="What I'm working on"
        titleId="now-heading"
      />

      <ScrollReveal>
        <dl className="divide-y divide-border border-y border-border">
          {NOW.items.map((item) => (
            <div
              key={item.label}
              className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:pt-1">
                {item.label}
              </dt>
              <dd className="max-w-2xl leading-relaxed text-foreground-2">
                {item.text}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 font-mono text-xs text-muted">
          Updated{" "}
          <time dateTime={NOW.updated}>{NOW.updatedLabel}</time>
        </p>
      </ScrollReveal>
    </Section>
  );
}
