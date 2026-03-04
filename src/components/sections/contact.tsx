"use client";

import { useState, type FormEvent } from "react";
import { Send, Copy, Check, KeyRound, Mail, User, MessageSquare } from "lucide-react";

/**
 * Placeholder PGP public key — replace with your actual key.
 * Displayed read-only with a copy-to-clipboard button.
 */
const PGP_PUBLIC_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mQINBGXXXXXBEACzxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
=XXXX
-----END PGP PUBLIC KEY BLOCK-----`;

function CopyPGPKey() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PGP_PUBLIC_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: clipboard API may be blocked in non-secure contexts
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <KeyRound className="h-4 w-4 text-accent-cyan" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-foreground">PGP Public Key</h3>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          aria-label={copied ? "PGP key copied to clipboard" : "Copy PGP key to clipboard"}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-accent-emerald" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" aria-hidden="true" />
              Copy Key
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-lg bg-background p-4 text-[11px] font-mono text-muted leading-relaxed terminal-scrollbar max-h-36">
        {PGP_PUBLIC_KEY}
      </pre>
      <p className="mt-3 text-xs text-muted">
        Use this key to send me encrypted messages. Fingerprint verification
        available on request.
      </p>
    </div>
  );
}

/**
 * Contact form.
 * SECURITY NOTES:
 * - All inputs use controlled React state (not dangerouslySetInnerHTML).
 * - The form handler prevents default submission and would send data
 *   to a server-side API route in production, where input is validated
 *   and sanitized server-side before processing.
 * - No user input is rendered back as raw HTML — React auto-escapes JSX.
 * - In production, add CSRF token and rate limiting on the API route.
 */
export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Wire up to a server action or API route.
    // Server-side: validate email format, sanitize message, enforce rate limits.
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="px-6 py-24 bg-card/50"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            id="contact-heading"
            className="text-3xl font-bold tracking-tight text-foreground"
          >
            Get in Touch
          </h2>
          <p className="mt-3 text-muted max-w-lg mx-auto">
            Committed to contributing meaningfully to cybersecurity teams where
            technical expertise and a security-first mindset drive organizational
            resilience. Open to opportunities in penetration testing, vulnerability
            management, threat analysis, and security research.
          </p>
        </div>

        <div className="mx-auto max-w-3xl grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-card p-6 space-y-5"
            noValidate
          >
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5"
              >
                <User className="h-3.5 w-3.5 text-accent-cyan" aria-hidden="true" />
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                autoComplete="name"
                value={formState.name}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, name: e.target.value }))
                }
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent-cyan/50 focus:outline-none focus:ring-2 focus:ring-accent-cyan/20 transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5"
              >
                <Mail className="h-3.5 w-3.5 text-accent-cyan" aria-hidden="true" />
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                autoComplete="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, email: e.target.value }))
                }
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent-cyan/50 focus:outline-none focus:ring-2 focus:ring-accent-cyan/20 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5 text-accent-cyan" aria-hidden="true" />
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={formState.message}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, message: e.target.value }))
                }
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent-cyan/50 focus:outline-none focus:ring-2 focus:ring-accent-cyan/20 transition-colors resize-none"
                placeholder="Describe the opportunity or project..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 px-5 py-2.5 text-sm font-medium text-accent-cyan transition-colors hover:bg-accent-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan disabled:opacity-50"
              disabled={submitted}
            >
              {submitted ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Message Sent
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* PGP key section */}
          <CopyPGPKey />
        </div>
      </div>
    </section>
  );
}
