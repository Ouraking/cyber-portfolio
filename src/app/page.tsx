import { HeroSection } from "@/components/sections/hero";
import { PhilosophySection } from "@/components/sections/philosophy";
import { StatsSection } from "@/components/sections/stats";
import { SkillMatrixSection } from "@/components/sections/skill-matrix";
import { LabWriteupsSection } from "@/components/sections/lab-writeups";
import { LearningLogSection } from "@/components/sections/learning-log";
import { RoadmapSection } from "@/components/sections/roadmap";
import { ContactSection } from "@/components/sections/contact";

/**
 * Home page — single-page portfolio layout.
 * Each section is a self-contained component for maintainability.
 * Sections own their own ScrollReveal wrappers so that reveal animations never
 * wrap an entire section: ScrollReveal leaves a non-none `transform` on its
 * wrapper, which would become the containing block for any `position: fixed`
 * descendant (see the toast in contact.tsx).
 * Section dividers add subtle gradient lines between content areas.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="section-divider" aria-hidden="true" />
      <PhilosophySection />
      <div className="section-divider" aria-hidden="true" />
      <StatsSection />
      <div className="section-divider" aria-hidden="true" />
      <SkillMatrixSection />
      <div className="section-divider" aria-hidden="true" />
      <LabWriteupsSection />
      <div className="section-divider" aria-hidden="true" />
      <LearningLogSection />
      <div className="section-divider" aria-hidden="true" />
      <RoadmapSection />
      <div className="section-divider" aria-hidden="true" />
      <ContactSection />
    </>
  );
}
