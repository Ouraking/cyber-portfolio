# Design

## Context

Everything a visitor reads comes from `src/data/*.ts` and `src/lib/site.ts`; components iterate those arrays and never hardcode a fact. That is the pattern this change extends. See [proposal.md](proposal.md) for motivation; the four specs under `specs/` hold the requirements.

Constraints found in the code that shape the approach:

- `EDUCATION[0]` is read directly in three places — the proof strip (`degreeShort` + `field`), `/resume`, and `buildJsonLd()` — so adding entries means those readers must iterate or pick deliberately. `education.tsx` already maps the array but hardcodes the capstone link inside the loop, which would put a case-study link on every degree.
- `hasEducationPlaceholders()` and the `[BRACKETED — TODO]` convention are load-bearing: the section, `/resume`, and JSON-LD all key off it. The owner is supplying the missing values, so the schema stays as it is.
- `Project` is shaped as Context → Approach → Outcome with an optional long-form write-up and a `/work/[slug]` route. Shipped products have no academic brief and no confirmed outcomes, so forcing them into that type would either invent an Outcome or render blank fields.
- The Skills grid is `lg:grid-cols-4`; six domains would leave an orphan row of two.
- The `about-me` source is the authority for facts and imposes three rules that bind this design: never invent a value, never list every project, never describe the research as published.

## Goals / Non-Goals

**Goals:**
- Zero placeholder text on the deployed site.
- Every new fact traceable to the profile or to a value the owner typed.
- No new nav entries, routes, or page sections — new content lives inside Work and Background.
- Keep the data-only extension pattern: a future change to a fact is still a one-line edit in one file.

**Non-Goals:**
- Repositioning the hero or CTA for a different audience.
- Changing the certification list or its grouping.
- Adding links, screenshots, or metrics for products the owner has not supplied.
- Any visual-system work; the glass/gradient/motion change is separate.

## Decisions

### 1. Two new data files, same shape as the existing ones
`src/data/building.ts` (`BUILDING: BuildingItem[]` with `name`, `description`, `tags`, optional `url`) and `src/data/community.ts` (`MEMBERSHIPS`, `COMMUNITY` with `role` and `detail`). Both are typed arrays with a short header comment, like `projects.ts` and `certifications.ts`.
*Alternative:* a `kind: "product"` discriminator on `Project`. Rejected — the case-study readers (`getWriteupProjects`, the proof-strip count, `/work/[slug]`) would all need a filter, and the product still would not fit Context/Approach/Outcome.

### 2. Education: keep the schema, add two optional fields
`fieldShort?: string` so the proof strip can show "Cybersecurity" while the entry's `field` is "Cybersecurity and Information Assurance"; `caseStudySlug?: string` set only on the M.S. entry, replacing the hardcoded link in the loop. `highlights` becomes allowed-empty (the B.A. in English has none; the B.A. in Education gets the confirmed direct-care / special-education line). `/resume` and `buildJsonLd()` iterate the array instead of reading `[0]`.
*Alternative:* make `institution`/`location`/`period` optional and omit what is unknown. Rejected by the owner — details are being supplied.

