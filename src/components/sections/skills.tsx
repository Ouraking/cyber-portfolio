import type { CSSProperties } from "react";

import { Section, SectionHeader } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import {
  SKILL_DOMAINS,
  TIER_LEGEND,
  TIER_RANK,
  type SkillDomain,
} from "@/data/skills";

/** Tiers are ranked 1–3; a full bar is the top tier. */
const TOP_RANK = Math.max(...Object.values(TIER_RANK));

function DomainCard({ domain }: { domain: SkillDomain }) {
  return (
    <TiltCard className="h-full">
      <h3 className="text-base font-medium text-foreground">{domain.title}</h3>
      <p className="mt-1 text-xs text-muted">{domain.subtitle}</p>

      <ul className="mt-5 space-y-4">
        {domain.skills.map((skill, index) => {
          // Fill is the tier's share of the scale, not a percentage the
          // person claimed: see the note in data/skills.ts on why this site
          // states depth as a named tier.
          const fill = TIER_RANK[skill.tier] / TOP_RANK;
          return (
            <li key={skill.name}>
              <span className="text-sm text-foreground-2">{skill.name}</span>
              {/*
                The bar is decorative. The tier word below carries the
                meaning, so a screen reader announces "Advanced" rather than
                trying to interpret a graphic.
              */}
              <div
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-border-strong/60"
                aria-hidden="true"
              >
                <div
                  className="skill-bar-fill h-full rounded-full"
                  style={
                    {
                      "--fill": fill,
                      "--bar-delay": `${index * 90}ms`,
                    } as CSSProperties
                  }
                />
              </div>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {skill.tier}
              </span>
            </li>
          );
        })}
      </ul>
    </TiltCard>
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

      {/* Three across: six domains make two full rows, never an orphan. */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_DOMAINS.map((domain, index) => (
          <ScrollReveal key={domain.title} delay={index * 80}>
            <DomainCard domain={domain} />
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
