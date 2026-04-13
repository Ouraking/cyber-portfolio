import { Shield, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card relative" role="contentinfo">
      <div className="absolute top-0 left-0 right-0 section-divider" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Top tier: brand + social icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-foreground text-sm font-semibold">
            <Shield className="h-5 w-5 text-accent-cyan" aria-hidden="true" />
            Security Portfolio
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Ouraking"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="mailto:jm18306@gmail.com"
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Separator */}
        <div className="my-6 border-t border-border/50" aria-hidden="true" />

        {/* Middle tier: quick nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer navigation">
          <a href="#skills" className="text-xs text-muted hover:text-accent-cyan transition-colors">Skills</a>
          <a href="#labs" className="text-xs text-muted hover:text-accent-cyan transition-colors">Projects</a>
          <a href="#roadmap" className="text-xs text-muted hover:text-accent-cyan transition-colors">Roadmap</a>
          <a href="#contact" className="text-xs text-muted hover:text-accent-cyan transition-colors">Contact</a>
        </nav>

        {/* Separator */}
        <div className="my-6 border-t border-border/50" aria-hidden="true" />

        {/* Availability banner */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-emerald" />
          </span>
          <span className="text-sm text-accent-emerald font-medium">
            Open to Full-Time Security Engineering &amp; SOC Analyst Roles
          </span>
        </div>

        {/* Separator */}
        <div className="mb-6 border-t border-border/50" aria-hidden="true" />

        {/* Bottom tier: copyright + tagline */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted text-xs font-mono">
            <span>&copy; {new Date().getFullYear()} Security Portfolio</span>
          </div>
          <p className="text-xs text-muted">
            Built with Next.js &middot; Secured by design &middot; No tracking scripts
          </p>
        </div>
      </div>
    </footer>
  );
}
