'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { LazyMotion, domAnimation, m, Variants } from 'motion/react';
import StackIcon from 'tech-stack-icons';

const TECH_STACK = [
  // ==========================================
  // FRONTEND / MOBILE / UI
  // ==========================================
  { name: 'HTML5', iconName: 'html5', color: '#E34F26', category: 'Frontend' },
  { name: 'CSS3', iconName: 'css3', color: '#1572B6', category: 'Frontend' },
  { name: 'JavaScript', iconName: 'js', color: '#F7DF1E', category: 'Frontend' },
  { name: 'TypeScript', iconName: 'typescript', color: '#3178C6', category: 'Frontend' },
  { name: 'React', iconName: 'react', color: '#61DAFB', category: 'Frontend' },
  { name: 'Next.js', iconName: 'nextjs2', color: '#000000', darkColor: '#FFFFFF', category: 'Frontend' },
  { name: 'Vue.js', iconName: 'vuejs', color: '#4FC08D', category: 'Frontend' },
  { name: 'React Native', iconName: 'reactnative', color: '#61DAFB', category: 'Frontend' },
  { name: 'Capacitor', iconName: 'ionic', color: '#119EFF', category: 'Frontend' },
  { name: 'Shadcn UI', iconName: 'shadcnui', color: '#000000', darkColor: '#FFFFFF', category: 'Frontend' },
  { name: 'Tailwind CSS', iconName: 'tailwindcss', color: '#06B6D4', category: 'Frontend' },
  { name: 'Bootstrap', iconName: 'bootstrap5', color: '#7952B3', category: 'Frontend' },
  { name: 'Framer Motion', iconName: 'framer', color: '#000000', darkColor: '#FFFFFF', category: 'Frontend' },
  { name: 'Zustand', iconName: 'zustand', color: '#443E38', darkColor: '#F4F4F5', category: 'Frontend' },
  { name: 'Vite', iconName: 'vitejs', color: '#646CFF', category: 'Frontend' },
  { name: 'Figma', iconName: 'figma', color: '#F24E1E', category: 'Frontend' },

  // ==========================================
  // BACKEND / DATABASE / CLOUD
  // ==========================================
  { name: 'Node.js', iconName: 'nodejs', color: '#339933', category: 'Backend' },
  { name: 'Python', iconName: 'python', color: '#3776AB', category: 'Backend' },
  { name: 'Django', iconName: 'django', color: '#092E20', darkColor: '#44B78B', category: 'Backend' },
  { name: 'Laravel', iconName: 'laravel', color: '#FF2D20', category: 'Backend' },
  { name: 'PostgreSQL', iconName: 'postgresql', color: '#4169E1', category: 'Backend' },
  { name: 'MySQL', iconName: 'mysql', color: '#4169E1', category: 'Backend' },
  { name: 'Redis', iconName: 'redis', color: '#EE0000', category: 'Backend' },
  { name: 'Supabase', iconName: 'supabase', color: '#3ECF8E', category: 'Backend' },
  { name: 'Firebase', iconName: 'firebase', color: '#FFCA28', category: 'Backend' },
  { name: 'Prisma ORM', iconName: 'prisma', color: '#2D3748', darkColor: '#FFFFFF', category: 'Backend' },

  // ==========================================
  // DEV TOOLS / TESTING / CI-CD
  // ==========================================
  { name: 'GitHub', iconName: 'github', color: '#000000', darkColor: '#FFFFFF', category: 'Tools' },
  { name: 'Git', iconName: 'git', color: '#F05032', category: 'Tools' },
  { name: 'Vercel', iconName: 'vercel', color: '#000000', darkColor: '#FFFFFF', category: 'Tools' },
  { name: 'Docker', iconName: 'docker', color: '#2496ED', category: 'Tools' },
  { name: 'Postman', iconName: 'postman', color: '#FF6C37', category: 'Tools' },
  { name: 'Playwright', iconName: 'playwright', color: '#2EAD33', category: 'Tools' },
  { name: 'ESLint', iconName: 'eslint', color: '#4B32C3', category: 'Tools' },
  { name: 'Prettier', iconName: 'prettier', color: '#F7B93E', category: 'Tools' },

  // ==========================================
  // OPERATING SYSTEMS
  // ==========================================
  { name: 'Windows', iconName: 'windows11', color: '#0078D4', category: 'OS' },
  { name: 'Linux', iconName: 'linux', color: '#FCC624', category: 'OS' },
  { name: 'Kali Linux', iconClass: 'devicon-kalilinux-original', color: '#557C94', category: 'OS' },
];

