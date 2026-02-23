# Cybersecurity Portfolio — File Structure & Setup Guide

## Project Structure

```
cyberfolio/
│
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── contact/
│   │       └── route.js          # ✅ Secure contact API (validation + rate limiting)
│   ├── globals.css               # Global styles, scrollbar, animations
│   ├── layout.jsx                # Root layout: fonts, metadata, security context
│   └── page.jsx                  # Home page — composes all sections (Server Component)
│
├── components/
│   ├── sections/                 # Full-page sections
│   │   ├── Hero.jsx              # 01 — Name, tagline, terminal, stats
│   │   ├── SkillMatrix.jsx       # 02 — Red / Blue / GRC skill bars
│   │   ├── Labs.jsx              # 03 — Bento grid of lab write-ups
│   │   ├── Roadmap.jsx           # 04 — Vertical cert timeline
│   │   └── Contact.jsx           # 05 — Form + PGP key copy
│   │
│   └── ui/                       # Reusable UI primitives
│       ├── Nav.jsx               # Sticky navbar (client — scroll state)
│       ├── Footer.jsx            # Site footer
│       └── LiveTerminal.jsx      # Animated terminal status (client)
│
├── public/                       # Static assets
│   ├── alex-morgan-resume.pdf    # Downloadable resume
│   └── robots.txt                # SEO + disallow sensitive paths
│
├── next.config.js                # ✅ HTTP Security Headers (CSP, HSTS, etc.)
├── tailwind.config.js            # ✅ Design system (colors, fonts, animations)
├── postcss.config.js             # Tailwind PostCSS plugin
└── package.json                  # Dependencies
```

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Add: RESEND_API_KEY=re_your_key_here

# 3. Run dev server
npm run dev
# → http://localhost:3000

# 4. Build for production
npm run build && npm start
```

---

## Security Architecture (Recruiter Notes)

| Layer | Implementation | Threat Mitigated |
|-------|---------------|-----------------|
| HTTP Headers | `next.config.js` — CSP, HSTS, X-Frame | XSS, clickjacking, protocol downgrade |
| API Validation | `route.js` — whitelist fields, type checks | Injection, malformed payloads |
| Rate Limiting | In-memory limiter → Upstash Redis (prod) | Spam, DoS |
| HTML Escaping | `escapeHtml()` on all string inputs | Stored XSS |
| Client Validation | Form regex + length checks | UX guardrails (not security) |
| External Links | `rel="noopener noreferrer"` everywhere | Reverse tabnapping |
| WCAG Compliance | ARIA labels, roles, focus rings, skip links | Accessibility |
| Font Loading | `next/font` — no third-party requests | Privacy, FOUT |
| Clipboard API | HTTPS-only + execCommand fallback | Graceful degradation |
| CSP | `frame-ancestors 'none'`, `form-action 'self'` | Clickjacking, form hijacking |

---

## Customization Checklist

- [ ] Replace `Alex Morgan` with your name globally
- [ ] Update social links in `Hero.jsx` and `Footer.jsx`
- [ ] Replace PGP key in `Contact.jsx` with your actual public key
- [ ] Update PGP fingerprint in `Contact.jsx`
- [ ] Replace GitHub URLs in `Labs.jsx` with real repos
- [ ] Update certification dates/status in `Roadmap.jsx`
- [ ] Set `RESEND_API_KEY` in `.env.local` and uncomment email logic in `route.js`
- [ ] Add your resume PDF to `public/`
- [ ] Update `metadata` in `layout.jsx` with real title/description

---

## Deployment

### Vercel (Recommended)
```bash
npx vercel --prod
```
Security headers in `next.config.js` are automatically applied.

### GitHub Pages (Static Export)
Uncomment `output: 'export'` in `next.config.js`, then:
```bash
npm run build
# Deploy /out directory
```
Note: API routes won't work in static export — use a serverless form provider or remove the contact API.

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `surface.DEFAULT` | `#020617` | Page background (slate-950) |
| `surface.card` | `#0f172a` | Card backgrounds |
| `accent.DEFAULT` | `#10b981` | Primary CTA, focus rings |
| `accent.cyan` | `#22d3ee` | Blue team accent |
| `accent.red` | `#f87171` | Offensive/red team accent |
| `font-display` | Space Grotesk | Headings |
| `font-body` | DM Sans | Body text |
| `font-mono` | JetBrains Mono | Terminal, code, labels |
