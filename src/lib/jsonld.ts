import { SITE, SITE_URL } from "@/lib/site";
import { SKILL_DOMAINS } from "@/data/skills";
import {
  hasEducationPlaceholders,
  institutions,
} from "@/data/education";
import { earnedCertifications } from "@/data/certifications";
import { MEMBERSHIPS, TCRC } from "@/data/community";

/**
 * Structured data for the home page. A personal site is usually found by
 * searching the person's name, and a Person node is what lets a search engine
 * connect this page to that name rather than guessing from the title tag.
 *
 * The object is static — built from the data layer at render time, never from
 * a query parameter or user input — which is what makes it safe to serialize
 * into the document. See the escaping note in layout.tsx.
 *
 * `alumniOf` is omitted entirely while education still holds placeholders:
 * publishing "[UNIVERSITY NAME — TODO]" as machine-readable structured data
 * would be worse than publishing nothing.
 *
 * TCRC is its own Organization node with `founder` pointing back at the
 * Person. It is not `worksFor`: a collective he founded is not an employer,
 * and the graph should not say otherwise.
 */
export function buildJsonLd() {
  const personId = `${SITE_URL}/#person`;
  const tcrcId = `${SITE_URL}/#tcrc`;

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": personId,
    name: SITE.name,
    jobTitle: SITE.role,
    description: SITE.description,
    url: SITE_URL,
    email: `mailto:${SITE.email}`,
    sameAs: [SITE.github, SITE.linkedin],
    knowsAbout: SKILL_DOMAINS.map((domain) => domain.title),
    hasCredential: earnedCertifications().map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: `${cert.vendor} ${cert.name}`,
    })),
    memberOf: [
      ...MEMBERSHIPS.map((name) => ({ "@type": "Organization", name })),
      { "@type": "Organization", "@id": tcrcId, name: TCRC.name },
    ],
  };

  if (!hasEducationPlaceholders()) {
    person.alumniOf = institutions().map((name) => ({
      "@type": "CollegeOrUniversity",
      name,
    }));
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "Organization",
        "@id": tcrcId,
        name: TCRC.name,
        alternateName: TCRC.shortName,
        founder: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: `${SITE.name} — ${SITE.role}`,
        mainEntity: { "@id": personId },
      },
    ],
  };
}
