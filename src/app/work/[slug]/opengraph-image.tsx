import { ImageResponse } from "next/og";
import { OgCard, OG_ALT, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og-card";
import { getWriteupProjects } from "@/data/projects";

/**
 * Case studies share the home page's card.
 *
 * This file has to exist rather than relying on inheritance: Next resolves
 * opengraph-image by file convention per route segment, and a file-based image
 * is not inherited by nested segments the way a metadata object is. Without
 * it, /work/* shipped with no og:image at all — and setting
 * `openGraph.images` in generateMetadata does not fill the gap, because
 * file-based metadata takes precedence over the config field.
 *
 * generateStaticParams keeps the build fully prerendered.
 */
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getWriteupProjects().map((project) => ({ slug: project.slug }));
}

export default function WorkOpengraphImage() {
  return new ImageResponse(<OgCard />, size);
}
