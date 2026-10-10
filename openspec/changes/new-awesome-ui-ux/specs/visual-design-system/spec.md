# Spec Delta

## Purpose

Defines the global visual design token system — color palette, gradient stops, glassmorphism surface layers, typography scale, and motion curves — that every component in the portfolio consumes.

## ADDED Requirements

### Requirement: Gradient accent palette
The system SHALL define a multi-stop gradient palette with at minimum three color stops (cyan, violet, magenta) as CSS custom properties on `:root`. Each stop SHALL be individually addressable as a standalone accent color.

#### Scenario: Gradient tokens are available
- **WHEN** any component references `--accent-cyan`, `--accent-violet`, or `--accent-magenta`
- **THEN** each resolves to a distinct color value within the defined gradient range

#### Scenario: Primary gradient renders consistently
- **WHEN** a component applies the gradient using the defined custom property (e.g. `--gradient-primary`)
- **THEN** the gradient transitions smoothly through all defined stops without visible banding

### Requirement: Glassmorphism surface layers
The system SHALL define at least three glassmorphism surface tiers (e.g. glass-1, glass-2, glass-3) as reusable CSS classes. Each tier SHALL combine a semi-transparent background, `backdrop-filter: blur()`, and a luminous border.

#### Scenario: Glass surface renders frosted effect
- **WHEN** a glass surface class is applied to an element with content behind it
- **THEN** the element displays a frosted-glass effect with visible blur of the background content and a semi-transparent overlay

#### Scenario: Glass tiers have increasing opacity
- **WHEN** glass-1, glass-2, and glass-3 are compared
- **THEN** each successive tier has a higher background opacity and stronger visual separation from content behind it

### Requirement: Display typography scale
The system SHALL load a display typeface distinct from the body font (Geist) and apply it to all heading elements (h1–h3). The body font SHALL remain Geist Sans.

#### Scenario: Headings use display font
- **WHEN** any h1, h2, or h3 element renders on the page
- **THEN** it uses the display typeface, not the body font

#### Scenario: Body text uses Geist
- **WHEN** paragraph or list text renders
- **THEN** it uses the Geist Sans typeface

### Requirement: Motion curve tokens
The system SHALL define named CSS custom properties for animation easing curves: at minimum a spring-like curve, a smooth ease-out, and a deceleration curve.

#### Scenario: Motion tokens are addressable
- **WHEN** a component references `--ease-spring`, `--ease-smooth`, or `--ease-decel`
- **THEN** each resolves to a valid CSS `cubic-bezier()` value

### Requirement: Print style compatibility
The system SHALL preserve a functional print stylesheet that overrides glassmorphism and gradient tokens to produce a clean light-on-white layout. No glass blur or gradient backgrounds SHALL appear in print output.

#### Scenario: Print output is clean
- **WHEN** a user prints any page
- **THEN** all backgrounds are white, all text is dark, and no gradients, blurs, or animated effects are visible

### Requirement: Reduced-motion fallback
The system SHALL suppress all animations and transitions when the user's OS reports `prefers-reduced-motion: reduce`. Content SHALL remain fully visible and accessible without animation.

#### Scenario: Animations disabled under reduced motion
- **WHEN** the user's system preference is `prefers-reduced-motion: reduce`
- **THEN** no CSS animations, transitions, or scroll-triggered reveals play, and all content is visible at full opacity immediately
