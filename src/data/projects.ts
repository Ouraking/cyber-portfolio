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
      "Ran vulnerability assessments, replaced end-of-life infrastructure, migrated servers to Microsoft Azure, and applied Zero Trust with defense-in-depth controls (including Fortinet).",
    outcome:
      "A documented target architecture for the merged environment: hardened paths, cloud placement, and compliance-mapped controls within budget.",
    tags: ["Zero Trust", "Azure", "Fortinet", "PCI-DSS", "HIPAA", "Defense-in-Depth"],
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
    tags: ["Azure IaaS", "RBAC", "Key Vault", "FISMA", "PCI-DSS", "NIST 800-53"],
    repoUrl: "https://github.com/Ouraking/azure-cloud-security-project",
  },
  {
    slug: "security-audit-compliance",
    title: "Security Audit & Compliance",
    category: "GRC",
    context:
      "A healthcare IT company needed its security posture measured against NIST SP 800-53, not a generic checklist.",
    approach:
      "Assessed access control, continuous monitoring, and risk management. Wrote remediation plans for least-privilege enforcement, SIEM deployment, and structured risk response, plus a PCI-DSS strategy for payment-card processing with role-based responsibilities.",
    outcome:
      "A gap analysis and remediation roadmap the organization can sequence — control families, owners, and a path to PCI-DSS for cardholder data.",
    tags: ["NIST 800-53", "PCI-DSS", "FISMA", "Risk Assessment", "SIEM", "RBAC"],
    repoUrl: "https://github.com/Ouraking/security-audit-compliance",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getWriteupProjects(): Project[] {
  return PROJECTS.filter((project) => project.writeup);
}
