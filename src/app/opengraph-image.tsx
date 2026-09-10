import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

/**
 * Social preview card, generated at build time.
 *
 * Next.js picks this up automatically for both og:image and twitter:image, and
 * sub-routes inherit it, so /work/* shares the same card rather than needing
 * one generator per project. Rendered from the site's own tokens with no
 * external assets fetched, which keeps it compatible with the CSP.
 */
export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the :root tokens in globals.css.
const BACKGROUND = "#0a0f1a";
const FOREGROUND = "#f1f5f9";
const MUTED = "#94a3b8";
const ACCENT = "#22d3ee";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: BACKGROUND,
          padding: "88px",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "3px",
            width: "72px",
            background: ACCENT,
            marginBottom: "44px",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            color: FOREGROUND,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {SITE.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: ACCENT,
            marginTop: "24px",
          }}
        >
          {SITE.primaryLine}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: MUTED,
            marginTop: "28px",
            fontFamily: "monospace",
          }}
        >
          CompTIA · Rapid7 · Microsoft · AWS · ISC2
        </div>
      </div>
    ),
    size
  );
}
