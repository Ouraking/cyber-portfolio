# Spec Delta

## Purpose

Covers all interactive motion across the portfolio — card hover effects, button interactions, nav link animations, skill visualizations, and scroll-triggered section entrances.

## ADDED Requirements

### Requirement: Card tilt on hover
Project cards and skill domain cards SHALL tilt slightly toward the cursor position on hover, creating a 3D parallax effect. The tilt SHALL reset smoothly when the cursor leaves.

#### Scenario: Card tilts toward cursor
- **WHEN** the user hovers over a project card or skill domain card
- **THEN** the card rotates slightly in 3D toward the cursor position relative to the card center

#### Scenario: Card resets on mouse leave
- **WHEN** the cursor leaves the card
- **THEN** the card smoothly returns to its original flat orientation

#### Scenario: No tilt on touch devices
- **WHEN** the user is on a touch device (no hover capability)
- **THEN** no tilt effect is applied and the card remains flat

### Requirement: Animated nav link underlines
Desktop navbar links SHALL display an animated underline that expands from center on hover and contracts on mouse leave, rather than an instant color-only transition.

#### Scenario: Underline expands on hover
- **WHEN** the user hovers over a desktop nav link
- **THEN** an underline animates from the center of the link outward to full width

#### Scenario: Underline contracts on leave
- **WHEN** the cursor leaves the nav link
- **THEN** the underline contracts back toward center and disappears

### Requirement: Animated skill bars
The skills section SHALL replace static pip indicators with animated horizontal bars that fill to their target width when the section scrolls into view.

#### Scenario: Bars animate on scroll entry
- **WHEN** the skills section enters the viewport
- **THEN** each skill bar animates from zero width to its target width with a staggered delay between bars

#### Scenario: Bars show final state under reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is active and the skills section is visible
- **THEN** all skill bars display at their target width immediately without animation

### Requirement: Gradient section dividers
Sections SHALL be separated by gradient divider lines (or fading gradient bands) rather than solid single-color borders.

#### Scenario: Gradient divider between sections
- **WHEN** the user scrolls between two consecutive sections
- **THEN** a gradient line or band using the accent palette is visible between them, replacing the previous solid border

### Requirement: Scroll-triggered section entrances
Each page section SHALL animate into view when it enters the viewport, using a combined fade-up and scale effect with spring-like easing.

#### Scenario: Section animates on first scroll into view
- **WHEN** a section crosses the viewport threshold for the first time
- **THEN** it animates from slightly below and slightly scaled down to its final position with spring easing

#### Scenario: Animation plays only once
- **WHEN** the user scrolls a section out of and back into view
- **THEN** the entrance animation does NOT replay — the section remains in its revealed state

### Requirement: Glassmorphism navbar
The fixed navbar SHALL use a glassmorphism surface effect — semi-transparent background with backdrop blur — so that page content is visible but blurred behind it as the user scrolls.

#### Scenario: Navbar shows glass effect when scrolled
- **WHEN** the user scrolls down and the navbar has a background
- **THEN** the navbar background is semi-transparent with a visible backdrop blur effect

#### Scenario: Navbar is opaque enough for text legibility
- **WHEN** the glassmorphism navbar is over any content
- **THEN** all navbar text and interactive elements remain clearly legible against the blurred background
