/**
 * NEXT.JS CONFIGURATION — next.config.js
 *
 * Security headers applied at the HTTP layer.
 * This is the first line of defense — before any JS executes.
 *
 * Methodology: Defense-in-depth. Each header mitigates a distinct attack class:
 *   - CSP          → XSS & data injection
 *   - HSTS         → Protocol downgrade / SSL stripping
 *   - X-Frame      → Clickjacking
 *   - X-Content    → MIME sniffing attacks
 *   - Referrer     → Information leakage
 *   - Permissions  → Browser API abuse
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce static HTML/CSS — eliminates server-side attack surface
  // output: 'export',  // Uncomment for static deployment (GitHub Pages, etc.)

  // Disable the X-Powered-By header — reduces fingerprinting surface
  poweredByHeader: false,

  // ─── HTTP Security Headers ─────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // ── Content Security Policy ────────────────────────────────────────
          // Blocks execution of inline scripts from untrusted sources.
          // 'self' means this origin only. No eval(). No data: URIs for scripts.
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",  // unsafe-inline needed for Next.js hydration; use nonces in production
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self'",
              "frame-ancestors 'none'",  // Clickjacking protection
              "form-action 'self'",      // Prevent form hijacking
              "base-uri 'self'",
            ].join('; '),
          },
          // ── HSTS (HTTP Strict Transport Security) ─────────────────────────
          // Forces HTTPS for 1 year. includeSubDomains covers *.domain.com.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // ── Clickjacking Protection ────────────────────────────────────────
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // ── MIME Type Sniffing Prevention ──────────────────────────────────
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // ── Referrer Policy ───────────────────────────────────────────────
          // Prevents URL path/query leakage to external sites.
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // ── Permissions Policy ─────────────────────────────────────────────
          // Restricts browser APIs to prevent unauthorized hardware access.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
