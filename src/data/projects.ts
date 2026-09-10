/**
 * Case-study content. Each project is written as Context → Approach → Outcome
 * rather than a single "methodology" paragraph, because that is the shape a
 * reader evaluates work in: what was the problem, what did you do, what
 * changed.
 *
 * `writeup` is the long form rendered at /work/[slug]. Its `notes` exist to
 * state scope honestly — simulated identities are not production accounts, and
 * an academic brief is not an engagement report. Saying so costs a sentence and
 * buys credibility.
 *
 * SECURITY NOTE: repo URLs are hardcoded here, never derived from user input.
 */

export interface ProjectWriteup {
  context: string;
  approach: string;
  outcome: string;
  notes: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  context: string;
  approach: string;
  outcome: string;
  tags: string[];
  repoUrl?: string;
  featured?: boolean;
  writeup?: ProjectWriteup;
}

export const PROJECTS: Project[] = [
  {
    slug: "zero-trust-iam",
    title: "Zero Trust IAM for 40,000 Identities",
    category: "Capstone",
    featured: true,
    context:
      "A university with 40,000+ students needed centralized identity and access management aligned to Zero Trust, without a big-bang cutover.",
    approach:
      "Designed the control plane on Microsoft Entra ID: 25 simulated identities, four Conditional Access policies enforcing MFA, and a PowerShell bulk-provisioning template for full-scale rollout. Mapped the design to NIST CSF 2.0, ISO/IEC 27001:2022, and NIST SP 800-207.",
    outcome:
      "100% Conditional Access policy enforcement across the validation set, with zero failed policy evaluations.",
    tags: [
      "Zero Trust",
      "Microsoft Entra ID",
      "MFA",
      "Conditional Access",
      "NIST CSF 2.0",
      "ISO 27001",
      "PowerShell",
    ],
    repoUrl: "https://github.com/Ouraking/zero-trust-architecture-phase1",
    writeup: {
      context:
        "The capstone scoped a centralized Identity and Access Management solution for a university environment of 40,000+ students. The constraint was Zero Trust — never trust, continuously verify — rather than a perimeter model, with alignment to NIST CSF 2.0, ISO/IEC 27001:2022, and NIST SP 800-207.",
      approach:
        "Microsoft Entra ID was the identity plane. I deployed 25 simulated identities to exercise join, group, and privilege paths, then configured four Conditional Access policies that required MFA before access. A PowerShell bulk-provisioning template covered the path from the lab set to a full-scale rollout so the design was not stuck at a handful of test users.",
      outcome:
        "Every Conditional Access policy evaluated as expected across the test scenarios — 100% enforcement, zero failures. The published repository holds the architecture notes, policy intent, and provisioning template.",
      notes: [
        "Validation used simulated identities, not production student accounts.",
        "Findings are described as control categories and policy outcomes — no tenant identifiers or exploit detail.",
        "The work is a design-and-validate capstone, not an engagement report.",
      ],
    },
  },
  {
    slug: "secure-network-design",
    title: "Secure Network Design",
    category: "Network Security",
    context:
      "A financial-medical acquisition needed a merged network that could satisfy PCI-DSS, HIPAA, and GLBA inside a $50K budget.",
    approach:
      "Ran vulnerability assessments, replaced end-of-life infrastructure, migrated servers to Microsoft Azure, and applied Zero Trust with defense-in-depth controls including Fortinet.",
    outcome:
      "A documented target architecture for the merged environment: hardened paths, cloud placement, and compliance-mapped controls within budget.",
    tags: [
      "Zero Trust",
      "Azure",
      "Fortinet",
      "PCI-DSS",
      "HIPAA",
      "Defense-in-Depth",
    ],
    repoUrl: "https://github.com/Ouraking/secure-network-design",
    writeup: {
      context:
        "The brief was a merged network for a financial-medical company acquisition. Three regulatory regimes applied at once — PCI-DSS, HIPAA, and GLBA — and the design had to fit a $50K budget rather than a greenfield spend.",
      approach:
        "I started with vulnerability assessment of the as-is estate, then replaced end-of-life infrastructure instead of wrapping it. Servers moved to Microsoft Azure. The target state used Zero Trust and defense-in-depth, with Fortinet in the control path, so no single perimeter device was the whole story.",
      outcome:
        "The deliverable is a secure merged-network design: assessed gaps, cloud migration path, and overlapping controls mapped to the three frameworks, kept inside the stated budget.",
      notes: [
        "Client and system names are omitted; the write-up covers method and control categories.",
        "Budget and framework names are part of the academic brief, not a production invoice.",
      ],
    },
  },
  {
    slug: "cloud-security-implementation",
    title: "Cloud Security Implementation",
    category: "Cloud Security",
    context:
      "A shipping company needed to leave on-premises infrastructure for Azure IaaS without weakening identity, key, or backup controls.",
    approach:
      "Implemented department-specific RBAC, Key Vault access policies with soft delete and purge protection, encryption at rest and in transit, and automated backups. Designed against insider-threat scenarios and FISMA, PCI-DSS, and NIST SP 800-53.",
    outcome:
      "A hardened Azure IaaS landing pattern: scoped roles, protected keys, and backup posture that can be audited against the mapped frameworks.",
    tags: [
      "Azure IaaS",
      "RBAC",
      "Key Vault",
      "FISMA",
      "PCI-DSS",
      "NIST 800-53",
    ],
    repoUrl: "https://github.com/Ouraking/azure-cloud-security-project",
    writeup: {
      context:
        "A shipping company was moving off on-premises infrastructure onto Azure IaaS. The risk in that kind of migration is that identity, key management, and backup controls quietly get weaker in transit — the lift-and-shift works, and the posture is worse than it was. The brief treated insider-threat scenarios as first-class, with the design mapped to FISMA, PCI-DSS, and NIST SP 800-53.",
      approach:
        "Access was scoped by department rather than granted broadly, so a compromised account stays inside one blast radius. Key Vault carried access policies with soft delete and purge protection enabled, which is what stops a deletion — accidental or malicious — from being final. Data was encrypted at rest and in transit, and backups were automated rather than left to a runbook step someone forgets. Each control was mapped back to an 800-53 family so the design could be read against the framework instead of taken on trust.",
      outcome:
        "The deliverable is a hardened Azure IaaS landing pattern: scoped roles, protected keys, encrypted data paths, and a backup posture that can be audited against the mapped frameworks. The repository holds the architecture, the RBAC model, and the Key Vault configuration notes.",
      notes: [
        "Client and subscription identifiers are omitted; the write-up covers method and control categories.",
        "Framework mappings reflect the academic brief, not a completed third-party audit.",
      ],
    },
  },
  {
    slug: "security-audit-compliance",
    title: "Security Audit and Compliance",
    category: "GRC",
    context:
      "A healthcare IT company needed its security posture measured against NIST SP 800-53, not a generic checklist.",
    approach:
      "Assessed access control, continuous monitoring, and risk management. Wrote remediation plans for least-privilege enforcement, SIEM deployment, and structured risk response, plus a PCI-DSS strategy for payment-card processing with role-based responsibilities.",
    outcome:
      "A gap analysis and remediation roadmap the organization can sequence — control families, owners, and a path to PCI-DSS for cardholder data.",
    tags: [
      "NIST 800-53",
      "PCI-DSS",
      "FISMA",
      "Risk Assessment",
      "SIEM",
      "RBAC",
    ],
    repoUrl: "https://github.com/Ouraking/security-audit-compliance",
    writeup: {
      context:
        "A healthcare IT company wanted its security posture measured against NIST SP 800-53 rather than a generic checklist. It also processed payment cards, which put PCI-DSS in scope alongside the federal control set. A gap list on its own would not have been useful — the organization needed to know what to fix first and who owned it.",
      approach:
        "I assessed the estate control family by control family, concentrating on access control, continuous monitoring, and risk management, which is where the material gaps were. Each finding got a remediation plan rather than a label: least-privilege enforcement for over-broad access, SIEM deployment for the monitoring gap, and a structured risk-response process to replace ad-hoc decisions. The PCI-DSS strategy for cardholder data was written with role-based responsibilities attached, so the requirements landed on named roles instead of on the organization in general.",
      outcome:
        "The deliverable is a gap analysis paired with a sequenced remediation roadmap — control families, owners, and an ordered path to PCI-DSS compliance for payment-card processing.",
      notes: [
        "Client and system identifiers are omitted; the write-up covers method and control categories.",
        "The assessment is an academic engagement, not a certified audit opinion.",
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/** Projects with a long-form page at /work/[slug]. Drives generateStaticParams. */
export function getWriteupProjects(): Project[] {
  return PROJECTS.filter((project) => project.writeup);
}

/**
 * Next project in list order, wrapping at the end — powers the "next case
 * study" link so a reader who finishes one page has somewhere to go.
 */
export function getNextProject(slug: string): Project | undefined {
  const writeups = getWriteupProjects();
  const index = writeups.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return writeups[(index + 1) % writeups.length];
}
