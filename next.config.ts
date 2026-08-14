import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * `script-src` includes 'unsafe-inline' by necessity, not by choice: the App
 * Router inlines the RSC flight payload into <script> tags on every prerendered
 * page. The nonce-based alternative requires middleware, which opts every route
 * out of static generation — a bad trade for a fully static site. Every other
 * directive is locked down, and `object-src 'none'` + `base-uri 'self'` block
 * the injection primitives that make inline script the most dangerous.
 *
 * `connect-src` and `form-action` allow formsubmit.co because the contact form
 * POSTs there. Nothing else is reachable.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://formsubmit.co",
  "form-action 'self' https://formsubmit.co",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  // Two years, subdomains included, eligible for the HSTS preload list.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // frame-ancestors already covers this; retained for pre-CSP-2 browsers.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

const nextConfig: NextConfig = {
  // Drop the `X-Powered-By: Next.js` version disclosure.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
