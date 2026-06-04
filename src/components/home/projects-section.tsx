import React from 'react';
import { Button } from '@/components/ui/button';

interface Project {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly span: string;
  readonly link?: string;
}

const PROJECTS: ReadonlyArray<Project> = [
  {
    id: 'proj-1',
    title: 'E-Commerce Platform Reimagined',
    category: 'Full-stack Next.js',
    span: 'md:col-span-2 md:row-span-2',
    link: '#',
  },
  {
    id: 'proj-2',
    title: 'Fintech Dashboard UI',
    category: 'Design System',
    span: 'md:col-span-1 md:row-span-1',
    link: '#',
  },
  {
    id: 'proj-3',
    title: 'AI Prompt Optimizer',
    category: 'Web Tool',
    span: 'md:col-span-1 md:row-span-1',
    link: '#',
  },
] as const;

export function ProjectsSection() {
  return (
    <section id="projects" className="py-32 bg-bg-void relative border-t border-edge-subtle">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Selected Work
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              A collection of projects showcasing my focus on performance, accessibility, and high-quality design execution.
            </p>
          </div>
          <Button variant="outline" className="border-edge-default hover:bg-bg-elevated w-fit">
            View All Projects
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          {PROJECTS.map((project) => (
            <div 
              key={project.id} 
              className={`group relative overflow-hidden rounded-3xl bg-bg-surface border border-edge-subtle flex flex-col justify-end p-8 transition-transform duration-500 hover:-translate-y-2 ${project.span}`}
            >
              {/* Image Placeholder (Mocked with gradient) */}
              <div className="absolute inset-0 bg-gradient-to-br from-bg-surface via-bg-elevated to-bg-surface z-0 opacity-50" />
              
              {/* Overlay Gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-bg-void/40 to-transparent z-10 opacity-80" />
              
              <div className="relative z-20 mt-auto transform transition-transform duration-300 group-hover:translate-x-2">
                <p className="text-brand-500 font-medium mb-2 text-sm uppercase tracking-wider">
                  {project.category}
                </p>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
