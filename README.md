# Security Portfolio — Koffi Jean-Marie Amedjonekou

Personal portfolio for a cybersecurity engineer, covering identity, cloud security, vulnerability management, and GRC.

Statically prerendered, no backend, no tracking scripts.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 — tokens in `src/app/globals.css`, no config file |
| Icons | lucide-react |
| UI primitives | shadcn/ui (`components.json`; components in `src/components/ui`) |
| Motion | CSS only — no animation library |
| Fonts | Geist Sans / Geist Mono via `next/font` (self-hosted at build time) |
| Contact form | Formsubmit.co (no server needed) |
| Hosting | Vercel |

## Running locally

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm start            # serve the production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run check        # lint + typecheck
```

CI (`.github/workflows/ci.yml`) runs `npm ci`, lint, typecheck, and build on every push to `main` and every pull request.

## Routes

| Route | Notes |
| --- | --- |
| `/` | Single-scroll home page |
| `/work/[slug]` | One case study per project, prerendered, `dynamicParams = false` |
| `/resume` | Print-to-PDF résumé. `noindex`, and excluded from the sitemap |
| `/sitemap.xml`, `/robots.txt` | Generated from the data layer |
| `/opengraph-image` | Social card, generated at build time |

## Layout

```text
src/
├── app/
│   ├── layout.tsx              root layout, metadata, JSON-LD
│   ├── page.tsx                home section order
│   ├── globals.css             design tokens, motion, print rules
│   ├── opengraph-image.tsx     social card for /
│   ├── not-found.tsx           global 404
│   ├── robots.ts, sitemap.ts
│   ├── resume/page.tsx
│   └── work/[slug]/            case study, its 404, and its OG card
├── components/
│   ├── sections/               one file per home-page section
│   ├── ui/                     navbar, footer, Section, Headshot,
│   │                           SocialLinks, ScrollReveal, shadcn button
│   └── og-card.tsx             shared social-card design
├── data/                       projects, skills, certifications,
│                               education, now
└── lib/
    ├── site.ts                 identity and contact — single source of truth
    ├── nav.ts                  nav links, shared by navbar and footer
    ├── jsonld.ts               Person + ProfilePage structured data
    └── utils.ts                cn() helper
```

**All content lives in `src/data` and `src/lib/site.ts`.** No component hardcodes a name, an email, or a project description. Counts shown on the page (certifications earned, case studies published) are derived from those arrays, so a number can never disagree with the list beneath it.

## Filling in the placeholders

Two things are deliberately unfinished.

**Education** — `src/data/education.ts` ships with `[BRACKETED — TODO]` values. The education section and `/resume` both render a visible warning while they remain, and the JSON-LD omits `alumniOf` rather than publishing a placeholder as structured data. Before deploying:

```bash
grep -rn "TODO" src/data/education.ts   # must return nothing
```

**Headshot** — `SITE.headshot` is `null`, so the hero renders initials in a bordered square. To add a photo, drop a square image (roughly 800×800, under 200 KB) in `public/` and set:

```ts
headshot: { src: "/headshot.jpg", alt: "Koffi Jean-Marie Amedjonekou" },
```

No component change is needed. `next/image` serves it from `/_next/image` on the same origin, which the CSP's `img-src 'self'` already allows.

## Design system

Raw colour values live on `:root`; `@theme inline` maps them into Tailwind's namespace as `var()` references rather than literal hex. That indirection is load-bearing: because `bg-card` compiles to `var(--surface)`, the `@media print` block repaints the entire site light by redeclaring about ten variables. With literal hex in `@theme`, `/resume` would need a per-class override for every colour on the page.

Two naming caveats, both documented in `globals.css`:

- `muted` is a **text** colour, not shadcn's muted surface. Use `text-muted`, never `bg-muted`. Surfaces are `surface` and `surface-2`.
- `accent` is the **brand** colour, not shadcn's neutral hover surface. The hover surface is `bg-surface-2`. `button.tsx` is adjusted accordingly.

There is one accent. `success` and `danger` are semantic only — an earned credential, a form error — and carry no brand meaning. Motion is three CSS keyframes; there is no animation library.

> **Note:** sections own their `ScrollReveal` wrapper rather than being wrapped from `page.tsx`. `ScrollReveal` leaves a non-`none` `transform` on its wrapper, which makes it the containing block for any `position: fixed` descendant — wrapping a whole section breaks fixed-position children such as the contact toast.

## Security

The site is static and takes no user input beyond the contact form, but the headers in `next.config.ts` are set deliberately:

- `Content-Security-Policy` — `default-src 'self'`, with `connect-src`/`form-action` allowing only `formsubmit.co`
- `Strict-Transport-Security` — 2 years, `includeSubDomains`, preload-eligible
- `X-Frame-Options: DENY` and `frame-ancestors 'none'`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — camera, microphone, geolocation, payment, and USB all denied
- `Cross-Origin-Opener-Policy: same-origin`
- `poweredByHeader: false` — no framework version disclosure

`script-src` allows `'unsafe-inline'`, a deliberate tradeoff: the App Router inlines the RSC flight payload into every prerendered page, and the nonce-based alternative requires middleware that would opt every route out of static generation. `object-src 'none'` and `base-uri 'self'` blunt the impact.

Contact form input is never rendered back as HTML — React escapes all JSX. There is exactly one `dangerouslySetInnerHTML` in the codebase, in `layout.tsx`, and it serialises a static JSON-LD object built from the data layer with `<` escaped. No user input reaches it.

## Configuration

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute base for `og:image`, canonical URLs, the sitemap, and JSON-LD. Optional — falls back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL` on deploys, then `localhost:3000`. Set this once a custom domain is attached. |

## Accessibility

Verified in a browser, not assumed:

- Skip-to-content link, landmark roles, and every section labelled
- Tab order runs skip link → nav → CTAs → cards → form, with no traps
- The collapsed mobile menu is `inert`, so its links stay out of the tab order
- All animation is disabled under `prefers-reduced-motion: reduce`, and `ScrollReveal` reveals content immediately rather than leaving it at `opacity: 0`
- Form errors are wired with `aria-invalid` and `aria-describedby`, and focus moves to the first invalid field
- Skill pips are `aria-hidden`; the tier word carries the meaning
- Every text/background pair clears WCAG AA, and most clear AAA
- No horizontal scroll at 390px
