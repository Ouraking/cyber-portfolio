import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { PROJECTS } from "@/data/projects";
import { earnedCertifications } from "@/data/certifications";
import { EDUCATION } from "@/data/education";
import { SITE } from "@/lib/site";

/**
 * Four numbers a recruiter can read in two seconds, above the fold-and-a-half.
 *
 * Every value is derived from the data layer rather than typed here. The old
 * stats section hardcoded "10+ Certifications Pursued" next to a roadmap that
 * listed 13 — exactly the kind of quiet contradiction a careful reader spots.
 */
export function ProofStrip() {
  const education = EDUCATION[0];

  const proof = [
    {
      value: String(earnedCertifications().length),
      label: "Certifications earned",
    },
    { value: String(PROJECTS.length), label: "Case studies published" },
    {
      value: education.degreeShort,
      label: education.fieldShort ?? education.field,
    },
    { value: "Open", label: `Full-time · ${SITE.location}` },
  ];

  return (
    <section aria-label="Credentials at a glance" className="px-6">
      <ScrollReveal>
        <div className="mx-auto max-w-6xl">
          <ul className="grid grid-cols-2 divide-border sm:grid-cols-4 sm:divide-x">
            {proof.map((item) => (
              <li key={item.label} className="px-5 py-7 sm:px-6">
                <p className="font-mono text-2xl tracking-tight text-foreground">
                  {item.value}
                </p>
                <p className="mt-1 text-sm leading-snug text-muted">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}
