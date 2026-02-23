/**
 * CONTACT API ROUTE — app/api/contact/route.js
 *
 * Server-side handling for contact form submissions.
 *
 * Security layers (defense-in-depth):
 * ─────────────────────────────────────
 * 1. Input validation: Whitelist approach — expected fields only, strict lengths.
 * 2. Sanitization: Strip HTML entities to prevent stored XSS in email clients.
 * 3. Rate limiting: Simple in-memory limiter (replace with Redis/Upstash in prod).
 * 4. Content-Type check: Only accept application/json — reject form multipart.
 * 5. Method restriction: Only POST allowed.
 *
 * Production TODO: Replace in-memory rate limiter with Upstash Redis (@upstash/ratelimit)
 * and replace console.log with a structured logger (Pino/Winston).
 */

import { NextResponse } from 'next/server';

// ─── Simple in-memory rate limiter (dev only — not suitable for production/multi-instance)
// Production: use @upstash/ratelimit with Redis
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;  // 1 hour
const RATE_LIMIT_MAX       = 3;                // max 3 messages per IP per hour
const rateLimitStore       = new Map();        // ip -> [timestamps]

function checkRateLimit(ip) {
  const now       = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const history   = (rateLimitStore.get(ip) ?? []).filter((t) => t > windowStart);

  if (history.length >= RATE_LIMIT_MAX) return false;

  history.push(now);
  rateLimitStore.set(ip, history);
  return true;
}

// ─── HTML entity escaping — prevents XSS if output is ever rendered as HTML
function escapeHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;');
}

// ─── Field validators
const VALIDATORS = {
  name:    (v) => typeof v === 'string' && v.trim().length > 0 && v.trim().length <= 100,
  email:   (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) && v.length <= 254,
  subject: (v) => typeof v === 'string' && v.trim().length > 0 && v.trim().length <= 200,
  message: (v) => typeof v === 'string' && v.trim().length >= 20 && v.trim().length <= 2000,
};

export async function POST(request) {
  // ── 1. Method is guaranteed POST by Next.js route export, but verify Content-Type
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json(
      { error: 'Content-Type must be application/json' },
      { status: 415 }
    );
  }

  // ── 2. Rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const ip        = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': '3600' } }
    );
  }

  // ── 3. Parse body safely
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // ── 4. Only accept known fields (whitelist approach — drop everything else)
  const { name, email, subject, message } = body;

  // ── 5. Server-side validation (client-side already did this, but clients lie)
  const invalid = Object.entries(VALIDATORS).find(
    ([field, validator]) => !validator(body[field])
  );

  if (invalid) {
    return NextResponse.json(
      { error: `Invalid field: ${invalid[0]}` },
      { status: 422 }
    );
  }

  // ── 6. Sanitize all string inputs
  const clean = {
    name:    escapeHtml(name.trim()),
    email:   email.trim().toLowerCase(),
    subject: escapeHtml(subject.trim()),
    message: escapeHtml(message.trim()),
  };

  // ── 7. Send email (replace with your transactional provider)
  // e.g., Resend, Postmark, AWS SES — never use raw SMTP from a serverless function
  try {
    // TODO: Uncomment and configure with your email provider:
    //
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from:    'portfolio@alexmorgan.dev',
    //   to:      'alex@alexmorgan.dev',
    //   subject: `[Portfolio] ${clean.subject}`,
    //   text:    `From: ${clean.name} <${clean.email}>\n\n${clean.message}`,
    // });

    // Simulate send in development
    console.info('[CONTACT] Message received from', clean.email);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    // Don't expose internal error details to client
    console.error('[CONTACT] Email send failed:', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

// ─── Reject all other methods
export function GET()    { return NextResponse.json({ error: 'Method not allowed' }, { status: 405 }); }
export function PUT()    { return NextResponse.json({ error: 'Method not allowed' }, { status: 405 }); }
export function DELETE() { return NextResponse.json({ error: 'Method not allowed' }, { status: 405 }); }
