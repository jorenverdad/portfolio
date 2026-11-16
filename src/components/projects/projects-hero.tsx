"use client";

import React from "react";
import { GridPattern } from "@/components/ui/grid-pattern";
import {
  m,
  LazyMotion,
  domMax,
  MotionConfig,
  type Variants,
} from "motion/react";
import { FolderOpenDot, Layers, Cpu, Code2 } from "lucide-react";

export interface ProjectsHeroProps {
  readonly totalProjects: number;
  readonly className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ProjectsHero({
  totalProjects,
  className = "",
}: ProjectsHeroProps) {
  return (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        <section
          className={`relative pt-7 pb-7 sm:pt-9 sm:pb-8 md:pt-10 md:pb-8 overflow-hidden border-b border-edge-subtle/40 ${className}`}
          aria-label="Projects overview and engineering archive"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[580px] h-[240px] bg-brand-500/[0.07] dark:bg-brand-500/[0.11] rounded-full blur-[90px]" />
          </div>

          <GridPattern className="opacity-[0.035] dark:opacity-[0.05]" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl text-center flex flex-col items-center">
            <m.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center w-full"
            >
              {/* Refined Eyebrow: Archive & Catalog Badge */}
              <m.div variants={itemVariants} className="mb-3 sm:mb-3.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-500 font-mono text-[11px] sm:text-xs font-semibold tracking-wider uppercase select-none shadow-2xs hover:bg-brand-500/15 transition-colors">
                  <FolderOpenDot className="size-3 text-brand-500 shrink-0" />
                  <span>Archive & Catalog</span>
                  <span className="text-brand-500/30 font-light">•</span>
                  <span className="text-muted-foreground/70 font-normal lowercase tracking-normal">
                    2023 — Present
                  </span>
                </div>
              </m.div>

              {/* Title with clean, modern typographic balance */}
              <m.h1
                variants={itemVariants}
                className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-foreground leading-[1.12] mb-3 max-w-3xl"
              >
                Engineered Systems &{" "}
                <span className="text-brand-500">Creative Interfaces.</span>
              </m.h1>

              {/* Concise, elegant subtitle */}
              <m.p
                variants={itemVariants}
                className="font-sans text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed mb-5"
              >
                A curated index of production platforms, architecture case
                studies, and interactive tools built to solve real problems with
                clean architecture.
              </m.p>

              {/* Unified Engineering Metadata Ribbon */}
              <m.div
                variants={itemVariants}
                className="inline-flex items-center divide-x divide-edge-subtle/80 rounded-full bg-bg-surface/80 dark:bg-bg-elevated/60 border border-edge-default/80 px-4 py-1.5 shadow-2xs backdrop-blur-md text-xs font-mono select-none hover:border-brand-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 pr-4 text-muted-foreground">
                  <Layers className="size-3.5 text-brand-500 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">
                      {totalProjects}
                    </strong>{" "}
                    Documented Builds
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-4 text-muted-foreground">
                  <Cpu className="size-3.5 text-brand-500 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">
                      Full-Stack
                    </strong>{" "}
                    & Frontend
                  </span>
                </div>

                <div className="hidden md:flex items-center gap-2 pl-4 text-muted-foreground">
                  <Code2 className="size-3.5 text-brand-500 shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">
                      Next.js 16
                    </strong>{" "}
                    / TypeScript Strict
                  </span>
                </div>
              </m.div>
            </m.div>
          </div>
        </section>
      </MotionConfig>
    </LazyMotion>
  );
}
