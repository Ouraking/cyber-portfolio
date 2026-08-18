"use client";

import { useEffect, useRef, useState } from "react";
import { Award, FolderGit2, ShieldCheck, Clock } from "lucide-react";

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const STATS: Stat[] = [
  { icon: FolderGit2, value: 4, suffix: "+", label: "Security Projects", color: "text-accent-cyan" },
  { icon: ShieldCheck, value: 6, suffix: "", label: "Security Domains", color: "text-accent-blue" },
  { icon: Award, value: 10, suffix: "+", label: "Certifications Pursued", color: "text-accent-emerald" },
  { icon: Clock, value: 365, suffix: "+", label: "Days in Cybersecurity", color: "text-accent-amber" },
];

function useCountUp(target: number, isVisible: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return count;
}

function StatCard({ stat, isVisible }: { stat: Stat; isVisible: boolean }) {
  const count = useCountUp(stat.value, isVisible);
  const Icon = stat.icon;

  return (
    <div className="text-center p-6">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-card border border-border mb-4 ${stat.color}`}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="text-3xl font-bold font-mono text-foreground">
        {count}{stat.suffix}
      </div>
      <div className="mt-1 text-xs text-muted uppercase tracking-wider">
        {stat.label}
      </div>
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
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="px-6 py-16" aria-label="Key metrics">
      <div className="mx-auto max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}
