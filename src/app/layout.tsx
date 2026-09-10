import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { SITE, SITE_URL } from "@/lib/site";
import { buildJsonLd } from "@/lib/jsonld";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * SECURITY NOTE: metadata is built from the static config in lib/site.ts —
 * never from user input or query parameters. That prevents meta-tag injection
 * and open-redirect via og:url. Response security headers (CSP, HSTS, and
 * friends) are set in next.config.ts.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // The name leads so the page is findable by it; the role gives search and
  // social results something to match on.
  title: `${SITE.name} | ${SITE.role}`,
  description: SITE.description,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  keywords: [
    "cybersecurity engineer",
    "security engineer",
    "identity and access management",
    "vulnerability management",
    "SOC analyst",
    "cloud security",
    "GRC",
    "Rapid7 InsightVM",
    "zero trust",
    SITE.name,
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  // Without these, sharing the URL on LinkedIn or Slack renders a bare link
  // with no title, description, or preview card.
  openGraph: {
    type: "profile",
    siteName: `${SITE.name} — Security Portfolio`,
    title: `${SITE.name} | ${SITE.role}`,
    description: SITE.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.role}`,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*
   * The only dangerouslySetInnerHTML in the codebase, and it is safe by
   * construction: buildJsonLd() returns a static object assembled from the
   * data layer, with no user input anywhere in it. Escaping `<` to its
   * unicode form is belt-and-braces: it stops any future string that happened
   * to contain a closing script tag from breaking out of this one.
   *
   * The CSP in next.config.ts already allows 'unsafe-inline' for script-src
   * (the App Router inlines the RSC flight payload), so this needs no header
   * change. It is not executable script; type="application/ld+json" is data.
   */
  const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

  return (
    // lang for assistive technology; the dark class forces the single theme.
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground-2 antialiased`}
      >
        {/* Skip-to-content link for keyboard and screen reader users (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground focus:outline-none"
        >
          Skip to main content
        </a>
        {/* Chrome is hidden in print so /resume prints as a clean document. */}
        <div className="print:hidden">
          <Navbar />
        </div>
        <main id="main-content">{children}</main>
        <div className="print:hidden">
          <Footer />
        </div>
      </body>
    </html>
  );
}
