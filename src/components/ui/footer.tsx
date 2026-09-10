import Link from "next/link";

import { SocialLinks } from "@/components/ui/social-links";
import { NAV_LINKS } from "@/lib/nav";
import { SITE } from "@/lib/site";

/**
 * One row, three groups. The old footer had five tiers including a pulsing
 * availability banner — availability is already stated in the hero eyebrow,
 * the "currently" block, and the contact card, so repeating it a fourth time
 * with an animated dot was noise.
 */
export function Footer() {
  return (
    <footer className="border-t border-border" role="contentinfo">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">{SITE.name}</p>
          <p className="mt-1 font-mono text-xs text-muted">
            &copy; {new Date().getFullYear()} · No tracking scripts
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded text-xs text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={SITE.resumeHref}
                className="rounded text-xs text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Resume
              </Link>
            </li>
          </ul>
        </nav>

        <SocialLinks size="sm" />
      </div>
    </footer>
  );
}
