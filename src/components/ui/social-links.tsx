import { Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SOCIAL_LINKS, type SocialIconName } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Icons resolve from the name strings in lib/site.ts. Storing components in
 * the config would stop it being readable from a Server Component, since
 * functions cannot cross the server → client boundary.
 */
const ICONS: Record<SocialIconName, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function SocialLinks({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "sm";
}) {
  const box = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const glyph = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {SOCIAL_LINKS.map(({ icon, href, label, external }) => {
        const Icon = ICONS[icon];
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              // External links get noopener/noreferrer to prevent tab-nabbing.
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cn(
                box,
                "inline-flex items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              <Icon className={glyph} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
