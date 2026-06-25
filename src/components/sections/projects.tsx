"use client";

import React, { useState, useSyncExternalStore, useCallback } from "react";
import Image from "next/image";
import {
  m,
  AnimatePresence,
  LazyMotion,
  domMax,
  MotionConfig,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { WorkInProgress } from "@/components/ui/work-in-progress";

export type Project = {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly image?: string;
  readonly images?: ReadonlyArray<string>;
  readonly video?: string;
  readonly yOffset: number;
  readonly link?: string;
};

export type ProjectsProps = {
  readonly className?: string;
  readonly projects?: ReadonlyArray<Project>;
};

function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => {
    return false;
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const DEFAULT_PROJECTS: ReadonlyArray<Project> = [
  {
    id: "proj-1",
    title: "JoSan Website",
    category: "Frontend Web App",
    video:
      "/projects/JoSan - AI-Powered Content Moderation - Google Chrome.mp4",
    yOffset: -16,
    link: "#",
  },
  {
    id: "proj-2",
    title: "VzStellar Website",
    category: "Full-stack Web App",
    video: "/projects/VZ Stellar Realty - Google Chrome.mp4",
    yOffset: 24,
    link: "#",
  },
  {
    id: "proj-3",
    title: "Portfolio",
    category: "Frontend Web App",
    video: "/projects/Portfolio- Honey.mp4",
    yOffset: -24,
    link: "#",
  },
  {
    id: "proj-4",
    title: "JoSan Extension",
    category: "Chromium Web Extension",
    video: "/projects/JoSan Extension - Chromium.mp4",
    yOffset: 16,
    link: "#",
  },
  {
    id: "proj-5",
    title: "Uwu Hotel Booking",
    category: "Mobile App",
    image: "/projects/UwU.png",
    images: [
      "/projects/UwU.png",
      "/projects/UwU1.png",
      "/projects/UwU2.png",
      "/projects/UwU3.png",
      "/projects/UwU4.png",
      "/projects/UwU5.png",
    ],
    yOffset: -12,
    link: "#",
  },
] as const;

type ProjectCardProps = {
  readonly project: Project;
  readonly index: number;
  readonly isActive: boolean;
  readonly isDesktop: boolean;
  readonly onActive: (id: string) => void;
  readonly hoveredId: string | null;
  readonly isTooltipOpen: boolean;
  readonly onTooltipOpenChange: (isOpen: boolean) => void;
};

const ProjectCard = React.memo(function ProjectCard({
  project,
  index,
  isActive,
  isDesktop,
  onActive,
  hoveredId,
  isTooltipOpen,
  onTooltipOpenChange,
}: ProjectCardProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasBeenActive, setHasBeenActive] = useState(false);

  if (isActive && !hasBeenActive) {
    setHasBeenActive(true);
  }

  const handleMouseEnter = useCallback(() => {
    onActive(project.id);
  }, [project.id, onActive]);

  const handleFocus = useCallback(() => {
    onActive(project.id);
  }, [project.id, onActive]);

  const images = project.images;
  const hasMultipleImages = !!(images && images.length > 1);
  const baseImage = project.image ?? images?.[0] ?? "";

  // Reset index to 0 when the project card becomes inactive (render-phase state adjustment)
  const [prevIsActive, setPrevIsActive] = useState(isActive);
  if (isActive !== prevIsActive) {
    setPrevIsActive(isActive);
    if (!isActive) {
      setCurrentImageIndex(0);
    }
  }

  // Autoplay slideshow when active
  React.useEffect(() => {
    if (!isActive || !hasMultipleImages || !images) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive, hasMultipleImages, images]);

  const handlePrev = useCallback(() => {
    if (!images || images.length === 0) return;
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images]);

  const handleNext = useCallback(() => {
    if (!images || images.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      const playTimer = setTimeout(() => {
        video.play().catch((err) => {
          console.warn("Playback prevented or interrupted: ", err);
        });
      }, 900); //delay upon play at hover
      return () => {
        clearTimeout(playTimer);
      };
    } else {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // Safe check for video elements not fully loaded yet
      }
    }
  }, [isActive]);

  return (
    <m.div
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      layout
      layoutDependency={hoveredId}
      initial={false}
      style={{
        flex: isActive ? 6 : 1,
      }}
      animate={{
        y: isDesktop ? (isActive ? 0 : project.yOffset) : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 24,
        mass: 0.9,
      }}
      className={`
        relative rounded-2xl md:rounded-3xl cursor-pointer group bg-bg-surface min-w-0 min-h-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500
        ${isTooltipOpen ? "overflow-visible" : "overflow-hidden"}
        ${isActive ? "h-full w-full" : "w-[90%] md:w-full h-full md:h-[85%]"}
      `}
      tabIndex={0}
    >
      {/* Background Image/Video Container (Scale Animated) */}
      <m.div
        className="absolute inset-0 w-full h-full origin-center rounded-2xl md:rounded-3xl overflow-hidden"
        initial={false}
        animate={{
          scale: isActive ? 1.0 : 1.2,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            preload="metadata"
            loop
            muted
            playsInline
            className={`object-cover w-full h-full absolute inset-0 transition-[filter] duration-700 ease-out ${
              isActive
                ? "grayscale-0 brightness-100"
                : "grayscale brightness-[0.4]"
            }`}
          />
        ) : project.image || (images && images.length > 0) ? (
          <>
            {/* Grayscale Base Image */}
            <Image
              src={baseImage}
              alt=""
              role="presentation"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover grayscale brightness-[0.4]"
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
              {hasMultipleImages && images && hasBeenActive ? (
                <AnimatePresence initial={false} mode="popLayout">
                  <m.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={images[currentImageIndex] ?? baseImage}
                      alt=""
                      role="presentation"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority={currentImageIndex === 0}
                    />
                  </m.div>
                </AnimatePresence>
              ) : (
                <Image
                  src={baseImage}
                  alt=""
                  role="presentation"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              )}
            </m.div>
          </>
        ) : null}
      </m.div>

      {/* Story-style progress indicators at top */}
      {isActive && hasMultipleImages && images && (
        <div className="absolute top-4 left-4 right-4 z-30 flex gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setCurrentImageIndex(idx);
              }}
              className="h-1 flex-1 rounded-full overflow-hidden focus:outline-none pointer-events-auto"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div
                className={`h-full transition-all duration-300 ${
                  idx === currentImageIndex
                    ? "bg-white"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Floating Arrows */}
      <AnimatePresence>
        {isActive && hasMultipleImages && images && (
          <>
            <m.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 backdrop-blur-md transition-colors pointer-events-auto"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </m.button>
            <m.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 backdrop-blur-md transition-colors pointer-events-auto"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </m.button>
          </>
        )}
      </AnimatePresence>

      {/* Overlays */}
      <m.div
        initial={false}
        animate={{ opacity: isActive ? 0.8 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 rounded-2xl md:rounded-3xl"
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

          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight line-clamp-2">
            {project.title}
          </h3>

          <AnimatePresence>
            {isActive && (
              <m.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className={
                  isTooltipOpen ? "overflow-visible" : "overflow-hidden"
                }
              >
                <WorkInProgress
                  position="top"
                  featureName="Deep Dive"
                  title="Synthesizing the Case Study"
                  description="I am compiling the technical architecture, design decisions, and performance metrics for this build. The breakdown of engineering challenges and their solutions will be live shortly."
                  onOpenChange={onTooltipOpenChange}
                >
                  <Button
                    render={<a href={project.link ?? "#"} />}
                    nativeButton={false}
                    className="bg-white text-black hover:bg-white/90 rounded-full px-6"
                  >
                    Explore Project
                  </Button>
                </WorkInProgress>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      </div>
    </m.div>
  );
});

export function ProjectsSection({
  className,
  projects = DEFAULT_PROJECTS,
}: ProjectsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeTooltipId, setActiveTooltipId] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleActive = useCallback(
    (id: string) => {
      if (activeTooltipId) return;
      setHoveredId(id);
    },
    [activeTooltipId],
  );

  const handleMouseLeave = useCallback(() => {
    if (activeTooltipId) return;
    setHoveredId(null);
  }, [activeTooltipId]);

  const handleTooltipOpenChange = useCallback((id: string, isOpen: boolean) => {
    if (isOpen) {
      setActiveTooltipId(id);
      setHoveredId(id);
    } else {
      setActiveTooltipId(null);
    }
  }, []);

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
                className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-30"
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

                <WorkInProgress
                  position="bottom"
                  featureName="Project Index"
                  title="Cataloging the Archive"
                  description="I am organizing and polishing a comprehensive index of my experimental prototypes, open-source utilities, and client systems. The complete directory is currently being curated."
                >
                  <Button
                    variant="outline"
                    className="rounded-full px-8 border-edge-default hover:bg-bg-elevated hover:text-foreground transition-all duration-300 group"
                  >
                    Explore All Projects
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </WorkInProgress>
              </m.div>
            </div>

            {/* Accordion Layout */}
            <div
              className="flex flex-col md:flex-row w-full h-[520px] sm:h-[620px] md:h-[600px] gap-2 md:gap-3 items-center justify-center"
              onMouseLeave={handleMouseLeave}
            >
              {projects.map((project, index) => {
                const isActive = activeTooltipId
                  ? activeTooltipId === project.id
                  : hoveredId === project.id;
                const isTooltipOpen = activeTooltipId === project.id;

                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isActive={isActive}
                    isDesktop={isDesktop}
                    onActive={handleActive}
                    hoveredId={hoveredId}
                    isTooltipOpen={isTooltipOpen}
                    onTooltipOpenChange={(isOpen) =>
                      handleTooltipOpenChange(project.id, isOpen)
                    }
                  />
                );
              })}
            </div>
          </div>
        </section>
      </MotionConfig>
    </LazyMotion>
  );
}
