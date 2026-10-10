# Spec Delta

## Purpose

The owner-facing facts every page reads — location, availability, the about summary, and the current-status items — kept in one source so no page can disagree with another, and so research is never overstated.

## ADDED Requirements

### Requirement: Location statement
The site SHALL state the owner's location as "Boston area · open to remote" everywhere a location is shown.

#### Scenario: Contact card shows location
- **WHEN** the home page Contact section renders the Location detail
- **THEN** its value reads "Boston area · open to remote"

#### Scenario: Résumé header shows location
- **WHEN** `/resume` renders its header line
- **THEN** the location segment reads "Boston area · open to remote"

#### Scenario: Current-status "Looking for" shows location
- **WHEN** the "Looking for" item in the current-status block renders
- **THEN** it ends with "Boston area · open to remote."

### Requirement: About summary
The site SHALL provide a single about summary of two to three sentences that states the owner's three backgrounds (education, cybersecurity, software development) ordered for security employers: the master's degree and security credentials first, shipped software as evidence of range, education as the reason the problem was noticed.

#### Scenario: Résumé Summary uses the about summary
- **WHEN** `/resume` renders its Summary section
- **THEN** it shows the about summary rather than the meta description

#### Scenario: Background section intro uses the about summary
- **WHEN** the home page Background section renders its header
- **THEN** the about summary appears as the section description

#### Scenario: Summary names concrete artifacts
- **WHEN** the about summary is read
- **THEN** it names the M.S. in Cybersecurity and Information Assurance, at least one security tool or lab component, and at least one shipped product, and contains no sentence that excuses the undergraduate degrees

### Requirement: Hero positioning unchanged
The hero's role line, primary line, positioning sentence, CTA buttons, availability line, and the page meta description SHALL remain as they are today.

#### Scenario: Hero text is unchanged
- **WHEN** the home page hero renders
- **THEN** the role reads "Cybersecurity Engineer", the CTAs are "View work" and "Resume", and the eyebrow still ends "Open to full-time roles"

### Requirement: Current-status items
The current-status block SHALL show four items — Focus, Studying, Research, Looking for — with an updated stamp of October 2026.

#### Scenario: Research item is present
- **WHEN** the current-status block renders
- **THEN** a "Research" item describes applied research being prepared for upcoming international cybersecurity conferences

#### Scenario: Updated stamp reflects this change
- **WHEN** the current-status block renders its "Updated" line
- **THEN** the `<time>` element has `dateTime="2026-10"` and the label reads "October 2026"

### Requirement: Research described as in development
Any mention of the owner's research, on any page or in structured data, SHALL describe it as being prepared or developed and SHALL NOT describe it as published, presented, accepted, or peer-reviewed.

#### Scenario: No overclaiming vocabulary in content
- **WHEN** the data layer under `src/data` and `src/lib/site.ts` is searched case-insensitively for "published", "presented", "accepted", or "peer-review"
- **THEN** no match refers to the owner's research

#### Scenario: Offline-first argument is framed as in development
- **WHEN** the offline-first privacy-and-security argument is mentioned anywhere
- **THEN** it is introduced as an argument the owner is developing
