'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GridPattern } from '@/components/ui/grid-pattern';
import ProfileImg from '@/assets/imgs/profile.jpg';

export interface AboutSectionProps {
  readonly className?: string;
}

export function AboutSection({ className }: AboutSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 20,
      },
    },
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      className={`py-24 md:py-32 relative bg-bg-base overflow-hidden ${className ?? ''}`}
    >
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-500/20 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-warm-500/10 blur-[140px]" />
      </div>
      <GridPattern className="opacity-10 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_20%,transparent_100%)] z-0" />

      <motion.div 
        className="container mx-auto px-6 md:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          
          {/* Header Typography - Spans 8 cols */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-8 flex flex-col justify-center border border-edge-subtle bg-bg-surface/30 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group shadow-2xl"
          >
            {/* Inner glow on hover */}
            <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[0.85] uppercase mb-8 relative z-10">
              Engineering <span className="text-muted-foreground block">The Unseen.</span>
              <span className="block mt-4 md:mt-2">Designing <span className="text-brand-500">The Unforgettable.</span></span>
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground font-sans leading-relaxed max-w-2xl font-light relative z-10">
              Hi, I'm Joren. I build digital experiences with pixel-perfect precision and uncompromising performance. I don't just write code; I craft interfaces that feel alive.
            </p>
          </motion.div>

          {/* Image/Avatar - Spans 4 cols */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-4 relative group rounded-[2.5rem] overflow-hidden border border-edge-subtle h-[400px] md:h-auto shadow-2xl bg-bg-surface"
          >
            <div className="absolute inset-0 bg-brand-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
            <motion.div style={{ y: y1 }} className="w-full h-[130%] -top-[15%] relative">
              <Image 
                src={ProfileImg} 
                alt="Joren" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-[1.03] group-hover:scale-100"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Bento Box: Stats/Details - Spans 4 cols */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-4 rounded-[2.5rem] border border-edge-subtle bg-bg-surface/30 backdrop-blur-md p-8 md:p-10 flex flex-col justify-between relative group shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-warm-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Background glowing orb for depth */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-500/10 rounded-full blur-[60px] group-hover:bg-brand-500/20 transition-colors duration-700 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                  </span>
                  Core Expertise
                </p>
                <div className="p-2 rounded-full bg-bg-base/50 border border-edge-subtle group-hover:border-brand-500/30 group-hover:bg-brand-500/10 transition-all duration-500">
                  <svg className="w-4 h-4 text-muted-foreground group-hover:text-brand-500 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-foreground tracking-tight mb-4">Frontend Architecture</h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed font-light mb-6 group-hover:text-foreground/90 transition-colors duration-300">
                Building resilient, component-driven systems. I obsess over type safety, performance budgets, and creating fluid experiences that scale elegantly.
              </p>

              {/* Abstract Component Tree Visualization */}
              <div className="flex flex-col gap-2.5 opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-1">
                <div className="h-1.5 w-10 bg-brand-500/80 rounded-full" />
                <div className="flex gap-2 ml-4">
                   <div className="h-1.5 w-16 bg-warm-500/80 rounded-full" />
                   <div className="h-1.5 w-8 bg-brand-500/40 rounded-full" />
                </div>
                <div className="flex gap-2 ml-8">
                   <div className="h-1.5 w-12 bg-muted-foreground/40 rounded-full group-hover:bg-muted-foreground/60 transition-colors" />
                   <div className="h-1.5 w-6 bg-warm-500/40 rounded-full" />
                   <div className="h-1.5 w-4 bg-brand-500/40 rounded-full" />
                </div>
                <div className="flex gap-2 ml-4">
                   <div className="h-1.5 w-10 bg-muted-foreground/30 rounded-full group-hover:bg-muted-foreground/50 transition-colors" />
                </div>
              </div>
            </div>

            <div className="mt-10 relative z-10">
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                Tech Arsenal
                <span className="flex-1 h-px bg-edge-subtle group-hover:bg-edge-subtle/80 transition-colors"></span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React 19'].map((tech) => (
                  <span key={tech} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border border-edge-subtle bg-bg-base/90 text-foreground hover:bg-brand-500 hover:text-white transition-colors duration-300 cursor-default shadow-sm hover:shadow-brand-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bento Box: Narrative - Spans 8 cols */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-8 rounded-[2.5rem] border border-edge-subtle bg-bg-surface/30 backdrop-blur-md p-8 md:p-12 relative overflow-hidden group flex items-center shadow-2xl"
          >
             <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] group-hover:bg-brand-500/20 transition-colors duration-700 pointer-events-none" />
             <div className="relative z-10 space-y-6 text-lg md:text-xl text-muted-foreground font-sans leading-relaxed">
              <p>
                My journey began with an obsession for visual aesthetics, which rapidly evolved into a deep passion for the engineering that brings those designs to life. 
              </p>
              <p>
                Today, my focus is strictly on the React ecosystem. I specialize in weaving together robust TypeScript architectures, scalable styling systems, and complex motion design to create products that transcend the ordinary web.
              </p>
              <p className="text-foreground font-medium">
                For me, a successful project isn't just one that works—it's one that loads instantly, scales gracefully, and leaves a profound impression on the user.
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
