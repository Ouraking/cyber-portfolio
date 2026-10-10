/**
 * Single source of truth for identity and contact details.
 *
 * Every component reads from here — nothing about the person is hardcoded in
 * a section, a page, or the layout. Changing an email address or a headline is
 * a one-line edit in this file.
 */

export interface SiteHeadshot {
  src: string;
  alt: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  initials: string;
  role: string;
  /** One-line specialty statement. Sits directly under the name. */
  primaryLine: string;
  /** One sentence on what the work actually delivers. */
  positioning: string;
  /** Meta description — search results and social cards. */
  description: string;
  /**
   * Two or three first-person sentences: the résumé Summary and the intro to
   * the Background section. Ordered for a security reader — degree and
   * tooling first, shipped software as range, the education background as
   * the reason the problem was visible. Never a sentence that excuses the
   * path.
   */
  about: string;
  email: string;
  github: string;
  linkedin: string;
  resumeHref: string;
  location: string;
  availability: string;
  /**
   * Set to a real file under public/ once a photo exists. Until then the
   * Headshot component falls back to initials — a broken image would be worse
   * than an honest placeholder.
   */
  headshot: SiteHeadshot | null;
}

export const SITE: SiteConfig = {
  name: "Koffi Jean-Marie Amedjonekou",
  shortName: "Amedjonekou",
  initials: "KJA",
  role: "Cybersecurity Engineer",
  primaryLine:
    "Security engineer — identity, cloud, and vulnerability management",
  positioning:
    "I design identity and cloud controls that hold up under audit, then back them with detection engineering and vulnerability management.",
  description:
    "Cybersecurity engineer working across identity, cloud security, vulnerability management, and GRC. CompTIA, Rapid7, and Microsoft certified. Open to full-time security engineering and SOC analyst roles.",
  about:
    "I hold an M.S. in Cybersecurity and Information Assurance and work across identity, cloud, and vulnerability management — Rapid7 InsightVM and InsightIDR as the enterprise tooling, and a home lab of Proxmox, pfSense, and Wazuh where I test what I design. I also ship software: OuraGrove, an independent EdTech platform on secure, offline-first infrastructure. My degrees in education came first, and they are why I noticed that EdTech is where security is weakest and the stakes highest — the users are minors and the data is academic records.",
  email: "jm18306@gmail.com",
  github: "https://github.com/Ouraking",
  linkedin: "https://www.linkedin.com/in/koffi-amedjonekou/",
  resumeHref: "/resume",
  location: "Boston area · open to remote",
  availability:
    "Open to full-time security engineering and SOC analyst roles",
  headshot: null,
};

/**
 * Absolute base for og:image, canonical URLs, sitemap, and JSON-LD. Vercel
 * exposes the production domain at build time, so this resolves correctly on
 * deploys without hardcoding a URL. Set NEXT_PUBLIC_SITE_URL to override once a
 * custom domain is attached.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * Icons are named rather than imported as components so this list can be read
 * from a Server Component: functions cannot cross the server → client boundary
 * as props.
 */
export type SocialIconName = "github" | "linkedin" | "mail";

export interface SocialLink {
  icon: SocialIconName;
  href: string;
  label: string;
  external?: boolean;
}

/** Every entry resolves to a real destination — a dead link here is worse than none. */
export const SOCIAL_LINKS: SocialLink[] = [
  { icon: "github", href: SITE.github, label: "GitHub", external: true },
  { icon: "linkedin", href: SITE.linkedin, label: "LinkedIn", external: true },
  { icon: "mail", href: `mailto:${SITE.email}`, label: "Email" },
];

/** "github.com/Ouraking" from the full URL — for display where a bare link is ugly. */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
