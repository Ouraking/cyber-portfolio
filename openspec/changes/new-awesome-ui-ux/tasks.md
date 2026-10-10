# Tasks

## 1. Design Tokens & Typography Foundation

- [ ] 1.1 Add `Plus Jakarta Sans` font via `next/font/google` in `src/app/layout.tsx` and map to `--font-display`; verify headings render with the display font family in DevTools.
- [ ] 1.2 Define multi-stop accent tokens (`--accent-cyan`, `--accent-violet`, `--accent-magenta`, and `--gradient-primary`) in `:root` and `@theme inline` in `src/app/globals.css`; verify color variables resolve in browser inspector.
- [ ] 1.3 Implement glassmorphism utility classes (`.glass-1`, `.glass-2`, `.glass-3`) with `backdrop-filter: blur()`, subtle border sheen, and fallback for non-supporting browsers; verify frosted glass layers over background elements.
- [ ] 1.4 Define motion easing curves (`--ease-spring`, `--ease-smooth`, `--ease-decel`) in `src/app/globals.css`; verify easing properties evaluate to valid `cubic-bezier()` values.
- [ ] 1.5 Update print stylesheet in `src/app/globals.css` to neutralize glass blur, reset backgrounds to pure white, and disable animations during print; verify via print preview emulation.

## 2. Reusable Interaction Hooks & Primitives

- [ ] 2.1 Create `src/lib/hooks/use-tilt.ts` hook for 3D cursor tilt with pointer type check (`(hover: hover) and (pointer: fine)`); verify tilt transforms activate on desktop and stay disabled on touch devices.
- [ ] 2.2 Create `src/lib/hooks/use-magnetic.ts` hook for magnetic displacement on button hover; verify element moves towards cursor with smooth spring return on mouse leave.
- [ ] 2.3 Create `src/lib/hooks/use-scroll-reveal.ts` (or upgrade `src/components/ui/scroll-reveal.tsx`) with `IntersectionObserver` spring entrance and `once: true`; verify elements reveal when scrolled into view without replaying.
- [ ] 2.4 Build `src/components/ui/gradient-divider.tsx` component using `--gradient-primary` with smooth edge fades; verify visual appearance between sections.

## 3. Hero Section Overhaul

- [ ] 3.1 Implement `src/components/sections/hero-background.tsx` using a lightweight 2D HTML5 canvas particle mesh with auto-pause on scroll and reduced-motion fallback; verify canvas animates smoothly at 60fps and pauses when scrolled offscreen.
- [ ] 3.2 Update `src/components/sections/hero.tsx` with staggered entrance animation for eyebrow, title, description, buttons, and social links; verify staggered sequence timing on page load.
- [ ] 3.3 Add glowing multi-stop gradient border ring around headshot in `src/components/ui/headshot.tsx`; verify animated gradient border surrounds avatar.
- [ ] 3.4 Wire `useMagnetic` hook to primary CTA button in `src/components/sections/hero.tsx`; verify magnetic pull towards cursor on hover.

## 4. Navigation & Section Micro-Interactions

- [ ] 4.1 Update `src/components/ui/navbar.tsx` with `.glass-2` frosted background and animated center-out expanding underline on desktop nav links; verify blur over page content and link hover underline animations.
- [ ] 4.2 Add gradient section dividers between all major sections on `src/app/page.tsx`; verify seamless visual flow between sections.
- [ ] 4.3 Update `src/components/sections/work.tsx` project cards to apply `useTilt` 3D card tilt and `.glass-1` styling; verify card tilts on hover and resets smoothly.

## 5. Skills & Contact Section Upgrades

- [ ] 5.1 Redesign `src/components/sections/skills.tsx` to replace static pips with animated horizontal progress bars filling to target width upon scroll reveal; verify bars animate smoothly to specified percentages.
- [ ] 5.2 Update `src/components/sections/contact.tsx` form container to use `.glass-2` surface styling with luminous input borders; verify form legibility and glass aesthetic.
- [ ] 5.3 Update `src/components/ui/footer.tsx` with matching glassmorphism touches and subtle gradient accent accents; verify footer styling consistency.

## 6. Accessibility, Responsive & System Verification

- [ ] 6.1 Implement and test `@media (prefers-reduced-motion: reduce)` behavior across all hooks and animations; verify all animations and transitions are halted when system prefers reduced motion.
- [ ] 6.2 Test touch responsiveness on mobile viewports; verify no stuck hover/tilt states and check mobile navigation drawer backdrop blur.
- [ ] 6.3 Run `npm run check` (linter and TypeScript checks); verify clean build with zero errors.
