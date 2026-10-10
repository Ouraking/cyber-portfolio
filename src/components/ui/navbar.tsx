"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/nav";
import { SITE } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [observedId, setObservedId] = useState("");

  /*
   * Derived rather than cleared in an effect: off the home route there is no
   * active section, and computing that during render avoids a setState-in-
   * effect cascade.
   */
  const activeId = isHome ? observedId : "";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /*
   * Scroll-spy. Gated on the home route because the target sections only exist
   * there — on /work/[slug] or /resume there is nothing to observe, and a
   * stale highlight would point at a section the reader cannot see.
   *
   * The asymmetric rootMargin biases the "active" band toward the upper third
   * of the viewport, which is where a reader's attention actually sits.
   */
  useEffect(() => {
    if (!isHome) return;

    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setObservedId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header
      className={`glass-2 fixed top-0 z-40 w-full border-x-0 border-t-0 transition-[border-color] duration-300 ${
        scrolled ? "border-b-border-strong" : "border-b-transparent"
      }`}
      role="banner"
    >
      <nav
        className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-6"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          className="rounded font-medium tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="sm:hidden">{SITE.initials}</span>
          <span className="hidden sm:inline">{SITE.shortName}</span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={activeId === link.id ? "true" : undefined}
                className={`nav-link rounded text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  activeId === link.id
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href={SITE.resumeHref}>Resume</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/#contact">Contact</Link>
          </Button>
        </div>

        <button
          type="button"
          className="rounded text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/*
        Always in the DOM so max-height/opacity can transition. `inert` when
        closed is load-bearing: without it the links stay in the tab order
        while visually collapsed, so keyboard users tab into invisible targets.
        It also removes the subtree from the accessibility tree, which
        `aria-hidden` could not legally do here — aria-hidden on a container
        with focusable children is an ARIA violation.

        No background or backdrop-filter of its own: the drawer sits inside the
        header, whose `glass-2` already covers it. A nested backdrop-filter
        would only blur the header's own backdrop, which does nothing but cost
        a second compositing layer.
      */}
      <nav
        id="mobile-nav"
        className={`overflow-hidden border-t border-border px-6 transition-all duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "max-h-120 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
        aria-label="Mobile navigation"
        inert={!mobileOpen}
      >
        <ul className="space-y-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded py-1 text-sm text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" asChild>
              <Link href={SITE.resumeHref} onClick={() => setMobileOpen(false)}>
                Resume
              </Link>
            </Button>
            <Button className="flex-1" asChild>
              <Link href="/#contact" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
