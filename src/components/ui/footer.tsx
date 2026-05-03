import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const QUICK_LINKS = [
  { href: "#skills",   label: "Skills" },
  { href: "#labs",     label: "Projects" },
  { href: "#learning", label: "Learning" },
  { href: "#roadmap",  label: "Roadmap" },
  { href: "#contact",  label: "Contact" },
];

const SOCIAL = [
  {
    href: "https://github.com/Ouraking",
    label: "GitHub",
    icon: Github,
    external: true,
  },
  {
    href: "#",
    label: "LinkedIn",
    icon: Linkedin,
    external: true,
  },
  {
    href: "mailto:jm18306@gmail.com",
    label: "Email",
    icon: Mail,
    external: false,
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border-light/60 bg-surface/60" role="contentinfo">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand col */}
          <div className="space-y-4">
            <div>
              <p className="font-mono text-[11px] text-accent/70 tracking-[0.25em] uppercase mb-1">
                SEC://PORTFOLIO
              </p>
              <h2 className="text-foreground font-semibold text-lg leading-tight text-balance">
                Koffi Jean-Marie<br />Amedjonekou
              </h2>
            </div>
            <p className="text-sm text-muted-light leading-relaxed max-w-xs">
              Cybersecurity engineer building secure-by-default systems. Open to
              full-time security roles globally.
            </p>
            {/* Availability pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-emerald/20 bg-accent-emerald/5 px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-70" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-emerald" />
              </span>
              <span className="text-xs font-mono text-accent-emerald/90">
                Open to opportunities
              </span>
            </div>
          </div>

          {/* Quick nav */}
          <nav aria-label="Footer navigation">
            <p className="text-[11px] font-mono text-muted tracking-[0.15em] uppercase mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-light hover:text-accent transition-colors duration-150"
                  >
                    <span className="h-px w-3 bg-current opacity-40 group-hover:w-5 transition-all duration-200" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect col */}
          <div>
            <p className="text-[11px] font-mono text-muted tracking-[0.15em] uppercase mb-4">
              Connect
            </p>
            <ul className="space-y-3">
              {SOCIAL.map(({ href, label, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-3 text-sm text-muted-light hover:text-accent transition-colors duration-150"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border-light bg-card group-hover:border-accent/30 group-hover:bg-accent/8 transition-all duration-150">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {label}
                    {external && (
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150" aria-hidden="true" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-muted">
            &copy; {new Date().getFullYear()} Koffi Jean-Marie Amedjonekou
          </p>
          <p className="text-xs text-muted/60">
            Built with Next.js &middot; Secured by design &middot; No tracking scripts
          </p>
        </div>
      </div>
    </footer>
  );
}
