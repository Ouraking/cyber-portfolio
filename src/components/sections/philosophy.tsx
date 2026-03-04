import { Quote, ShieldCheck } from "lucide-react";

/**
 * Professional Philosophy callout — a visually distinct break between
 * the Hero and Skill Matrix. Reinforces the "secure-by-default" brand.
 */
export function PhilosophySection() {
  return (
    <section className="px-6 py-16 bg-card/50" aria-labelledby="philosophy-heading">
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-xl border border-border bg-card p-8 sm:p-10">
          {/* Decorative quote icon */}
          <Quote
            className="absolute -top-3 left-6 h-6 w-6 text-accent-cyan bg-card px-0.5"
            aria-hidden="true"
          />

          <h2
            id="philosophy-heading"
            className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4"
          >
            <ShieldCheck className="h-5 w-5 text-accent-cyan" aria-hidden="true" />
            Professional Philosophy
          </h2>

          <blockquote className="text-muted leading-relaxed space-y-4">
            <p>
              Security is not a feature; it is a foundation. Every technical
              decision, from architecture design to code implementation, is
              guided by the principle of &lsquo;secure-by-default.&rsquo; This
              means proactively identifying and mitigating risks, maintaining
              defense-in-depth strategies, and ensuring that security is embedded
              at every layer rather than bolted on as an afterthought.
            </p>
            <p>
              As the cybersecurity landscape evolves with emerging threats and
              technologies, continuous learning and hands-on experience are
              essential to staying effective.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
