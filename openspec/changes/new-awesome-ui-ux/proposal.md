# Proposal

## Why

The portfolio's current dark theme is functional but visually flat — solid surfaces, a single cyan accent, and minimal motion beyond fade-in-up reveals. Recruiters and hiring managers form a first impression in under five seconds; a premium, dynamic visual identity signals craft and attention to detail that a basic card layout cannot. Upgrading now, before job applications go out, directly impacts how the portfolio converts page visits into contact-form submissions.

## What Changes

- **New color palette**: Replace the single `#22d3ee` cyan accent with a curated multi-stop gradient system (cyan → violet → magenta) that gives each section its own warmth while staying cohesive. Surfaces shift from flat `#0f172a` to layered glassmorphism with subtle frosted-glass overlays.
- **Animated hero background**: Add a performant canvas/CSS animated particle grid or mesh-gradient background to the hero section, creating an immediate "wow" moment on page load.
- **Glassmorphism surface system**: Cards, navbar, and the contact form gain `backdrop-filter: blur()` frosted-glass styling with semi-transparent backgrounds and luminous borders.
- **Premium micro-interactions**: Magnetic cursor hover on buttons, card tilt/parallax on hover, smooth animated underlines on nav links, animated skill bars (replacing static pips), and a staggered card entrance with spring physics.
- **Section transition effects**: Gradient dividers between sections, subtle parallax scroll depth, and animated section eyebrow reveals.
- **Typography upgrade**: Introduce a display font (e.g., "Plus Jakarta Sans" or "Cabinet Grotesk") for headings alongside the existing Geist body to create typographic contrast.
- **Enhanced mobile UX**: Touch-optimized glassmorphism, performant reduced-motion fallbacks, and a refined mobile nav slide-in with backdrop blur.

## Capabilities

### New Capabilities
- `visual-design-system`: Defines the global design token architecture — color palette, gradient stops, glassmorphism surface layers, typography scale, spacing, and motion curves. The single source of truth for all visual styling across the portfolio.
- `hero-experience`: Governs the hero section's animated background, staggered entrance choreography, and interactive elements (magnetic buttons, animated headshot ring).
- `micro-interactions`: Covers all interactive motion — card hover tilt/parallax, button magnetic effect, nav link animated underlines, skill bar animations, and scroll-triggered section entrances.

### Modified Capabilities
_None — no existing specs to modify._

## Impact

- **CSS**: `globals.css` will be substantially rewritten — new custom properties for the gradient palette, glassmorphism utilities, keyframe animations, and updated print overrides.
- **Components**: Every section component and all UI primitives (navbar, footer, button, section, scroll-reveal) will receive updated class names and potentially new wrapper elements for glass effects.
- **Dependencies**: May add `framer-motion` for spring-physics micro-interactions (card tilt, magnetic cursor) since CSS alone cannot express velocity-dependent spring curves. Alternatively, a lightweight custom hook approach keeps the bundle lean.
- **Performance**: Canvas/animated backgrounds must respect `prefers-reduced-motion` and throttle on low-power devices. Glass blur is GPU-composited but needs testing on older mobile Safari.
- **Layout**: The root layout (`layout.tsx`) may need adjustments for new navbar glassmorphism. Print styles must remain functional after the token changes.
- **No API changes**: No backend, routing, or data model changes. All modifications are purely presentational.
