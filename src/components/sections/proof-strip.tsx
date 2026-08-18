import { ScrollReveal } from "@/components/ui/scroll-reveal";

const PROOF = [
  { value: "13", label: "Certifications earned" },
  { value: "4", label: "Public security projects" },
  { value: "Open", label: "Full-time security roles" },
] as const;

export function ProofStrip() {
  return (
    <section aria-label="Proof points" className="px-6">
      <ScrollReveal>
        <div className="mx-auto max-w-6xl border-y border-border">
          <ul className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {PROOF.map((item) => (
              <li key={item.label} className="px-6 py-8">
                <p className="font-display text-3xl tracking-tight text-foreground">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-muted">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}