interface CellInfo {
  x: number;
  y: number;
  distance: number;
  index: number;
  tech?: typeof TECH_STACK[number];
  delay: number;
}

export function TechStackSection({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    setTimeout(() => setMounted(true), 0);
    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  const gridData = useMemo(() => {
    // Increased grid dimensions to create a vast, expansive grid aesthetic.
    const cols = isMobile ? 9 : 19;
    const rows = isMobile ? 19 : 9;
    
    const cx = Math.floor(cols / 2);
    const cy = Math.floor(rows / 2);

    const cells: CellInfo[] = [];
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const dx = x - cx;
        const dy = y - cy;
        // Adjust the weight to create a slightly horizontal or vertical cluster depending on screen
        const distance = isMobile 
          ? (dx * dx) * 5 + (dy * dy) 
          : (dx * dx) + (dy * dy) * 5;
          
        cells.push({ x, y, distance, index: y * cols + x, delay: 0 });
      }
    }

    const sortedCells = [...cells].sort((a, b) => {
      if (a.distance !== b.distance) return a.distance - b.distance;
      if (a.y !== b.y) return a.y - b.y;
      return a.x - b.x;
    });

    TECH_STACK.forEach((tech, i) => {
      const cell = sortedCells[i];
      if (cell) {
        cell.tech = tech;
      }
    });

    cells.sort((a, b) => a.index - b.index);

    // Calculate radial delay
    const maxDist = Math.max(...cells.map(c => c.distance));
    cells.forEach(c => {
      const normDist = c.distance / (maxDist || 1);
      // Use square root for a beautiful, organic non-linear expansion wave
      c.delay = Math.sqrt(normDist) * 0.45;
    });

    return { cols, rows, cells };
  }, [isMobile]);

  if (!mounted) {
    return (
      <section ref={containerRef} id="tech-stack" className={`py-32 md:py-48 bg-bg-base relative overflow-hidden min-h-[800px] flex flex-col items-center justify-center ${className ?? ''}`}>
        <div className="container mx-auto px-6 relative z-10 w-full">

          <div className="mb-8 text-center flex flex-col items-center">
            <h2 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight uppercase mb-6 text-foreground">
              The <span className="text-brand-500">Stack.</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed font-sans">
              A curated collection of languages, frameworks, and tools calibrated for sub-second performance, strict type-safety, and interactive fluidity.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <section 
      id="tech-stack" 
      ref={containerRef}
      className={`py-32 md:py-48 bg-bg-base relative overflow-hidden flex flex-col items-center justify-center ${className ?? ''}`}
    >
      <LazyMotion features={domAnimation}>
      <div className="container mx-auto px-6 relative z-30 mb-0">
        <div className="mb-8 text-center flex flex-col items-center">
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight uppercase mb-6 text-foreground"
          >
            The <span className="text-brand-500">Stack.</span>
          </m.h2>
          
          <m.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed font-sans"
          >
            A curated collection of languages, frameworks, and tools calibrated for sub-second performance, strict type-safety, and interactive fluidity.
          </m.p>
        </div>
      </div>

      {/* The Infinite Grid Container */}
      <m.div 
        className="w-full flex justify-center items-center relative z-20 pointer-events-none overflow-visible"
      >
        <div className="relative">
          <m.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-2 md:gap-3 lg:gap-4 pointer-events-auto w-max"
            style={{ 
              gridTemplateColumns: `repeat(${gridData.cols}, max-content)`,
              gridTemplateRows: `repeat(${gridData.rows}, max-content)`,
            }}
          >
            {gridData.cells.map((cell) => (
              <Cell 
                key={cell.index} 
                cell={cell} 
                isDark={isDark}
              />
            ))}
          </m.div>

          {/* Gradient fade overlays — blend grid edges into the background */}
          {/* Radial vignette: large soft ellipse, transparent center → bg color edges */}
          <div 
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'radial-gradient(ellipse 55% 60% at 50% 50%, transparent 0%, oklch(0.095 0.018 17 / 0.0) 20%, oklch(0.095 0.018 17 / 0.45) 50%, oklch(0.095 0.018 17 / 0.85) 70%, oklch(0.095 0.018 17) 90%)',
            }}
          />
          {/* Left edge fade */}
          <div 
            className="absolute inset-y-0 left-0 w-[25%] pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to right, oklch(0.095 0.018 17) 0%, oklch(0.095 0.018 17 / 0.7) 40%, transparent 100%)',
            }}
          />
          {/* Right edge fade */}
          <div 
            className="absolute inset-y-0 right-0 w-[25%] pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to left, oklch(0.095 0.018 17) 0%, oklch(0.095 0.018 17 / 0.7) 40%, transparent 100%)',
            }}
          />
          {/* Top edge fade */}
          <div 
            className="absolute inset-x-0 top-0 h-[30%] pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to bottom, oklch(0.095 0.018 17) 0%, oklch(0.095 0.018 17 / 0.6) 40%, transparent 100%)',
            }}
          />
          {/* Bottom edge fade */}
          <div 
            className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to top, oklch(0.095 0.018 17) 0%, oklch(0.095 0.018 17 / 0.6) 40%, transparent 100%)',
            }}
          />
        </div>
      </m.div>
      </LazyMotion>
    </section>
  );
}

