"use client";

import { useState, type FormEvent } from "react";
import { Send, Check, Mail, User, MessageSquare, AlertCircle, Loader2, MapPin, CircleDot } from "lucide-react";

/**
 * Contact form — sends messages via Formsubmit.co to jm18306@gmail.com.
 * SECURITY NOTES:
 * - All inputs use controlled React state (not dangerouslySetInnerHTML).
 * - Form data is sent to Formsubmit.co via fetch POST (no page redirect).
 * - No user input is rendered back as raw HTML — React auto-escapes JSX.
 * - Formsubmit.co handles spam filtering, rate limiting, and CAPTCHA.
 * - _captcha is disabled for seamless UX; Formsubmit still applies bot detection.
 */
export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastExiting, setToastExiting] = useState(false);
  const [toastError, setToastError] = useState(false);

  const showToast = (isError: boolean) => {
    setToastError(isError);
    setToastVisible(true);
    setToastExiting(false);
    setTimeout(() => setToastExiting(true), 3500);
    setTimeout(() => {
      setToastVisible(false);
      setToastExiting(false);
      setToastError(false);
    }, 3800);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/jm18306@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `Portfolio Contact — ${formState.name}`,
          _captcha: "false",
          _template: "table",
        }),
      });

      if (response.ok) {
        showToast(false);
        setFormState({ name: "", email: "", message: "" });
      } else {
        showToast(true);
      }
    } catch {
      showToast(true);
    } finally {
      setSending(false);
    }
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

        <div className="mx-auto max-w-5xl grid gap-10 lg:grid-cols-2 items-start">
          {/* Left column: info cards */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Let&apos;s Connect</h3>
              <p className="text-sm text-muted leading-relaxed">
                Whether you have an opportunity, a question, or just want to talk security &mdash; I&apos;d love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email card */}
              <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-cyan/10">
                  <Mail className="h-5 w-5 text-accent-cyan" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted">jm18306@gmail.com</p>
                </div>
              </div>

              {/* Location card */}
              <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-blue/10">
                  <MapPin className="h-5 w-5 text-accent-blue" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Location</p>
                  <p className="text-sm text-muted">United States &mdash; Open to Remote</p>
                </div>
              </div>

              {/* Availability card */}
              <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-emerald/10">
                  <CircleDot className="h-5 w-5 text-accent-emerald" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Availability</p>
                  <p className="text-sm text-muted">Open to internships &amp; collaborations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Form */}
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
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 input-glow focus:outline-none"
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
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 input-glow focus:outline-none"
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
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 input-glow focus:outline-none resize-none"
                placeholder="Describe the opportunity or project..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={sending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 px-5 py-2.5 text-sm font-medium text-accent-cyan btn-press hover:bg-accent-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent-cyan/10"
            >
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>  {/* end grid */}
      </div>

      {/* Toast notification */}
      {toastVisible && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border ${
            toastError
              ? "border-red-500/30 text-red-400"
              : "border-accent-emerald/30 text-accent-emerald"
          } bg-card px-4 py-3 text-sm font-medium shadow-lg ${
            toastExiting ? "animate-toast-out" : "animate-toast-in"
          }`}
          role="status"
          aria-live="polite"
        >
          {toastError ? (
            <>
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              Failed to send — please try again
            </>
          ) : (
            <>
              <Check className="h-4 w-4" aria-hidden="true" />
              Message sent successfully
            </>
          )}
        </div>
      )}
    </section>
  );
}
