import { SITE, SITE_URL } from "@/lib/site";
import { SKILL_DOMAINS } from "@/data/skills";
import { EDUCATION, hasEducationPlaceholders } from "@/data/education";
import { earnedCertifications } from "@/data/certifications";

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
 */
export function buildJsonLd() {
  const personId = `${SITE_URL}/#person`;

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
  };

  if (!hasEducationPlaceholders() && EDUCATION[0]) {
    person.alumniOf = {
      "@type": "CollegeOrUniversity",
      name: EDUCATION[0].institution,
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
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
