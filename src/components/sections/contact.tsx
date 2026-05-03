"use client";

import { useState, type FormEvent } from "react";
import {
  Send,
  Check,
  Mail,
  User,
  MessageSquare,
  AlertCircle,
  Loader2,
  MapPin,
  CircleDot,
  Github,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";

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
      className="px-6 py-24 relative"
      aria-labelledby="contact-heading"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,229,255,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14">
          <p className="font-mono text-xs text-accent/70 tracking-[0.2em] uppercase mb-3">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="text-3xl font-bold tracking-tight text-foreground text-balance"
          >
            Get in Touch
          </h2>
          <p className="mt-3 text-muted-light max-w-lg leading-relaxed">
            Open to opportunities in penetration testing, vulnerability management,
            threat analysis, and security research. Let&apos;s build something secure together.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5 items-start">
          {/* ── Left column ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Info cards */}
            {[
              {
                icon: Mail,
                label: "Email",
                value: "jm18306@gmail.com",
                href: "mailto:jm18306@gmail.com",
                color: "text-accent",
                bg: "bg-accent/8 border-accent/20",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "United States — Remote",
                href: null,
                color: "text-accent-blue",
                bg: "bg-accent-blue/8 border-accent-blue/20",
              },
              {
                icon: CircleDot,
                label: "Availability",
                value: "Open to full-time roles",
                href: null,
                color: "text-accent-emerald",
                bg: "bg-accent-emerald/8 border-accent-emerald/20",
              },
            ].map(({ icon: Icon, label, value, href, color, bg }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-border-light bg-card/50 p-4"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${bg} ${color}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className={`text-sm font-medium ${color} hover:underline underline-offset-2 truncate block`}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground/90 truncate">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="pt-2">
              <p className="text-[11px] font-mono text-muted tracking-[0.15em] uppercase mb-3">
                Profiles
              </p>
              <div className="flex gap-2">
                {[
                  {
                    href: "https://github.com/Ouraking",
                    icon: Github,
                    label: "GitHub",
                  },
                  { href: "#", icon: Linkedin, label: "LinkedIn" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-xl border border-border-light bg-card/50 px-3.5 py-2 text-xs text-muted-light hover:text-accent hover:border-accent/25 transition-all duration-150"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column: Form ── */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-2xl border border-border-light bg-card/50 p-7 space-y-5"
            noValidate
          >
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="flex items-center gap-1.5 text-xs font-medium text-muted tracking-wide mb-2"
              >
                <User className="h-3 w-3 text-accent" aria-hidden="true" />
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
                className="w-full rounded-xl border border-border-light bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/40 input-glow transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="flex items-center gap-1.5 text-xs font-medium text-muted tracking-wide mb-2"
              >
                <Mail className="h-3 w-3 text-accent" aria-hidden="true" />
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
                className="w-full rounded-xl border border-border-light bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/40 input-glow transition-colors"
                placeholder="you@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="flex items-center gap-1.5 text-xs font-medium text-muted tracking-wide mb-2"
              >
                <MessageSquare className="h-3 w-3 text-accent" aria-hidden="true" />
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={formState.message}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, message: e.target.value }))
                }
                className="w-full rounded-xl border border-border-light bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/40 input-glow transition-colors resize-none"
                placeholder="Describe the opportunity or project..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={sending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-background btn-press hover:bg-accent-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
        </div>
      </div>

      {/* Toast */}
      {toastVisible && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border ${
            toastError
              ? "border-accent-red/30 text-accent-red bg-card"
              : "border-accent-emerald/30 text-accent-emerald bg-card"
          } px-4 py-3 text-sm font-medium shadow-2xl ${
            toastExiting ? "animate-toast-out" : "animate-toast-in"
          }`}
          role="status"
          aria-live="polite"
        >
          {toastError ? (
            <>
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              Failed to send — please try again
            </>
          ) : (
            <>
              <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
              Message sent successfully
            </>
          )}
        </div>
      )}
    </section>
  );
}
