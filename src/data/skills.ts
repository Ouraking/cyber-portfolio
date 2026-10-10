/**
 * Proficiency is expressed as one of three named tiers rather than a
 * percentage. A self-assigned "93%" implies a precision no self-assessment
 * has, and reads as inflated to anyone evaluating the claim; a named tier says
 * the same thing honestly. The legend is rendered next to the grid so the
 * scale is stated rather than assumed.
 */
export type SkillTier = "Advanced" | "Proficient" | "Working";

/** Rank per tier; the skill bar fills to rank / highest rank. */
export const TIER_RANK: Record<SkillTier, number> = {
  Working: 1,
  Proficient: 2,
  Advanced: 3,
};

export const TIER_LEGEND: { tier: SkillTier; meaning: string }[] = [
  { tier: "Advanced", meaning: "applied across multiple projects" },
  { tier: "Proficient", meaning: "hands-on in project or lab work" },
  { tier: "Working", meaning: "coursework and guided labs" },
];

export interface Skill {
  name: string;
  tier: SkillTier;
}

export interface SkillDomain {
  title: string;
  subtitle: string;
  skills: Skill[];
}

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    title: "Offensive Security",
    subtitle: "Penetration testing and exploitation",
    skills: [
      { name: "Vulnerability Assessment", tier: "Advanced" },
      { name: "Penetration Testing", tier: "Proficient" },
      { name: "Metasploit and Burp Suite", tier: "Proficient" },
      { name: "Exploit Development", tier: "Working" },
      { name: "Social Engineering", tier: "Working" },
    ],
  },
  {
    title: "Defensive Security",
    subtitle: "Detection, response, and hardening",
    skills: [
      { name: "Threat Detection and Analysis", tier: "Advanced" },
      { name: "Incident Response", tier: "Proficient" },
      { name: "SIEM Configuration", tier: "Proficient" },
      { name: "Endpoint Protection", tier: "Proficient" },
      { name: "Network Monitoring", tier: "Proficient" },
    ],
  },
  {
    title: "GRC and Compliance",
    subtitle: "Governance, risk, and regulatory",
    skills: [
      { name: "Risk Management", tier: "Advanced" },
      { name: "Compliance Frameworks", tier: "Advanced" },
      { name: "Regulatory Requirements", tier: "Advanced" },
      { name: "Security Auditing", tier: "Proficient" },
    ],
  },
  {
    title: "Tools and Platforms",
    subtitle: "Rapid7 ecosystem and infrastructure",
    skills: [
      { name: "Rapid7 InsightVM", tier: "Advanced" },
      { name: "Rapid7 InsightIDR", tier: "Advanced" },
      { name: "Rapid7 InsightAppSec", tier: "Advanced" },
      { name: "Cloud (AWS, Azure, GCP)", tier: "Proficient" },
      { name: "Linux and Windows Admin", tier: "Proficient" },
      { name: "Scripting and Automation", tier: "Proficient" },
    ],
  },
];