const cellVariants: Variants = {
  hidden: (custom: { delay: number; hasTech: boolean }) => ({
    opacity: 0,
    scale: custom?.hasTech ? 0.75 : 0.85,
    y: custom?.hasTech ? 20 : 10,
  }),
  show: (custom: { delay: number; hasTech: boolean }) => ({ 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: custom?.hasTech ? 100 : 130, 
      damping: custom?.hasTech ? 15 : 20,
      delay: custom?.delay ?? 0
    }
  })
};

function Cell({ cell, isDark }: { cell: CellInfo; isDark: boolean }) {
  const tech = cell.tech;

  if (!tech) {
    return (
      <m.div
        variants={cellVariants}
        custom={{ delay: cell.delay, hasTech: false }}
        className="w-14 h-14 md:w-[72px] md:h-[72px] lg:w-[88px] lg:h-[88px] rounded-xl md:rounded-2xl 
          border border-white/[0.03] dark:border-white/[0.02] 
          bg-white/[0.01] dark:bg-white/[0.01]
          transition-colors duration-500 hover:bg-white/[0.04] dark:hover:bg-white/[0.04]"
      />
    );
  }

  return (
    <m.div
      variants={cellVariants}
      custom={{ delay: cell.delay, hasTech: true }}
      whileHover={{ scale: 1.15, zIndex: 50 }}
      whileTap={{ scale: 0.95 }}
      className="relative z-10 group w-14 h-14 md:w-[72px] md:h-[72px] lg:w-[88px] lg:h-[88px] flex items-center justify-center rounded-xl md:rounded-2xl cursor-pointer
        bg-white/[0.05] dark:bg-white/[0.04]
        border border-white/[0.08] dark:border-white/[0.08]
        shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.1)]
        dark:shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]
        backdrop-blur-md
        transition-colors transition-shadow duration-300
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
        hover:border-white/[0.2] dark:hover:border-white/[0.15]"
    >
      {/* Subtle colorful aura behind the icon on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl md:rounded-2xl blur-xl -z-10"
        style={{ backgroundColor: tech.color }}
      />

      {/* Icon Container */}
      <div className="relative z-10 text-2xl md:text-3xl lg:text-4xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
        {'iconName' in tech && tech.iconName ? (
          <StackIcon 
            name={tech.iconName as any} 
            variant={isDark ? 'dark' : 'light'} 
            className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ${tech.iconName === 'nextjs' ? 'dark:invert' : ''}`}
          />
        ) : 'iconClass' in tech && tech.iconClass ? (
          <i className={tech.iconClass} style={{ color: tech.darkColor ?? tech.color }} />
        ) : 'icon' in tech && (tech as any).icon ? (
          <React.Fragment>
            {React.createElement((tech as any).icon, { style: { color: tech.darkColor ?? tech.color } })}
          </React.Fragment>
        ) : null}
      </div>

      {/* Tooltip */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-[60] px-3.5 py-2 
        bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 
        rounded-xl opacity-0 scale-90 pointer-events-none 
        transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 whitespace-nowrap 
        shadow-[0_8px_24px_rgba(0,0,0,0.3)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.15)]
        border border-white/10 dark:border-black/5 flex flex-col items-center">
        <span className="text-[10px] md:text-xs font-mono font-bold tracking-wider">
          {tech.name}
        </span>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 
          bg-zinc-950 dark:bg-white rotate-45 border-r border-b border-white/10 dark:border-black/5" />
      </div>
    </m.div>
  );
}

