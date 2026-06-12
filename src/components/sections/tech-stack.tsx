'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SiPrettier } from 'react-icons/si';

// The tech stack list. Adding to this array will automatically re-center the cluster!
// Organized by Frontend, Backend, Tools/DevOps, and OS categories.
const TECH_STACK = [
  // ==========================================
  // FRONTEND / MOBILE / UI
  // ==========================================
  { name: 'HTML5', iconClass: 'devicon-html5-plain', color: '#E34F26', category: 'Frontend' },
  { name: 'CSS3', iconClass: 'devicon-css3-plain', color: '#1572B6', category: 'Frontend' },
  { name: 'JavaScript', iconClass: 'devicon-javascript-plain', color: '#F7DF1E', category: 'Frontend' },
  { name: 'TypeScript', iconClass: 'devicon-typescript-plain', color: '#3178C6', category: 'Frontend' },
  { name: 'React', iconClass: 'devicon-react-original', color: '#61DAFB', category: 'Frontend' },
  { name: 'Next.js', iconClass: 'devicon-nextjs-plain', color: '#000000', darkColor: '#FFFFFF', category: 'Frontend' },
  { name: 'Vue.js', iconClass: 'devicon-vuejs-plain', color: '#4FC08D', category: 'Frontend' },
  { name: 'React Native', iconClass: 'devicon-react-original', color: '#61DAFB', category: 'Frontend' },
  { name: 'Capacitor', iconClass: 'devicon-capacitor-plain', color: '#119EFF', category: 'Frontend' },
  { name: 'Tailwind CSS', iconClass: 'devicon-tailwindcss-original', color: '#06B6D4', category: 'Frontend' },
  { name: 'Bootstrap', iconClass: 'devicon-bootstrap-plain', color: '#7952B3', category: 'Frontend' },
  { name: 'Framer Motion', iconClass: 'devicon-framermotion-original', color: '#000000', darkColor: '#FFFFFF', category: 'Frontend' },
  { name: 'Zustand', iconClass: 'devicon-zustand-plain', color: '#443E38', darkColor: '#F4F4F5', category: 'Frontend' },
  { name: 'Vite', iconClass: 'devicon-vite-plain', color: '#646CFF', category: 'Frontend' },
  { name: 'Figma', iconClass: 'devicon-figma-plain', color: '#F24E1E', category: 'Frontend' },

  // ==========================================
  // BACKEND / DATABASE / CLOUD
  // ==========================================
  { name: 'Node.js', iconClass: 'devicon-nodejs-plain', color: '#339933', category: 'Backend' },
  { name: 'Python', iconClass: 'devicon-python-plain', color: '#3776AB', category: 'Backend' },
  { name: 'Django', iconClass: 'devicon-django-plain', color: '#092E20', darkColor: '#44B78B', category: 'Backend' },
  { name: 'Laravel', iconClass: 'devicon-laravel-original', color: '#FF2D20', category: 'Backend' },
  { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain', color: '#4169E1', category: 'Backend' },
  { name: 'Supabase', iconClass: 'devicon-supabase-plain', color: '#3ECF8E', category: 'Backend' },
  { name: 'Firebase', iconClass: 'devicon-firebase-plain', color: '#FFCA28', category: 'Backend' },
  { name: 'Prisma', iconClass: 'devicon-prisma-original', color: '#2D3748', darkColor: '#FFFFFF', category: 'Backend' },

  // ==========================================
  // DEV TOOLS / TESTING / CI-CD
  // ==========================================
  { name: 'Git', iconClass: 'devicon-git-plain', color: '#F05032', category: 'Tools' },
  { name: 'Vercel', iconClass: 'devicon-vercel-original', color: '#000000', darkColor: '#FFFFFF', category: 'Tools' },
  { name: 'Docker', iconClass: 'devicon-docker-plain', color: '#2496ED', category: 'Tools' },
  { name: 'Postman', iconClass: 'devicon-postman-plain', color: '#FF6C37', category: 'Tools' },
  { name: 'Playwright', iconClass: 'devicon-playwright-plain', color: '#2EAD33', category: 'Tools' },
  { name: 'ESLint', iconClass: 'devicon-eslint-plain', color: '#4B32C3', category: 'Tools' },
  { name: 'Prettier', icon: SiPrettier, color: '#F7B93E', category: 'Tools' },

  // ==========================================
  // OPERATING SYSTEMS
  // ==========================================
  { name: 'Windows', iconClass: 'devicon-windows8-original', color: '#0078D4', category: 'OS' },
  { name: 'Linux', iconClass: 'devicon-linux-plain', color: '#FCC624', category: 'OS' },
  { name: 'Kali Linux', iconClass: 'devicon-kalilinux-original', color: '#557C94', category: 'OS' },
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
      <div className="relative z-10 text-2xl md:text-[28px] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {tech.iconClass ? (
          <i className={tech.iconClass} style={{ color: tech.darkColor ?? tech.color }} />
        ) : tech.icon ? (
          <tech.icon style={{ color: tech.darkColor ?? tech.color }} />
        ) : null}
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
