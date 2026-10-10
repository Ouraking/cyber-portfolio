"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  AlertCircle,
  Check,
  CircleDot,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { SITE } from "@/lib/site";

/**
 * Contact form — sends messages via Formsubmit.co, so the site needs no
 * backend.
 *
 * SECURITY NOTES:
 * - All inputs are controlled React state; dangerouslySetInnerHTML is not used
 *   here, so user text is never rendered as raw HTML.
 * - Posted with fetch rather than a native submit, so there is no redirect.
 * - The endpoint is built from SITE.email, a compile-time constant, never from
 *   a query parameter.
 * - formsubmit.co is the only origin allowed by connect-src / form-action in
 *   next.config.ts.
 * - _captcha is disabled for UX; Formsubmit still applies bot detection.
 *
 * The form keeps `noValidate` so validation messaging is styled and announced
 * consistently across browsers, which means the `required` attributes are
 * advisory only — validate() below is the actual gate.
 */

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

/** Deliberately permissive: catches empty or typo'd input without rejecting valid exotic addresses. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<FieldName, string>): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please add a little more detail (at least 10 characters).";
  }

  return errors;
}

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastExiting, setToastExiting] = useState(false);
  const [toastError, setToastError] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Toast dismissal timers, tracked so back-to-back submits don't leave a
  // previous toast's timers running (which would dismiss the new one early)
  // and so nothing fires after unmount.
  const toastTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearToastTimers = () => {
    toastTimers.current.forEach(clearTimeout);
    toastTimers.current = [];
  };

  useEffect(() => clearToastTimers, []);

  const showToast = (isError: boolean) => {
    clearToastTimers();
    setToastError(isError);
    setToastVisible(true);
    setToastExiting(false);
    toastTimers.current.push(setTimeout(() => setToastExiting(true), 3500));
    toastTimers.current.push(
      setTimeout(() => {
        setToastVisible(false);
        setToastExiting(false);
        setToastError(false);
      }, 3800)
    );
  };

  /** Clear a field's error as soon as the user starts correcting it. */
  const updateField = (field: FieldName, value: string) => {
    setFormState((s) => ({ ...s, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const nextErrors = validate(formState);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      // Move focus to the first problem so keyboard and screen reader users
      // land on it rather than having to hunt.
      const firstInvalid = (["name", "email", "message"] as const).find(
        (field) => nextErrors[field]
      );
      const refs = { name: nameRef, email: emailRef, message: messageRef };
      if (firstInvalid) refs[firstInvalid].current?.focus();
      return;
    }

    setErrors({});
    setSending(true);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${SITE.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formState.name.trim(),
            email: formState.email.trim(),
            message: formState.message.trim(),
            _subject: `Portfolio contact — ${formState.name.trim()}`,
            _captcha: "false",
            _template: "table",
          }),
        }
      );

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

  const fieldClasses = (field: FieldName) =>
    `input-glow w-full rounded-lg border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none ${
      errors[field]
        ? "border-danger/50"
        : "border-white/10 hover:border-white/20"
    }`;

  const errorClasses =
    "mt-1.5 flex items-center gap-1.5 text-xs text-danger";

  const details = [
    { icon: Mail, label: "Email", value: SITE.email },
    { icon: MapPin, label: "Location", value: SITE.location },
    { icon: CircleDot, label: "Availability", value: SITE.availability },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading">
      {/*
        NOTE: the toast at the bottom of this file is intentionally rendered
        outside the ScrollReveal below. ScrollReveal's animation leaves a
        non-none `transform` on its wrapper, which makes that wrapper the
        containing block for any `position: fixed` descendant — the toast would
        anchor to the section instead of the viewport.
      */}
      <ScrollReveal>
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mb-10 max-w-2xl sm:mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              Get in touch
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              Whether you have a role, a question, or just want to talk
              security, I&apos;d like to hear from you.
            </p>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <dl className="space-y-4">
                {details.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="glass-1 flex items-start gap-4 rounded-lg p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-2">
                      <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-foreground">
                        {label}
                      </dt>
                      <dd className="text-sm text-muted">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <SocialLinks className="mt-6" />
            </div>

            <form
              onSubmit={handleSubmit}
              className="glass-2 space-y-5 rounded-xl p-6"
              noValidate
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  ref={nameRef}
                  type="text"
                  required
                  autoComplete="name"
                  value={formState.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={fieldClasses("name")}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p id="contact-name-error" className={errorClasses}>
                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  ref={emailRef}
                  type="email"
                  required
                  autoComplete="email"
                  value={formState.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  className={fieldClasses("email")}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p id="contact-email-error" className={errorClasses}>
                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  ref={messageRef}
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  className={`${fieldClasses("message")} resize-none`}
                  placeholder="Describe the role or the question..."
                />
                {errors.message && (
                  <p id="contact-message-error" className={errorClasses}>
                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {errors.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={sending} className="w-full">
                {sending ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send aria-hidden="true" />
                    Send message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </ScrollReveal>

      {/* Toast — outside ScrollReveal so `fixed` resolves against the viewport. */}
      {toastVisible && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm font-medium shadow-lg ${
            toastError
              ? "border-danger/30 text-danger"
              : "border-success/30 text-success"
          } ${toastExiting ? "animate-toast-out" : "animate-toast-in"}`}
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
              Message sent
            </>
          )}
        </div>
      )}
    </section>
  );
}
