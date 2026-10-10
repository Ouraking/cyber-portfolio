# Spec Delta

## Purpose

The Background section and its mirrors on `/resume` and in JSON-LD: every degree the owner holds, professional memberships, founder and community roles, and the guard that keeps any unfilled field visibly flagged rather than silently blank.

## ADDED Requirements

### Requirement: Every degree is listed
The site SHALL list all three degrees — M.S. in Cybersecurity and Information Assurance from Western Governors University, B.A. in Education, and B.A. in English — with the master's degree first.

#### Scenario: Home page lists three degrees
- **WHEN** the Background section renders
- **THEN** three degree entries appear, the first being the M.S. in Cybersecurity and Information Assurance at Western Governors University

#### Scenario: Résumé lists three degrees
- **WHEN** `/resume` renders its Education section
- **THEN** all three degrees appear in the same order as the home page

#### Scenario: Proof strip keeps a short label
- **WHEN** the proof strip renders the education cell
- **THEN** it shows "M.S." with a label no longer than the current "Cybersecurity", not the full field name

### Requirement: Degree details come from the owner
Institution, location, and date range for each degree SHALL be values the owner supplied. The site SHALL NOT invent or infer any of them.

#### Scenario: Unknown value stays a visible placeholder
- **WHEN** a degree's institution, location, or period has not been supplied at implementation time
- **THEN** the field keeps its bracketed `TODO` placeholder and the placeholder guard flags the page, rather than showing a plausible guess

### Requirement: Placeholder guard
While any degree entry contains bracketed placeholder text, the Background section and `/resume` SHALL show the existing visible warning, and JSON-LD SHALL omit `alumniOf`. Production SHALL ship with no placeholders.

#### Scenario: Production has no placeholder text
- **WHEN** the deployed home page and `/resume` are fetched
- **THEN** neither response body contains "TODO" or "UNIVERSITY NAME"

#### Scenario: Guard still fires on an unfilled entry
- **WHEN** any entry in the education data contains a bracketed `TODO` value
- **THEN** the home page and `/resume` show the warning note and the JSON-LD Person has no `alumniOf`

### Requirement: Capstone link only on the master's degree
The "Read the capstone case study" link SHALL appear on the M.S. entry only.

#### Scenario: Undergraduate entries have no case-study link
- **WHEN** the Background section renders the two B.A. entries
- **THEN** neither entry shows a case-study link

### Requirement: Affiliations and community roles
The Background section and `/resume` SHALL show professional memberships (IEEE, PMI, ISACA) and community roles: Founder of the Togo Cybersecurity Research Collective; co-organiser of high-school youth hackathons; participant at the MIT Africa Innovate Hackathon, Harvard Africa Development Conference, and ISACA GranIT.

#### Scenario: Home page shows affiliations
- **WHEN** the Background section renders
- **THEN** an affiliations block lists the three memberships and the founder role, with the hackathon and event participation stated as participation, not as awards or speaking

#### Scenario: Résumé shows affiliations
- **WHEN** `/resume` renders
- **THEN** an Affiliations line lists the three memberships and the TCRC founder role

### Requirement: Structured data mirrors background
The JSON-LD Person SHALL carry `alumniOf` for every listed institution once no placeholders remain, and `memberOf` for IEEE, PMI, and ISACA. The Togo Cybersecurity Research Collective SHALL be represented as an organisation founded by the person, not as an employer.

#### Scenario: alumniOf covers every institution
- **WHEN** the home page JSON-LD is parsed and no placeholders remain
- **THEN** `alumniOf` contains one entry per distinct institution across all degrees

#### Scenario: memberOf lists memberships
- **WHEN** the home page JSON-LD is parsed
- **THEN** `memberOf` contains IEEE, PMI, and ISACA, and the graph contains an organisation named "Togo Cybersecurity Research Collective" whose `founder` references the Person, with no `worksFor` on the Person
