# Spec Delta

## Purpose

Governs the hero section's animated background, staggered entrance choreography, and interactive elements that create an immediate premium first impression.

## ADDED Requirements

### Requirement: Animated hero background
The hero section SHALL display an animated background (particle grid, mesh gradient, or equivalent) that runs continuously behind the hero content. The animation SHALL be GPU-composited and SHALL NOT cause layout shifts or block the main thread.

#### Scenario: Background animates on page load
- **WHEN** the home page loads
- **THEN** the hero section displays a continuously animating background behind all foreground content within 500ms of first paint

#### Scenario: Background respects reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is active
- **THEN** the animated background is replaced by a static gradient or solid background, with no motion

#### Scenario: Background does not block interaction
- **WHEN** the background animation is running
- **THEN** all hero content (text, buttons, links) remains clickable and interactive without pointer-events interference

### Requirement: Staggered entrance choreography
Hero content elements (eyebrow, heading, subheading, positioning text, CTA buttons, social links, headshot) SHALL animate into view in a staggered sequence with successive delays between each element.

#### Scenario: Elements appear in sequence
- **WHEN** the home page loads
- **THEN** hero elements animate in one after another with visible delay between each, starting from the eyebrow text through to the social links

#### Scenario: All elements are visible after entrance completes
- **WHEN** the staggered entrance animation finishes
- **THEN** every hero content element is at full opacity and in its final position

### Requirement: Gradient accent headshot ring
The headshot component (or its initials placeholder) SHALL display an animated gradient border ring using the accent gradient palette.

#### Scenario: Headshot displays gradient ring
- **WHEN** the headshot or initials placeholder renders
- **THEN** it is surrounded by a visible gradient border that cycles through the accent palette colors

### Requirement: Interactive CTA buttons
The primary CTA button in the hero SHALL exhibit a magnetic hover effect — the button visually shifts toward the cursor position on hover approach.

#### Scenario: Magnetic hover on primary CTA
- **WHEN** the user's cursor approaches and hovers over the primary CTA button
- **THEN** the button visually displaces toward the cursor position by a subtle offset

#### Scenario: Button returns on mouse leave
- **WHEN** the cursor leaves the primary CTA button area
- **THEN** the button smoothly returns to its original position
