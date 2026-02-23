/**
 * HERO SECTION — components/sections/Hero.jsx
 * Full-viewport hero with name, tagline, status badges, and live terminal
 */

import { ArrowDown, Github, Linkedin, FileText, Shield } from 'lucide-react';
import LiveTerminal from '../ui/LiveTerminal';

// ─── Social links (no tracking parameters)
const SOCIAL_LINKS = [
  { label: 'GitHub',    href: 'https://github.com/alexmorgan',   icon: Github   },
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/alexmorgan', icon: Linkedin },
  { label: 'Resume',    href: '/alex-morgan-resume.pdf',           icon: FileText },
];

// ─── Status badges
const STATUS_BADGES = [
  { label: 'Actively Learning',    color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  { label: 'Open to Internships',  color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20'          },
  { label: 'CTF Player',           color: 'text-violet-400 bg-violet-400/10 border-violet-400/20'    },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ── Background: grid + radial glow */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-60 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-hero-glow pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Scan line — subtle, single pass on load */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-20"
        aria-hidden="true"
      >
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-scan" />
      </div>

      <div className="relative max-w-container mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* ── Left column: identity */}
        <div>
          {/* Breadcrumb / location indicator */}
          <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-6 animate-ready animate-fade-up">
            <span className="text-accent">~/</span>portfolio/alex-morgan
          </p>

          {/* Status badges */}
          <div className="flex flex-wrap gap-2 mb-6 animate-ready animate-fade-up delay-100">
            {STATUS_BADGES.map((badge) => (
              <span
                key={badge.label}
                className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border ${badge.color}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" aria-hidden="true" />
                {badge.label}
              </span>
            ))}
          </div>

          {/* Name */}
          <h1
            id="hero-heading"
            className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-text-primary leading-[1.05] mb-4 animate-ready animate-fade-up delay-200"
          >
            Alex{' '}
            <span className="gradient-text">Morgan</span>
          </h1>

          {/* Tagline */}
          <p className="font-display text-xl md:text-2xl text-text-secondary font-medium mb-3 animate-ready animate-fade-up delay-300">
            Security Researcher & Student
          </p>

          {/* Sub-description */}
          <p className="text-base text-text-secondary leading-relaxed max-w-md mb-10 animate-ready animate-fade-up delay-400">
            I approach security like an engineer, not a script kiddie — methodical
            threat modeling, documented lab work, and a bias toward understanding
            the <em>why</em> behind every vulnerability.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-4 mb-10 animate-ready animate-fade-up delay-500">
            <a
              href="#labs"
              className="inline-flex items-center gap-2 bg-accent text-surface font-display font-semibold px-6 py-3 rounded-lg hover:bg-accent-bright transition-all duration-200 shadow-emerald-glow hover:shadow-lg"
            >
              <Shield size={16} aria-hidden="true" />
              View Lab Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-surface-border text-text-secondary font-display font-medium px-6 py-3 rounded-lg hover:border-accent/40 hover:text-text-primary transition-all duration-200"
            >
              Get in touch
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5 animate-ready animate-fade-up delay-600">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-text-muted hover:text-accent transition-colors"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Right column: live terminal */}
        <div className="animate-ready animate-fade-up delay-400">
          <LiveTerminal />

          {/* Metric row beneath terminal */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { value: '30+', label: 'Labs Completed' },
              { value: 'Top 1%', label: 'TryHackMe' },
              { value: '3', label: 'Certs Earned' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-surface-card border border-surface-border rounded-lg p-3 text-center"
              >
                <p className="font-display font-bold text-accent text-xl">{stat.value}</p>
                <p className="font-mono text-xs text-text-muted mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator */}
      <a
        href="#skills"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-muted hover:text-accent transition-colors animate-bounce"
        aria-label="Scroll to skills section"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
