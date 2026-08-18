import { ImageResponse } from "next/og";

/**
 * Social preview card, generated at build time.
 *
 * Next.js picks this up automatically for both og:image and twitter:image, so
 * sharing the site on LinkedIn or Slack renders a branded card instead of a
 * bare link. Rendered with the site's own palette; no external assets are
 * fetched, which keeps it compatible with the CSP in next.config.ts.
 */
export const alt = "Koffi Jean-Marie Amedjonekou — Cybersecurity Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the tokens in globals.css.
const BACKGROUND = "#020617";
const FOREGROUND = "#e2e8f0";
const MUTED = "#64748b";
const CYAN = "#22d3ee";
const BORDER = "#1e293b";

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
          padding: "80px",
          // Faint grid, matching the hero background.
          backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 26,
            color: CYAN,
            fontFamily: "monospace",
          }}
        >
          SEC://PORTFOLIO
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: FOREGROUND,
            marginTop: "28px",
            lineHeight: 1.1,
          }}
        >
          Koffi Jean-Marie Amedjonekou
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: CYAN,
            marginTop: "20px",
            fontFamily: "monospace",
          }}
        >
          Cybersecurity Engineer
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: MUTED,
            marginTop: "28px",
          }}
        >
          Penetration Testing · Vulnerability Management · Cloud Security · GRC
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "44px",
            height: "4px",
            width: "260px",
            background: CYAN,
          }}
        />
      </div>
    ),
    size
  );
}
