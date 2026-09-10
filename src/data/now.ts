import { SITE } from "@/lib/site";

/**
 * A short "what I'm doing right now" block, replacing the old learning-log
 * timeline and roadmap. Three lines a reader actually acts on beat twelve
 * cards they scroll past.
 *
 * `updated` is shown on the page. A stale date is more honest than an undated
 * claim of currency — bump it when the items change.
 */
export interface NowItem {
  label: string;
  text: string;
}

export const NOW: { updated: string; updatedLabel: string; items: NowItem[] } = {
  updated: "2026-09",
  updatedLabel: "September 2026",
  items: [
    {
      label: "Focus",
      text: "Active Directory attack paths — Kerberoasting, AS-REP roasting, and Pass-the-Hash — in a self-hosted lab, documenting enumeration with BloodHound and PowerView ahead of PEN-200.",
    },
    {
      label: "Studying",
      text: "RHCSA, targeting 2026. Linux administration is the gap between reading a finding and fixing the host it came from.",
    },
    {
      label: "Looking for",
      text: `${SITE.availability}. ${SITE.location}.`,
    },
  ],
};
