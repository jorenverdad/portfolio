"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  m,
  AnimatePresence,
  useReducedMotion,
  LazyMotion,
  domMax,
} from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowUpRight,
  FileText,
  Layers,
  Video,
  UserCheck,
  Users,
  CheckCircle2,
  FolderGit2,
  Lock,
  Database,
  Cpu,
  Server,
  Activity,
  Volume2,
  VolumeX,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/lib/projects-data";

export interface ProjectsStageViewProps {
  readonly projects: ReadonlyArray<ProjectItem>;
  readonly onOpenDetail: (project: ProjectItem) => void;
}

export function ProjectsStageView({
  projects,
  onOpenDetail,
}: ProjectsStageViewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const dockContainerRef = useRef<HTMLDivElement | null>(null);
  const dockItemRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const shouldReduceMotion = useReducedMotion();

  const updateScrollState = useCallback(() => {
    const el = dockContainerRef.current;
    if (!el) return;
    const left = el.scrollLeft > 4;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 6;
    setCanScrollLeft(left);
    setCanScrollRight(right);
  }, []);

  // Adjust activeIndex if category filter reduces projects count
  const safeIndex =
    projects.length > 0 ? Math.min(activeIndex, projects.length - 1) : 0;
  if (safeIndex !== activeIndex) {
    setActiveIndex(safeIndex);
  }

  const activeProject = projects[safeIndex];

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setCurrentSlideIndex(0);
  }, [projects.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % projects.length);
    setCurrentSlideIndex(0);
  }, [projects.length]);

  const handleSelectIndex = useCallback(
    (idx: number) => {
      setDirection(idx > activeIndex ? 1 : -1);
      setActiveIndex(idx);
      setCurrentSlideIndex(0);
    },
    [activeIndex],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Autoplay ticker
  useEffect(() => {
    if (!isAutoPlay || projects.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(timer);
  }, [isAutoPlay, projects.length, handleNext]);

  // Handle video autoplay on active project
  useEffect(() => {
    if (videoRef.current && activeProject?.video) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [activeProject?.id, activeProject?.video, isMuted]);

  // Smoothly scroll active dock item into view when index changes & update scroll hints
  useEffect(() => {
    const activeEl = dockItemRefs.current.get(safeIndex);
    if (activeEl && typeof activeEl.scrollIntoView === "function") {
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    const timer = setTimeout(updateScrollState, 350);
    return () => clearTimeout(timer);
  }, [safeIndex, updateScrollState]);

  // Monitor resize and project list updates to check if dock overflows
  useEffect(() => {
    updateScrollState();
    const handleResize = () => updateScrollState();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [projects.length, updateScrollState]);

  if (!activeProject || projects.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl bg-bg-surface/50 border border-edge-subtle my-6">
        <p className="text-muted-foreground font-mono text-sm">
          No projects available matching this filter.
        </p>
      </div>
    );
  }

  const prevProject =
    projects.length > 1
      ? projects[(safeIndex - 1 + projects.length) % projects.length]
      : undefined;
  const nextProject =
    projects.length > 1
      ? projects[(safeIndex + 1) % projects.length]
      : undefined;

  const displayImage =
    activeProject.images && activeProject.images.length > 0
      ? activeProject.images[currentSlideIndex]
      : activeProject.image;

  // Clean URL slug representation
  const cleanUrl = activeProject.liveUrl
    ? activeProject.liveUrl.replace(/^https?:\/\//, "")
    : `jorenverdad.dev/projects/${activeProject.id}`;

  return (
    <LazyMotion features={domMax}>
      <div className="relative flex flex-col items-center w-full max-w-[1560px] mx-auto select-none my-1">
        {/* Subtle Ambient Radial Backlight */}
        <div
          className="absolute inset-x-0 top-16 h-[440px] xl:h-[480px] 2xl:h-[520px] rounded-full opacity-35 dark:opacity-20 blur-3xl pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--color-brand-500),transparent_70%)] transition-all duration-700"
          aria-hidden="true"
        />

        {/* 3D Spatial Stage Showcase Viewport */}
        <div
          className="relative w-full flex items-center justify-center gap-2.5 xl:gap-4 2xl:gap-5 py-3"
          style={{ perspective: 1200 }}
        >
          {/* Background Left Interactive Deck Card (Previous Project) */}
          {projects.length > 1 && prevProject && (
            <div
              onClick={handlePrev}
              role="button"
              tabIndex={0}
              aria-label={`Switch to previous project: ${prevProject.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handlePrev();
                }
              }}
              style={{
                transformOrigin: "right center",
              }}
              className="hidden lg:flex flex-col justify-between p-3.5 xl:p-4 2xl:p-5 rounded-3xl bg-bg-surface/90 hover:bg-bg-elevated border border-edge-default hover:border-brand-500 shadow-lg hover:shadow-2xl hover:shadow-brand-500/20 transition-all duration-300 cursor-pointer w-[160px] xl:w-[195px] 2xl:w-[235px] h-[410px] xl:h-[460px] 2xl:h-[490px] shrink-0 scale-95 -rotate-y-8 hover:scale-100 hover:rotate-y-0 opacity-85 hover:opacity-100 z-10 overflow-hidden group select-none backdrop-blur-xl ring-1 ring-white/5"
            >
              {/* Header pill & Year */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-500 text-[10px] xl:text-[11px] 2xl:text-xs font-mono font-bold tracking-wider group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  <ChevronLeft className="size-3 xl:size-3.5 2xl:size-4 transition-transform group-hover:-translate-x-0.5" />
                  PREV
                </span>
                <span className="text-[10px] 2xl:text-xs font-mono text-muted-foreground/80">
                  {prevProject.year}
                </span>
              </div>

              {/* Thumbnail Image Preview */}
              <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-bg-void/90 border border-edge-subtle my-auto shadow-inner">
                {prevProject.image ? (
                  <Image
                    src={prevProject.image}
                    alt=""
                    fill
                    sizes="(max-width: 1280px) 180px, (max-width: 1536px) 220px, 280px"
                    className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="size-full flex items-center justify-center text-brand-500">
                    <Layers className="size-7" />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-bg-surface/90 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-xs text-[9px] 2xl:text-[10px] font-mono text-white/90 uppercase tracking-wider">
                  {prevProject.category}
                </span>
              </div>

              {/* Title & Role Info */}
              <div className="space-y-1">
                <h4 className="font-heading text-xs xl:text-sm 2xl:text-base font-bold text-foreground truncate group-hover:text-brand-500 transition-colors">
                  {prevProject.title}
                </h4>
                <p className="font-mono text-[9px] xl:text-[10px] 2xl:text-xs text-muted-foreground truncate">
                  {prevProject.role}
                </p>
                <div className="pt-1.5 border-t border-edge-subtle/60 flex items-center gap-1 text-[9px] xl:text-[10px] 2xl:text-xs font-mono text-brand-500 opacity-70 group-hover:opacity-100 transition-opacity">
                  <ChevronLeft className="size-3" />
                  <span>Click to view</span>
                </div>
              </div>
            </div>
          )}

          {/* Center Showcase Console Stage: Balanced & Focused Width */}
          <AnimatePresence mode="wait" custom={direction}>
            <m.article
              key={activeProject.id}
              custom={direction}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction * 24, scale: 0.99 }
              }
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction * -24, scale: 0.99 }
              }
              transition={{
                type: "spring",
                stiffness: 340,
                damping: 32,
                mass: 0.7,
              }}
              className="relative z-20 w-full max-w-[580px] lg:max-w-[620px] xl:max-w-[820px] 2xl:max-w-[980px] rounded-3xl bg-bg-surface/95 border border-edge-default shadow-2xl overflow-hidden backdrop-blur-xl ring-1 ring-white/10 dark:ring-white/5 shrink-0"
            >
              {/* Studio Window Chrome Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-bg-surface/95 border-b border-edge-subtle/80 backdrop-blur-md">
                {/* Window Traffic Lights & Breadcrumbs */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="size-3 rounded-full bg-red-500/80 border border-red-600/50" />
                    <span className="size-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
                    <span className="size-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
                  </div>

                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-bg-void/80 border border-edge-subtle text-xs font-mono text-muted-foreground">
                    <Lock className="size-3 text-brand-500" />
                    <span className="truncate max-w-[200px] md:max-w-[280px] xl:max-w-[360px] 2xl:max-w-[440px]">
                      {cleanUrl}
                    </span>
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
                  </div>
                </div>

                {/* Integrated Controls */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Position Counter */}
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-bg-void/70 border border-edge-subtle text-xs font-mono">
                    <span className="font-bold text-brand-500">
                      {String(safeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground/40">/</span>
                    <span className="text-muted-foreground">
                      {String(projects.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Auto-play Toggle */}
                  <button
                    onClick={() => setIsAutoPlay((prev) => !prev)}
                    aria-label={
                      isAutoPlay ? "Pause Auto-play" : "Start Auto-play"
                    }
                    className={`p-1 sm:px-2.5 sm:py-0.5 rounded-lg border text-xs font-mono inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer ${
                      isAutoPlay
                        ? "bg-brand-500 text-white border-brand-500"
                        : "bg-bg-void/70 text-muted-foreground hover:text-foreground border-edge-subtle"
                    }`}
                  >
                    {isAutoPlay ? (
                      <>
                        <Pause className="size-3" />
                        <span className="hidden sm:inline">Playing</span>
                      </>
                    ) : (
                      <>
                        <Play className="size-3" />
                        <span className="hidden sm:inline">Auto</span>
                      </>
                    )}
                  </button>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous project"
                      className="p-1 rounded-lg bg-bg-void/80 hover:bg-bg-elevated border border-edge-subtle text-foreground transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next project"
                      className="p-1 rounded-lg bg-bg-void/80 hover:bg-bg-elevated border border-edge-subtle text-foreground transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Dual-Pane Content Canvas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[490px] xl:h-[520px] 2xl:h-[540px]">
                {/* Left Column: Media Stage (50% Width, Full Height) */}
                <div className="relative flex flex-col justify-between bg-bg-void/90 border-b lg:border-b-0 lg:border-r border-edge-subtle/80 overflow-hidden lg:h-full">
                  <div className="relative aspect-16/10 lg:aspect-auto lg:h-full w-full flex items-center justify-center overflow-hidden min-h-[260px]">
                    {activeProject.video ? (
                      <div className="relative size-full">
                        <video
                          ref={videoRef}
                          src={activeProject.video}
                          loop
                          muted={isMuted}
                          playsInline
                          autoPlay
                          className="size-full object-cover"
                        />
                        {/* Audio Toggle Button */}
                        <button
                          onClick={() => setIsMuted((prev) => !prev)}
                          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                          className="absolute bottom-3 right-3 z-20 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md transition-all focus:outline-none cursor-pointer border border-white/10"
                        >
                          {isMuted ? (
                            <VolumeX className="size-3.5" />
                          ) : (
                            <Volume2 className="size-3.5" />
                          )}
                        </button>
                      </div>
                    ) : displayImage ? (
                      <div className="relative size-full">
                        <Image
                          src={displayImage}
                          alt={activeProject.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 600px, 720px"
                          className="object-cover"
                          priority
                        />
                      </div>
                    ) : (
                      /* High-Tech Architecture Canvas for Enterprise Backend Builds */
                      <div className="size-full flex flex-col justify-between p-6 sm:p-8 bg-linear-to-br from-bg-surface/80 via-bg-void to-bg-surface/40 text-center relative overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-15 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px]"
                          aria-hidden="true"
                        />

                        {/* Top System Eyebrow (Category cleanly integrated without overlap) */}
                        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-muted-foreground border-b border-edge-subtle/60 pb-2.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-500 font-semibold uppercase text-[10px] 2xl:text-[11px] tracking-wider">
                            <Server className="size-3" />
                            {activeProject.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-medium">
                            <Activity className="size-3 animate-pulse" />
                            Production Live
                          </span>
                        </div>

                        {/* Middle Architecture Graph Schematic */}
                        <div className="relative z-10 my-auto py-3 flex flex-col items-center">
                          <div className="relative p-3.5 rounded-2xl bg-brand-500/10 text-brand-500 border border-brand-500/30 shadow-lg shadow-brand-500/10 mb-2.5">
                            <Database className="size-8" />
                            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-emerald-500 border-2 border-bg-surface animate-ping" />
                            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-emerald-500 border-2 border-bg-surface" />
                          </div>

                          <h4 className="font-heading text-lg font-bold text-foreground">
                            {activeProject.title}
                          </h4>
                          <p className="font-sans text-xs text-muted-foreground max-w-xs mt-1 leading-relaxed">
                            Enterprise infrastructure, batch processing engine,
                            and PostgreSQL Row-Level Security.
                          </p>

                          {/* Node Badges */}
                          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-bg-surface border border-edge-default text-[10px] font-mono text-foreground">
                              <Cpu className="size-2.5 text-brand-500" />
                              Batch Engine
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-bg-surface border border-edge-default text-[10px] font-mono text-foreground">
                              <Server className="size-2.5 text-brand-500" />
                              Docker & Proxmox
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-bg-surface border border-edge-default text-[10px] font-mono text-foreground">
                              <Lock className="size-2.5 text-brand-500" />
                              PostgreSQL RLS
                            </span>
                          </div>
                        </div>

                        {/* Bottom Telemetry Bar */}
                        <div className="relative z-10 pt-2.5 border-t border-edge-subtle/60 flex items-center justify-around text-xs font-mono text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Server className="size-3 text-brand-500" />
                            <span className="text-foreground/90 font-medium">
                              Core Engine
                            </span>
                          </div>
                          <div className="h-3 w-px bg-edge-subtle" />
                          <div className="flex items-center gap-1.5">
                            <Lock className="size-3 text-brand-500" />
                            <span className="text-foreground/90 font-medium">
                              Row-Level Security
                            </span>
                          </div>
                          <div className="h-3 w-px bg-edge-subtle" />
                          <div className="flex items-center gap-1.5">
                            <Activity className="size-3 text-emerald-400" />
                            <span className="text-foreground/90 font-medium">
                              Zero Downtime
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Top Floating Badges (Only shown when media is rendered) */}
                    {(activeProject.video || displayImage) && (
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                        <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white border border-white/15 text-[11px] font-mono font-medium shadow-md">
                          {activeProject.category}
                        </span>
                        {activeProject.video && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                            <Video className="size-3" />
                            Interactive Feed
                          </span>
                        )}
                      </div>
                    )}

                    {/* Multi-Screenshot Carousel Controls */}
                    {activeProject.images &&
                      activeProject.images.length > 1 && (
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                          <div className="flex gap-1 px-2 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                            {activeProject.images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentSlideIndex(idx)}
                                className={`size-1.5 rounded-full transition-all cursor-pointer ${
                                  idx === currentSlideIndex
                                    ? "bg-white w-4"
                                    : "bg-white/40 hover:bg-white/70"
                                }`}
                                aria-label={`View slide ${idx + 1}`}
                              />
                            ))}
                          </div>

                          <div className="flex gap-1">
                            <button
                              onClick={() =>
                                setCurrentSlideIndex((prev) =>
                                  prev === 0
                                    ? activeProject.images!.length - 1
                                    : prev - 1,
                                )
                              }
                              className="p-1 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 cursor-pointer transition-colors"
                              aria-label="Previous screenshot"
                            >
                              <ChevronLeft className="size-3.5" />
                            </button>
                            <button
                              onClick={() =>
                                setCurrentSlideIndex(
                                  (prev) =>
                                    (prev + 1) % activeProject.images!.length,
                                )
                              }
                              className="p-1 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 cursor-pointer transition-colors"
                              aria-label="Next screenshot"
                            >
                              <ChevronRight className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                {/* Right Column: Engineering HUD (Equal 50% Column, Minimalist & Spacious) */}
                <div className="p-5 sm:p-6 xl:p-7 flex flex-col justify-between bg-bg-surface lg:h-full overflow-hidden">
                  <div className="space-y-3.5">
                    {/* Eyebrow Category & Year */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-brand-500 font-bold tracking-widest uppercase flex items-center gap-1.5 text-[11px] 2xl:text-xs">
                        <FolderGit2 className="size-3" />
                        Featured Build
                      </span>
                      <span className="text-muted-foreground/80 font-semibold text-[11px] 2xl:text-xs">
                        {activeProject.year}
                      </span>
                    </div>

                    {/* Project Title & Subtitle */}
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl 2xl:text-[26px] font-extrabold text-foreground leading-tight tracking-tight">
                        {activeProject.title}
                      </h3>
                      <p className="font-sans text-xs 2xl:text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                        {activeProject.subtitle}
                      </p>
                    </div>

                    {/* Role & Team Metadata Strip (No truncation, flexible badges) */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-500/10 border border-brand-500/25 text-brand-500 text-xs font-mono font-medium">
                        <UserCheck className="size-3.5 text-brand-500 shrink-0" />
                        <span>{activeProject.role}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-bg-void border border-edge-subtle text-muted-foreground text-xs font-mono">
                        <Users className="size-3 text-brand-500 shrink-0" />
                        <span>{activeProject.team}</span>
                      </span>
                    </div>

                    {/* Key Deliverables Highlights */}
                    <ul className="space-y-1.5 pt-0.5">
                      {activeProject.details.myContributions
                        .slice(0, 2)
                        .map((contrib, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs 2xl:text-[13px] text-muted-foreground leading-relaxed"
                          >
                            <CheckCircle2 className="size-3.5 text-brand-500 mt-0.5 shrink-0" />
                            <span className="text-foreground/90 line-clamp-2">
                              {contrib}
                            </span>
                          </li>
                        ))}
                    </ul>

                    {/* Metrics Pill Grid (Matching Grid View Design) */}
                    {activeProject.metrics &&
                      activeProject.metrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-bg-void/60 border border-edge-subtle/80 select-none">
                          {activeProject.metrics.map((metric) => (
                            <div key={metric.label} className="text-center">
                              <span className="block font-heading text-xs sm:text-sm 2xl:text-base font-bold text-foreground">
                                {metric.value}
                              </span>
                              <span className="block font-mono text-[10px] text-muted-foreground uppercase truncate">
                                {metric.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                    {/* Clean Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full bg-bg-void/80 text-muted-foreground border border-edge-subtle/80 text-[10px] 2xl:text-[11px] font-mono font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 2xl:pt-4 border-t border-edge-subtle/80 flex items-center justify-between gap-2.5 mt-auto">
                    <Button
                      size="default"
                      onClick={() => onOpenDetail(activeProject)}
                      className="flex-1 rounded-full text-xs sm:text-sm 2xl:text-base font-semibold bg-brand-500 hover:bg-brand-600 text-white shadow-sm hover:shadow-md transition-all duration-200 h-9 2xl:h-10 cursor-pointer"
                    >
                      <FileText className="size-3.5 2xl:size-4 mr-1.5" />
                      Deep Dive Case Study
                    </Button>

                    <div className="flex items-center gap-1.5">
                      {activeProject.githubUrl && (
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Source repository for ${activeProject.title}`}
                          className="p-2 2xl:p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-bg-void border border-edge-subtle transition-colors"
                        >
                          <FaGithub className="size-3.5 2xl:size-4" />
                        </a>
                      )}
                      {activeProject.liveUrl && (
                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live website for ${activeProject.title}`}
                          className="p-2 2xl:p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-bg-void border border-edge-subtle transition-colors"
                        >
                          <ArrowUpRight className="size-3.5 2xl:size-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </m.article>
          </AnimatePresence>

          {/* Background Right Interactive Deck Card (Next Project) */}
          {projects.length > 1 && nextProject && (
            <div
              onClick={handleNext}
              role="button"
              tabIndex={0}
              aria-label={`Switch to next project: ${nextProject.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleNext();
                }
              }}
              style={{
                transformOrigin: "left center",
              }}
              className="hidden lg:flex flex-col justify-between p-3.5 xl:p-4 2xl:p-5 rounded-3xl bg-bg-surface/90 hover:bg-bg-elevated border border-edge-default hover:border-brand-500 shadow-lg hover:shadow-2xl hover:shadow-brand-500/20 transition-all duration-300 cursor-pointer w-[160px] xl:w-[195px] 2xl:w-[235px] h-[410px] xl:h-[460px] 2xl:h-[490px] shrink-0 scale-95 rotate-y-8 hover:scale-100 hover:rotate-y-0 opacity-85 hover:opacity-100 z-10 overflow-hidden group select-none backdrop-blur-xl ring-1 ring-white/5"
            >
              {/* Header pill & Year */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] 2xl:text-xs font-mono text-muted-foreground/80">
                  {nextProject.year}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-500 text-[10px] xl:text-[11px] 2xl:text-xs font-mono font-bold tracking-wider group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  NEXT
                  <ChevronRight className="size-3 xl:size-3.5 2xl:size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>

              {/* Thumbnail Image Preview */}
              <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-bg-void/90 border border-edge-subtle my-auto shadow-inner">
                {nextProject.image ? (
                  <Image
                    src={nextProject.image}
                    alt=""
                    fill
                    sizes="(max-width: 1280px) 180px, (max-width: 1536px) 220px, 280px"
                    className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="size-full flex items-center justify-center text-brand-500">
                    <Layers className="size-7" />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-bg-surface/90 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-xs text-[9px] 2xl:text-[10px] font-mono text-white/90 uppercase tracking-wider">
                  {nextProject.category}
                </span>
              </div>

              {/* Title & Role Info */}
              <div className="space-y-1 text-right">
                <h4 className="font-heading text-xs xl:text-sm 2xl:text-base font-bold text-foreground truncate group-hover:text-brand-500 transition-colors">
                  {nextProject.title}
                </h4>
                <p className="font-mono text-[9px] xl:text-[10px] 2xl:text-xs text-muted-foreground truncate">
                  {nextProject.role}
                </p>
                <div className="pt-1.5 border-t border-edge-subtle/60 flex items-center justify-end gap-1 text-[9px] xl:text-[10px] 2xl:text-xs font-mono text-brand-500 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span>Click to view</span>
                  <ChevronRight className="size-3" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Kinetic Project Dock */}
        <div className="w-full mt-4 sm:mt-5 mb-1 flex flex-col items-center gap-2 px-3 sm:px-4">
          {/* Consistent Outer Dock Pill Frame (Quiet, low-contrast, non-competing) */}
          <div className="relative max-w-full rounded-full bg-bg-surface/60 dark:bg-bg-void/85 border border-edge-subtle/70 dark:border-white/[0.07] backdrop-blur-xl p-1 overflow-hidden flex items-center">
            {/* Left Edge Inner Fade Hint */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-0 inset-y-0 w-8 sm:w-12 bg-linear-to-r from-bg-surface dark:from-bg-void to-transparent rounded-l-full z-10 transition-opacity duration-300",
                canScrollLeft ? "opacity-100" : "opacity-0",
              )}
            />

            {/* Inner Scrollable Tab Track */}
            <div
              ref={dockContainerRef}
              onScroll={updateScrollState}
              role="tablist"
              aria-label="Showcase stage project navigator"
              className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none px-2 sm:px-2.5 py-0.5 max-w-[calc(100vw-2.5rem)] sm:max-w-[88vw] lg:max-w-[1240px]"
            >
              {projects.map((proj, idx) => {
                const isActive = idx === safeIndex;

                return (
                  <button
                    key={proj.id}
                    ref={(el) => {
                      if (el) {
                        dockItemRefs.current.set(idx, el);
                      } else {
                        dockItemRefs.current.delete(idx);
                      }
                    }}
                    onClick={() => handleSelectIndex(idx)}
                    className={cn(
                      "group relative flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer select-none shrink-0",
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.04] dark:hover:bg-white/[0.04]",
                    )}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Switch to ${proj.title}`}
                  >
                    {/* Monospace Index Badge */}
                    <span
                      className={cn(
                        "font-mono text-[10px] font-semibold transition-colors shrink-0",
                        isActive
                          ? "text-brand-600 dark:text-brand-400"
                          : "text-muted-foreground/40 group-hover:text-muted-foreground/70",
                      )}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    {/* Crisp Rounded Thumbnail */}
                    <div
                      className={cn(
                        "relative size-5 rounded-md overflow-hidden bg-bg-void shrink-0 border transition-all duration-200",
                        isActive
                          ? "border-brand-500/60 ring-1 ring-brand-500/30 shadow-xs"
                          : "border-edge-subtle/50 opacity-75 group-hover:opacity-100 group-hover:border-edge-subtle",
                      )}
                    >
                      {(proj.image ?? proj.images?.[0]) ? (
                        <Image
                          src={proj.image ?? proj.images![0]!}
                          alt=""
                          fill
                          sizes="20px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="size-full flex items-center justify-center bg-brand-500/10 text-brand-500">
                          <Layers className="size-2.5" />
                        </div>
                      )}
                    </div>

                    {/* Project Title */}
                    <span
                      className={cn(
                        "font-heading text-xs font-medium whitespace-nowrap transition-colors",
                        isActive
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground/70 group-hover:text-foreground",
                      )}
                    >
                      {proj.title}
                    </span>

                    {/* Active Live Pulse Indicator */}
                    {isActive && <span aria-hidden="true" />}

                    {/* Active Gliding Pill with Clean, Quiet Styling */}
                    {isActive && (
                      <m.span
                        layoutId="stage-dock-active-pill"
                        className="absolute inset-0 rounded-full bg-brand-500/10 dark:bg-brand-500/15 border border-brand-500/40 dark:border-brand-500/50 shadow-2xs pointer-events-none"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Edge Inner Fade Hint */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute right-0 inset-y-0 w-8 sm:w-12 bg-linear-to-l from-bg-surface dark:from-bg-void to-transparent rounded-r-full z-10 transition-opacity duration-300",
                canScrollRight ? "opacity-100" : "opacity-0",
              )}
            />
          </div>

          {/* Status & Keyboard Hint HUD */}
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-muted-foreground/50 select-none">
            <span className="hidden sm:inline">Use</span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded bg-bg-surface/60 border border-edge-subtle/60 text-[9px] text-muted-foreground/70">
              ←
            </kbd>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded bg-bg-surface/60 border border-edge-subtle/60 text-[9px] text-muted-foreground/70">
              →
            </kbd>
            <span className="hidden sm:inline">to navigate</span>
            <span className="text-muted-foreground/30">•</span>
            <span className="font-medium text-muted-foreground/80">
              {safeIndex + 1} of {projects.length} Builds
            </span>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
