"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import {
  X,
  ArrowUpRight,
  Layers,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Cpu,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Users,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import type { ProjectItem } from "@/lib/projects-data";

export interface ProjectDetailModalProps {
  readonly project: ProjectItem | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [prevProjectId, setPrevProjectId] = useState(project?.id);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Reset active image index during render when project changes
  if (project?.id !== prevProjectId) {
    setPrevProjectId(project?.id);
    setActiveImageIndex(0);
  }

  const images = project?.images;
  const hasMultipleImages = !!(images && images.length > 1);
  const displayImage =
    images && images.length > 0
      ? images[activeImageIndex]
      : project?.image;

  const handlePrevImage = useCallback(() => {
    if (!images || images.length === 0) return;
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images]);

  const handleNextImage = useCallback(() => {
    if (!images || images.length === 0) return;
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  }, [images]);

  if (!project) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in" />

        {/* Modal Dialog Content */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          <Dialog.Popup className="relative w-full max-w-4xl bg-bg-surface border border-edge-default rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 focus:outline-none">
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-6 py-4 bg-bg-surface/90 backdrop-blur-md border-b border-edge-subtle">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-muted-foreground/60 text-xs font-mono">
                  {project.year}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-bg-elevated border border-edge-subtle transition-colors"
                    aria-label="View source repository"
                  >
                    <FaGithub className="size-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-bg-elevated border border-edge-subtle transition-colors"
                    aria-label="Open live application"
                  >
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
                <Dialog.Close
                  onClick={onClose}
                  className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-bg-elevated border border-edge-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer"
                  aria-label="Close case study"
                >
                  <X className="size-4" />
                </Dialog.Close>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-5 sm:p-8 space-y-8 divide-y divide-edge-subtle/60">
              {/* Media Stage */}
              <div className="space-y-3">
                <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-bg-void border border-edge-subtle">
                  {project.video ? (
                    <video
                      ref={videoRef}
                      src={project.video}
                      controls
                      autoPlay
                      muted
                      playsInline
                      className="size-full object-cover"
                    />
                  ) : displayImage ? (
                    <Image
                      src={displayImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="size-full flex flex-col items-center justify-center p-8 bg-linear-to-br from-bg-surface to-bg-void text-center">
                      <Layers className="size-10 text-brand-500 mb-3" />
                      <h4 className="font-heading text-lg font-bold text-foreground">
                        {project.title}
                      </h4>
                      <p className="font-sans text-xs text-muted-foreground max-w-sm mt-1">
                        Enterprise internal architecture and backend data
                        pipeline.
                      </p>
                    </div>
                  )}

                  {/* Carousel navigation for multi-image projects */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        aria-label="Previous screenshot"
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all focus:outline-none"
                      >
                        <ChevronLeft className="size-5" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        aria-label="Next screenshot"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all focus:outline-none"
                      >
                        <ChevronRight className="size-5" />
                      </button>

                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md">
                        {images?.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`size-2 rounded-full transition-all ${
                              idx === activeImageIndex
                                ? "bg-white w-4"
                                : "bg-white/40"
                            }`}
                            aria-label={`Slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Title & Overview */}
              <div className="pt-6">
                <Dialog.Title className="font-heading text-2xl sm:text-4xl font-bold text-foreground tracking-tight mb-2">
                  {project.title}
                </Dialog.Title>
                <Dialog.Description className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                  {project.subtitle}
                </Dialog.Description>

                {/* Metrics Grid */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="p-4 rounded-2xl bg-bg-void/80 border border-edge-subtle"
                      >
                        <span className="block font-heading text-2xl font-bold text-foreground mb-1">
                          {metric.value}
                        </span>
                        <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <p className="font-sans text-sm sm:text-base text-foreground/90 leading-relaxed bg-bg-surface/50 p-4 sm:p-5 rounded-2xl border border-edge-subtle">
                  {project.details.overview}
                </p>
              </div>

              {/* My Role & Personal Contributions */}
              <div className="pt-6">
                <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-br from-brand-500/10 via-bg-surface to-bg-void border border-brand-500/30 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-edge-subtle/80">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-brand-500/15 text-brand-500 border border-brand-500/30 shrink-0">
                        <UserCheck className="size-5" />
                      </div>
                      <div>
                        <span className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                          My Role & Ownership
                        </span>
                        <h4 className="font-heading text-lg sm:text-xl font-bold text-foreground">
                          {project.role}
                        </h4>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg-surface border border-edge-default text-xs font-mono text-muted-foreground self-start sm:self-center">
                      <Users className="size-3.5 text-brand-500" />
                      <span>{project.team}</span>
                    </div>
                  </div>

                  {project.details.roleDescription && (
                    <p className="font-sans text-xs sm:text-sm text-foreground/90 leading-relaxed mb-4">
                      {project.details.roleDescription}
                    </p>
                  )}

                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-wider text-brand-500 font-bold mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5" />
                      What I Built & Personally Delivered
                    </h5>
                    <ul className="grid grid-cols-1 gap-2">
                      {project.details.myContributions.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-bg-surface/70 border border-edge-subtle text-xs sm:text-sm text-muted-foreground leading-relaxed"
                        >
                          <span className="size-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Problem vs. Solution */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-bg-void/60 border border-edge-subtle flex flex-col">
                  <div className="flex items-center gap-2 text-destructive mb-3">
                    <AlertCircle className="size-4" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      The Challenge
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {project.details.problem}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-brand-500/5 border border-brand-500/20 flex flex-col">
                  <div className="flex items-center gap-2 text-brand-500 mb-3">
                    <Lightbulb className="size-4" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      The Engineering Solution
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-foreground/90 leading-relaxed">
                    {project.details.solution}
                  </p>
                </div>
              </div>

              {/* Highlights & Architecture */}
              <div className="pt-6 space-y-6">
                <div>
                  <h4 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground mb-4">
                    <CheckCircle2 className="size-4 text-brand-500" />
                    Key Architectural Highlights
                  </h4>
                  <ul className="grid grid-cols-1 gap-2.5">
                    {project.details.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-bg-void/40 border border-edge-subtle/80 text-xs sm:text-sm text-muted-foreground"
                      >
                        <span className="size-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground mb-4">
                    <Cpu className="size-4 text-brand-500" />
                    System Architecture & Design Decisions
                  </h4>
                  <ul className="grid grid-cols-1 gap-2.5">
                    {project.details.architecture.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-bg-void/40 border border-edge-subtle/80 text-xs sm:text-sm text-muted-foreground"
                      >
                        <span className="size-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Stack Tags & CTAs */}
              <div className="pt-6 space-y-6">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Technologies & Infrastructure
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-bg-void border border-edge-default text-xs font-mono text-foreground font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Final Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-edge-subtle/60">
                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <Button
                        render={
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        }
                        nativeButton={false}
                        className="rounded-full px-6 bg-brand-500 hover:bg-brand-600 text-white"
                      >
                        Open Live Application
                        <ArrowUpRight className="size-4 ml-1.5" />
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        render={
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        }
                        nativeButton={false}
                        className="rounded-full px-5 border-edge-default hover:bg-bg-elevated"
                      >
                        <FaGithub className="size-4 mr-1.5" />
                        Repository
                      </Button>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className="rounded-full px-4 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Close Case Study
                  </Button>
                </div>
              </div>
            </div>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
