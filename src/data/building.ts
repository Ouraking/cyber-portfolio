/**
 * Products and lab work shown as evidence of range beside the case studies.
 * Two, chosen for a security-employer reader; the rest of the owner's
 * projects are deliberately left off so this reads as focus, not scatter.
 *
 * These are not case studies: no Context/Approach/Outcome, no /work route,
 * and they are not counted in "Case studies published". Descriptions state
 * only what is confirmed — no user counts, dates, revenue, or team size. A
 * link renders only when `url` is set; a card without one is better than a
 * link to nothing.
 */
export interface BuildingItem {
  name: string;
  description: string;
  tags: string[];
  url?: string;
}

export const BUILDING: BuildingItem[] = [
  {
    name: "Home lab",
    description:
      "Self-hosted security architecture lab running Proxmox, pfSense, Wazuh, Docker, and Home Assistant OS — where I test what I design.",
    tags: ["Proxmox", "pfSense", "Wazuh", "Docker", "Home Assistant OS"],
  },
  {
    name: "OuraGrove",
    description:
      "Independent EdTech platform built on secure, offline-first digital infrastructure.",
    tags: ["EdTech", "Offline-first", "Security-first"],
  },
];
