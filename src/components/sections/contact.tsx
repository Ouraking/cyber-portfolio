"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Send,
  Check,
  Mail,
  User,
  MessageSquare,
  AlertCircle,
  Loader2,
  MapPin,
  Linkedin,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SITE } from "@/lib/site";

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

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
            _subject: `Portfolio Contact — ${formState.name.trim()}`,
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
    `w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/70 input-glow focus:outline-none ${
      errors[field] ? "border-red-500/50" : "border-border"
    }`;

  return (
    <section
      id="contact"
      className="px-6 py-24"
      aria-labelledby="contact-heading"
    >
      <ScrollReveal>
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <h2
              id="contact-heading"
              className="font-display text-3xl sm:text-4xl tracking-tight text-foreground"
            >
              Contact
            </h2>
            <p className="mt-3 text-muted">
              Open to opportunities in identity, vulnerability management,
              detection, and security engineering.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div className="space-y-4">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 card-hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted">{SITE.email}</p>
                </div>
              </a>

              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 card-hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Linkedin className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">LinkedIn</p>
                  <p className="text-sm text-muted">linkedin.com/in/koffi-amedjonekou</p>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-elevated">
                  <MapPin className="h-5 w-5 text-secondary" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Location</p>
                  <p className="text-sm text-muted">{SITE.location}</p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-border bg-card p-6 space-y-5"
              noValidate
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5"
                >
                  <User className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
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
                  <p
                    id="contact-name-error"
                    className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                  >
                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5"
                >
                  <Mail className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
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
                  <p
                    id="contact-email-error"
                    className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                  >
                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5"
                >
                  <MessageSquare
                    className="h-3.5 w-3.5 text-accent"
                    aria-hidden="true"
                  />
                  Message
                </label>
                <textarea
                  id="contact-message"
                  ref={messageRef}
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  className={`${fieldClasses("message")} resize-none`}
                  placeholder="Describe the opportunity or project..."
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                  >
                    <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium btn-primary btn-press disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </ScrollReveal>

      {toastVisible && (
        <div
          className={`fixed z-50 flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm font-medium shadow-lg bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 ${
            toastError
              ? "border-red-500/30 text-red-400"
              : "border-accent-emerald/30 text-accent-emerald"
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
              Message sent successfully
            </>
          )}
        </div>
      )}
    </section>
  );
}
