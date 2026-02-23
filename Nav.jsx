/**
 * NAVIGATION — components/ui/Nav.jsx
 * Sticky navbar with section anchors and security badge
 */

'use client';

import { useState, useEffect } from 'react';
import { Shield, Menu, X, Terminal } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Skills',    href: '#skills'   },
  { label: 'Labs',      href: '#labs'     },
  { label: 'Roadmap',   href: '#roadmap'  },
  { label: 'Contact',   href: '#contact'  },
];

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-surface-border'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        className="max-w-container mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* ── Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 font-display font-bold text-text-primary hover:text-accent transition-colors"
          aria-label="Alex Morgan — home"
        >
          <Terminal size={20} className="text-accent" aria-hidden="true" />
          <span className="text-sm tracking-widest font-mono uppercase">
            alex<span className="text-accent">@</span>sec
          </span>
        </a>

        {/* ── Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-mono text-text-secondary hover:text-accent transition-colors tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="flex items-center gap-1.5 text-sm font-mono bg-accent/10 border border-accent/30 text-accent px-3 py-1.5 rounded hover:bg-accent/20 transition-all"
            >
              <Shield size={14} aria-hidden="true" />
              Secure Contact
            </a>
          </li>
        </ul>

        {/* ── Mobile toggle */}
        <button
          className="md:hidden text-text-secondary hover:text-accent transition-colors p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* ── Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-b border-surface-border px-6 pb-4">
          <ul className="flex flex-col gap-3" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-sm font-mono text-text-secondary hover:text-accent transition-colors py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-accent mr-2">›</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
