import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import { HeroBackground } from "@/components/sections/hero-background";
import { Button } from "@/components/ui/button";
import { Headshot } from "@/components/ui/headshot";
import { Magnetic } from "@/components/ui/magnetic";
import { SocialLinks } from "@/components/ui/social-links";
import { SITE } from "@/lib/site";

/**
 * Position in the entrance sequence. `.animate-reveal-in` turns this into an
 * animation delay, so the order is stated once here rather than as a column of
 * hand-typed milliseconds.
 */
const step = (index: number) => ({ "--i": index }) as CSSProperties;

/**
 * A Server Component. The staggered entrance is pure CSS, so the only client
 * code in the hero is the two leaves that genuinely need the browser: the
 * canvas background and the magnetic CTA wrapper.
 */
export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden px-6 pb-20 pt-32 sm:pt-36"
      aria-labelledby="hero-heading"
    >
      <HeroBackground />

      {/*
        Deliberately not a 100vh hero. Forcing full-viewport height centred the
        content and left a dead band under it, and pushed the proof strip below
        the fold — the two numbers a recruiter most wants early.
      */}
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div>
          <p
            className="animate-reveal-in font-mono text-[11px] uppercase tracking-[0.14em] text-accent"
            style={step(0)}
          >
            {SITE.role} · Open to full-time roles
          </p>

          <h1
            id="hero-heading"
            className="animate-reveal-in mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl"
            style={step(1)}
          >
            {SITE.name}
          </h1>

          <p
            className="animate-reveal-in mt-5 text-lg text-foreground-2 sm:text-xl"
            style={step(2)}
          >
            {SITE.primaryLine}
          </p>

          <p
            className="animate-reveal-in mt-4 max-w-xl leading-relaxed text-muted"
            style={step(3)}
          >
            {SITE.positioning}
          </p>

          <div
            className="animate-reveal-in mt-9 flex flex-wrap items-center gap-3"
            style={step(4)}
          >
            <Magnetic>
              <Button size="lg" asChild>
                <Link href="/#work">
                  View work
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </Magnetic>
            <Button size="lg" variant="outline" asChild>
              <Link href={SITE.resumeHref}>
                <FileText aria-hidden="true" />
                Resume
              </Link>
            </Button>
          </div>

          <div className="animate-reveal-in mt-8" style={step(5)}>
            <SocialLinks />
          </div>
        </div>

        <div
          className="animate-reveal-in order-first lg:order-last"
          style={step(2)}
        >
          <Headshot />
        </div>
      </div>
    </section>
  );
}
