'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiVercel,
  SiDocker,
  SiEslint,
  SiPrettier,
  SiFigma,
} from 'react-icons/si';
import type { IconBaseProps } from 'react-icons';

// Zustand doesn't have a Simple Icons entry in react-icons.
// Using a custom bear SVG based on the official Zustand logo.
function ZustandIcon(props: IconBaseProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-5.5C17 9.02 14.76 8 12 8s-5 1.02-5 2.5c0 .53.31 1.02.84 1.42C8.62 10.78 10.18 10 12 10s3.38.78 4.16 1.92c.53-.4.84-.89.84-1.42z" />
    </svg>
  );
}

// The tech stack list. Adding to this array will automatically re-center the cluster!
const TECH_STACK = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000', darkColor: '#FFFFFF' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
  { name: 'Zustand', icon: ZustandIcon, color: '#443E38', darkColor: '#F4F4F5' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Prisma', icon: SiPrisma, color: '#2D3748', darkColor: '#FFFFFF' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Vercel', icon: SiVercel, color: '#000000', darkColor: '#FFFFFF' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'ESLint', icon: SiEslint, color: '#4B32C3' },
  { name: 'Prettier', icon: SiPrettier, color: '#F7B93E' },
];

interface CellInfo {
  x: number;
  y: number;
  distance: number;
  index: number; // original index
  tech?: typeof TECH_STACK[0];
}

export function TechStackSection({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Delay setting mounted to avoid hydration mismatch and avoid set-state-in-effect warning
    setTimeout(() => setMounted(true), 0);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const gridData = useMemo(() => {
    // 11x5 on desktop, 5x11 on mobile
    const cols = isMobile ? 5 : 11;
    const rows = isMobile ? 11 : 5;
    
    const cx = Math.floor(cols / 2);
    const cy = Math.floor(rows / 2);

    const cells: CellInfo[] = [];
    
    // Generate all grid coordinates
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const dx = x - cx;
        const dy = y - cy;
        // Calculate distance. We use different weights for mobile/desktop to ensure a nice rectangle block.
        const distance = isMobile 
          ? (dx * dx) * 4 + (dy * dy) 
          : (dx * dx) + (dy * dy) * 4;
          
        cells.push({ x, y, distance, index: y * cols + x });
      }
    }

    // Sort by distance to center
    const sortedCells = [...cells].sort((a, b) => {
      if (a.distance !== b.distance) return a.distance - b.distance;
      if (a.y !== b.y) return a.y - b.y;
      return a.x - b.x;
    });

    // Assign tech stacks to the closest cells
    TECH_STACK.forEach((tech, i) => {
      const cell = sortedCells[i];
      if (cell) {
        cell.tech = tech;
      }
    });

    // Restore original grid order for rendering
    cells.sort((a, b) => a.index - b.index);

    return { cols, rows, cells };
  }, [isMobile]);

  // Avoid hydration mismatch by not rendering the complex grid until mounted
  if (!mounted) {
    return (
      <section id="tech-stack" className={`py-32 bg-bg-base relative overflow-hidden min-h-[800px] ${className ?? ''}`}>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Tech Stack
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The tools and technologies I use to build scalable, high-performance web applications.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tech-stack" className={`py-32 bg-bg-base relative overflow-hidden ${className ?? ''}`}>
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            Tech Stack
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            The tools and technologies I use to build scalable, high-performance web applications.
          </motion.p>
        </div>

        {/* The Grid */}
        <div className="flex justify-center w-full">
          <div 
            className="grid gap-3 md:gap-4"
            style={{ 
              gridTemplateColumns: `repeat(${gridData.cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${gridData.rows}, minmax(0, 1fr))`,
            }}
          >
            {gridData.cells.map((cell) => (
              <Cell 
                key={cell.index} 
                cell={cell} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Cell({ cell }: { cell: CellInfo }) {
  const tech = cell.tech;

  if (!tech) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: cell.distance * 0.015, duration: 0.4 }}
        className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl border border-white/[0.04] dark:border-white/[0.04] bg-white/[0.02] dark:bg-white/[0.02]"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20, 
        delay: cell.distance * 0.04 
      }}
      whileHover={{ scale: 1.12, y: -4 }}
      className="relative z-10 group w-14 h-14 md:w-[72px] md:h-[72px] flex items-center justify-center rounded-2xl cursor-pointer
        bg-white/[0.08] dark:bg-white/[0.08]
        border border-white/[0.12] dark:border-white/[0.12]
        shadow-[0_2px_8px_rgba(0,0,0,0.08),0_8px_32px_-8px_rgba(0,0,0,0.12)]
        dark:shadow-[0_2px_8px_rgba(0,0,0,0.3),0_8px_32px_-8px_rgba(0,0,0,0.5)]
        backdrop-blur-sm
        transition-shadow duration-300
        hover:shadow-[0_4px_16px_rgba(0,0,0,0.12),0_12px_48px_-12px_rgba(0,0,0,0.2)]
        dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.5),0_12px_48px_-12px_rgba(0,0,0,0.7)]
        hover:border-white/[0.2] dark:hover:border-white/[0.2]"
    >
      {/* Icon — uses darkColor in dark mode so dark-logoed brands remain visible */}
      <div className="relative z-10 text-2xl md:text-[28px] transition-transform duration-300 group-hover:scale-110">
        <tech.icon style={{ color: tech.darkColor ?? tech.color }} />
      </div>

      {/* Tooltip */}
      <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-[60] px-3 py-1.5 bg-white dark:bg-white/95 text-gray-900 text-xs font-semibold rounded-lg opacity-0 scale-90 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        {tech.name}
        {/* Tooltip Arrow */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-white/95 rotate-45 shadow-[2px_2px_4px_rgba(0,0,0,0.05)]" />
      </div>
      
      {/* Subtle color glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 rounded-2xl blur-lg -z-10"
        style={{ backgroundColor: tech.color }}
      />
    </motion.div>
  );
}
