/**
 * Degrees, most recent first. The proof strip, the Background section,
 * /resume, and the JSON-LD all read this array.
 *
 * Every value is the owner's. A field that has not been supplied keeps a
 * [BRACKETED — TODO] placeholder rather than a guess: hasEducationPlaceholders()
 * then flags the page and the JSON-LD omits alumniOf, so an unfilled field is
 * loud instead of shipping as a plausible-looking wrong answer. Pre-deploy
 * check: `grep -rn "— TODO\]" src/data/education.ts` must return nothing.
 */
export interface Education {
  degree: string;
  /** Short form used in the proof strip, e.g. "M.S." */
  degreeShort: string;
  field: string;
  /** Shorter label for the proof strip when `field` will not fit a cell. */
  fieldShort?: string;
  institution: string;
  /** Omitted for an online programme. */
  location?: string;
  /** ISO-ish YYYY or YYYY-MM completion date, for a <time datetime>. */
  end: string;
  /** Human-readable completion shown to the reader. */
  period: string;
  highlights: string[];
  /** Case study to link from this entry, if one grew out of it. */
  caseStudySlug?: string;
}

export const EDUCATION: Education[] = [
  {
    degree: "Master of Science",
    degreeShort: "M.S.",
    field: "Cybersecurity and Information Assurance",
    fieldShort: "Cybersecurity",
    institution: "Western Governors University",
    end: "2026-04",
    period: "Graduated April 2026",
    highlights: [
      "Capstone: Zero Trust IAM for 40,000 identities, validated on Microsoft Entra ID.",
      "Coursework across network security, cloud security, and NIST SP 800-53 governance, each with a published project.",
    ],
    caseStudySlug: "zero-trust-iam",
  },
  {
    degree: "Bachelor of Arts",
    degreeShort: "B.A.",
    field: "Education",
    institution: "Université de Lomé",
    location: "Lomé, Togo",
    end: "2019",
    period: "Graduated 2019",
    highlights: [
      "Direct-care and special-education background — translating complex technical concepts into accessible learning methodologies.",
    ],
  },
  {
    degree: "Bachelor of Arts",
    degreeShort: "B.A.",
    field: "English",
    institution: "Université de Lomé",
    location: "Lomé, Togo",
    end: "2017",
    period: "Graduated 2017",
    highlights: [],
  },
];

/** True while any bracketed placeholder remains, so the UI can flag itself. */
export function hasEducationPlaceholders(): boolean {
  return EDUCATION.some((entry) =>
    Object.values(entry)
      .flat()
      .some((value) => typeof value === "string" && value.includes("TODO"))
  );
}

/** Distinct institutions in list order — one JSON-LD alumniOf entry each. */
export function institutions(): string[] {
  return [...new Set(EDUCATION.map((entry) => entry.institution))];
}
