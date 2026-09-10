import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Headshot } from "@/components/ui/headshot";
import { SocialLinks } from "@/components/ui/social-links";
import { SITE } from "@/lib/site";

/**
 * A Server Component. The staggered entrance is pure CSS (`.animate-reveal-in`
 * plus an inline animationDelay), so the hero ships no JavaScript at all —
 * which is why framer-motion was dropped in this rebuild.
 *
 * `100svh` rather than `100vh`: on mobile the dynamic browser chrome makes
 * `vh` taller than the visible viewport, pushing the CTAs below the fold on
 * first paint.
 */
export function Hero() {
  return (
    <section
      className="px-6 pb-16 pt-28 sm:pt-32"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-[1fr_auto] lg:gap-16">
        <div>
          <p
            className="animate-reveal-in font-mono text-[11px] uppercase tracking-[0.14em] text-accent"
            style={{ animationDelay: "0ms" }}
          >
            {SITE.role} · Open to full-time roles
          </p>

          <h1
            id="hero-heading"
            className="animate-reveal-in mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {SITE.name}
          </h1>

          <p
            className="animate-reveal-in mt-5 text-lg text-foreground-2 sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            {SITE.primaryLine}
          </p>

          <p
            className="animate-reveal-in mt-4 max-w-xl leading-relaxed text-muted"
            style={{ animationDelay: "240ms" }}
          >
            {SITE.positioning}
          </p>

          <div
            className="animate-reveal-in mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "320ms" }}
          >
            <Button size="lg" asChild>
              <Link href="/#work">
                View work
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={SITE.resumeHref}>
                <FileText aria-hidden="true" />
                Resume
              </Link>
            </Button>
          </div>

          <div
            className="animate-reveal-in mt-8"
            style={{ animationDelay: "400ms" }}
          >
            <SocialLinks />
          </div>
        </div>

        <div
          className="animate-reveal-in order-first lg:order-last"
          style={{ animationDelay: "160ms" }}
        >
          <Headshot />
        </div>
      </div>
    </section>
  );
}
