/**
 * SKILLS MATRIX — components/sections/SkillMatrix.jsx
 *
 * Three-column categorization:
 *   - Red  (Offensive) — penetration testing tools & methodologies
 *   - Blue (Defensive) — SOC, DFIR, monitoring
 *   - GRC / Tools      — governance, frameworks, productivity
 *
 * Each skill shows a proficiency bar — honest, not inflated.
 */

import {
  Crosshair, ShieldCheck, ClipboardList,
  Target, Lock, FileSearch, Network, Search,
  Terminal, Globe, Bug, Activity, BookOpen, Database
} from 'lucide-react';

// ─── Skill data
const SKILL_CATEGORIES = [
  {
    id: 'red',
    label: 'Offensive',
    tag: 'Red Team',
    accent: 'text-red-400',
    accentBg: 'bg-red-400/10',
    accentBorder: 'border-red-400/20',
    barColor: 'bg-red-400',
    icon: Crosshair,
    description: 'Attack simulation, enumeration, and exploit development',
    skills: [
      { name: 'Penetration Testing',  level: 75, icon: Target   },
      { name: 'Nmap / Recon-ng',      level: 85, icon: Network  },
      { name: 'Metasploit',           level: 70, icon: Bug      },
      { name: 'Burp Suite',           level: 80, icon: Globe    },
      { name: 'Python Scripting',     level: 88, icon: Terminal },
      { name: 'OSINT / Maltego',      level: 72, icon: Search   },
    ],
  },
  {
    id: 'blue',
    label: 'Defensive',
    tag: 'Blue Team',
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-400/10',
    accentBorder: 'border-cyan-400/20',
    barColor: 'bg-cyan-400',
    icon: ShieldCheck,
    description: 'Monitoring, incident response, and threat hunting',
    skills: [
      { name: 'SIEM / Splunk',        level: 78, icon: Activity  },
      { name: 'Network Forensics',    level: 70, icon: Network   },
      { name: 'Incident Response',    level: 72, icon: ShieldCheck},
      { name: 'Wireshark / tcpdump',  level: 85, icon: FileSearch },
      { name: 'Threat Modeling',      level: 68, icon: Target    },
      { name: 'Vulnerability Mgmt',   level: 75, icon: Lock      },
    ],
  },
  {
    id: 'grc',
    label: 'GRC & Tools',
    tag: 'Governance',
    accent: 'text-violet-400',
    accentBg: 'bg-violet-400/10',
    accentBorder: 'border-violet-400/20',
    barColor: 'bg-violet-400',
    icon: ClipboardList,
    description: 'Frameworks, compliance, and professional tooling',
    skills: [
      { name: 'NIST CSF',             level: 80, icon: BookOpen  },
      { name: 'ISO 27001 Basics',     level: 65, icon: ClipboardList },
      { name: 'MITRE ATT&CK',         level: 82, icon: Database  },
      { name: 'Risk Assessment',      level: 74, icon: FileSearch },
      { name: 'Linux Administration', level: 88, icon: Terminal  },
      { name: 'Git / CI-CD',          level: 80, icon: Globe     },
    ],
  },
];

// ─── Sub-component: individual skill bar
function SkillBar({ name, level, icon: Icon, barColor }) {
  return (
    <li className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="flex items-center gap-2 text-sm font-mono text-text-secondary group-hover:text-text-primary transition-colors">
          <Icon size={13} aria-hidden="true" />
          {name}
        </span>
        <span className="text-xs font-mono text-text-muted">{level}%</span>
      </div>
      <div
        className="h-1 bg-surface-border rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency: ${level}%`}
      >
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-700`}
          style={{ width: `${level}%` }}
        />
      </div>
    </li>
  );
}

// ─── Sub-component: category card
function CategoryCard({ category }) {
  const { label, tag, accent, accentBg, accentBorder, barColor, icon: Icon, description, skills } = category;

  return (
    <article
      className="bg-surface-card border border-surface-border rounded-xl p-6 hover:border-surface-muted transition-all duration-300 hover:shadow-card-hover flex flex-col gap-5"
      aria-labelledby={`skill-cat-${category.id}`}
    >
      {/* Header */}
      <header className="flex items-start justify-between">
        <div>
          <span className={`inline-block text-xs font-mono px-2 py-0.5 rounded border ${accentBg} ${accentBorder} ${accent} mb-3`}>
            {tag}
          </span>
          <h3
            id={`skill-cat-${category.id}`}
            className="font-display text-xl font-bold text-text-primary"
          >
            {label}
          </h3>
          <p className="text-sm text-text-muted mt-1">{description}</p>
        </div>
        <div className={`p-2.5 rounded-lg ${accentBg} ${accentBorder} border`}>
          <Icon size={18} className={accent} aria-hidden="true" />
        </div>
      </header>

      {/* Skill bars */}
      <ul className="flex flex-col gap-3.5" aria-label={`${label} skills`}>
        {skills.map((skill) => (
          <SkillBar key={skill.name} {...skill} barColor={barColor} />
        ))}
      </ul>
    </article>
  );
}

// ─── Main export
export default function SkillMatrix() {
  return (
    <section
      id="skills"
      className="py-24 px-6 max-w-container mx-auto"
      aria-labelledby="skills-heading"
    >
      {/* Section header */}
      <header className="mb-14">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">02 — Capabilities</p>
        <h2
          id="skills-heading"
          className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4"
        >
          Skill Matrix
        </h2>
        <p className="text-text-secondary max-w-xl">
          Proficiency scores are self-assessed and updated quarterly. I prioritize
          depth of understanding over breadth — every tool I list, I've used in a
          real lab environment.
        </p>
      </header>

      {/* Skill cards grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}
