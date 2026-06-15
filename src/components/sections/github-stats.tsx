'use client';

import { useEffect, useRef, useState } from 'react';
import {
  m,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  type Variants,
} from 'motion/react';
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
  { key: 'publicRepos', label: 'Public Repositories', icon: FolderGit2 },
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
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [isInView, value, motionVal]);

  return (
    <span className="tabular-nums font-heading text-5xl md:text-7xl lg:text-8xl font-light text-foreground tracking-tighter group-hover/stat:text-brand-500 transition-colors duration-500">
      {display.toLocaleString()}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface GitHubStatsCardProps {
  readonly stats: GitHubStats;
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function GitHubStatsCard({ stats }: GitHubStatsCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div ref={containerRef} className="w-full relative py-8 md:py-4 group">
      {/* Ambient hover glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-brand-500/5 blur-[120px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      {/* Top and bottom subtle dividers */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-edge-subtle to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-edge-subtle to-transparent opacity-50" />

      <m.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col xl:flex-row items-start xl:items-center gap-12 xl:gap-24 relative z-10 px-4 md:px-0"
      >
        {/* Left Branding */}
        <m.div variants={itemVariants} className="flex flex-col gap-4 max-w-sm">
          <div className="flex items-center gap-3">
             <div className="w-8 h-px bg-brand-500" />
             <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-500">Live Telemetry</span>
          </div>
          <h3 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter text-foreground leading-none">
            Open Source <br />
            <span className="text-muted-foreground">Footprint.</span>
          </h3>
          <p className="text-sm font-sans text-muted-foreground/80 leading-relaxed font-light mt-2">
            Real-time data fetched directly from GitHub. A quantitative look at my contributions, public repositories, and community impact.
          </p>
        </m.div>

        {/* Right Stats Grid */}
        <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STAT_ITEMS.map((item, index) => {
             const Icon = item.icon;
             const value = stats[item.key];

             return (
               <m.div 
                 variants={itemVariants} 
                 key={item.key} 
                 className="flex flex-col gap-3 group/stat relative md:px-6"
               >
                 {/* subtle vertical line on desktop */}
                 {index !== 0 && (
                   <div className="hidden md:block absolute left-0 top-4 bottom-4 w-px bg-edge-subtle/50 group-hover/stat:bg-brand-500/30 transition-colors duration-500" />
                 )}
                 
                 <div className="flex items-center gap-2 text-brand-500/50 group-hover/stat:text-brand-500 transition-colors duration-500">
                    <Icon className="w-5 h-5" />
                 </div>
                 
                 <AnimatedCounter value={value} isInView={isInView} />
                 
                 <span className="text-[10px] md:text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1 group-hover/stat:text-foreground transition-colors duration-500">
                   {item.label}
                 </span>
               </m.div>
             );
          })}
        </div>
      </m.div>
    </div>
  );
}
