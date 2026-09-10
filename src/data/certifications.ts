/**
 * One flat list of credentials, grouped for display by the helpers below.
 *
 * Keeping earned and upcoming in the same array means the proof strip's
 * "certifications earned" count is derived from the same data the
 * certifications section renders — the number can never disagree with the
 * list, which is the failure mode of a hand-typed stat.
 */
export type CertStatus = "earned" | "in-progress" | "planned";

export type CertVendor =
  | "CompTIA"
  | "Rapid7"
  | "Microsoft"
  | "AWS"
  | "Google"
  | "ISC2"
  | "Red Hat"
  | "OffSec";

export interface Certification {
  name: string;
  vendor: CertVendor;
  status: CertStatus;
  /**
   * Target year for upcoming credentials. Deliberately omitted for OSCP: a
   * bare year silently goes stale, and that one sits behind RHCSA.
   */
  target?: string;
  note?: string;
}

export const CERTIFICATIONS: Certification[] = [
  { name: "Security+", vendor: "CompTIA", status: "earned" },
  { name: "Network+", vendor: "CompTIA", status: "earned" },
  { name: "CySA+", vendor: "CompTIA", status: "earned" },
  { name: "PenTest+", vendor: "CompTIA", status: "earned" },
  { name: "InsightVM", vendor: "Rapid7", status: "earned" },
  { name: "InsightIDR", vendor: "Rapid7", status: "earned" },
  { name: "InsightAppSec", vendor: "Rapid7", status: "earned" },
  { name: "AZ-900", vendor: "Microsoft", status: "earned" },
  { name: "SC-900", vendor: "Microsoft", status: "earned" },
  { name: "AI-900", vendor: "Microsoft", status: "earned" },
  { name: "Cloud Practitioner", vendor: "AWS", status: "earned" },
  { name: "IT Support", vendor: "Google", status: "earned" },
  { name: "Certified in Cybersecurity", vendor: "ISC2", status: "earned" },
  {
    name: "RHCSA",
    vendor: "Red Hat",
    status: "in-progress",
    target: "2026",
    note: "Linux system administration — users, storage, networking, and security on RHEL.",
  },
  {
    name: "OSCP (PEN-200)",
    vendor: "OffSec",
    status: "planned",
    target: "Next",
    note: "Hands-on penetration testing exam. Building Active Directory attack-path fundamentals first.",
  },
];

/** Display groups. AWS, Google, and ISC2 are one cell each, so they share a row. */
const VENDOR_GROUPS: { label: string; vendors: CertVendor[] }[] = [
  { label: "CompTIA", vendors: ["CompTIA"] },
  { label: "Rapid7", vendors: ["Rapid7"] },
  { label: "Microsoft", vendors: ["Microsoft"] },
  { label: "Cloud and foundations", vendors: ["AWS", "Google", "ISC2"] },
];

export function earnedCertifications(): Certification[] {
  return CERTIFICATIONS.filter((cert) => cert.status === "earned");
}

export function upcomingCertifications(): Certification[] {
  return CERTIFICATIONS.filter((cert) => cert.status !== "earned");
}

export interface CertGroup {
  label: string;
  items: Certification[];
}

/**
 * Vendor prefixes the name for the shared group ("AWS Cloud Practitioner"),
 * since the group label alone no longer identifies the issuer there.
 */
export function groupEarnedByVendor(): CertGroup[] {
  const earned = earnedCertifications();
  return VENDOR_GROUPS.map(({ label, vendors }) => ({
    label,
    items: earned.filter((cert) => vendors.includes(cert.vendor)),
  })).filter((group) => group.items.length > 0);
}

export function certDisplayName(cert: Certification, group: CertGroup): string {
  return group.items.length > 0 && group.label === "Cloud and foundations"
    ? `${cert.vendor} ${cert.name}`
    : cert.name;
}
