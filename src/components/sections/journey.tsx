'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { GridPattern } from '@/components/ui/grid-pattern';
import { Calendar, Briefcase, MapPin, ChevronRight, TrendingUp, Cpu, Award, Terminal } from 'lucide-react';

export interface JourneyMilestone {
  readonly year: string;
  readonly title: string;
  readonly role: string;
  readonly description: string;
  readonly location?: string;
  readonly tags?: readonly string[];
  readonly highlights?: readonly string[];
  readonly metrics?: readonly { label: string; value: string }[];
}

export interface JourneyProps {
  readonly className?: string;
  readonly milestones?: ReadonlyArray<JourneyMilestone>;
}

const DEFAULT_MILESTONES: ReadonlyArray<JourneyMilestone> = [
  {
    year: '2025 - Present',
    title: 'Senior Frontend Engineer',
    role: 'Tech Innovators Inc.',
    description: 'Leading frontend architecture and team execution for modern next-gen enterprise platforms.',
    location: 'San Francisco, CA (Remote)',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind v4', 'Framer Motion', 'GraphQL'],
    highlights: [
      'Architected a micro-frontend migration from legacy SPA to Next.js App Router, reducing initial page load times by 40%.',
      'Established core component library with high accessibility standards (WCAG 2.1 AA) and token-driven styles.',
      'Mentored 6 junior/mid-level engineers, running design reviews and enforcing strict type-safe code standards.'
    ],
    metrics: [
      { label: 'Load Time Reduction', value: '-40%' },
      { label: 'LCP Score', value: '1.2s' },
      { label: 'Team Led', value: '6 Eng' }
    ]
  },
  {
    year: '2022 - 2024',
    title: 'Frontend Developer',
    role: 'Creative Agency Co.',
    description: 'Developed immersive visual marketing experiences and robust headless commerce applications.',
    location: 'Los Angeles, CA',
    tags: ['React', 'Next.js', 'Three.js / WebGL', 'Tailwind', 'Stripe API'],
    highlights: [
      'Built custom interactive 3D landing pages using Three.js and react-three-fiber, yielding a 25% increase in visitor engagement.',
      'Implemented headless e-commerce integrations using Shopify Admin API and Stripe with optimized server-side rendering.',
      'Managed design-to-code pipeline, ensuring exact styling fidelity and smooth UI animations.'
    ],
    metrics: [
      { label: 'Engagement Increase', value: '+25%' },
      { label: 'Conversion Rate', value: '4.8%' },
      { label: 'Custom 3D Builds', value: '8+' }
    ]
  },
  {
    year: '2020 - 2022',
    title: 'UI/UX Designer & Dev',
    role: 'Freelance',
    description: 'Designed and built tailormade web solutions and digital design systems for growth-stage businesses.',
    location: 'Hybrid / Remote',
    tags: ['Figma', 'React', 'Gatsby', 'CSS Modules', 'WordPress Headless'],
    highlights: [
      'Created end-to-end user interfaces, brand identities, and high-fidelity prototypes in Figma, translating them directly to React code.',
      'Constructed modular design systems that reduced future development cycles by up to 35% for clients.',
      'Optimized SEO performance and semantic HTML structures, helping clients rank on the first page of Google search results.'
    ],
    metrics: [
      { label: 'Dev Cycle Speedup', value: '35%' },
      { label: 'SEO Audit Score', value: '100' },
      { label: 'Clients Served', value: '15+' }
    ]
  }
] as const;

