'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from 'framer-motion';
import { FolderGit2, Users, Star, GitCommit } from 'lucide-react';
import type { GitHubStats } from '@/lib/github';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StatItemConfig {
  readonly key: keyof GitHubStats;
  readonly label: string;
  readonly icon: React.ElementType;
}

const STAT_ITEMS: readonly StatItemConfig[] = [
  { key: 'publicRepos', label: 'Repositories', icon: FolderGit2 },
  { key: 'followers', label: 'Followers', icon: Users },
  { key: 'totalStars', label: 'Stars Earned', icon: Star },
  { key: 'totalCommits', label: 'Total Commits', icon: GitCommit },
] as const;

// ---------------------------------------------------------------------------
// Animated Counter
// ---------------------------------------------------------------------------

function AnimatedCounter({
  value,
  isInView,
}: {
  readonly value: number;
  readonly isInView: boolean;
}) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplay(latest as number);
    });
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionVal, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [isInView, value, motionVal]);

  return (
    <span className="tabular-nums font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight">
      {display.toLocaleString()}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

function StatSkeleton() {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      <div className="h-4 w-4 rounded bg-muted-foreground/20" />
      <div className="h-8 w-16 rounded-lg bg-muted-foreground/15" />
      <div className="h-3 w-20 rounded bg-muted-foreground/10" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function GitHubStatsCard() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [error, setError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/github');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: GitHubStats = await res.json();
        if (!cancelled) setStats(data);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="md:col-span-4 rounded-[2.5rem] border border-edge-subtle bg-bg-surface/30 backdrop-blur-md p-8 md:p-10 flex flex-col justify-between relative group shadow-2xl overflow-hidden"
    >
      {/* Top gradient accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-warm-500 to-brand-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Background glow */}
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-500/10 rounded-full blur-[60px] group-hover:bg-brand-500/20 transition-colors duration-700 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Live Stats
          </p>
          <div className="p-2 rounded-full bg-bg-base/50 border border-edge-subtle group-hover:border-brand-500/30 group-hover:bg-brand-500/10 transition-all duration-500">
            <svg
              className="w-4 h-4 text-muted-foreground group-hover:text-brand-500 transition-colors duration-500"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground tracking-tight">
          GitHub Activity
        </h3>
      </div>

      {/* Stats Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-x-6 gap-y-8">
        {STAT_ITEMS.map((item) => {
          const Icon = item.icon;

          if (!stats && !error) {
            return <StatSkeleton key={item.key} />;
          }

          const value = stats?.[item.key] ?? 0;

          return (
            <div key={item.key} className="flex flex-col gap-1.5 group/stat">
              <Icon className="w-4 h-4 text-brand-500/70 group-hover/stat:text-brand-500 transition-colors duration-300" />
              {error && !stats ? (
                <span className="font-heading text-3xl md:text-4xl font-bold text-muted-foreground tracking-tight">
                  --
                </span>
              ) : (
                <AnimatedCounter value={value} isInView={isInView} />
              )}
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom attribution */}
      <div className="relative z-10 mt-8 pt-4 border-t border-edge-subtle/50">
        <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
          github.com/jorenverdad
        </p>
      </div>
    </motion.div>
  );
}
