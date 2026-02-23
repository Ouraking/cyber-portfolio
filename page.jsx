/**
 * HOME PAGE — app/page.jsx
 *
 * Assembles all section components in order.
 * This is a React Server Component (no 'use client' directive) — sections
 * that need interactivity declare 'use client' themselves for granular hydration.
 *
 * Performance: Server Components reduce JS bundle size — only interactive
 * islands (Terminal, ContactForm, Nav) ship client-side JavaScript.
 */

import Nav        from '@/components/ui/Nav';
import Footer     from '@/components/ui/Footer';
import Hero       from '@/components/sections/Hero';
import SkillMatrix from '@/components/sections/SkillMatrix';
import Labs       from '@/components/sections/Labs';
import Roadmap    from '@/components/sections/Roadmap';
import Contact    from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      {/* ── Navigation */}
      <Nav />

      {/* ── Main content */}
      <main id="main-content">
        {/*
         * Skip-to-content link for keyboard/screen reader users
         * Hidden visually until focused — WCAG 2.4.1
         */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 bg-accent text-surface font-mono text-sm px-4 py-2 rounded"
        >
          Skip to main content
        </a>

        {/* 01 — Hero */}
        <Hero />

        {/* Section divider */}
        <div className="max-w-container mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" aria-hidden="true" />
        </div>

        {/* 02 — Skills */}
        <SkillMatrix />

        <div className="max-w-container mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" aria-hidden="true" />
        </div>

        {/* 03 — Labs */}
        <Labs />

        <div className="max-w-container mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" aria-hidden="true" />
        </div>

        {/* 04 — Roadmap */}
        <Roadmap />

        <div className="max-w-container mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" aria-hidden="true" />
        </div>

        {/* 05 — Contact */}
        <Contact />
      </main>

      {/* ── Footer */}
      <Footer />
    </>
  );
}
