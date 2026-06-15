'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { LazyMotion, domAnimation, m, Variants, AnimatePresence } from 'motion/react';
import StackIcon, { IconName } from 'tech-stack-icons';

const CATEGORIES = ['Languages', 'Frontend', 'Mobile', 'Backend', 'Database', 'Tools', 'OS'] as const;

type TechItem = {
  name: string;
  color: string;
  darkColor?: string;
  category?: typeof CATEGORIES[number];
  preferred?: boolean;
  iconName?: IconName;
  iconClass?: string;
  icon?: React.ComponentType<{ style?: React.CSSProperties; size?: number }>;
};

const TECH_STACK: readonly TechItem[] = [
  // ==========================================
  // LANGUAGES
  // ==========================================
  { name: 'HTML5', iconName: 'html5', color: '#E34F26' },
  { name: 'CSS3', iconName: 'css3', color: '#1572B6' },
  { name: 'JavaScript', iconName: 'js', color: '#F7DF1E', category: 'Languages' },
  { name: 'TypeScript', iconName: 'typescript', color: '#3178C6', category: 'Languages', preferred: true },
  { name: 'Python', iconName: 'python', color: '#3776AB', category: 'Languages' },

  // ==========================================
  // FRONTEND
  // ==========================================
  { name: 'React', iconName: 'react', color: '#61DAFB', category: 'Frontend'},
  { name: 'Next.js', iconName: 'nextjs2', color: '#000000', darkColor: '#FFFFFF', category: 'Frontend', preferred: true },
  { name: 'Vue.js', iconName: 'vuejs', color: '#4FC08D', category: 'Frontend' },
  { name: 'Tailwind CSS', iconName: 'tailwindcss', color: '#06B6D4', category: 'Frontend', preferred: true },
  { name: 'Shadcn UI', iconName: 'shadcnui', color: '#000000', darkColor: '#FFFFFF', category: 'Frontend', preferred: true },
  { name: 'Bootstrap', iconName: 'bootstrap5', color: '#7952B3', category: 'Frontend' },
  { name: 'Motion', iconName: 'motion', color: '#000000', darkColor: '#FFFFFF', category: 'Frontend', preferred: true },
  { name: 'Zustand', iconName: 'zustand', color: '#443E38', darkColor: '#F4F4F5', category: 'Frontend' },

  // ==========================================
  // MOBILE
  // ==========================================
  { name: 'React Native', iconName: 'reactnative', color: '#61DAFB', category: 'Mobile' },
  { name: 'Capacitor', iconName: 'ionic', color: '#119EFF', category: 'Mobile' },

  // ==========================================
  // BACKEND (Servers, BaaS, & ORMs)
  // ==========================================
  { name: 'Node.js', iconName: 'nodejs', color: '#339933', category: 'Backend', preferred: true },
  { name: 'Django', iconName: 'django', color: '#092E20', darkColor: '#44B78B', category: 'Backend' },
  { name: 'Laravel', iconName: 'laravel', color: '#FF2D20', category: 'Backend' },
  { name: 'Supabase', iconName: 'supabase', color: '#3ECF8E', category: 'Backend', preferred: true },
  { name: 'Firebase', iconName: 'firebase', color: '#FFCA28', category: 'Backend' },
  { name: 'Prisma ORM', iconName: 'prisma', color: '#2D3748', darkColor: '#FFFFFF', category: 'Backend', preferred: true },

  // ==========================================
  // DATABASE (Raw Storage & Caching)
  // ==========================================
  { name: 'PostgreSQL', iconName: 'postgresql', color: '#4169E1', category: 'Database', preferred: true },
  { name: 'MySQL', iconName: 'mysql', color: '#4169E1', category: 'Database' },
  { name: 'Redis', iconName: 'redis', color: '#EE0000', category: 'Database' },

  // ==========================================
  // TOOLS
  // ==========================================
  { name: 'Vite', iconName: 'vitejs', color: '#646CFF', category: 'Tools' },
  { name: 'Figma', iconName: 'figma', color: '#F24E1E', category: 'Tools', preferred: true },
  { name: 'Git', iconName: 'git', color: '#F05032', category: 'Tools'},
  { name: 'GitHub', iconName: 'github', color: '#000000', darkColor: '#FFFFFF', category: 'Tools', preferred: true },
  { name: 'Vercel', iconName: 'vercel', color: '#000000', darkColor: '#FFFFFF', category: 'Tools', preferred: true },
  { name: 'Docker', iconName: 'docker', color: '#2496ED', category: 'Tools' },
  { name: 'Postman', iconName: 'postman', color: '#FF6C37', category: 'Tools' },
  { name: 'Playwright', iconName: 'playwright', color: '#2EAD33', category: 'Tools' },
  { name: 'ESLint', iconName: 'eslint', color: '#4B32C3', category: 'Tools' },
  { name: 'Prettier', iconName: 'prettier', color: '#F7B93E', category: 'Tools' },

  // ==========================================
  // OPERATING SYSTEMS
  // ==========================================
  { name: 'Windows', iconName: 'windows11', color: '#0078D4', category: 'OS' },
  { name: 'Linux', iconName: 'linux', color: '#FCC624', category: 'OS', preferred: true },
  { name: 'Kali Linux', iconClass: 'devicon-kalilinux-original', color: '#557C94', category: 'OS' },
];

