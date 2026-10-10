# Design

## Context

The portfolio is built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and Lucide React. Currently, `globals.css` defines a single cyan accent (`#22d3ee`) over dark slate surfaces with basic utility classes. For the rationale and scope of this overhaul, see [proposal.md](proposal.md). Requirements for the token system, hero experience, and interactive motion are detailed in the respective spec deltas under `specs/`.

## Goals / Non-Goals

**Goals:**
- Establish a coherent token system with a 3-stop gradient (`--accent-cyan`, `--accent-violet`, `--accent-magenta`), 3 glassmorphism surface tiers, and custom motion curves.
- Implement an eye-catching, GPU-composited hero background with staggered entry choreography.
- Introduce interactive micro-interactions (magnetic CTA hover, 3D card tilt, animated skill bars, nav underline expansion) with zero or minimal bundle overhead.
- Ensure strict compliance with `prefers-reduced-motion` and functional print output.
- Maintain high Lighthouse performance (95+ score) and smooth 60fps animations.

**Non-Goals:**
- Heavy 3D rendering engines (Three.js / WebGL shaders) that bloat bundle size or drain battery.
- Modifying site structure, routing, metadata architecture, or content copy.
- Adding dark/light mode toggles (dark-first aesthetic is preserved as the core brand).

## Decisions

### 1. Token Architecture & Styling Engine
- **Decision:** Define design tokens as native CSS custom properties inside `:root` in `src/app/globals.css`, configured alongside Tailwind CSS v4 `@theme` directives.
- **Rationale:** Tailwind CSS v4 natively integrates with CSS custom properties. Using `:root` properties for gradient stops (`--accent-cyan`, `--accent-violet`, `--accent-magenta`), glass tiers (`.glass-1`, `.glass-2`, `.glass-3`), and motion curves (`--ease-spring`, etc.) guarantees compatibility across all UI components and allows dynamic inline style manipulation (e.g., cursor coordinate tracking) without class re-generation.
- **Alternatives Considered:** 
  - *Hardcoding classes with Tailwind utility arbitrary values*: Causes duplication and makes future theme adjustments error-prone.
  - *CSS-in-JS library (e.g. styled-components)*: Incompatible with React 19 Server Components and introduces runtime overhead.

### 2. Interaction Engine: Lightweight Custom Hooks vs. framer-motion
- **Decision:** Implement interactions using lightweight, zero-dependency custom React hooks (`useTilt`, `useMagnetic`, `useScrollReveal`) paired with CSS transforms, CSS custom properties, and `IntersectionObserver`.
- **Rationale:** Adding `framer-motion` adds ~30-40kB of JavaScript bundle to an otherwise lean static portfolio. The required effects (magnetic cursor offset, 3D card tilt via mouse coordinates, staggered scroll reveal) can be achieved in <150 lines of modular TypeScript using `requestAnimationFrame`, CSS transitions with spring curves (`cubic-bezier(0.175, 0.885, 0.32, 1.275)`), and native web APIs. This keeps the portfolio lightning-fast and compatible with Next.js 16.
- **Alternatives Considered:**
  - *`framer-motion`*: Rich API, but large bundle footprint and unnecessary complexity for a portfolio site.
  - *Pure CSS hover states*: Cannot handle directional cursor tracking for magnetic buttons or continuous 3D card tilting.

### 3. Hero Animated Background: Canvas Particle Mesh with Off-Screen Pausing
- **Decision:** Implement a lightweight 2D HTML5 Canvas particle mesh with subtle connecting gradient lines, throttled by `requestAnimationFrame` and paused via `IntersectionObserver` when scrolled out of view.
- **Rationale:** A canvas-based particle mesh provides dynamic organic motion that immediately hooks visitors. By wrapping it with an `IntersectionObserver`, GPU/CPU cycles drop to zero when the user scrolls down, preserving battery life and mobile performance.
- **Alternatives Considered:**
  - *Pure CSS animated radial gradients*: Lighter, but lacks interactive organic particle motion and interconnectivity.
  - *Three.js particle system*: Adds >150kB bundle weight and excessive WebGL overhead for simple background ambience.

### 4. Display Typography: Next.js Font Optimization with Plus Jakarta Sans
- **Decision:** Load `Plus Jakarta Sans` via `next/font/google` in `src/app/layout.tsx` as a variable font and expose it via `--font-display`, applied to `h1`, `h2`, `h3` elements. Retain `Geist Sans` for body text.
- **Rationale:** `next/font/google` provides zero-layout-shift (FOUT-free), preloaded local font delivery without external network requests at runtime.
- **Alternatives Considered:**
  - *CDN link in `<head>`*: Slower page loads, potential layout shift, and privacy/network dependencies.

### 5. Glassmorphism Fallbacks & Performance
- **Decision:** Layer `backdrop-filter: blur(...)` over a semi-transparent surface with a subtle luminous 1px border (`rgba(255, 255, 255, 0.08)` to `0.15)` and hardware acceleration (`transform: translateZ(0)`). Provide `@supports not (backdrop-filter: blur(1px))` fallback with higher-opacity solid dark backgrounds.
- **Rationale:** Ensures visual legibility on legacy mobile browsers while delivering high-end glass aesthetics on modern devices without frame drops.

## Risks / Trade-offs

- **[Risk] High GPU memory/fill-rate usage on mobile from multiple stacked `backdrop-filter` surfaces**  
  → *Mitigation:* Limit backdrop blur to primary floating surfaces (navbar, cards, modal). Reduce blur radius on mobile viewports (`blur(8px)` vs `blur(16px)` on desktop). Apply `contain: paint` where appropriate.
- **[Risk] Motion sickness or accessibility barriers for users sensitive to motion**  
  → *Mitigation:* Enforce `@media (prefers-reduced-motion: reduce)` both in CSS (disabling transitions/animations and forcing opacity 1) and in interaction hooks (disabling mouse listener updates and setting canvas to static gradient).
- **[Risk] Touch device hover inconsistencies (sticky hover states on iOS/Android)**  
  → *Mitigation:* In `useTilt` and `useMagnetic`, check `window.matchMedia('(hover: hover) and (pointer: fine)')`. Disable tilt and magnetic effects on touch-only devices.
- **[Risk] Print stylesheet degradation from dark/glass styling**  
  → *Mitigation:* Explicit `@media print` rules in `globals.css` resetting backgrounds to `#ffffff`, text to `#0f172a`, borders to `#e2e8f0`, and hiding canvas / interactive decorations.

## Migration Plan

1. **Tokens & Typography Foundation:**
   - Update `src/app/layout.tsx` to load `Plus Jakarta Sans`.
   - Update `src/app/globals.css` with the 3-stop gradient tokens, glass classes, motion easing variables, and print overrides.
2. **Interaction Primitives & Hooks:**
   - Create `src/lib/hooks/use-magnetic.ts`, `src/lib/hooks/use-tilt.ts`, and `src/lib/hooks/use-scroll-reveal.ts`.
3. **Hero Section Overhaul:**
   - Build `src/components/sections/hero-background.tsx` (canvas particle system with auto-pause and reduced-motion check).
   - Update `src/components/sections/hero.tsx` with staggered animations, gradient headshot border ring, and magnetic primary CTA.
4. **Micro-Interactions Across Components:**
   - Update Navbar with glass surface and animated underline indicator.
   - Update Project cards and Skill domain cards with 3D tilt.
   - Upgrade Skills section to horizontal animated progress bars.
   - Add gradient section dividers between content blocks.
5. **Verification & Audit:**
   - Verify keyboard navigability, `prefers-reduced-motion` compliance, mobile responsiveness, and print layout.
