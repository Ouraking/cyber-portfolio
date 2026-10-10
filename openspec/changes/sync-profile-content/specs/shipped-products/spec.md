# Spec Delta

## Purpose

A small, audience-chosen set of products and lab work shown as evidence of range alongside the case studies, on the home page and `/resume`, without any claim beyond what the owner has confirmed.

## ADDED Requirements

### Requirement: Also-building row
The Work section SHALL show, beneath the case studies, a row titled "Also building" with exactly two items: the home lab (Proxmox, pfSense, Wazuh, Docker, Home Assistant OS) and OuraGrove (secure, offline-first EdTech infrastructure). Each item SHALL show a name, a one-sentence description, and tags.

#### Scenario: Two items on the home page
- **WHEN** the Work section renders
- **THEN** an "Also building" row with exactly two items follows the case-study grid, in the order home lab, OuraGrove

#### Scenario: Résumé carries the same two
- **WHEN** `/resume` renders
- **THEN** an "Also building" line lists the same two items by name with their one-sentence descriptions

#### Scenario: Other products are omitted
- **WHEN** any page renders
- **THEN** TogoAho, Azea, Sukuvi, BioQuest, Labo Poche, and AvoStudio do not appear

### Requirement: No invented claims
Items SHALL state only confirmed facts. They SHALL NOT state user counts, revenue, outcomes, launch dates, team size, or funding, and SHALL NOT imply a company or employees. A link SHALL appear only when the owner has supplied a URL.

#### Scenario: Item without a URL renders no link
- **WHEN** an item has no URL in the data
- **THEN** the item renders as plain text with no anchor and no "Repository" or "Visit" affordance

#### Scenario: Descriptions carry no metrics
- **WHEN** the three descriptions are read
- **THEN** none contains a number of users, a date, a revenue figure, or the words "team", "company", or "funded"

### Requirement: Distinct from case studies
Also-building items SHALL be visibly and structurally distinct from case studies and SHALL NOT be counted as case studies.

#### Scenario: Proof-strip count is unaffected
- **WHEN** the proof strip renders "Case studies published"
- **THEN** the number equals the count of case studies only and does not include Also-building items

#### Scenario: No case-study affordances
- **WHEN** an Also-building item renders
- **THEN** it has no "Case study" link, no Context/Approach/Outcome breakdown, and no `/work/` route
