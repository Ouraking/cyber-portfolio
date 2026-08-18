import { Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE } from "@/lib/site";

interface SocialLink {
  href: string;
  label: string;
  icon: LucideIcon;
  external?: boolean;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: SITE.linkedin,
    label: "LinkedIn",
    icon: Linkedin,
    external: true,
  },
  {
    href: SITE.github,
    label: "GitHub",
    icon: Github,
    external: true,
  },
  {
    href: `mailto:${SITE.email}`,
    label: "Email",
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card" role="contentinfo">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">{SITE.name}</p>
          <p className="mt-1 text-xs text-muted">
            &copy; {new Date().getFullYear()} · Built with Next.js · No tracking
            scripts
          </p>
        </div>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted hover:text-accent hover:border-accent/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={label}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
