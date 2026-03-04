import { ExternalLink, GraduationCap, GitBranch, Lock } from "lucide-react";

interface Project {
  title: string;
  category: string;
  methodology: string;
  tags: string[];
  repoUrl?: string;
  /** Controls card span on larger screens for a bento-box effect */
  wide?: boolean;
  /** Whether this project has full content or is a coming-soon placeholder */
  comingSoon?: boolean;
}

/**
 * Masters in Cybersecurity Projects
 * SECURITY NOTE: URLs are hardcoded, not sourced from user input or query params.
 * All external links use rel="noopener noreferrer" to prevent tab-nabbing.
 */
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
      "Migrated a shipping company's on-premises infrastructure to Azure IaaS. Implemented department-specific RBAC, Key Vault access policies with soft delete and purge protection, encryption for data at rest and in transit, and automated backup configurations. Addressed insider threat risks and ensured compliance with FISMA, PCI-DSS, and NIST SP 800-53.",
    tags: ["Azure IaaS", "RBAC", "Key Vault", "FISMA", "PCI-DSS", "NIST 800-53"],
    repoUrl: "https://github.com/Ouraking/azure-cloud-security-project",
    wide: true,
  },
  {
    title: "Penetration Testing Report",
    category: "Red Team",
    methodology:
      "Coming soon — full project write-up will be available shortly.",
    tags: ["Penetration Testing", "OWASP", "Vulnerability Assessment"],
    comingSoon: true,
  },
  {
    title: "Digital Forensics & Incident Response",
    category: "Blue Team",
    methodology:
      "Coming soon — full project write-up will be available shortly.",
    tags: ["DFIR", "Evidence Handling", "Chain of Custody"],
    comingSoon: true,
  },
  {
    title: "Security Audit & Compliance",
    category: "GRC",
    methodology:
      "Assessed a healthcare IT company's security posture against NIST SP 800-53 controls. Identified critical gaps in access control, continuous monitoring, and risk management. Developed remediation plans for least-privilege enforcement, SIEM deployment, and structured risk response. Designed PCI-DSS compliance strategy for payment card processing with role-based responsibilities.",
    tags: ["NIST 800-53", "PCI-DSS", "FISMA", "Risk Assessment", "SIEM", "RBAC"],
    repoUrl: "https://github.com/Ouraking/security-audit-compliance",
    wide: true,
  },
  {
    title: "Secure Software Design",
    category: "Application Security",
    methodology:
      "Coming soon — full project write-up will be available shortly.",
    tags: ["SDLC", "Threat Modeling", "Secure Coding"],
    comingSoon: true,
  },
  {
    title: "Cybersecurity Management",
    category: "GRC",
    methodology:
      "Coming soon — full project write-up will be available shortly.",
    tags: ["Risk Management", "Policy", "Governance"],
    comingSoon: true,
  },
  {
    title: "Capstone Project",
    category: "Capstone",
    methodology:
      "Coming soon — full project write-up will be available shortly.",
    tags: ["Capstone", "Research", "Applied Security"],
    comingSoon: true,
    wide: true,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Network Security": "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30",
  "Cloud Security": "bg-accent-blue/10 text-accent-blue border-accent-blue/30",
  "Red Team": "bg-accent-red/10 text-accent-red border-accent-red/30",
  "Blue Team": "bg-accent-blue/10 text-accent-blue border-accent-blue/30",
  "Application Security": "bg-accent-emerald/10 text-accent-emerald border-accent-emerald/30",
  GRC: "bg-accent-amber/10 text-accent-amber border-accent-amber/30",
  Capstone: "bg-purple-500/10 text-purple-400 border-purple-500/30",
};

function ProjectCard({ project }: { project: Project }) {
  const colorClasses = CATEGORY_COLORS[project.category] ?? "bg-border text-muted border-border";

  return (
    <article
      className={`group relative rounded-xl border border-border bg-card p-6 transition-colors ${
        project.comingSoon
          ? "opacity-60"
          : "hover:border-accent-cyan/30 hover:bg-card-hover"
      } ${project.wide ? "sm:col-span-2" : ""}`}
    >
      {/* Coming soon overlay */}
      {project.comingSoon && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/80 px-2.5 py-0.5 text-[10px] font-mono text-muted">
            <Lock className="h-3 w-3" aria-hidden="true" />
            Coming Soon
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <GraduationCap
            className="h-4 w-4 text-accent-cyan shrink-0"
            aria-hidden="true"
          />
          <h3 className="text-base font-semibold text-foreground">
            {project.title}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${colorClasses}`}
        >
          {project.category}
        </span>
      </div>

      {/* Methodology */}
      <p className="mt-3 text-sm text-muted leading-relaxed">
        {project.methodology}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-border/50 px-2 py-0.5 text-[11px] font-mono text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Repo link — only show if not coming soon and has a URL */}
      {!project.comingSoon && project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent-cyan transition-colors hover:text-accent-emerald focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded"
        >
          <GitBranch className="h-3 w-3" aria-hidden="true" />
          View Repository
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

export function LabWriteupsSection() {
  return (
    <section
      id="labs"
      className="px-6 py-24 bg-card/50"
      aria-labelledby="labs-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            id="labs-heading"
            className="text-3xl font-bold tracking-tight text-foreground"
          >
            My Projects
          </h2>
          <p className="mt-3 text-muted max-w-lg mx-auto">
            Applied cybersecurity projects showcasing hands-on security
            engineering, analysis, and governance.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
