import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Resume | ${SITE.name}`,
  description: `${SITE.name} — ${SITE.primaryLine}`,
  robots: { index: false, follow: true },
};

const CERTS = [
  "CompTIA Security+, Network+, CySA+, PenTest+",
  "Rapid7 InsightVM, InsightIDR, InsightAppSec",
  "Microsoft AZ-900, SC-900, AI-900",
  "AWS Cloud Practitioner, Google IT Support, ISC2 CC",
];

const EXPERIENCE = [
  {
    title: "Zero Trust IAM for 40,000 Identities",
    detail:
      "Entra ID control plane, four Conditional Access policies with MFA, PowerShell bulk provisioning. 100% policy enforcement in validation. NIST CSF 2.0, ISO 27001, NIST SP 800-207.",
  },
  {
    title: "Secure Network Design",
    detail:
      "Merged-network design for a financial-medical acquisition. Vulnerability assessment, EOL replacement, Azure migration, Zero Trust / Fortinet. PCI-DSS, HIPAA, GLBA. $50K budget.",
  },
  {
    title: "Cloud Security Implementation",
    detail:
      "On-prem to Azure IaaS for a shipping company. Department RBAC, Key Vault with soft delete and purge protection, encryption, automated backups. FISMA, PCI-DSS, NIST SP 800-53.",
  },
  {
    title: "Security Audit & Compliance",
    detail:
      "NIST SP 800-53 assessment of a healthcare IT posture. Gaps in access control, monitoring, and risk. Remediation for least privilege, SIEM, and PCI-DSS role mapping.",
  },
];

export default function ResumePage() {
  return (
    <article className="px-6 pt-28 pb-24 print:pt-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-mono uppercase tracking-wider text-accent print:hidden">
          Print this page to PDF
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-foreground">
          {SITE.name}
        </h1>
        <p className="mt-2 text-secondary">{SITE.primaryLine}</p>
        <p className="mt-3 text-sm text-muted">
          <a href={`mailto:${SITE.email}`} className="hover:text-accent">
            {SITE.email}
          </a>
          {" · "}
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            github.com/Ouraking
          </a>
          {" · "}
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            LinkedIn
          </a>
          {" · "}
          {SITE.location}
        </p>

        <section className="mt-10">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
            Summary
          </h2>
          <p className="mt-3 text-secondary leading-relaxed">
            Cybersecurity engineer working across identity, cloud security, and
            vulnerability management. CompTIA, Rapid7, and Microsoft certified.
            Open to full-time security engineering and SOC analyst roles.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
            Selected work
          </h2>
          <ul className="mt-4 space-y-5">
            {EXPERIENCE.map((item) => (
              <li key={item.title}>
                <h3 className="text-foreground font-medium">{item.title}</h3>
                <p className="mt-1 text-sm text-secondary leading-relaxed">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
            Certifications
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm text-secondary">
            {CERTS.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
            In progress
          </h2>
          <p className="mt-3 text-sm text-secondary">
            RHCSA (2026). OSCP / PEN-200 next — Active Directory attack-path
            fundamentals in a self-hosted lab.
          </p>
        </section>
      </div>
    </article>
  );
}
