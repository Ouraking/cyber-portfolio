/**
 * LAB WRITE-UPS — components/sections/Labs.jsx
 * Bento-box grid showcasing projects with methodology summaries.
 *
 * Security note: All external links use rel="noopener noreferrer"
 * to prevent reverse tabnapping attacks.
 */

import {
  ExternalLink, Github, Lock, Network, Bug,
  Search, ShieldAlert, Server, Tag
} from 'lucide-react';

// ─── Lab project data
// Replace GitHub URLs with your actual repositories
const LABS = [
  {
    id: 'vulnlab-1',
    title: 'Home Lab SIEM Setup',
    description:
      'Built a Splunk-based SIEM on a segmented home network to ingest Windows Event Logs, Sysmon, and Zeek network logs for threat hunting practice.',
    tags: ['Blue Team', 'Splunk', 'Sysmon', 'Detection'],
    methodology: [
      'Network segmentation with VLANs (pfSense)',
      'Log ingestion pipeline via Universal Forwarder',
      'Custom correlation rules for lateral movement detection',
      'Threat hunting with MITRE ATT&CK mapping',
    ],
    icon: Server,
    accentColor: 'text-cyan-400',
    accentBg: 'bg-cyan-400/10',
    accentBorder: 'border-cyan-400/20',
    githubUrl: 'https://github.com/alexmorgan/home-siem',
    featured: true,  // spans 2 columns on large screens
    difficulty: 'Intermediate',
  },
  {
    id: 'vulnlab-2',
    title: 'Web App Pentest Report',
    description:
      'Full black-box penetration test of a deliberately vulnerable DVWA instance, following OWASP Testing Guide methodology.',
    tags: ['Red Team', 'OWASP', 'Burp Suite', 'Web'],
    methodology: [
      'Recon & asset enumeration (OSINT + Shodan)',
      'Automated + manual vulnerability discovery',
      'SQLi, XSS, IDOR exploitation chains',
      'Professional remediation report (CVSS scored)',
    ],
    icon: Bug,
    accentColor: 'text-red-400',
    accentBg: 'bg-red-400/10',
    accentBorder: 'border-red-400/20',
    githubUrl: 'https://github.com/alexmorgan/webapp-pentest',
    featured: false,
    difficulty: 'Intermediate',
  },
  {
    id: 'vulnlab-3',
    title: 'Network Recon Toolkit',
    description:
      'Python toolset wrapping Nmap, Masscan, and Shodan API for structured, rate-limited reconnaissance with JSON output.',
    tags: ['Python', 'Recon', 'Automation'],
    methodology: [
      'Rate limiting & ethical scope enforcement built-in',
      'Structured JSON/CSV export for reporting',
      'Shodan API integration for passive recon',
      'CIDR range parsing and host deduplication',
    ],
    icon: Network,
    accentColor: 'text-emerald-400',
    accentBg: 'bg-emerald-400/10',
    accentBorder: 'border-emerald-400/20',
    githubUrl: 'https://github.com/alexmorgan/recon-toolkit',
    featured: false,
    difficulty: 'Beginner',
  },
  {
    id: 'vulnlab-4',
    title: 'Active Directory Attack Lab',
    description:
      'Simulated AD environment on AWS with intentional misconfigurations. Documented Kerberoasting, Pass-the-Hash, and BloodHound enumeration.',
    tags: ['Active Directory', 'BloodHound', 'Windows'],
    methodology: [
      'Domain setup with GPO misconfigurations',
      'Kerberoasting & AS-REP Roasting detection',
      'BloodHound graph analysis for privilege paths',
      'Documented both attack & defensive mitigations',
    ],
    icon: Lock,
    accentColor: 'text-orange-400',
    accentBg: 'bg-orange-400/10',
    accentBorder: 'border-orange-400/20',
    githubUrl: 'https://github.com/alexmorgan/ad-attack-lab',
    featured: false,
    difficulty: 'Advanced',
  },
  {
    id: 'vulnlab-5',
    title: 'Threat Intel Dashboard',
    description:
      'OSINT aggregation dashboard pulling from VirusTotal, AbuseIPDB, and Shodan APIs to triage IOCs and enrich alerts.',
    tags: ['OSINT', 'Threat Intel', 'React', 'APIs'],
    methodology: [
      'API key management with .env & rotation policy',
      'IOC type detection (IP, hash, domain, URL)',
      'Confidence scoring across multiple intel sources',
      'CSV export for SOC handoff',
    ],
    icon: Search,
    accentColor: 'text-violet-400',
    accentBg: 'bg-violet-400/10',
    accentBorder: 'border-violet-400/20',
    githubUrl: 'https://github.com/alexmorgan/threat-intel-dashboard',
    featured: false,
    difficulty: 'Intermediate',
  },
  {
    id: 'vulnlab-6',
    title: 'Phishing Awareness Campaign',
    description:
      'Designed and simulated an internal phishing campaign using GoPhish. Analyzed click rates and created targeted security awareness training.',
    tags: ['GRC', 'Social Engineering', 'Awareness'],
    methodology: [
      'Ethical simulation within controlled scope',
      'Template variation A/B testing',
      'Anonymized metrics analysis by department',
      'Remediation: custom training content',
    ],
    icon: ShieldAlert,
    accentColor: 'text-yellow-400',
    accentBg: 'bg-yellow-400/10',
    accentBorder: 'border-yellow-400/20',
    githubUrl: 'https://github.com/alexmorgan/phishing-campaign',
    featured: false,
    difficulty: 'Intermediate',
  },
];

