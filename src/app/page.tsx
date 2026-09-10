import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { WorkSection } from "@/components/sections/work";
import { SkillsSection } from "@/components/sections/skills";
import { CertificationsSection } from "@/components/sections/certifications";
import { EducationSection } from "@/components/sections/education";
import { NowSection } from "@/components/sections/now";
import { ContactSection } from "@/components/sections/contact";

/**
 * Home page. Ordered so a reader who leaves after one screen still knows who
 * this is and what they do, and one who leaves after three has seen the
 * strongest project.
 *
 * Sections own their own ScrollReveal wrappers rather than being wrapped from
 * here: ScrollReveal leaves a non-none `transform` on its wrapper, which would
 * become the containing block for any `position: fixed` descendant — see the
 * toast in contact.tsx.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <WorkSection />
      <SkillsSection />
      <CertificationsSection />
      <EducationSection />
      <NowSection />
      <ContactSection />
    </>
  );
}