function TelemetryRadar() {
  return (
    <div className="relative w-36 h-36 mx-auto flex items-center justify-center select-none">
      {/* Inject custom CSS keyframes directly inside the component */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes radar-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes radar-blip-1 {
          0%, 8% { opacity: 0.15; transform: translate(-50%, -50%) scale(0.9); }
          11% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); filter: drop-shadow(0 0 6px oklch(0.56 0.215 25)); }
          16% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.0); }
          40% { opacity: 0.15; transform: translate(-50%, -50%) scale(0.9); }
          100% { opacity: 0.15; }
        }
        @keyframes radar-blip-2 {
          0%, 63% { opacity: 0.1; transform: translate(-50%, -50%) scale(0.9); }
          66% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); filter: drop-shadow(0 0 6px oklch(0.56 0.215 25)); }
          71% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.0); }
          95% { opacity: 0.1; transform: translate(-50%, -50%) scale(0.9); }
          100% { opacity: 0.1; }
        }
        @keyframes radar-blip-3 {
          0%, 81% { opacity: 0.1; transform: translate(-50%, -50%) scale(0.9); }
          84% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); filter: drop-shadow(0 0 6px oklch(0.56 0.215 25)); }
          89% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.0); }
          10% { opacity: 0.1; transform: translate(-50%, -50%) scale(0.9); }
          100% { opacity: 0.1; }
        }
        @keyframes hud-lock {
          0%, 100% { border-color: rgba(224, 32, 32, 0.4); transform: scale(1); }
          50% { border-color: rgba(224, 32, 32, 0.8); transform: scale(1.08); }
        }
        @keyframes ping-ring {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}} />

      {/* Rotating Conic Sweep Overlay */}
      <div 
        className="absolute inset-[2%] rounded-full overflow-hidden pointer-events-none" 
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, transparent 50%, oklch(0.56 0.215 25 / 0.02) 60%, oklch(0.56 0.215 25 / 0.1) 85%, oklch(0.56 0.215 25 / 0.22) 100%)',
          animation: 'radar-spin 6s linear infinite',
          transformOrigin: 'center center'
        }}
      >
        {/* Leading edge glow line */}
        <div className="absolute top-0 left-[calc(50%-1px)] w-[1.5px] h-[50%] bg-gradient-to-t from-brand-500/30 to-brand-500 shadow-[0_0_8px_oklch(0.56_0.215_25)]" />
      </div>

      {/* Grid SVG Layer */}
      <svg className="w-full h-full text-brand-500/15 pointer-events-none z-10" viewBox="0 0 100 100">
        {/* Fine angle markings (outer ticks) */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="0.5 2" />
        
        {/* Concentric grid rings */}
        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
        <circle cx="50" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="0.25" />
        
        {/* Crosshairs */}
        <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
        <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
        
        {/* Grid coordinate helper lines (faint) */}
        <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.56 0.215 25 / 0.05)" strokeWidth="4" />

        {/* HUD degree indicators */}
        <text x="50" y="9" textAnchor="middle" dominantBaseline="middle" className="fill-brand-500/40 font-mono text-[3.5px] font-bold">00</text>
        <text x="91" y="50.7" textAnchor="middle" dominantBaseline="middle" className="fill-brand-500/40 font-mono text-[3.5px] font-bold">09</text>
        <text x="50" y="92.5" textAnchor="middle" dominantBaseline="middle" className="fill-brand-500/40 font-mono text-[3.5px] font-bold">18</text>
        <text x="9" y="50.7" textAnchor="middle" dominantBaseline="middle" className="fill-brand-500/40 font-mono text-[3.5px] font-bold">27</text>
      </svg>

      {/* Target Blip 1 (Top-Right, ~39deg) */}
      <div 
        className="absolute z-20 pointer-events-none"
        style={{
          top: '25%',
          left: '70%',
          animation: 'radar-blip-1 6s linear infinite'
        }}
      >
        {/* Blip Core */}
        <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_oklch(0.56_0.215_25)]" />
        {/* Sonar Ping Ring */}
        <div 
          className="absolute inset-[-6px] rounded-full border border-brand-500/40"
          style={{
            animation: 'ping-ring 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite',
            animationDelay: '0.65s'
          }}
        />
        {/* Target Reticle / Tracking Box */}
        <div 
          className="absolute -top-1.5 -left-1.5 w-[18px] h-[18px] border border-brand-500/40 rounded-sm"
          style={{
            animation: 'hud-lock 3s ease-in-out infinite'
          }}
        >
          {/* Tracking text */}
          <span className="absolute -bottom-3.5 left-[-4px] font-mono text-[5px] text-brand-400/80 bg-bg-void/90 px-0.5 border border-brand-500/20 rounded-sm scale-90 origin-left">
            TRK-2025
          </span>
        </div>
      </div>

      {/* Target Blip 2 (Bottom-Left, ~239deg) */}
      <div 
        className="absolute z-20 pointer-events-none"
        style={{
          top: '65%',
          left: '25%',
          animation: 'radar-blip-2 6s linear infinite'
        }}
      >
        {/* Blip Core */}
        <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_oklch(0.56_0.215_25)]" />
        {/* Sonar Ping Ring */}
        <div 
          className="absolute inset-[-6px] rounded-full border border-brand-500/30"
          style={{
            animation: 'ping-ring 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite',
            animationDelay: '4.0s'
          }}
        />
        <span className="absolute -top-3 left-[-6px] font-mono text-[5px] text-muted-foreground/40 scale-75 origin-bottom">
          NODE_B
        </span>
      </div>

      {/* Target Blip 3 (Top-Left, ~304deg) */}
      <div 
        className="absolute z-20 pointer-events-none"
        style={{
          top: '40%',
          left: '35%',
          animation: 'radar-blip-3 6s linear infinite'
        }}
      >
        {/* Blip Core */}
        <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_oklch(0.56_0.215_25)]" />
        {/* Sonar Ping Ring */}
        <div 
          className="absolute inset-[-6px] rounded-full border border-brand-500/30"
          style={{
            animation: 'ping-ring 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite',
            animationDelay: '5.06s'
          }}
        />
      </div>

      {/* Center Origin Dot */}
      <div className="absolute w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(224,32,32,0.6)] animate-ping" />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-brand-500 z-30" />
    </div>
  );
}

