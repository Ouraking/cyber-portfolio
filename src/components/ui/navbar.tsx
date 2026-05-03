"use client";

import { useState, useEffect } from "react";
import { Menu, X, Hexagon } from "lucide-react";

const NAV_LINKS = [
  { href: "#about",     label: "About" },
  { href: "#skills",    label: "Skills" },
  { href: "#labs",      label: "Projects" },
  { href: "#learning",  label: "Learning" },
  { href: "#roadmap",   label: "Roadmap" },
  { href: "#contact",   label: "Contact" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4, rootMargin: "-80px 0px -60% 0px" }
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "navbar-scrolled border-b border-border/60 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <a
          href="#"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded"
          aria-label="Go to top of page"
        >
          <div className="relative">
            <Hexagon
              className="h-7 w-7 text-accent transition-all duration-300 group-hover:rotate-12"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold text-accent">
              KJ
            </span>
          </div>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="text-[11px] font-mono text-accent tracking-[0.2em] uppercase">
              SEC://
            </span>
            <span className="text-xs font-semibold text-foreground/90 tracking-wide">
              Portfolio
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                    isActive
                      ? "text-accent font-medium"
                      : "text-muted-light hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-lg bg-accent/8 border border-accent/15"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA button — desktop */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-emerald" />
            </span>
            <span className="text-xs font-mono text-accent-emerald/80">Available</span>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-accent/25 bg-accent/8 px-4 py-2 text-sm font-medium text-accent transition-all duration-200 hover:bg-accent/15 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-muted-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded p-1 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        id="mobile-nav"
        className={`md:hidden border-t border-border/50 bg-background/98 backdrop-blur-xl overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <ul className="px-6 py-4 space-y-1" role="menu">
          {NAV_LINKS.map((link) => (
            <li key={link.href} role="none">
              <a
                href={link.href}
                role="menuitem"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-light hover:text-foreground hover:bg-surface transition-all duration-150"
                onClick={() => setMobileOpen(false)}
              >
                <span className="h-px w-4 bg-accent/40" aria-hidden="true" />
                {link.label}
              </a>
            </li>
          ))}
          <li role="none">
            <a
              href="#contact"
              role="menuitem"
              className="flex items-center justify-center gap-2 mt-2 rounded-lg border border-accent/25 bg-accent/8 px-4 py-2.5 text-sm font-medium text-accent"
              onClick={() => setMobileOpen(false)}
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
