import { Section, SectionHeader } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  SKILL_DOMAINS,
  TIER_LEGEND,
  TIER_RANK,
  type SkillDomain,
} from "@/data/skills";

function DomainCard({ domain }: { domain: SkillDomain }) {
  return (
    <div className="card-hover-lift h-full rounded-xl border border-border bg-card p-6">
      <h3 className="text-base font-medium text-foreground">{domain.title}</h3>
      <p className="mt-1 text-xs text-muted">{domain.subtitle}</p>

      <ul className="mt-5 space-y-3.5">
        {domain.skills.map((skill) => {
          const filled = TIER_RANK[skill.tier];
          return (
            <li key={skill.name}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-foreground-2">{skill.name}</span>
                {/*
                  Pips are decorative. The tier word below carries the meaning,
                  so a screen reader announces "Advanced" rather than counting
                  three dots it cannot interpret.
                */}
                <span
                  className="flex shrink-0 items-center gap-1"
                  aria-hidden="true"
                >
                  {[1, 2, 3].map((pip) => (
                    <span
                      key={pip}
                      className={`h-1.5 w-1.5 rounded-full ${
                        pip <= filled ? "bg-accent" : "bg-border-strong"
                      }`}
                    />
                  ))}
                </span>
              </div>
              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {skill.tier}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SkillsSection() {
  return (
    <Section id="skills" labelledBy="skills-heading">
      <SectionHeader
        eyebrow="Capabilities"
        title="Skills"
        titleId="skills-heading"
        description="Self-assessed depth of hands-on experience, stated on a named scale rather than a percentage."
      >
        {/*
          Publishing the scale is the point: it turns a vague self-rating into
          a claim the reader can actually interpret and discount if they want.
        */}
        <dl className="mt-5 flex flex-col gap-1.5 text-xs sm:flex-row sm:flex-wrap sm:gap-x-6">
          {TIER_LEGEND.map(({ tier, meaning }) => (
            <div key={tier} className="flex items-baseline gap-1.5">
              <dt className="font-mono uppercase tracking-[0.14em] text-foreground-2">
                {tier}
              </dt>
              <dd className="text-muted">{meaning}</dd>
            </div>
          ))}
        </dl>
      </SectionHeader>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_DOMAINS.map((domain, index) => (
          <ScrollReveal key={domain.title} delay={index * 80}>
            <DomainCard domain={domain} />
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
