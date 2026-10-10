# Spec Delta

## Purpose

The named skill domains and their tiered entries, rendered consistently in the Skills section, on `/resume`, and as `knowsAbout` in JSON-LD, so the same taxonomy appears everywhere.

## ADDED Requirements

### Requirement: Six skill domains
The site SHALL present six skill domains: Offensive Security, Defensive Security, GRC and Compliance, Tools and Platforms, Development and Engineering, and Systems and Home Lab.

#### Scenario: Home page shows six domain cards
- **WHEN** the Skills section renders
- **THEN** six domain cards appear and, at viewports of 1024px and wider, they lay out in rows of three with no single orphaned card

#### Scenario: Résumé lists six domains
- **WHEN** `/resume` renders its Skills section
- **THEN** six domain lines appear, each naming the domain and its entries

#### Scenario: JSON-LD knowsAbout matches
- **WHEN** the home page JSON-LD is parsed
- **THEN** `knowsAbout` contains exactly the six domain titles

### Requirement: Development and Engineering entries
The Development and Engineering domain SHALL contain: TypeScript, Progressive Web Apps, Offline-first architecture, Secure API integration, and Claude API and agentic workflows.

#### Scenario: Entries render in order
- **WHEN** the Development and Engineering card renders
- **THEN** those five entries appear in that order, each with a tier word

### Requirement: Systems and Home Lab entries
The Systems and Home Lab domain SHALL contain: Proxmox, Docker, pfSense, Wazuh, and Home Assistant OS.

#### Scenario: Entries render in order
- **WHEN** the Systems and Home Lab card renders
- **THEN** those five entries appear in that order, each with a tier word

### Requirement: Every entry uses the named tier scale
Every skill entry SHALL carry exactly one of the three named tiers (Advanced, Proficient, Working) and SHALL NOT display a percentage.

#### Scenario: New entries carry a tier
- **WHEN** any entry in the two new domains renders
- **THEN** a tier word appears beneath it and the bar fills to that tier's share of the scale

#### Scenario: Legend is unchanged
- **WHEN** the Skills section header renders
- **THEN** the three-tier legend reads exactly as it does today
