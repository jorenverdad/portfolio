"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { GridPattern } from '@/components/ui/grid-pattern';
import { ArrowUpRight } from 'lucide-react';

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly image: string;
  readonly yOffset: number;
  readonly link?: string;
}

export interface ProjectsProps {
  readonly className?: string;
  readonly projects?: ReadonlyArray<Project>;
}

const DEFAULT_PROJECTS: ReadonlyArray<Project> = [
  {
    id: 'proj-1',
    title: 'E-Commerce Reimagined',
    category: 'Full-stack Next.js',
    image: 'https://images.unsplash.com/photo-1481481300226-a1926b010f37?q=80&w=2940&auto=format&fit=crop',
    yOffset: -16,
    link: '#',
  },
  {
    id: 'proj-2',
    title: 'Fintech Dashboard',
    category: 'Design System',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
    yOffset: 24,
    link: '#',
  },
  {
    id: 'proj-3',
    title: 'AI Prompt Optimizer',
    category: 'Web Tool',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2865&auto=format&fit=crop',
    yOffset: -24,
    link: '#',
  },
  {
    id: 'proj-4',
    title: 'Creative Agency Site',
    category: 'Interactive',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop',
    yOffset: 16,
    link: '#',
  },
  {
    id: 'proj-5',
    title: 'Luxury Brand Identity',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2940&auto=format&fit=crop',
    yOffset: -12,
    link: '#',
  },
] as const;

export function ProjectsSection({ className, projects = DEFAULT_PROJECTS }: ProjectsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className={`py-32 bg-bg-void relative border-t border-edge-subtle overflow-hidden ${className ?? ''}`}>
      <GridPattern className="opacity-[0.05]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              Selected Work
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed"
            >
              A collection of projects showcasing my focus on performance, accessibility, and high-quality design execution.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button variant="outline" className="rounded-full px-8 border-edge-default hover:bg-bg-elevated hover:text-foreground transition-all duration-300 group">
              View All Projects
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </motion.div>
        </div>

        {/* Accordion Layout */}
        <div 
          className="flex flex-col md:flex-row w-full h-[800px] md:h-[600px] gap-2 md:gap-3 items-center justify-center"
          onMouseLeave={() => setHoveredId(null)}
        >
          {projects.map((project, index) => {
            const isActive = hoveredId === project.id;
            
            return (
              <motion.div
                key={project.id}
                onMouseEnter={() => setHoveredId(project.id)}
                onFocus={() => setHoveredId(project.id)}
                layout
                initial={false}
                animate={{ 
                  flex: isActive ? 6 : 1,
                  y: isActive ? 0 : project.yOffset,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 30,
                  mass: 0.8
                }}
                className={`
                  relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer group bg-bg-surface min-w-0 min-h-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500
                  ${isActive ? 'h-full w-full' : 'w-[90%] md:w-full h-full md:h-[85%]'}
                `}
                tabIndex={0}
              >
                {/* Background Image */}
                <motion.div
                  className="absolute inset-0 w-full h-full origin-center"
                  animate={{
                    scale: isActive ? 1.0 : 1.2,
                    filter: isActive ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.4)'
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img 
                    src={project.image} 
                    alt=""
                    role="presentation"
                    className="object-cover w-full h-full"
                  />
                </motion.div>

                {/* Overlays */}
                <motion.div 
                  initial={false}
                  animate={{ opacity: isActive ? 0.8 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" 
                />
                
                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
                  {/* Expanded Content */}
                  <motion.div
                    animate={{ 
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 20,
                      filter: isActive ? 'blur(0px)' : 'blur(4px)'
                    }}
                    transition={{ 
                      duration: 0.4,
                      delay: isActive ? 0.1 : 0
                    }}
                    className={`flex flex-col gap-3 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md border border-brand-500/30 whitespace-nowrap">
                        {project.category}
                      </span>
                      <span className="text-white/50 text-sm font-mono whitespace-nowrap">
                        0{index + 1}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight line-clamp-2">
                      {project.title}
                    </h3>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 overflow-hidden"
                        >
                          <Button render={<a href={project.link} />} className="bg-white text-black hover:bg-white/90 rounded-full px-6">
                            Explore Project
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
