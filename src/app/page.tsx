import { HeroSection } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { WorkSection } from "@/components/sections/work";
import { SkillMatrixSection } from "@/components/sections/skill-matrix";
import { CertsSection } from "@/components/sections/certs";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProofStrip />
      <WorkSection />
      <SkillMatrixSection />
      <CertsSection />
      <ContactSection />
    </>
  );
}
