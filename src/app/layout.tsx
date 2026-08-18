import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
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
 * Absolute base for og:image and other absolute URLs. Vercel exposes the
 * production domain at build time, so this resolves correctly on deploys
 * without hardcoding a URL. Set NEXT_PUBLIC_SITE_URL to override once a
 * custom domain is attached.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const NAME = "Koffi Jean-Marie Amedjonekou";
const ROLE = "Cybersecurity Engineer";
const DESCRIPTION =
  "Cybersecurity engineer working across penetration testing, vulnerability management, cloud security, and GRC. CompTIA, Rapid7, and Microsoft certified. Open to full-time security engineering and SOC analyst roles.";

/**
 * SECURITY NOTE: Metadata is statically defined — not derived from user input or
 * query parameters. This prevents meta-tag injection and open-redirect via og:url.
 * Response security headers (CSP, HSTS, and friends) are set in next.config.ts.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // The name leads so the page is findable by it; the role gives search and
  // social results something to match on.
  title: `${NAME} | ${ROLE}`,
  description: DESCRIPTION,
  authors: [{ name: NAME }],
  creator: NAME,
  keywords: [
    "cybersecurity engineer",
    "penetration testing",
    "vulnerability management",
    "SOC analyst",
    "cloud security",
    "GRC",
    "Rapid7 InsightVM",
    "zero trust",
    NAME,
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  // Without these, sharing the URL on LinkedIn or Slack renders a bare link
  // with no title, description, or preview card.
  openGraph: {
    type: "profile",
    siteName: `${NAME} — Security Portfolio`,
    title: `${NAME} | ${ROLE}`,
    description: DESCRIPTION,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} | ${ROLE}`,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang attribute for accessibility; dark class forces dark mode
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Skip-to-content link for keyboard/screen reader users (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-accent-cyan focus:px-4 focus:py-2 focus:text-background focus:outline-none"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
