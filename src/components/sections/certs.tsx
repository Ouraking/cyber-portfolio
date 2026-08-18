import { CheckCircle2, Circle, Target } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const CERT_GROUPS = [
  {
    vendor: "CompTIA",
    items: ["Security+", "Network+", "CySA+", "PenTest+"],
  },
  {
    vendor: "Rapid7",
    items: ["InsightVM", "InsightIDR", "InsightAppSec"],
  },
  {
    vendor: "Microsoft",
    items: ["AZ-900", "SC-900", "AI-900"],
  },
  {
    vendor: "Other",
    items: ["AWS Cloud Practitioner", "Google IT Support", "ISC2 CC"],
  },
] as const;

const NEXT_UP = [
  {
    title: "RHCSA",
    status: "in-progress" as const,
    description:
      "Linux system administration — users, storage, networking, and security on RHEL.",
    date: "2026",
  },
  {
    title: "OSCP (OffSec PEN-200)",
    status: "planned" as const,
    description:
      "Hands-on penetration testing exam. Building Active Directory attack-path fundamentals first.",
    date: "Up next",
  },
];

export function CertsSection() {
  return (
    <section id="certs" className="px-6 py-24" aria-labelledby="certs-heading">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-12 max-w-2xl">
            <h2
              id="certs-heading"
              className="font-display text-3xl sm:text-4xl tracking-tight text-foreground"
            >
              Certifications
            </h2>
            <p className="mt-3 text-muted">
              Credentials earned, then the two still in flight.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-2">
          {CERT_GROUPS.map((group, index) => (
            <ScrollReveal key={group.vendor} delay={index * 60}>
              <div className="rounded-xl border border-border bg-card p-5 h-full">
                <h3 className="text-sm font-medium text-foreground">
                  {group.vendor}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-md border border-accent-emerald/25 bg-accent-emerald/5 px-2.5 py-1 text-xs font-mono text-accent-emerald"
                    >
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-1">
            <div className="rounded-xl border border-border bg-card p-5 h-full">
              <p className="text-[11px] font-mono uppercase tracking-wider text-accent">
                Currently
              </p>
              <h3 className="mt-2 text-base font-medium text-foreground">
                OSCP prep · RHCSA
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Active Directory attack paths — Kerberoasting, AS-REP roasting,
                Pass-the-Hash — in a self-hosted lab, with BloodHound and
                PowerView enumeration ahead of PEN-200. RHCSA in parallel.
              </p>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-2 space-y-4">
            {NEXT_UP.map((item, index) => {
              const Icon = item.status === "in-progress" ? Target : Circle;
              const color =
                item.status === "in-progress"
                  ? "text-accent border-accent/30 bg-accent/10"
                  : "text-muted border-border bg-card";
              return (
                <ScrollReveal key={item.title} delay={index * 80}>
                  <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${color}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-medium text-foreground">
                          {item.title}
                        </h3>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[11px] ${
                            item.status === "in-progress"
                              ? "border-accent/30 text-accent"
                              : "border-border text-muted"
                          }`}
                        >
                          {item.status === "in-progress"
                            ? "In progress"
                            : "Planned"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>
                      <p className="mt-2 text-xs font-mono text-muted/80">
                        {item.date}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