type CellInfo = {
  x: number;
  y: number;
  distance: number;
  index: number;
  tech?: typeof TECH_STACK[number];
  delay: number;
};

type ViewMode = 'grid' | 'list';

export function TechStackSection({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Retrieve selection after client hydration
  useEffect(() => {
    const saved = localStorage.getItem('tech-stack-view');
    if (saved === 'grid' || saved === 'list') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setViewMode(saved);
    }
  }, []);

  // Update state and write to localStorage
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('tech-stack-view', mode);
  };
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    setMounted(true);
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
      <div className="container mx-auto px-6 relative z-30 mb-8">
        <div className="text-center flex flex-col items-center">
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

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex items-center p-1.5 bg-muted/40 border border-border/60 rounded-full backdrop-blur-md shadow-sm"
          >
            {['grid', 'list'].map((mode) => (
              <button
                key={mode}
                onClick={() => handleViewModeChange(mode as ViewMode)}
                className={`relative px-8 py-2.5 rounded-full text-sm font-bold transition-colors ${
                  viewMode === mode 
                    ? 'text-background' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {viewMode === mode && (
                  <m.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-foreground rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10 capitalize tracking-wide">{mode}</span>
              </button>
            ))}
          </m.div>
        </div>
      </div>

      <div className="w-full relative min-h-[600px] flex flex-col items-center">
        <AnimatePresence mode="wait">
          {viewMode === 'grid' && (
            <m.div 
              key="grid-view"
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full flex justify-center items-center relative z-20 pointer-events-none overflow-visible flex-1"
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
                {/* Radial vignette */}
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
          )}

          {viewMode === 'list' && (
            <m.div
              key="list-view"
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-5xl mx-auto relative z-20 px-6 py-12"
            >
              <TechStackList isDark={isDark} />
            </m.div>
          )}
        </AnimatePresence>
      </div>
      </LazyMotion>
    </section>
  );
}

function TechStackList({ isDark }: { isDark: boolean }) {
  const listContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 260, damping: 25 } }
  };

  return (
    <m.div variants={listContainerVariants} initial="hidden" animate="show" className="flex flex-col w-full">
      {CATEGORIES.map((category, index) => {
        const items = TECH_STACK.filter(t => t.category === category)
          .sort((a, b) => (b.preferred ? 1 : 0) - (a.preferred ? 1 : 0));
        if (items.length === 0) return null;
        
        const isLast = index === CATEGORIES.length - 1;
        
        return (
          <m.div 
            key={category} 
            variants={rowVariants}
            className={`flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-8 md:py-10 ${!isLast ? 'border-b border-black/5 dark:border-white/[0.05]' : ''}`}
          >
            <div className="md:w-48 flex-shrink-0 pt-2">
              <h3 className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.25em]">
                {category}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {items.map((tech) => (
                <m.div
                  key={tech.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full 
                    bg-white dark:bg-white/[0.02] 
                    border border-black/[0.08] dark:border-white/[0.08]
                    hover:border-black/20 dark:hover:border-white/[0.2]
                    shadow-sm hover:shadow-md dark:shadow-none
                    transition-all duration-300 cursor-pointer"
                >
                  {/* Background effects container */}
                  <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none -z-10">
                    {/* Subtle Glow background on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] dark:group-hover:opacity-[0.1] transition-opacity duration-300"
                      style={{ backgroundColor: tech.color }}
                    />
                    {/* Decorative corner accent - very subtle */}
                    <div 
                      className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at top right, ${tech.color}30, transparent 60%)`
                      }}
                    />
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 w-5 h-5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {tech.iconName ? (
                      <StackIcon 
                        name={tech.iconName} 
                        variant={isDark ? 'dark' : 'light'} 
                        className={`w-full h-full ${tech.iconName === 'nextjs' ? 'dark:invert' : ''}`}
                      />
                    ) : tech.iconClass ? (
                      <i className={tech.iconClass} style={{ color: tech.darkColor ?? tech.color, fontSize: '1.25rem' }} />
                    ) : tech.icon ? (
                      <React.Fragment>
                        {React.createElement(tech.icon, { style: { color: tech.darkColor ?? tech.color }, size: 20 })}
                      </React.Fragment>
                    ) : null}
                  </div>

                  {/* Text */}
                  <span className="relative z-10 text-sm font-semibold text-zinc-700 dark:text-zinc-300 pr-1">
                    {tech.name}
                  </span>

                  {/* Preferred Stack Star Badge */}
                  {tech.preferred && (
                    <div 
                      className="absolute -top-1 -right-1 z-20 flex items-center justify-center 
                        w-4 h-4 md:w-[18px] md:h-[18px] rounded-full 
                        bg-gradient-to-br from-amber-400 to-amber-500 
                        text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                        border border-background dark:border-background
                        transition-all duration-300 ease-out
                        group-hover:scale-110 group-hover:rotate-[15deg]"
                      title="Preferred Choice"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-2.5 h-2.5 md:w-3 md:h-3 fill-white text-white"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                  )}
                </m.div>
              ))}
            </div>
          </m.div>
        );
      })}
    </m.div>
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
      <div
        className="w-14 h-14 md:w-[72px] md:h-[72px] lg:w-[88px] lg:h-[88px] rounded-xl md:rounded-2xl 
          border border-white/[0.03] dark:border-white/[0.02] 
          bg-white/[0.01] dark:bg-white/[0.01]
          transition-colors duration-500 hover:bg-white/[0.04] dark:hover:bg-white/[0.04]
          animate-cell-empty"
        style={{
          animationDelay: `${cell.delay}s`,
          animationFillMode: 'both'
        }}
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
        {tech.iconName ? (
          <StackIcon 
            name={tech.iconName} 
            variant={isDark ? 'dark' : 'light'} 
            className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ${tech.iconName === 'nextjs' ? 'dark:invert' : ''}`}
          />
        ) : tech.iconClass ? (
          <i className={tech.iconClass} style={{ color: tech.darkColor ?? tech.color }} />
        ) : tech.icon ? (
          <React.Fragment>
            {React.createElement(tech.icon, { style: { color: tech.darkColor ?? tech.color } })}
          </React.Fragment>
        ) : null}
      </div>

      {/* Preferred Stack Star Badge */}
      {tech.preferred && (
        <div 
          className="absolute -top-1 -right-1 z-20 flex items-center justify-center 
            w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full 
            bg-gradient-to-br from-amber-400 to-amber-500 
            text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)]
            border border-background dark:border-background
            transition-all duration-300 ease-out
            group-hover:scale-110 group-hover:rotate-[15deg]"
          title="Preferred Choice"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 fill-white text-white"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
      )}

      {/* Tooltip */}
      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-[60] px-3.5 py-2 
        bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 
        rounded-xl opacity-0 scale-90 pointer-events-none 
        transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 whitespace-nowrap 
        shadow-[0_8px_24px_rgba(0,0,0,0.3)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.15)]
        border border-white/10 dark:border-black/5 flex flex-col items-center justify-center">
        <span className="text-[10px] md:text-xs font-mono font-bold tracking-wider">
          {tech.name}
        </span>
        {tech.preferred && (
          <span className="text-[9px] md:text-[10px] font-mono font-normal tracking-wide text-amber-500 dark:text-amber-600 mt-0.5">
            (Preferred)
          </span>
        )}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 
          bg-zinc-950 dark:bg-white rotate-45 border-r border-b border-white/10 dark:border-black/5" />
      </div>
    </m.div>
  );
}
