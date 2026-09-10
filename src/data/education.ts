/**
 * PLACEHOLDER — fill this in before deploying.
 *
 * Every value wrapped in [BRACKETS] is a stand-in. They are deliberately loud
 * so an unfilled field is obvious on the page rather than shipping as a
 * plausible-looking wrong answer. CI does not fail on them; the pre-deploy
 * check is `grep -rn "TODO" src/data/education.ts`, which must come back empty.
 */
export interface Education {
  degree: string;
  /** Short form used in the proof strip, e.g. "M.S." */
  degreeShort: string;
  field: string;
  institution: string;
  location: string;
  /** ISO-ish YYYY-MM, used for the <time datetime> attribute. */
  start: string;
  end: string;
  /** Human-readable range shown to the reader. */
  period: string;
  highlights: string[];
}

export const EDUCATION: Education[] = [
  {
    degree: "Master of Science",
    degreeShort: "M.S.",
    field: "Cybersecurity",
    institution: "[UNIVERSITY NAME — TODO]",
    location: "[CITY, STATE — TODO]",
    start: "[YYYY-MM — TODO]",
    end: "[YYYY-MM — TODO]",
    period: "[MONTH YEAR – MONTH YEAR — TODO]",
    highlights: [
      "Capstone: Zero Trust IAM for 40,000 identities, validated on Microsoft Entra ID.",
      "Coursework across network security, cloud security, and NIST SP 800-53 governance, each with a published project.",
    ],
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
