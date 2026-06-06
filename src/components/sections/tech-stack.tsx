import React from 'react';
import { GridPattern } from '@/components/ui/grid-pattern';

export interface TechCategory {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly span: string; // Tailwind grid column span classes
  readonly tools: ReadonlyArray<string>;
}

export interface TechStackProps {
  readonly className?: string;
  readonly categories?: ReadonlyArray<TechCategory>;
}

const DEFAULT_CATEGORIES: ReadonlyArray<TechCategory> = [
  {
    id: 'frontend',
    title: 'Frontend Architecture',
    description: 'Building robust, interactive, and accessible user interfaces.',
    span: 'md:col-span-2 md:row-span-2',
    tools: ['React', 'Next.js v16', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Zustand'],
  },
  {
    id: 'backend',
    title: 'Backend & Data',
    description: 'Structuring data and bridging the gap to the server.',
    span: 'md:col-span-1 md:row-span-1',
    tools: ['Node.js', 'PostgreSQL', 'Prisma', 'REST APIs'],
  },
  {
    id: 'tooling',
    title: 'DevOps & Tooling',
    description: 'Ensuring smooth delivery and code quality.',
    span: 'md:col-span-1 md:row-span-1',
    tools: ['Git', 'Vercel', 'Docker', 'ESLint/Prettier'],
  },
] as const;

export function TechStackSection({ className, categories = DEFAULT_CATEGORIES }: TechStackProps) {
  return (
    <section id="tech-stack" className={`py-32 bg-bg-base relative overflow-hidden ${className ?? ''}`}>
      <GridPattern className="opacity-10 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_20%,transparent_100%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Tech Stack
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            The tools and technologies I use to bring ideas to life. I focus on the React ecosystem while maintaining a strong grasp of fundamentals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className={`group relative overflow-hidden rounded-3xl border border-edge-default bg-bg-surface p-8 transition-colors hover:border-edge-strong ${category.span}`}
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-8 max-w-sm">
                  {category.description}
                </p>
                
                <div className="mt-auto flex flex-wrap gap-2">
                  {category.tools.map((tool) => (
                    <span 
                      key={tool}
                      className="px-3 py-1.5 bg-bg-elevated border border-edge-subtle rounded-md text-sm font-medium text-foreground transition-colors group-hover:border-edge-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
