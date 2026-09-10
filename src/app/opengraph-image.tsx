import { ImageResponse } from "next/og";
import { OgCard, OG_ALT, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og-card";

/**
 * Social preview card for the home page, generated at build time. Next picks
 * this up automatically for both og:image and twitter:image, so sharing the
 * URL on LinkedIn or Slack renders a branded card instead of a bare link.
 */
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return new ImageResponse(<OgCard />, size);
}
