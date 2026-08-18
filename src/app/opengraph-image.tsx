import { ImageResponse } from "next/og";

/**
 * Social preview card, generated at build time.
 *
 * Next.js picks this up automatically for both og:image and twitter:image, so
 * sharing the site on LinkedIn or Slack renders a branded card instead of a
 * bare link. Rendered with the site's own palette; no external assets are
 * fetched, which keeps it compatible with the CSP in next.config.ts.
 */
export const alt =
  "Koffi Jean-Marie Amedjonekou — Security engineer, identity, cloud, and vulnerability management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BACKGROUND = "#07080a";
const FOREGROUND = "#f4f5f6";
const MUTED = "#8b909a";
const ACCENT = "#3d9b8f";
const BORDER = "#1c1d21";

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
          borderBottom: `8px solid ${ACCENT}`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: ACCENT,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Security Portfolio
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 600,
            color: FOREGROUND,
            marginTop: "24px",
            lineHeight: 1.15,
          }}
        >
          Koffi Jean-Marie Amedjonekou
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: MUTED,
            marginTop: "20px",
            maxWidth: 920,
          }}
        >
          Security engineer — identity, cloud, and vulnerability management
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "36px",
            fontSize: 22,
            color: FOREGROUND,
          }}
        >
          <div
            style={{
              display: "flex",
              border: `1px solid ${BORDER}`,
              borderRadius: 999,
              padding: "8px 16px",
              color: ACCENT,
            }}
          >
            Zero Trust IAM
          </div>
          <div
            style={{
              display: "flex",
              border: `1px solid ${BORDER}`,
              borderRadius: 999,
              padding: "8px 16px",
              color: ACCENT,
            }}
          >
            Detection / Rapid7
          </div>
        </div>
      </div>
    ),
    size
  );
}
