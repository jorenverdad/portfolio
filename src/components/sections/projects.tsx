"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence, LazyMotion, domMax, MotionConfig } from "motion/react";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { ArrowUpRight } from "lucide-react";

export type Project = {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly image: string;
  readonly yOffset: number;
  readonly link?: string;
};

export type ProjectsProps = {
  readonly className?: string;
  readonly projects?: ReadonlyArray<Project>;
};

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return mounted ? matches : false;
}

const DEFAULT_PROJECTS: ReadonlyArray<Project> = [
  {
    id: "proj-1",
    title: "E-Commerce Reimagined",
    category: "Full-stack Next.js",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2420&auto=format&fit=crop",
    yOffset: -16,
    link: "#",
  },
  {
    id: "proj-2",
    title: "Fintech Dashboard",
    category: "Design System",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    yOffset: 24,
    link: "#",
  },
  {
    id: "proj-3",
    title: "AI Prompt Optimizer",
    category: "Web Tool",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2865&auto=format&fit=crop",
    yOffset: -24,
    link: "#",
  },
  {
    id: "proj-4",
    title: "Creative Agency Site",
    category: "Interactive",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop",
    yOffset: 16,
    link: "#",
  },
  {
    id: "proj-5",
    title: "Luxury Brand Identity",
    category: "Branding",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2940&auto=format&fit=crop",
    yOffset: -12,
    link: "#",
  },
] as const;

export function ProjectsSection({
  className,
  projects = DEFAULT_PROJECTS,
}: ProjectsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        <section
          className={`py-32 bg-bg-void relative border-t border-edge-subtle overflow-hidden ${className ?? ""}`}
        >
          <GridPattern className="opacity-[0.05]" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="mb-16 md:mb-24">
              {/* Section Label */}
              <m.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex items-center gap-3.5 mb-10 md:mb-14 select-none"
              >
                <span className="font-mono text-xs md:text-sm font-bold text-brand-500 tracking-widest bg-brand-500/10 px-2.5 py-1 rounded-md border border-brand-500/20">
                  02
                </span>
                <span className="font-mono text-xs md:text-sm font-medium text-muted-foreground/30">
                  /
                </span>
                <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  Projects
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-edge-subtle/50 via-edge-subtle/10 to-transparent ml-4" />
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="max-w-4xl mx-auto flex flex-col items-center text-center"
              >
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                  Featured{" "}
                  <span className="text-brand-500 font-serif italic font-normal">
                    Projects.
                  </span>
                </h2>

                <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-2xl leading-relaxed mb-8">
                  Explore full-stack applications, custom design systems, and
                  interactive web tools built to solve real problems and deliver
                  clean user experiences.
                </p>

                <Button
                  variant="outline"
                  className="rounded-full px-8 border-edge-default hover:bg-bg-elevated hover:text-foreground transition-all duration-300 group"
                >
                  Explore All Projects
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </m.div>
            </div>

            {/* Accordion Layout */}
            <div
              className="flex flex-col md:flex-row w-full h-[800px] md:h-[600px] gap-2 md:gap-3 items-center justify-center"
              onMouseLeave={() => setHoveredId(null)}
            >
              {projects.map((project, index) => {
                const isActive = hoveredId === project.id;

                return (
                  <m.div
                    key={project.id}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onFocus={() => setHoveredId(project.id)}
                    layout
                    initial={false}
                    animate={{
                      flex: isActive ? 6 : 1,
                      y: isDesktop ? (isActive ? 0 : project.yOffset) : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 30,
                      mass: 0.8,
                    }}
                    className={`
                      relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer group bg-bg-surface min-w-0 min-h-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500
                      ${isActive ? "h-full w-full" : "w-[90%] md:w-full h-full md:h-[85%]"}
                    `}
                    tabIndex={0}
                  >
                    {/* Background Image Container (Scale Animated) */}
                    <m.div
                      className="absolute inset-0 w-full h-full origin-center"
                      initial={false}
                      animate={{
                        scale: isActive ? 1.0 : 1.2,
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Grayscale Base Image */}
                      <img
                        src={project.image}
                        alt=""
                        role="presentation"
                        className="absolute inset-0 object-cover w-full h-full grayscale brightness-[0.4]"
                      />
                      {/* Color Overlay Image (Opacity Animated) */}
                      <m.div
                        className="absolute inset-0 w-full h-full"
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <img
                          src={project.image}
                          alt=""
                          role="presentation"
                          className="object-cover w-full h-full"
                        />
                      </m.div>
                    </m.div>

                    {/* Overlays */}
                    <m.div
                      initial={false}
                      animate={{ opacity: isActive ? 0.8 : 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"
                    />

                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
                      {/* Expanded Content */}
                      <m.div
                        animate={{
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : 20,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: isActive ? 0.1 : 0,
                        }}
                        className={`flex flex-col gap-3 ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
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

                        <AnimatePresence mode="popLayout">
                          {isActive && (
                            <m.div
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="mt-4"
                            >
                              <Button
                                render={<a href={project.link ?? "#"} />}
                                nativeButton={false}
                                className="bg-white text-black hover:bg-white/90 rounded-full px-6"
                              >
                                Explore Project
                              </Button>
                            </m.div>
                          )}
                        </AnimatePresence>
                      </m.div>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>
        </section>
      </MotionConfig>
    </LazyMotion>
  );
}