export function JourneySection({ className, milestones = DEFAULT_MILESTONES }: JourneyProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<Array<HTMLDivElement | null>>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -45% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = parseInt(id.replace('milestone-', ''), 10);
          if (!isNaN(index)) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    milestoneRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [milestones]);

  const scrollToMilestone = (index: number) => {
    const element = document.getElementById(`milestone-${index}`);
    if (element) {
      const offset = 120; // offset for sticky navigation or styling spacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <section id="journey" className={`py-24 md:py-32 bg-bg-void relative border-t border-edge-subtle overflow-hidden ${className ?? ''}`}>
      {/* Background glowing rings */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[40%] left-[60%] w-[60%] h-[60%] rounded-full bg-brand-500/10 blur-[130px]" />
        <div className="absolute top-[10%] right-[70%] w-[40%] h-[40%] rounded-full bg-warm-500/5 blur-[120px]" />
      </div>
      
      <GridPattern className="opacity-[0.06]" />

      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        
        {/* Section Label */}
        <div className="flex items-center gap-3.5 mb-14 md:mb-20 select-none">
          <span className="font-mono text-xs md:text-sm font-bold text-brand-500 tracking-widest bg-brand-500/10 px-2.5 py-1 rounded-md border border-brand-500/20">
            02
          </span>
          <span className="font-mono text-xs md:text-sm font-medium text-muted-foreground/30">/</span>
          <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Experience
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-edge-subtle/50 via-edge-subtle/10 to-transparent ml-4" />
        </div>

        {/* 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Sticky Telemetry Dashboard (4-cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit flex flex-col gap-6">
            
            {/* Header Area */}
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-4">
                The <span className="text-brand-500">Chronology.</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed font-sans max-w-md">
                A trace of system architecture, team leadership, and interactive design milestones.
              </p>
            </div>

            {/* Premium Telemetry Console */}
            <div className="border border-edge-subtle bg-bg-surface/20 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-muted-foreground/20 group-hover:border-brand-500/40 transition-colors duration-500" />
              <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-muted-foreground/20 group-hover:border-brand-500/40 transition-colors duration-500" />
              <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-muted-foreground/20 group-hover:border-brand-500/40 transition-colors duration-500" />
              <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-muted-foreground/20 group-hover:border-brand-500/40 transition-colors duration-500" />
              
              <div className="flex flex-col gap-5">
                {/* Status Bar */}
                <div className="flex justify-between items-center border-b border-edge-subtle/30 pb-3.5 text-[10px] font-mono text-muted-foreground/50">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SYSTEM ACTIVE
                  </div>
                  <div>LOC: 37.7749° N</div>
                </div>

                {/* SVG Radar */}
                <TelemetryRadar />

                {/* Phase Selection Tabs */}
                <div className="flex flex-col gap-2.5 mt-2">
                  {milestones.map((milestone, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToMilestone(index)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border font-mono text-xs text-left transition-all duration-300 ${
                        activeIndex === index
                          ? 'border-brand-500/30 bg-brand-500/5 text-brand-400 font-bold shadow-[0_0_15px_rgba(224,32,32,0.06)]'
                          : 'border-edge-subtle/40 hover:border-edge-subtle bg-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] ${activeIndex === index ? 'text-brand-500' : 'text-muted-foreground/30'}`}>
                          0{index + 1}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-semibold tracking-wide truncate max-w-[150px] md:max-w-[200px]">{milestone.role}</span>
                          <span className="text-[10px] font-normal text-muted-foreground/60">{milestone.year}</span>
                        </div>
                      </div>
                      <ChevronRight className={`size-3.5 transition-transform duration-300 ${activeIndex === index ? 'translate-x-0.5 text-brand-500' : 'text-muted-foreground/30'}`} />
                    </button>
                  ))}
                </div>

                {/* Counters Panel */}
                <div className="grid grid-cols-3 gap-3 border-t border-edge-subtle/30 pt-4 font-mono text-center">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-foreground">5+</span>
                    <span className="text-[9px] text-muted-foreground/60 uppercase">Yrs Code</span>
                  </div>
                  <div className="flex flex-col border-x border-edge-subtle/30">
                    <span className="text-lg font-bold text-foreground">3</span>
                    <span className="text-[9px] text-muted-foreground/60 uppercase">Companies</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-foreground">20+</span>
                    <span className="text-[9px] text-muted-foreground/60 uppercase">Builds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline Cards (8-cols) */}
          <div ref={containerRef} className="lg:col-span-8 relative">
            
            {/* Scroll Animated Connector Line */}
            <div className="absolute left-3 md:left-8 top-3 bottom-3 w-[2px] bg-edge-subtle/40 pointer-events-none z-0">
              <motion.div
                style={{ scaleY }}
                className="w-full h-full bg-gradient-to-b from-brand-500 via-warm-500 to-brand-500 origin-top shadow-[0_0_12px_rgba(224,32,32,0.4)]"
              />
            </div>

            {/* Milestones Loop */}
            <div className="space-y-12 md:space-y-16 pl-10 md:pl-20 relative z-10">
              {milestones.map((milestone, index) => {
                const isRich = 'highlights' in milestone || 'metrics' in milestone;
                const highlights = (milestone as any).highlights ?? [milestone.description];
                const metrics = (milestone as any).metrics ?? [];
                const tags = (milestone as any).tags ?? [];
                const location = (milestone as any).location ?? '';
                const isActive = activeIndex === index;

                return (
                  <div
                    key={index}
                    id={`milestone-${index}`}
                    ref={(el) => {
                      milestoneRefs.current[index] = el;
                    }}
                    className="relative scroll-mt-28 group"
                  >
                    {/* Concentric Circle Node */}
                    <div className="absolute -left-[45px] md:-left-[73px] top-4 select-none pointer-events-none flex items-center justify-center size-9 md:size-[52px]">
                      {/* Outer spinning dash ring when active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.svg
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, rotate: 360 }}
                            exit={{ scale: 0.6, opacity: 0 }}
                            transition={{ rotate: { duration: 8, ease: 'linear', repeat: Infinity }, default: { duration: 0.3 } }}
                            className="absolute size-9 md:size-[48px] text-brand-500/40"
                            viewBox="0 0 100 100"
                          >
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="10 8" />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                      
                      {/* Ambient Halo */}
                      <div className={`absolute rounded-full transition-all duration-500 ${
                        isActive 
                          ? 'size-6 md:size-8 bg-brand-500/20 shadow-[0_0_15px_rgba(224,32,32,0.5)] scale-110' 
                          : 'size-4 md:size-6 bg-transparent group-hover:bg-brand-500/10'
                      }`} />
                      
                      {/* Inner Dot Core */}
                      <div className={`absolute rounded-full transition-all duration-500 ${
                        isActive 
                          ? 'size-2.5 md:size-3.5 bg-brand-500' 
                          : 'size-2 md:size-3 bg-edge-subtle border-2 border-muted-foreground/30 group-hover:border-brand-500/50 group-hover:bg-bg-void'
                      }`} />
                    </div>

                    {/* Timeline Milestone Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                      className={`border p-6 md:p-8 rounded-[2rem] bg-bg-surface/30 backdrop-blur-md shadow-2xl relative overflow-hidden transition-all duration-500 group/card ${
                        isActive 
                          ? 'border-brand-500/30 shadow-[0_0_35px_rgba(224,32,32,0.05)] bg-bg-surface/40' 
                          : 'border-edge-subtle/40 hover:border-brand-500/20 hover:bg-bg-surface/35'
                      }`}
                    >
                      {/* Micro-glow highlight gradient in card background */}
                      <div className={`absolute inset-0 bg-radial from-brand-500/5 via-transparent to-transparent pointer-events-none transition-opacity duration-700 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover/card:opacity-100'
                      }`} />

                      {/* Corner Tech Brackets on Card */}
                      <div className="absolute top-4 right-4 text-[9px] font-mono text-muted-foreground/20 group-hover/card:text-brand-500/40 transition-colors duration-500 select-none">
                        [SYS-0{index + 1}]
                      </div>

                      {/* Header details: Role / Year / Company */}
                      <div className="flex flex-col gap-1.5 mb-5 relative z-10">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover/card:text-brand-400 transition-colors duration-300">
                            {milestone.title}
                          </h3>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full font-mono border transition-all duration-300 ${
                            isActive
                              ? 'text-brand-400 bg-brand-500/10 border-brand-500/20'
                              : 'text-warm-500 bg-warm-500/5 border-warm-500/10 group-hover/card:border-warm-500/20'
                          }`}>
                            {milestone.year}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-medium text-brand-500">
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="size-3.5 text-brand-500/60" />
                            {milestone.role}
                          </div>
                          {location && (
                            <div className="flex items-center gap-1.5 text-muted-foreground/60 font-mono text-[11px] md:text-xs">
                              <MapPin className="size-3 text-muted-foreground/40" />
                              {location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Rich Metrics Blocks */}
                      {isRich && metrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 relative z-10">
                          {metrics.map((metric: any, mIndex: number) => (
                            <div
                              key={mIndex}
                              className="border border-edge-subtle/50 bg-bg-void/40 px-3.5 py-2.5 rounded-2xl flex flex-col items-center justify-center text-center group/metric transition-all duration-300 hover:border-brand-500/20 hover:bg-bg-void/60"
                            >
                              <span className="text-[9px] md:text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider mb-1 truncate w-full">
                                {metric.label}
                              </span>
                              <span className="text-base md:text-xl font-bold font-heading text-brand-500 tracking-tight">
                                {metric.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Core Highlights List */}
                      <div className="space-y-3 mb-6 relative z-10">
                        {highlights.map((highlight: string, hIndex: number) => (
                          <div key={hIndex} className="flex items-start gap-2.5 text-sm md:text-base text-muted-foreground leading-relaxed">
                            <span className="text-brand-500/60 font-mono mt-1 text-[11px] select-none">{`>`}</span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      {isRich && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-edge-subtle/30 relative z-10 select-none">
                          {tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 font-mono text-[10px] md:text-xs rounded-lg border border-edge-subtle/60 bg-bg-void/20 text-muted-foreground/80 hover:border-brand-500/20 hover:bg-brand-500/5 hover:text-brand-400 hover:shadow-[0_0_12px_rgba(224,32,32,0.05)] transition-all duration-300 cursor-default"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                    </motion.div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
