/**
 * SECURITY ROADMAP — components/sections/Roadmap.jsx
 * Vertical timeline of certifications (past, current, future goals)
 */

import { CheckCircle2, Clock, Target, Award, BookOpen, Trophy } from 'lucide-react';

// ─── Timeline data
// status: 'completed' | 'in-progress' | 'planned'
const TIMELINE_ITEMS = [
  {
    date: 'Jan 2023',
    title: 'CompTIA A+',
    subtitle: 'Hardware, OS, and IT fundamentals',
    status: 'completed',
    icon: Award,
    description:
      'Foundation in hardware troubleshooting, networking basics, and operating systems. Scored in the 92nd percentile.',
    link: 'https://www.credly.com',
  },
  {
    date: 'Jun 2023',
    title: 'CompTIA Network+',
    subtitle: 'Networking protocols and infrastructure',
    status: 'completed',
    icon: Award,
    description:
      'Deep-dive into TCP/IP, VLANs, routing protocols, and network troubleshooting. Built a home lab to reinforce every domain.',
    link: 'https://www.credly.com',
  },
  {
    date: 'Mar 2024',
    title: 'CompTIA Security+',
    subtitle: 'Core security concepts & GRC',
    status: 'completed',
    icon: Trophy,
    description:
      'Covered threat hunting, SIEM, cryptography, PKI, IAM, and compliance frameworks. Now applying concepts in active blue team labs.',
    link: 'https://www.credly.com',
  },
  {
    date: 'Sep 2024',
    title: 'TryHackMe — Top 1%',
    subtitle: 'Hands-on red & blue team rooms',
    status: 'completed',
    icon: Trophy,
    description:
      '300+ rooms completed across offensive security, SOC analyst paths, and DFIR. Consistent daily practice.',
    link: 'https://tryhackme.com',
  },
  {
    date: 'Dec 2024 — Present',
    title: 'Certified Ethical Hacker (CEH)',
    subtitle: 'EC-Council — In Progress',
    status: 'in-progress',
    icon: Clock,
    description:
      'Currently working through EC-Council courseware with a focus on web application and network attack vectors.',
  },
  {
    date: 'Q3 2025',
    title: 'CompTIA PenTest+',
    subtitle: 'Penetration testing certification',
    status: 'planned',
    icon: Target,
    description:
      'Planned after CEH. Will provide formal vendor-neutral validation of penetration testing methodology.',
  },
  {
    date: 'Q1 2026',
    title: 'Offensive Security OSCP',
    subtitle: 'The gold standard for hands-on pentest',
    status: 'planned',
    icon: Target,
    description:
      'Long-term goal. Actively preparing via Hack The Box Pro Labs and custom AD attack scenarios.',
  },
  {
    date: '2026+',
    title: 'CISM / CISSP',
    subtitle: 'Security management & governance',
    status: 'planned',
    icon: BookOpen,
    description:
      'As I progress into security leadership, I want formal GRC credentials to complement the technical foundation.',
  },
];

// ─── Style maps by status
const STATUS_CONFIG = {
  completed: {
    dot:   'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]',
    icon:  'text-emerald-400',
    badge: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    label: 'Completed',
    line:  'border-emerald-400/30',
  },
  'in-progress': {
    dot:   'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)] animate-pulse',
    icon:  'text-cyan-400',
    badge: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    label: 'In Progress',
    line:  'border-cyan-400/30',
  },
  planned: {
    dot:   'bg-surface-muted',
    icon:  'text-text-muted',
    badge: 'text-text-muted bg-surface-border/30 border-surface-border',
    label: 'Planned',
    line:  'border-surface-border',
  },
};

// ─── Sub-component: timeline item
function TimelineItem({ item, isLast }) {
  const config = STATUS_CONFIG[item.status];
  const Icon = item.icon;

  return (
    <li className="relative flex gap-6 group">
      {/* ── Vertical connector */}
      {!isLast && (
        <div
          className={`absolute left-[11px] top-6 bottom-0 w-px border-l ${config.line} transition-colors duration-300`}
          aria-hidden="true"
        />
      )}

      {/* ── Dot */}
      <div
        className={`relative mt-1 w-6 h-6 rounded-full ${config.dot} shrink-0 z-10 flex items-center justify-center`}
        aria-hidden="true"
      >
        {item.status === 'completed' && (
          <CheckCircle2 size={14} className="text-surface" />
        )}
      </div>

      {/* ── Content */}
      <article
        className="pb-10 flex-1"
        aria-label={`${item.title} — ${config.label}`}
      >
        {/* Date + badge */}
        <div className="flex flex-wrap items-center gap-3 mb-1.5">
          <time className="text-xs font-mono text-text-muted">{item.date}</time>
          <span className={`text-xs font-mono px-2 py-0.5 rounded border ${config.badge}`}>
            {config.label}
          </span>
        </div>

        {/* Card */}
        <div
          className={`
            bg-surface-card border rounded-xl p-4 group-hover:border-surface-muted
            transition-all duration-300 group-hover:shadow-card
            ${item.status === 'completed' ? 'border-surface-border' : 'border-surface-border'}
          `}
        >
          <header className="flex items-start gap-3 mb-2">
            <Icon size={16} className={`${config.icon} mt-0.5 shrink-0`} aria-hidden="true" />
            <div>
              <h3 className="font-display font-bold text-text-primary">{item.title}</h3>
              <p className="text-sm text-text-muted font-mono">{item.subtitle}</p>
            </div>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-xs font-mono text-text-muted hover:text-accent transition-colors"
                aria-label={`View ${item.title} credential (opens in new tab)`}
              >
                View ↗
              </a>
            )}
          </header>
          <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
        </div>
      </article>
    </li>
  );
}

// ─── Main export
export default function Roadmap() {
  return (
    <section
      id="roadmap"
      className="py-24 px-6 max-w-container mx-auto"
      aria-labelledby="roadmap-heading"
    >
      {/* ── Background accent */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" aria-hidden="true" />

      {/* Section header */}
      <header className="mb-14">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">04 — Journey</p>
        <h2
          id="roadmap-heading"
          className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4"
        >
          Security Roadmap
        </h2>
        <p className="text-text-secondary max-w-xl">
          Certifications are checkpoints, not destinations. This timeline shows
          where I've been, what I'm actively studying, and the deliberate path
          I've planned toward deeper specialization.
        </p>
      </header>

      {/* ── Stats bar */}
      <div className="flex flex-wrap gap-6 mb-12 p-4 bg-surface-card border border-surface-border rounded-xl">
        {[
          { label: 'Completed', value: '4', color: 'text-emerald-400' },
          { label: 'In Progress', value: '1', color: 'text-cyan-400'   },
          { label: 'Planned', value: '3', color: 'text-text-muted'    },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-2">
            <span className={`font-display font-bold text-2xl ${stat.color}`}>{stat.value}</span>
            <span className="text-sm text-text-muted font-mono">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <ol aria-label="Certification timeline">
        {TIMELINE_ITEMS.map((item, i) => (
          <TimelineItem
            key={item.title}
            item={item}
            isLast={i === TIMELINE_ITEMS.length - 1}
          />
        ))}
      </ol>
    </section>
  );
}
