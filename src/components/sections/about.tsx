"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  m,
  useScroll,
  useTransform,
  LazyMotion,
  domAnimation,
} from "motion/react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { GitHubStatsCard } from "@/components/sections/github-stats";
import { SkillsMarquee } from "@/components/sections/skills-marquee";
import ProfileImg from "@/assets/imgs/profile.png";
import type { GitHubStats } from "@/lib/github";
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const letters = Array.from(text);
  return (
    <m.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.04,
          },
        },
      }}
    >
      {letters.map((char, index) => (
        <m.span
          key={index}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.01 }}
        >
          {char}
        </m.span>
      ))}
    </m.span>
  );
}

export interface AboutSectionProps {
  readonly className?: string;
  readonly stats: GitHubStats;
}

export function AboutSection({ className, stats }: AboutSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
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
        type: "spring" as const,
        stiffness: 70,
        damping: 20,
      },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={containerRef}
        className={`py-24 md:py-32 relative bg-bg-base overflow-hidden ${className ?? ""}`}
      >
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-500/20 blur-[140px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-warm-500/10 blur-[140px]" />
        </div>
        <GridPattern className="opacity-10 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_20%,transparent_100%)] z-0" />

        <m.div
          className="container mx-auto px-6 md:px-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Label */}
          <m.div
            variants={itemVariants}
            className="flex items-center gap-3.5 mb-10 md:mb-14 select-none"
          >
            <span className="font-mono text-xs md:text-sm font-bold text-brand-500 tracking-widest bg-brand-500/10 px-2.5 py-1 rounded-md border border-brand-500/20">
              01
            </span>
            <span className="font-mono text-xs md:text-sm font-medium text-muted-foreground/30">
              /
            </span>
            <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">
              About
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-edge-subtle/50 via-edge-subtle/10 to-transparent ml-4" />
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Header Typography - Spans 8 cols */}
            <m.div
              variants={itemVariants}
              className="md:col-span-8 flex flex-col justify-center border border-edge-subtle bg-bg-surface/30 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group shadow-2xl"
            >
              {/* Inner glow on hover */}
              <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[0.85] uppercase mb-8 relative z-10">
                Engineering{" "}
                <span className="text-muted-foreground block">The Unseen.</span>
                <span className="block mt-4 md:mt-2">
                  Designing{" "}
                  <span className="text-brand-500">The Unforgettable.</span>
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-muted-foreground font-sans leading-relaxed max-w-2xl font-light relative z-10">
                I build digital experiences with pixel-perfect precision and
                uncompromising performance. I don&apos;t just write code; I
                craft interfaces that feel alive.
              </p>
            </m.div>

            {/* Image/Avatar - Spans 4 cols */}
            <m.div
              variants={itemVariants}
              className="md:col-span-4 relative group rounded-[2.5rem] overflow-hidden border border-edge-subtle h-[400px] md:h-auto shadow-2xl bg-bg-surface"
            >
              <div className="absolute inset-0 bg-brand-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
              <m.div
                style={{ y: y1 }}
                className="w-full h-[130%] -top-[15%] relative"
              >
                <Image
                  src={ProfileImg}
                  alt="Joren"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-[1.03] group-hover:scale-100 pointer-events-none select-none"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                  draggable={false}
                />
              </m.div>
            </m.div>

            {/* Bento Box: Stats/Details - Spans 4 cols */}
            <m.div
              variants={itemVariants}
              className="md:col-span-4 rounded-[2.5rem] border border-edge-subtle bg-bg-surface/30 backdrop-blur-md flex flex-col justify-start relative group shadow-2xl overflow-hidden min-h-[460px]"
            >
              {/* Background glowing orb for depth */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-500/10 rounded-full blur-[60px] group-hover:bg-brand-500/20 transition-colors duration-700 pointer-events-none" />

              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-edge-subtle/30 px-6 py-4 bg-bg-surface/10 select-none relative z-10">
                <div className="flex items-center gap-1.5 group/dots">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center text-[7px] text-[#4c0002] font-semibold cursor-pointer relative">
                    <span className="absolute opacity-0 group-hover/dots:opacity-100 transition-opacity duration-150 select-none">
                      ×
                    </span>
                  </span>
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center text-[7px] text-[#5c3e00] font-semibold cursor-pointer relative">
                    <span className="absolute opacity-0 group-hover/dots:opacity-100 transition-opacity duration-150 select-none">
                      −
                    </span>
                  </span>
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center text-[7px] text-[#006504] font-semibold cursor-pointer relative">
                    <span className="absolute opacity-0 group-hover/dots:opacity-100 transition-opacity duration-150 select-none">
                      +
                    </span>
                  </span>
                </div>
                <div className="font-mono text-xs text-muted-foreground/60 flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 text-muted-foreground/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  expertise.ts
                </div>
                <div className="w-12"></div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 md:p-8 font-mono text-xs md:text-sm text-left flex-1 flex flex-col gap-5 relative z-10">
                {/* Command 1: cat expertise.ts */}
                <div className="space-y-2">
                  <div className="flex items-center flex-wrap font-mono">
                    <span className="text-emerald-400 font-semibold">
                      joren
                    </span>
                    <span className="text-zinc-500">@</span>
                    <span className="text-brand-400">portfolio</span>
                    <span className="text-zinc-500">:</span>
                    <span className="text-blue-400">~/expertise</span>
                    <span className="text-zinc-500">$</span>
                    <span className="text-foreground font-medium ml-2">
                      <TypewriterText text="cat expertise.ts" delay={0.2} />
                    </span>
                  </div>

                  {/* Output 1: TypeSafe code block */}
                  <m.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 0.4, ease: "easeOut" }}
                    className="pl-4 border-l-2 border-brand-500/20 text-muted-foreground/80 space-y-1 my-1"
                  >
                    <div>
                      <span className="text-purple-400 font-semibold">
                        const
                      </span>{" "}
                      <span className="text-blue-400">expertise</span>{" "}
                      <span className="text-purple-400">=</span>{" "}
                      <span className="text-yellow-400">{"{"}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-red-400">title</span>
                      <span className="text-muted-foreground/60">:</span>{" "}
                      <span className="text-emerald-400">
                        &ldquo;Frontend Architecture&rdquo;
                      </span>
                      <span className="text-muted-foreground/60">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-red-400">focus</span>
                      <span className="text-muted-foreground/60">:</span>{" "}
                      <span className="text-emerald-400">
                        &ldquo;component-driven systems&rdquo;
                      </span>
                      <span className="text-muted-foreground/60">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-red-400">obsessesOver</span>
                      <span className="text-muted-foreground/60">:</span>{" "}
                      <span className="text-purple-400">[</span>
                      <span className="text-emerald-400">
                        &ldquo;type-safety&rdquo;
                      </span>
                      <span className="text-muted-foreground/60">,</span>{" "}
                      <span className="text-emerald-400">
                        &ldquo;perf-budgets&rdquo;
                      </span>
                      <span className="text-muted-foreground/60">,</span>{" "}
                      <span className="text-emerald-400">
                        &ldquo;fluid-motion&rdquo;
                      </span>
                      <span className="text-purple-400">]</span>
                    </div>
                    <div>
                      <span className="text-yellow-400">{"}"}</span>
                      <span className="text-muted-foreground/60">;</span>
                    </div>
                  </m.div>
                </div>

                {/* Command 2: list arsenal */}
                <div className="space-y-3 pt-1">
                  <m.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 }}
                    className="flex items-center flex-wrap font-mono"
                  >
                    <span className="text-emerald-400 font-semibold">
                      joren
                    </span>
                    <span className="text-zinc-500">@</span>
                    <span className="text-brand-400">portfolio</span>
                    <span className="text-zinc-500">:</span>
                    <span className="text-blue-400">~/expertise</span>
                    <span className="text-zinc-500">$</span>
                    <span className="text-foreground font-medium ml-2">
                      <TypewriterText text="npx list-arsenal" delay={1.6} />
                    </span>
                  </m.div>

                  {/* Output 2: Badge pills */}
                  <m.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.3, duration: 0.4, ease: "easeOut" }}
                    className="pl-4 flex flex-wrap gap-2.5"
                  >
                    {[
                      "Next.js",
                      "TypeScript",
                      "Tailwind",
                      "Motion",
                      "React 19",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 font-mono text-[10px] md:text-xs rounded border border-brand-500/20 bg-brand-500/5 text-brand-400 hover:bg-brand-500/10 hover:border-brand-500/40 hover:text-brand-300 hover:shadow-[0_0_12px_rgba(224,32,32,0.1)] transition-all duration-300 cursor-default select-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </m.div>
                </div>

                {/* Blinking prompt */}
                <m.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.8 }}
                  className="flex items-center pt-1 mt-auto font-mono"
                >
                  <span className="text-emerald-400 font-semibold">joren</span>
                  <span className="text-zinc-500">@</span>
                  <span className="text-brand-400">portfolio</span>
                  <span className="text-zinc-500">:</span>
                  <span className="text-blue-400">~/expertise</span>
                  <span className="text-zinc-500">$</span>
                  <span className="w-1.5 h-3.5 bg-brand-500 animate-pulse inline-block ml-2" />
                </m.div>
              </div>
            </m.div>

            {/* Bento Box: Narrative - Spans 8 cols */}
            <m.div
              variants={itemVariants}
              className="md:col-span-8 rounded-[2.5rem] border border-edge-subtle bg-bg-surface/30 backdrop-blur-md p-8 md:p-12 relative overflow-hidden group flex items-center shadow-2xl"
            >
              <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] group-hover:bg-brand-500/20 transition-colors duration-700 pointer-events-none" />
              <div className="relative z-10 space-y-6 text-lg md:text-xl text-muted-foreground font-sans leading-relaxed">
                <p>
                  My journey began with an obsession for visual aesthetics,
                  which rapidly evolved into a deep passion for the engineering
                  that brings those designs to life.
                </p>
                <p>
                  Today, my focus is strictly on the React ecosystem. I
                  specialize in weaving together robust TypeScript
                  architectures, scalable styling systems, and complex motion
                  design to create products that transcend the ordinary web.
                </p>
                <p className="text-foreground font-medium">
                  For me, a successful project isn&apos;t just one that
                  works&mdash;it&apos;s one that loads instantly, scales
                  gracefully, and leaves a profound impression on the user.
                </p>
              </div>
            </m.div>

            {/* Infinite Skills Marquee - Spans 12 cols */}
            <m.div
              variants={itemVariants}
              className="col-span-1 md:col-span-12 mt-4 md:mt-4"
            >
              <SkillsMarquee />
            </m.div>

            {/* GitHub Stats - Spans 12 cols, not bento */}
            <m.div
              variants={itemVariants}
              className="col-span-1 md:col-span-12 mt-4 md:mt-4"
            >
              <GitHubStatsCard stats={stats} />
            </m.div>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
