import { HeroSection } from "@/components/sections/hero";
import { PhilosophySection } from "@/components/sections/philosophy";
import { SkillMatrixSection } from "@/components/sections/skill-matrix";
import { LabWriteupsSection } from "@/components/sections/lab-writeups";
import { RoadmapSection } from "@/components/sections/roadmap";
import { ContactSection } from "@/components/sections/contact";

/**
 * Home page — single-page portfolio layout.
 * Each section is a self-contained component for maintainability.
 * All sections are server-rendered by default; only interactive
 * components (Hero terminal, Contact form) use "use client".
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <SkillMatrixSection />
      <LabWriteupsSection />
      <RoadmapSection />
      <ContactSection />
    </>
  );
}
