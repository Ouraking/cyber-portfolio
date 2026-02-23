/**
 * LIVE TERMINAL — components/ui/LiveTerminal.jsx
 *
 * Simulates a live recon/status terminal.
 * Purely presentational — no actual network calls from client.
 * All "status" values are static and safe to display publicly.
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Circle } from 'lucide-react';

// ─── Terminal log lines (simulated, no PII or real data)
const LOG_SEQUENCE = [
  { delay: 0,    text: '$ whoami',                              type: 'cmd'  },
  { delay: 300,  text: 'alex — security-researcher',            type: 'out'  },
  { delay: 700,  text: '$ nmap --version',                     type: 'cmd'  },
  { delay: 1000, text: 'Nmap 7.94 — network scan utility',     type: 'out'  },
  { delay: 1500, text: '$ cat certifications.txt',             type: 'cmd'  },
  { delay: 1800, text: '  [✓] CompTIA Security+',              type: 'ok'   },
  { delay: 2000, text: '  [✓] TryHackMe — Top 1%',            type: 'ok'   },
  { delay: 2200, text: '  [~] CEH — In Progress',              type: 'warn' },
  { delay: 2600, text: '$ uptime',                             type: 'cmd'  },
  { delay: 2900, text: 'Learning: 847 days and counting',      type: 'out'  },
  { delay: 3300, text: '$ echo $STATUS',                       type: 'cmd'  },
  { delay: 3600, text: 'AVAILABLE FOR OPPORTUNITIES',          type: 'ok'   },
  { delay: 4000, text: '_',                                    type: 'cursor'},
];

const TYPE_STYLES = {
  cmd:    'text-accent font-semibold',
  out:    'text-text-secondary',
  ok:     'text-emerald-400',
  warn:   'text-yellow-400',
  cursor: 'text-accent animate-blink',
};

export default function LiveTerminal() {
  const [visibleLines, setVisibleLines] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    const timers = LOG_SEQUENCE.map((line) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleLines]);

  return (
    <div
      className="rounded-xl border border-surface-border bg-surface-card overflow-hidden shadow-card"
      role="region"
      aria-label="Live status terminal"
    >
      {/* ── Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-border bg-surface">
        <Circle size={10} className="fill-red-500 text-red-500"   aria-hidden="true" />
        <Circle size={10} className="fill-yellow-500 text-yellow-500" aria-hidden="true" />
        <Circle size={10} className="fill-emerald-500 text-emerald-500" aria-hidden="true" />
        <span className="ml-3 text-xs font-mono text-text-muted tracking-widest">
          bash — alex@sec-workstation
        </span>
        {/* Live indicator */}
        <span className="ml-auto flex items-center gap-1.5 text-xs font-mono text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          LIVE
        </span>
      </div>

      {/* ── Terminal body */}
      <div
        className="p-4 h-56 overflow-y-auto font-mono text-sm leading-relaxed"
        aria-live="polite"
        aria-atomic="false"
      >
        {visibleLines.map((line, i) => (
          <p key={i} className={`${TYPE_STYLES[line.type] ?? 'text-text-secondary'} animate-fade-in`}>
            {line.text}
          </p>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
