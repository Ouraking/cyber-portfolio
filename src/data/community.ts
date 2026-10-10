/**
 * Memberships and community roles, shown in the Background section, on
 * /resume, and as memberOf in the JSON-LD.
 *
 * Events are listed as participation. He attended them; he did not speak at,
 * win, or run them, and no wording here or in a component may imply he did.
 * TCRC is a collective he founded, not an employer — the JSON-LD models it as
 * an Organization with `founder`, never as `worksFor`.
 */
export const MEMBERSHIPS = ["IEEE", "PMI", "ISACA"] as const;

export const TCRC = {
  name: "Togo Cybersecurity Research Collective",
  shortName: "TCRC",
} as const;

export interface CommunityRole {
  role: string;
  detail: string;
}

export const COMMUNITY: CommunityRole[] = [
  { role: "Founder", detail: `${TCRC.name} (${TCRC.shortName})` },
  {
    role: "Co-organiser",
    detail: "High-school youth hackathons promoting early tech literacy",
  },
  {
    role: "Participant",
    detail:
      "MIT Africa Innovate Hackathon, Harvard Africa Development Conference, ISACA GranIT",
  },
];
