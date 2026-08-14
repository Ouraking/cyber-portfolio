# Security Portfolio — Koffi Jean-Marie Amedjonekou

Personal portfolio site for a cybersecurity engineer, covering penetration testing, vulnerability management, cloud security, and GRC work.

Single-page app, statically prerendered, no backend and no tracking scripts.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme` tokens in `globals.css`) |
| Icons | lucide-react |
| Fonts | Geist Sans / Geist Mono via `next/font` (self-hosted at build time) |
| Contact form | Formsubmit.co (no server needed) |
| Hosting | Vercel |

## Running locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm start            # serve the production build
npm run lint         # eslint — expected to exit 0
npx tsc --noEmit     # typecheck
```

## Layout

```text
src/
├── app/
│   ├── layout.tsx            # root layout, metadata, OG/Twitter tags
│   ├── page.tsx              # section composition order
│   ├── opengraph-image.tsx   # social preview card, generated at build time
│   └── globals.css           # design tokens, animations, reduced-motion rules
├── components/
│   ├── sections/             # one file per page section
│   └── ui/                   # navbar, footer, ScrollReveal
next.config.ts                # security response headers
```

Each section in `src/components/sections/` is self-contained and owns its own scroll-reveal animation. `page.tsx` only decides the order.

> **Note:** sections own their `ScrollReveal` wrapper rather than being wrapped from `page.tsx`. `ScrollReveal` leaves a non-`none` `transform` on its wrapper, which makes it the containing block for any `position: fixed` descendant — wrapping a whole section breaks fixed-position children such as the contact toast.

## Security

The site is static and takes no user input beyond the contact form, but the headers are configured deliberately in `next.config.ts`:

- `Content-Security-Policy` — `default-src 'self'`, with `connect-src`/`form-action` allowing only `formsubmit.co`
- `Strict-Transport-Security` — 2 years, `includeSubDomains`, preload-eligible
- `X-Frame-Options: DENY` and `frame-ancestors 'none'`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — camera, microphone, geolocation, payment, and USB all denied
- `Cross-Origin-Opener-Policy: same-origin`
- `poweredByHeader: false` — no framework version disclosure

`script-src` allows `'unsafe-inline'`, which is a deliberate tradeoff: the App Router inlines the RSC flight payload into every prerendered page, and the nonce-based alternative requires middleware that would opt every route out of static generation. `object-src 'none'` and `base-uri 'self'` are set to blunt the impact.

Contact form input is never rendered back as HTML — React escapes all JSX, and `dangerouslySetInnerHTML` is not used anywhere in the codebase.

## Configuration

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute base for `og:image` and canonical URLs. Optional — falls back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL` on deploys, then `localhost:3000`. Set this once a custom domain is attached. |

## Accessibility

- Skip-to-content link, landmark roles, and labelled sections
- The collapsed mobile menu is `inert`, so its links stay out of the tab order
- All animation is disabled under `prefers-reduced-motion: reduce`
- Form errors are wired up with `aria-invalid` and `aria-describedby`, and focus moves to the first invalid field