*Amended at apply time:* the owner supplied institutions and graduation dates only (WGU, April 2026; Université de Lomé, 2019 and 2017). Rather than invent start dates or an address for an online university, `start` is dropped, `location` is optional (omitted for WGU, "Lomé, Togo" for the B.A.s, which the institution's name states), and `period` reads "Graduated <date>". `end` is kept for the `<time datetime>`.

### 3. "Also building" lives inside the Work section
A sub-heading and a two-up row of `TiltCard`s beneath the case-study grid (three until the owner asked for TogoAho to come off the site during apply; the tier basis in Decision 6 still holds — it was built, it is just not showcased). Cards show name, one sentence, tags; a link only when `url` is set. No `Section`/nav changes.
*Alternative:* a new `#building` section with its own nav link. Rejected — the page already has eight sections and the profile's guidance for this audience is that products are supporting evidence, not a headline.

### 4. Affiliations live inside Background
`education.tsx` gains, below the degree cards, a compact two-column block: Memberships (three chips) and Community (founder role first, then the hackathon co-organiser line, then the three events as "Attended / participated"). The `SectionHeader` description becomes `SITE.about`.
*Alternative:* a new "Community" section. Rejected for the same reason as above.

### 5. `SITE.about` is one string used in two places
Added to `SiteConfig` beside `description`. `/resume` Summary and the Background intro both read it; `description` (meta) is unchanged. Drafted in the proposal's order: M.S. and security tooling, then shipped software as range, then the education background as the reason the EdTech security gap was visible. First person, no "passionate about", no sentence excusing the undergraduate path.

### 6. Skill tiers are proposed from the legend, confirmed by the owner
The legend defines the tiers: Advanced = applied across multiple projects; Proficient = hands-on in project or lab work; Working = coursework and guided labs. Applying those definitions to the profile's facts:

| Entry | Proposed tier | Basis |
|---|---|---|
| TypeScript, Progressive Web Apps, Offline-first architecture | Advanced | Shipped in OuraGrove and TogoAho (two or more projects) |
| Secure API integration, Claude API and agentic workflows | Proficient | Listed as hands-on project work; no second shipped artifact confirmed |
| Proxmox, Docker, pfSense, Wazuh, Home Assistant OS | Proficient | Home lab is hands-on lab work |

The owner adjusts any row in `skills.ts` at apply time; nothing else depends on the values.

### 7. Skills grid goes to three columns at `lg`
`lg:grid-cols-4` → `lg:grid-cols-3` so six cards form two full rows. `sm:grid-cols-2` stays.

### 8. Structured data
`alumniOf` becomes an array of `CollegeOrUniversity` built from the distinct institutions, still gated on `!hasEducationPlaceholders()`. `memberOf` lists IEEE, PMI, ISACA as `Organization`. TCRC is added to `@graph` as its own `Organization` node with `founder: { "@id": personId }`, and the Person's `memberOf` includes it. No `worksFor`: TCRC is a collective he founded, not an employer.
*Alternative:* put TCRC under `memberOf` only. Rejected — it loses the founder relationship, which is the fact that matters.

### 9. Current status
`now.ts` gains a `Research` item between Studying and Looking for, worded "Preparing applied research for upcoming international cybersecurity conferences — an argument I'm developing that offline-first EdTech design is also a privacy and security architecture." `updated` → `"2026-10"`, label "October 2026".

### 10. Research-language guard is a verification step, not code
A grep over `src/data` and `src/lib/site.ts` for `published|presented|accepted|peer-review` is part of the task that touches `now.ts` and again in the final integration check. No runtime enforcement; the vocabulary rule is editorial.

## Risks / Trade-offs

- **[Risk] Owner does not supply the degree details before the fix is wanted live.** → Group 1 is written so the M.S. entry can ship with WGU and the two B.A.s can follow; any field still unknown keeps its bracketed placeholder and the guard flags it. Do not fill a date to make the warning go away.
- **[Risk] A proposed tier reads as overclaiming.** → Tiers are derived mechanically from the legend's definitions and listed in a table the owner reviews; the legend itself is published next to the grid.
- **[Risk] Product cards without links look unverifiable.** → Descriptions stay factual and short; the `url` field is ready for links when supplied. A link-less card is better than a link to nothing.
- **[Risk] Six skill cards and an affiliations block lengthen the page.** → Three-column grid keeps Skills to two rows; affiliations are chips and one-liners, not cards.
- **[Risk] `memberOf` or an Organization node misrepresents TCRC's scale.** → Node carries only `name` and `founder`; no `numberOfEmployees`, `foundingDate`, or `url` unless supplied.
- **[Trade-off] No new sections means Work and Background each do two jobs.** Accepted: it keeps nav and the eight-section rhythm intact, and the sub-blocks are visually subordinate.

## Migration Plan

1. Data and component edits land together on a branch; `npm run check` and `next build` gate the PR as today.
2. Task group 1 (education data + README) has no dependency on later groups and can be cherry-picked as a hotfix PR if the placeholder bug needs to go first.
3. Rollback is a revert; no migrations, env vars, or external services are involved.

## Open Questions

Deferrable — none changes the specs, approach, or task list:

- Final tier for any row in the table under Decision 6 (owner edits `skills.ts`).
- URLs for OuraGrove or a home-lab write-up, if the owner wants them linked.
- Whether the contact email `jm18306@gmail.com` is still current (absent from the profile; left unchanged).
- Whether "GCP" stays in the "Cloud (AWS, Azure, GCP)" skill entry (absent from the profile; left unchanged).
