import Image from "next/image";
import { SITE } from "@/lib/site";

/**
 * Renders the photo when one exists, and initials when it does not.
 *
 * The fallback is deliberate rather than a broken <img>: until a real file
 * lands in public/, a monogram is an honest placeholder, whereas a gradient
 * blob (what the previous hero shipped) reads as an unfinished template. To
 * enable the photo, drop a square image in public/ and set `headshot` in
 * lib/site.ts — no code change here.
 *
 * next/image serves from /_next/image on the same origin, so the CSP's
 * `img-src 'self'` in next.config.ts already covers it.
 */
export function Headshot() {
  const size = "size-44 sm:size-56 lg:size-72";
  const frame = "rounded-2xl ring-1 ring-border";

  if (!SITE.headshot) {
    return (
      <div
        role="img"
        aria-label={`${SITE.name} — photo coming soon`}
        className={`${size} ${frame} flex items-center justify-center bg-surface`}
      >
        <span className="font-mono text-3xl tracking-[0.1em] text-muted sm:text-4xl">
          {SITE.initials}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={SITE.headshot.src}
      alt={SITE.headshot.alt}
      width={288}
      height={288}
      // Above the fold, so it should not wait for lazy-loading.
      priority
      sizes="(min-width: 1024px) 288px, (min-width: 640px) 224px, 176px"
      className={`${size} ${frame} object-cover`}
    />
  );
}
