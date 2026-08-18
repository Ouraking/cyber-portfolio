"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";

const NAV_LINKS = [
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#certs", id: "certs", label: "Certs" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md transition-[border-color] duration-300 ${
        scrolled ? "border-border" : "border-transparent"
      }`}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          className="font-medium tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          aria-label="Go to top of page"
        >
          <span className="sm:hidden">{SITE.initials}</span>
          <span className="hidden sm:inline">{SITE.shortName}</span>
        </Link>

        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded ${
                  activeId === link.id
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href={SITE.resumeHref}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium btn-ghost btn-press"
          >
            Resume
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium btn-primary btn-press"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
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

      <nav
        id="mobile-nav"
        className={`md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[28rem] py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
        aria-label="Mobile navigation"
        inert={!mobileOpen}
      >
        <ul className="space-y-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block text-sm text-muted hover:text-foreground py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="flex gap-3 pt-2">
            <Link
              href={SITE.resumeHref}
              className="inline-flex flex-1 items-center justify-center rounded-full px-4 py-2 text-sm font-medium btn-ghost"
              onClick={() => setMobileOpen(false)}
            >
              Resume
            </Link>
            <Link
              href="/#contact"
              className="inline-flex flex-1 items-center justify-center rounded-full px-4 py-2 text-sm font-medium btn-primary"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
