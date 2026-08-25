import { HeroBlock } from "@/components/ui/hero-block-shadcnui";
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
      <HeroBlock
        title="Koffi Jean-Marie Amedjonekou"
        subtitle="Cybersecurity Engineer"
        description="Dedicated cybersecurity professional with hands-on expertise across penetration testing, vulnerability management, cloud security, and governance frameworks. Committed to the principle of ‘secure-by-default’ in every technical decision."
        primaryCta={{ label: "Get in Touch", href: "#contact" }}
        secondaryCta={{ label: "View My Work", href: "#labs" }}
        socials={[
          {
            icon: "github",
            href: "https://github.com/Ouraking",
            label: "GitHub",
            external: true,
          },
          {
            icon: "linkedin",
            href: "https://www.linkedin.com/in/koffi-amedjonekou/",
            label: "LinkedIn",
            external: true,
          },
          { icon: "mail", href: "mailto:jm18306@gmail.com", label: "Email" },
        ]}
      />
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
