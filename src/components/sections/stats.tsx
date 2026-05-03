"use client";

import { useEffect, useRef, useState } from "react";
import { FolderGit2, ShieldCheck, Award, Clock } from "lucide-react";

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  accentClass: string;
  bgClass: string;
}

const STATS: Stat[] = [
  {
    icon: FolderGit2,
    value: 4,
    suffix: "+",
    label: "Security Projects",
    accentClass: "text-accent",
    bgClass: "bg-accent/10 border-accent/20",
  },
  {
    icon: ShieldCheck,
    value: 6,
    suffix: "",
    label: "Security Domains",
    accentClass: "text-accent-blue",
    bgClass: "bg-accent-blue/10 border-accent-blue/20",
  },
  {
    icon: Award,
    value: 10,
    suffix: "+",
    label: "Certifications",
    accentClass: "text-accent-emerald",
    bgClass: "bg-accent-emerald/10 border-accent-emerald/20",
  },
  {
    icon: Clock,
    value: 365,
    suffix: "+",
    label: "Days in Cybersecurity",
    accentClass: "text-accent-amber",
    bgClass: "bg-accent-amber/10 border-accent-amber/20",
  },
];

function useCountUp(target: number, isVisible: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    if (!isVisible || animated.current) return;
    animated.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return count;
}

function StatCard({ stat, isVisible }: { stat: Stat; isVisible: boolean }) {
  const count = useCountUp(stat.value, isVisible);
  const Icon = stat.icon;

  return (
    <div className="group relative flex flex-col items-center text-center p-7 rounded-2xl border border-border-light bg-card/50 card-hover-lift hover:border-border-light/80 transition-colors">
      {/* Icon */}
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border ${stat.bgClass} ${stat.accentClass}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      {/* Number */}
      <div className={`text-3xl font-bold font-mono ${stat.accentClass}`}>
        {count}
        {stat.suffix}
      </div>

      {/* Label */}
      <p className="mt-1.5 text-xs text-muted tracking-wide">{stat.label}</p>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-1/4 right-1/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, currentColor, transparent)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="px-6 py-20" aria-label="Key metrics">
      <div className="mx-auto max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}
