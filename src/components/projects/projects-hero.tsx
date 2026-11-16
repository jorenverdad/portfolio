"use client";

import React from "react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Code2, Layers, Cpu } from "lucide-react";

export interface ProjectsHeroProps {
  readonly totalProjects: number;
  readonly className?: string;
}

export function ProjectsHero({
  totalProjects,
  className = "",
}: ProjectsHeroProps) {
  return (
    <section className={`relative pt-12 pb-10 md:pt-16 md:pb-14 overflow-hidden border-b border-edge-subtle/50 ${className}`}>
      <GridPattern className="opacity-[0.06] dark:opacity-[0.08]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl text-center flex flex-col items-center">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 font-mono text-xs font-semibold tracking-wider uppercase mb-6 select-none">
          <span className="size-1.5 rounded-full bg-brand-500 animate-pulse" />
          <span>Archive & Catalog</span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08] mb-6">
          Engineered Systems &{" "}
          <span className="text-brand-500 underline decoration-brand-500/30 decoration-wavy decoration-from-font underline-offset-8">
            Creative Interfaces.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
          A comprehensive directory of full-stack platforms, client systems,
          open-source utilities, and interactive web tools built to solve real
          problems with clean architecture.
        </p>

        {/* Quick Highlights Summary Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono select-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-surface border border-edge-default text-muted-foreground">
            <Layers className="size-3.5 text-brand-500" />
            <span>
              <strong className="text-foreground">{totalProjects}</strong> Documented Builds
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-surface border border-edge-default text-muted-foreground">
            <Cpu className="size-3.5 text-brand-500" />
            <span>
              <strong className="text-foreground">Full-Stack</strong> & Frontend
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-surface border border-edge-default text-muted-foreground">
            <Code2 className="size-3.5 text-brand-500" />
            <span>
              <strong className="text-foreground">Next.js 16</strong> / TypeScript
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
