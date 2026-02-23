/**
 * ROOT LAYOUT — app/layout.jsx
 *
 * Security notes (for recruiters reviewing this code):
 * ─────────────────────────────────────────────────────
 * 1. Content Security Policy (CSP): Defined in next.config.js headers()
 *    to prevent XSS by whitelisting trusted script/style sources.
 * 2. Strict-Transport-Security: Enforced via next.config.js.
 * 3. X-Frame-Options: DENY — prevents clickjacking.
 * 4. Referrer-Policy: no-referrer — prevents data leakage to third parties.
 * 5. Permissions-Policy: Restricts camera/mic/geolocation access.
 * 6. No third-party analytics/trackers — privacy-respecting by default.
 */

import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// ─── Font Loading (next/font for zero layout shift & no third-party requests)
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// ─── Metadata (SEO + Open Graph)
export const metadata = {
  title: 'Alex Morgan — Cybersecurity Researcher',
  description:
    'Cybersecurity student specializing in penetration testing, blue team operations, and GRC. Explore labs, write-ups, and methodology.',
  openGraph: {
    title: 'Alex Morgan — Cybersecurity Researcher',
    description: 'Security Researcher & Student Portfolio',
    type: 'website',
  },
  // Prevent indexing of sensitive paths (robots handled in robots.txt too)
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-surface text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  );
}
