import { SITE } from "@/lib/site";

/**
 * The social preview card, shared by every opengraph-image route.
 *
 * It lives here rather than being re-exported between route files because
 * Next analyses `opengraph-image` modules by convention: a route that
 * re-exports another module's `default` builds its image but does not get
 * wired into the page's og:image tag. Each route therefore declares its own
 * default export and calls this.
 *
 * Rendered from the site's own tokens with no external assets fetched, which
 * keeps it compatible with the CSP in next.config.ts.
 */

export const OG_ALT = `${SITE.name} — ${SITE.role}`;
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Mirrors the :root tokens in globals.css.
const BACKGROUND = "#0a0f1a";
const FOREGROUND = "#f1f5f9";
const MUTED = "#94a3b8";
const ACCENT = "#22d3ee";

export function OgCard() {
  return (
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
  );
}