// ─── Difficulty badge colors
const DIFFICULTY_COLORS = {
  Beginner:     'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  Advanced:     'text-red-400 bg-red-400/10 border-red-400/20',
};

// ─── Sub-component: lab card
function LabCard({ lab }) {
  const {
    title, description, tags, methodology,
    icon: Icon, accentColor, accentBg, accentBorder,
    githubUrl, featured, difficulty
  } = lab;

  return (
    <article
      className={`
        relative bg-surface-card border border-surface-border rounded-xl p-6
        hover:border-surface-muted transition-all duration-300 hover:shadow-card-hover
        flex flex-col gap-4 group
        ${featured ? 'lg:col-span-2' : ''}
      `}
      aria-labelledby={`lab-${lab.id}-title`}
    >
      {/* Hover glow */}
      <div className={`absolute inset-0 rounded-xl ${accentBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} aria-hidden="true" />

      {/* Header */}
      <header className="flex items-start justify-between relative">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${accentBg} border ${accentBorder}`}>
            <Icon size={16} className={accentColor} aria-hidden="true" />
          </div>
          <div>
            <h3
              id={`lab-${lab.id}-title`}
              className="font-display font-bold text-text-primary"
            >
              {title}
            </h3>
            <span className={`text-xs font-mono px-1.5 py-0.5 rounded border ${DIFFICULTY_COLORS[difficulty]}`}>
              {difficulty}
            </span>
          </div>
        </div>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"  // Security: prevents reverse tabnapping
          className="flex items-center gap-1 text-xs font-mono text-text-muted hover:text-accent transition-colors ml-2 shrink-0"
          aria-label={`View ${title} on GitHub (opens in new tab)`}
        >
          <Github size={14} />
          <ExternalLink size={11} />
        </a>
      </header>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed relative">{description}</p>

      {/* Methodology */}
      <div className="relative">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">Methodology</p>
        <ul className="flex flex-col gap-1.5" aria-label="Methodology steps">
          {methodology.map((step, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-text-secondary font-mono">
              <span className={`${accentColor} mt-0.5 shrink-0`} aria-hidden="true">›</span>
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <footer className="flex flex-wrap gap-1.5 relative">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 text-xs font-mono text-text-muted bg-surface border border-surface-border px-2 py-0.5 rounded"
          >
            <Tag size={9} aria-hidden="true" />
            {tag}
          </span>
        ))}
      </footer>
    </article>
  );
}

// ─── Main export
export default function Labs() {
  return (
    <section
      id="labs"
      className="py-24 px-6 max-w-container mx-auto"
      aria-labelledby="labs-heading"
    >
      {/* Section header */}
      <header className="mb-14">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">03 — Portfolio</p>
        <h2
          id="labs-heading"
          className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4"
        >
          Lab Write-ups
        </h2>
        <p className="text-text-secondary max-w-xl">
          Each lab includes a documented methodology. I believe showing <em>how</em> I
          think about a problem is more valuable than a polished end-product.
        </p>
      </header>

      {/* Bento grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {LABS.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>
    </section>
  );
}
