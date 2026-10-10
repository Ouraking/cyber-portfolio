# Proposal

## Why

The live site at kamedjonekou.me is rendering `[UNIVERSITY NAME — TODO]` and the other bracketed placeholders from `src/data/education.ts` on both the home page and `/resume`, with the red "fill in before deploying" warning visible to every visitor. Beyond that bug, the site's content predates the confirmed profile (the `about-me` source): it is missing the two undergraduate degrees, the Boston-area location, professional memberships, the Togo Cybersecurity Research Collective, the home lab, and every shipped product. A recruiter reading it today sees four academic case studies and a cert list — accurate, but a narrower person than the one in the profile.

## What Changes

The site stays positioned for **security employers** (confirmed). Per the profile's positioning guidance for that audience: lead with the M.S., the certification stack, Rapid7 tooling, and the home lab; present development work as evidence of range; keep cultural platforms and most EdTech detail out.

- **Fix the live education placeholders.** Fill in the M.S. in Cybersecurity and Information Assurance from Western Governors University and add the B.A. in Education and B.A. in English. Institutions, locations, and date ranges for all three are supplied by the owner at implementation time, not invented. The existing schema is unchanged.
- **Location.** `United States · open to remote` becomes `Boston area · open to remote`.
- **A short "about" summary** (2–3 sentences) stating the three-background through-line in security-first order, used as the résumé Summary and as the intro to the Background section. The hero, CTA, availability line, and meta description do not change.
- **Shipped products as evidence of range.** A compact "Also building" row inside the Work section — three items chosen for this audience: the home lab (Proxmox, pfSense, Wazuh, Docker, Home Assistant OS), OuraGrove (secure, offline-first EdTech infrastructure), and TogoAho (TypeScript PWA). No outcomes, user counts, or links are invented; links are added only if the owner supplies them. Azea, Sukuvi, BioQuest, Labo Poche, and AvoStudio are deliberately left off.
- **Affiliations and community** inside the Background section: IEEE, PMI, and ISACA memberships; Founder of the Togo Cybersecurity Research Collective; co-organised high-school hackathons; participation in the MIT Africa Innovate Hackathon, Harvard Africa Development Conference, and ISACA GranIT.
- **Two new skill domains:** Development and Engineering (TypeScript, PWAs, offline-first architecture, secure API integration, Claude API and agentic workflows) and Systems and Home Lab (Proxmox, Docker, pfSense, Wazuh, Home Assistant OS). Proficiency tiers for the new entries are proposed in the design and confirmed by the owner.
- **Current status ("Now")** gains a Research item — applied research being prepared for upcoming international cybersecurity conferences, phrased as work in development — and the updated-stamp moves to October 2026.
- **Résumé and structured data follow the data layer:** all three degrees on `/resume`, an Affiliations line, an "Also building" line; JSON-LD `alumniOf` covers every institution and `memberOf` lists the memberships and TCRC.
- **Certifications are unchanged.** The owner confirmed all 13 earned plus RHCSA (in progress) and OSCP (planned) are accurate, though the profile lists only eight.
- **README** loses the "ships with placeholders" paragraph once the data is real.

Nothing here is **BREAKING**: no routes, data-file names, or component APIs change; `education.ts` gains entries but keeps its shape.

## Capabilities

### New Capabilities
- `site-identity`: the owner-facing facts every page reads — name, role, location, availability, the about summary, and the current-status items — including the rule that research is described as in development, never as published or presented.
- `background`: the Education section and its mirrors on `/resume` and in JSON-LD — every degree the owner holds, professional memberships, founder and community roles, and the placeholder guard that keeps unfilled fields visibly flagged rather than silently blank.
- `shipped-products`: the small set of products and lab work shown as evidence of range alongside the case studies, on the home page and `/resume`, with the constraint that only confirmed facts and owner-supplied links appear.
- `skills-domains`: the named skill domains and tiered entries rendered in the Skills section, on `/resume`, and as `knowsAbout` in JSON-LD.

### Modified Capabilities
_None — `openspec/specs/` holds no main specs yet; the three capabilities from `new-awesome-ui-ux` are visual and are not touched by this change._

## Impact

- **Data layer (`src/data/`, `src/lib/site.ts`):** `education.ts` (three entries, optional short field label), `skills.ts` (two domains), `now.ts` (one item, date bump), `site.ts` (location, new `about` field); new `building.ts` and `community.ts` following the existing typed-array-plus-helpers pattern.
- **Components:** `education.tsx` (renders all entries, intro summary, affiliations block), `work.tsx` (secondary "Also building" row), `proof-strip.tsx` (short field label), `skills.tsx` (grid columns for six domains).
- **Pages:** `app/resume/page.tsx` (Summary from `SITE.about`, all degrees, Affiliations and Also-building lines).
- **SEO:** `lib/jsonld.ts` (`alumniOf` array, `memberOf`). Meta description, sitemap, and OG images are untouched.
- **Docs:** `README.md` data-layer section.
- **Dependencies, routing, API:** none. All changes are content and presentation; CSP is unaffected because no new origins are introduced.
- **Flagged, not changed:** the contact email (`jm18306@gmail.com`) and "GCP" in the cloud skill entry are present on the site but absent from the profile. Both are left as they are and noted for the owner.
