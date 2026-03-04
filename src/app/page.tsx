import { HeroSection } from "@/components/sections/hero";
import { PhilosophySection } from "@/components/sections/philosophy";
import { SkillMatrixSection } from "@/components/sections/skill-matrix";
import { LabWriteupsSection } from "@/components/sections/lab-writeups";
import { RoadmapSection } from "@/components/sections/roadmap";
import { ContactSection } from "@/components/sections/contact";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

/**
 * Home page — single-page portfolio layout.
 * Each section is a self-contained component for maintainability.
 * ScrollReveal wraps sections for scroll-triggered entrance animations.
 * Section dividers add subtle gradient lines between content areas.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="section-divider" aria-hidden="true" />
      <ScrollReveal>
        <PhilosophySection />
      </ScrollReveal>
      <div className="section-divider" aria-hidden="true" />
      <SkillMatrixSection />
      <div className="section-divider" aria-hidden="true" />
      <LabWriteupsSection />
      <div className="section-divider" aria-hidden="true" />
      <RoadmapSection />
      <div className="section-divider" aria-hidden="true" />
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>
    </>
  );
}
