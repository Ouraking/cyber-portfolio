import Image from "next/image";
import { SITE } from "@/lib/site";

/**
 * Renders the photo when one exists, and initials when it does not, in both
 * cases inside the animated accent-gradient ring (`.gradient-ring`).
 *
 * The fallback is deliberate rather than a broken <img>: until a real file
 * lands in public/, a monogram is an honest placeholder. To enable the photo,
 * drop a square image in public/ and set `headshot` in lib/site.ts — no code
 * change here.
 *
 * next/image serves from /_next/image on the same origin, so the CSP's
 * `img-src 'self'` in next.config.ts already covers it.
 */
export function Headshot() {
  const size = "size-44 sm:size-56 lg:size-72";
  // The ring's 2px padding sits inside this radius, so the inner radius is
  // 2px smaller to keep the gradient band an even thickness at the corners.
  const ring = "gradient-ring rounded-2xl";
  const inner = "rounded-[14px]";

  if (!SITE.headshot) {
    return (
      <div className={`${ring} ${size}`}>
        <div
          role="img"
          aria-label={`${SITE.name} — photo coming soon`}
          className={`${inner} flex size-full items-center justify-center bg-surface`}
        >
          <span className="font-mono text-3xl tracking-[0.1em] text-muted sm:text-4xl">
            {SITE.initials}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${ring} ${size}`}>
      <Image
        src={SITE.headshot.src}
        alt={SITE.headshot.alt}
        width={288}
        height={288}
        // Above the fold, so it should not wait for lazy-loading.
        priority
        sizes="(min-width: 1024px) 288px, (min-width: 640px) 224px, 176px"
        className={`${inner} size-full object-cover`}
      />
    </div>
  );
}
