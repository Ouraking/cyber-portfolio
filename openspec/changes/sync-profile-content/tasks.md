# Tasks

Values marked **(owner)** come from the site owner, not the profile or the implementer. If one is still unknown when its task is reached, keep the bracketed `TODO` placeholder for that field and leave the guard to flag it — do not fill a plausible value.

## 1. Education data and the live placeholder fix

Independently shippable as a hotfix; nothing later depends on groups 2–5 being done first.

- [x] 1.1 In `src/data/education.ts`, fill the M.S. entry (Master of Science, Cybersecurity and Information Assurance, Western Governors University; location and period **(owner)**) and add the B.A. in Education (highlight: direct-care and special-education background, translating technical concepts into accessible learning) and the B.A. in English (institutions, locations, periods **(owner)**; `highlights` may be empty). Add optional `fieldShort` ("Cybersecurity" on the M.S.) and `caseStudySlug: "zero-trust-iam"` on the M.S. only. Verify `grep -rn "TODO" src/data/education.ts` returns nothing, or only fields explicitly still awaiting owner values.
- [x] 1.2 Update `src/components/sections/education.tsx` to render the case-study link only when `entry.caseStudySlug` is set and to render cleanly when `highlights` is empty. Verify the home page shows three degree cards with the M.S. first and the "Read the capstone case study" link on that card alone.
- [x] 1.3 Change `src/components/sections/proof-strip.tsx` to show `fieldShort ?? field`. Verify the proof strip cell reads "M.S." over "Cybersecurity", not the full field name.
- [x] 1.4 Change `src/app/resume/page.tsx` to iterate every `EDUCATION` entry in its Education section. Verify `/resume` lists all three degrees in the same order as the home page.
- [x] 1.5 Change `src/lib/jsonld.ts` so `alumniOf` is an array of `CollegeOrUniversity` built from the distinct institutions, still omitted while `hasEducationPlaceholders()` is true. Verify by parsing the rendered JSON-LD: one entry per institution when no placeholders remain, and no `alumniOf` when a placeholder is reintroduced locally.
- [x] 1.6 Rewrite the README "Education" paragraph (currently lines 81–84) to describe the placeholder guard as a safety net rather than a pre-deploy step, keeping the `grep` command. Verify the paragraph no longer says the file "ships with" placeholders.

## 2. Site identity

- [x] 2.1 In `src/lib/site.ts`, set `location` to "Boston area · open to remote" and add `about` (two to three sentences, first person, security-first ordering per design Decision 5, naming the M.S., at least one security tool or lab component, and at least one shipped product; no sentence excusing the undergraduate degrees). Verify the Contact card, `/resume` header, and the "Looking for" item all show the new location.
- [x] 2.2 Use `SITE.about` as the `/resume` Summary and as the `SectionHeader` description of the Background section in `education.tsx`. Verify both render the same text and the meta description is unchanged.
- [x] 2.3 In `src/data/now.ts`, add a `Research` item between Studying and Looking for ("Preparing applied research for upcoming international cybersecurity conferences — an argument I'm developing that offline-first EdTech design is also a privacy and security architecture.") and set `updated` to `"2026-10"` / "October 2026". Verify the block shows four items and `grep -riE "published|presented|accepted|peer-review" src/data src/lib/site.ts` finds no match about the research.

## 3. Affiliations and community

- [x] 3.1 Create `src/data/community.ts` exporting `MEMBERSHIPS` (IEEE, PMI, ISACA) and `COMMUNITY` entries with `role` and `detail`: Founder, Togo Cybersecurity Research Collective; Co-organiser, high-school youth hackathons; Participant, MIT Africa Innovate Hackathon, Harvard Africa Development Conference, and ISACA GranIT. Verify `npm run typecheck` passes and the file carries a header comment in the style of `certifications.ts`.
- [x] 3.2 Add an affiliations block below the degree cards in `education.tsx`: Memberships as chips, Community as one-liners with the founder role first and the events phrased as participation. Verify the home page shows all three memberships and the founder role, and the word "speaker" or "award" appears nowhere in the block.
- [x] 3.3 Add an "Affiliations" line to `/resume` listing the memberships and the TCRC founder role. Verify it renders on screen and in print emulation.
- [x] 3.4 In `jsonld.ts`, add `memberOf` (IEEE, PMI, ISACA, TCRC as `Organization`) to the Person and a separate `Organization` node for the Togo Cybersecurity Research Collective with `founder: { "@id": personId }`; add no `worksFor`. Verify the parsed JSON-LD contains the four `memberOf` entries, the TCRC node's `founder` resolves to the Person `@id`, and the Person has no `worksFor`.

## 4. Shipped products

- [x] 4.1 Create `src/data/building.ts` exporting `BUILDING: BuildingItem[]` (`name`, `description`, `tags`, optional `url`) with exactly two items in order: home lab (Proxmox, pfSense, Wazuh, Docker, Home Assistant OS — security architecture lab), OuraGrove (secure, offline-first EdTech infrastructure). TogoAho was dropped at the owner's request. No `url` unless **(owner)** supplies one. Verify no description contains a number, a date, or "team", "company", or "funded".
- [x] 4.2 Add an "Also building" sub-heading and two-up `TiltCard` row beneath the case-study grid in `src/components/sections/work.tsx`, rendering a link only when `url` is set. Verify the home page shows the two cards after the case studies, none has a "Case study" link, and TogoAho, Azea, Sukuvi, BioQuest, Labo Poche, and AvoStudio appear nowhere on the page.
- [x] 4.3 Add an "Also building" line to `/resume` after Selected projects. Verify it lists the two names with their descriptions, and the proof strip's "Case studies published" still reads 4.

## 5. Skill domains

- [x] 5.1 In `src/data/skills.ts`, add Development and Engineering (TypeScript, Progressive Web Apps, Offline-first architecture, Secure API integration, Claude API and agentic workflows) and Systems and Home Lab (Proxmox, Docker, pfSense, Wazuh, Home Assistant OS) with the tiers from design Decision 6, then ask the owner to confirm or adjust each tier before the group is marked done. Verify every entry carries one of the three tiers and the legend text is unchanged.
- [x] 5.2 Change the Skills grid in `src/components/sections/skills.tsx` from `lg:grid-cols-4` to `lg:grid-cols-3`. Verify at 1440px the six cards form two rows of three and at 390px there is no horizontal overflow.
- [x] 5.3 Verify `/resume` lists six skill lines and the JSON-LD `knowsAbout` array contains exactly the six domain titles.

## 6. Integration and release checks

- [x] 6.1 Run `npm run check` and `npm run build`; verify both exit 0 and all 16 routes prerender.
- [x] 6.2 In a browser against the production build: at 1440px and 390px confirm three degree cards, the affiliations block, the Also-building row, six skill cards, and the four Now items render; confirm `/resume` in print emulation shows Summary, three degrees, Affiliations, Also building, and six skill lines with no placeholder warning. Verify no console errors.
- [ ] 6.3 After deploy, fetch `https://www.kamedjonekou.me/` and `/resume` and verify neither body contains "TODO" or "UNIVERSITY NAME"; parse the live JSON-LD and verify `alumniOf`, `memberOf`, `knowsAbout`, and the TCRC node match tasks 1.5, 3.4, and 5.3.

## Workflow follow-up

- Archive the change after 6.3 passes on the live site, which syncs the four delta specs into `openspec/specs/`.
- If group 1 ships ahead as a hotfix, keep its tasks ticked here so progress stays accurate.
