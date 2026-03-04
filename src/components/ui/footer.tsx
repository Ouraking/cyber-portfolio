import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card" role="contentinfo">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-muted text-xs font-mono">
          <Shield className="h-4 w-4 text-accent-cyan" aria-hidden="true" />
          <span>&copy; {new Date().getFullYear()} Security Portfolio</span>
        </div>
        <p className="text-xs text-muted">
          Built with Next.js &middot; Secured by design &middot; No tracking scripts
        </p>
      </div>
    </footer>
  );
}
