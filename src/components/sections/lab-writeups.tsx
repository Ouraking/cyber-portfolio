"use client";

import { ExternalLink, GraduationCap, GitBranch, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface Project {
  title: string;
  category: string;
  methodology: string;
  tags: string[];
  repoUrl?: string;
  wide?: boolean;
  comingSoon?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: "Secure Network Design",
    category: "Network Security",
    methodology:
      "Designed a secure merged network for a financial-medical company acquisition. Conducted vulnerability assessments, replaced end-of-life infrastructure, migrated servers to Microsoft Azure, and implemented zero-trust architecture with defense-in-depth controls. Ensured compliance with PCI-DSS, HIPAA, and GLBA within a $50K budget.",
    tags: ["Zero Trust", "Azure", "Fortinet", "PCI-DSS", "HIPAA", "Defense-in-Depth"],
    repoUrl: "https://github.com/Ouraking/secure-network-design",
    wide: true,
  },
  {
    title: "Cloud Security Implementation",
    category: "Cloud Security",
    methodology:
      "Migrated a shipping company's on-premises infrastructure to Azure IaaS. Implemented department-specific RBAC, Key Vault access policies with soft delete and purge protection, encryption for data at rest and in transit, and automated backup configurations.",
    tags: ["Azure IaaS", "RBAC", "Key Vault", "FISMA", "PCI-DSS", "NIST 800-53"],
    repoUrl: "https://github.com/Ouraking/azure-cloud-security-project",
  },
  {
    title: "Security Audit & Compliance",
    category: "GRC",
    methodology:
      "Assessed a healthcare IT company's security posture against NIST SP 800-53 controls. Identified critical gaps in access control, continuous monitoring, and risk management. Developed remediation plans for least-privilege enforcement and SIEM deployment.",
    tags: ["NIST 800-53", "PCI-DSS", "FISMA", "Risk Assessment", "SIEM", "RBAC"],
    repoUrl: "https://github.com/Ouraking/security-audit-compliance",
  },
  {
    title: "Zero Trust IAM for 40,000 Identities",
    category: "Capstone",
    methodology:
      "Designed and validated a centralized Identity and Access Management solution using Microsoft Entra ID for a university with 40,000+ students. Deployed 25 simulated identities, configured four Conditional Access policies enforcing MFA. Achieved 100% policy enforcement with zero failures.",
    tags: ["Zero Trust", "Microsoft Entra ID", "MFA", "Conditional Access", "NIST CSF 2.0", "ISO 27001", "PowerShell"],
    repoUrl: "https://github.com/Ouraking/zero-trust-architecture-phase1",
    wide: true,
  },
];

const CATEGORY_STYLE: Record<
  string,
  { text: string; border: string; bg: string }
> = {
  "Network Security": {
    text: "text-accent",
    border: "border-accent/25",
    bg: "bg-accent/8",
  },
  "Cloud Security": {
    text: "text-accent-blue",
    border: "border-accent-blue/25",
    bg: "bg-accent-blue/8",
  },
  "Red Team": {
    text: "text-accent-red",
    border: "border-accent-red/25",
    bg: "bg-accent-red/8",
  },
  GRC: {
    text: "text-accent-amber",
    border: "border-accent-amber/25",
    bg: "bg-accent-amber/8",
  },
  Capstone: {
    text: "text-accent-violet",
    border: "border-accent-violet/25",
    bg: "bg-accent-violet/8",
  },
};

function ProjectCard({ project }: { project: Project }) {
  const style = CATEGORY_STYLE[project.category] ?? {
    text: "text-muted",
    border: "border-border",
    bg: "bg-card",
  };

  return (
    <article
      className={`group relative rounded-2xl border border-border-light bg-card/50 p-6 card-hover-lift glow-hover-cyan overflow-hidden flex flex-col ${
        project.wide ? "sm:col-span-2" : ""
      }`}
    >
      {/* Hover accent line top */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          project.category === "Capstone"
            ? "bg-gradient-to-r from-transparent via-accent-violet/60 to-transparent"
            : "bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        }`}
        aria-hidden="true"
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
            <GraduationCap className="h-4 w-4 text-accent" aria-hidden="true" />
          </div>
          <h3 className="text-sm font-semibold text-foreground leading-tight">
            {project.title}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${style.text} ${style.border} ${style.bg}`}
        >
          {project.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-light leading-relaxed flex-1">
        {project.methodology}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border-light bg-surface/60 px-2 py-0.5 text-[11px] font-mono text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Repo link */}
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-accent/70 hover:text-accent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded w-fit"
        >
          <GitBranch className="h-3 w-3" aria-hidden="true" />
          View Repository
          <ArrowUpRight
            className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
          />
        </a>
      )}
    </article>
  );
}

export function LabWriteupsSection() {
  return (
    <section
      id="labs"
      className="px-6 py-24 relative"
      aria-labelledby="labs-heading"
    >
      {/* Background tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,229,255,0.025) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-14">
            <p className="font-mono text-xs text-accent/70 tracking-[0.2em] uppercase mb-3">
              Portfolio
            </p>
            <h2
              id="labs-heading"
              className="text-3xl font-bold tracking-tight text-foreground text-balance"
            >
              My Projects
            </h2>
            <p className="mt-3 text-muted-light max-w-lg leading-relaxed">
              Applied cybersecurity projects showcasing hands-on security
              engineering, analysis, and governance.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 90}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
