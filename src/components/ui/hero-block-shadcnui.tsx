"use client";

import { useId } from "react";
import { MotionConfig, motion } from "framer-motion";
import { ArrowDown, Github, Globe, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Social icons are looked up by name rather than passed as components so a
 * Server Component (app/page.tsx) can configure the block: component
 * references are functions, and functions cannot cross the server → client
 * boundary as props.
 */
const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  globe: Globe,
} satisfies Record<string, LucideIcon>;

export type HeroSocialIcon = keyof typeof SOCIAL_ICONS;

export interface HeroSocialLink {
  icon: HeroSocialIcon;
  href: string;
  /** Accessible name for the icon-only link. */
  label: string;
  /** External links get target=_blank plus rel="noopener noreferrer". */
  external?: boolean;
}

export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroBlockProps {
  /** Main heading, rendered as the page's h1. */
  title?: string;
  /** Optional line under the heading — a role or tagline. */
  subtitle?: string;
  description?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  socials?: HeroSocialLink[];
  className?: string;
}

const DEFAULT_SOCIALS: HeroSocialLink[] = [
  { icon: "github", href: "#", label: "GitHub" },
  { icon: "linkedin", href: "#", label: "LinkedIn" },
  { icon: "mail", href: "#", label: "Email" },
];

export function HeroBlock({
  title = "Full Stack Developer",
  subtitle,
  description = "Crafting beautiful, performant web applications with modern technologies. Passionate about clean code and exceptional user experiences.",
  primaryCta = { label: "Get in Touch", href: "#" },
  secondaryCta = { label: "View Projects", href: "#" },
  socials = DEFAULT_SOCIALS,
  className,
}: HeroBlockProps) {
  const headingId = useId();

  return (
    // reducedMotion="user" honours prefers-reduced-motion: transform animations
    // are skipped and only opacity fades remain, matching the CSS rules in
    // globals.css.
    <MotionConfig reducedMotion="user">
      <section
        className={cn(
          "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-6 pt-24 pb-16",
          className
        )}
        aria-labelledby={headingId}
      >
        {/* Animated background grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6 inline-block"
              aria-hidden="true"
            >
              <div className="mx-auto h-24 w-24 rounded-full border-4 border-background bg-gradient-to-br from-primary to-muted shadow-lg" />
            </motion.div>

            <motion.h1
              id={headingId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6 text-5xl font-bold text-foreground md:text-7xl"
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mb-6 font-mono text-xl font-medium tracking-wide text-primary md:text-2xl"
              >
                {subtitle}
              </motion.p>
            )}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground md:text-2xl"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-12 flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" className="gap-2" asChild>
                <a href={primaryCta.href}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {primaryCta.label}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href={secondaryCta.href}>
                  {secondaryCta.label}
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex justify-center gap-4"
            >
              {socials.map(({ icon, href, label, external }) => {
                const Icon = SOCIAL_ICONS[icon];
                return (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.6 },
            y: { delay: 1.5, duration: 1.5, repeat: Infinity },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
          aria-hidden="true"
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </section>
    </MotionConfig>
  );
}
