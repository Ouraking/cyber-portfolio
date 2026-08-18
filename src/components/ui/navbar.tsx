"use client";

import { useState, useEffect } from "react";
import { Shield, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#skills", label: "Skills" },
  { href: "#labs", label: "Labs" },
  { href: "#learning", label: "Learning" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        scrolled ? "navbar-scrolled" : "border-border/50"
      }`}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Primary navigation"
      >
        {/* Logo / brand */}
        <a
          href="#"
          className="flex items-center gap-2 text-accent-cyan font-mono text-sm font-semibold tracking-wider"
          aria-label="Go to top of page"
        >
          <Shield className="h-5 w-5" aria-hidden="true" />
          <span className="hidden sm:inline">SEC://PORTFOLIO</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded"
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
        Mobile dropdown — always in DOM so max-height/opacity can transition.
        `inert` when closed is load-bearing: without it the links stay in the
        tab order while visually collapsed, so keyboard users tab into
        invisible targets. It also removes the subtree from the accessibility
        tree, which `aria-hidden` alone could not legally do here — aria-hidden
        on a container with focusable children is an ARIA violation.
      */}
      <nav
        id="mobile-nav"
        className={`md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-60 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
        aria-label="Mobile navigation"
        inert={!mobileOpen}
      >
        <ul className="space-y-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block text-sm text-muted transition-colors hover:text-foreground py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
