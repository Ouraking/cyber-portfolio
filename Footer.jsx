/**
 * FOOTER — components/ui/Footer.jsx
 */

import { Terminal, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-surface-border py-10 px-6"
      role="contentinfo"
    >
      <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-accent" aria-hidden="true" />
          <span className="font-mono text-xs text-text-muted">
            alex<span className="text-accent">@</span>sec — {year}
          </span>
        </div>

        {/* Legal note */}
        <p className="text-xs font-mono text-text-muted text-center">
          All lab work conducted in authorized environments.{' '}
          <span className="text-accent">Ethical hacking only.</span>
        </p>

        {/* Social */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/alexmorgan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="GitHub profile (opens in new tab)"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/alexmorgan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
