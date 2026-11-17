"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, FileText, Layers, Video, UserCheck } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import type { ProjectItem } from "@/lib/projects-data";

export interface ProjectCardProps {
  readonly project: ProjectItem;
  readonly onOpenDetail: (project: ProjectItem) => void;
  readonly viewMode?: "grid" | "list";
  readonly priority?: boolean;
}

export const ProjectCard = React.memo(function ProjectCard({
  project,
  onOpenDetail,
  viewMode = "grid",
  priority = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (project.video && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsVideoPlaying(true))
          .catch(() => {
            // Autoplay interrupted or not permitted
          });
      }
    }
  }, [project.video]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (project.video && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  }, [project.video]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpenDetail(project);
      }
    },
    [onOpenDetail, project],
  );

  const displayImage = project.image ?? project.images?.[0];

  if (viewMode === "list") {
    return (
      <article
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenDetail(project)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${project.title}`}
        className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-bg-surface/80 hover:bg-bg-elevated border border-edge-default hover:border-brand-500/40 shadow-xs hover:shadow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer"
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Thumbnail / Indicator */}
          <div className="relative size-16 sm:size-20 shrink-0 rounded-xl overflow-hidden bg-bg-void border border-edge-subtle">
            {displayImage ? (
              <Image
                src={displayImage}
                alt=""
                fill
                sizes="80px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={priority}
                loading={priority ? "eager" : "lazy"}
              />
            ) : (
              <div className="size-full flex items-center justify-center bg-brand-500/10 text-brand-500">
                <Layers className="size-6" />
              </div>
            )}
            {project.video && (
              <div className="absolute bottom-1 right-1 p-1 rounded-md bg-black/60 backdrop-blur-xs text-white">
                <Video className="size-2.5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20 text-[11px] font-mono font-medium">
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-bg-void text-foreground/80 border border-edge-subtle text-[11px] font-mono font-medium">
                <UserCheck className="size-3 text-brand-500" />
                {project.role}
              </span>
              <span className="text-muted-foreground/50 text-xs font-mono">
                {project.year}
              </span>
            </div>

            <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground group-hover:text-brand-500 transition-colors truncate">
              {project.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground line-clamp-1 mt-0.5">
              {project.subtitle}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-bg-void text-muted-foreground border border-edge-subtle text-[11px] font-mono"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="text-[11px] text-muted-foreground/60 font-mono">
                  +{project.tags.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div
          className="flex items-center gap-2 self-end md:self-center shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Source code for ${project.title}`}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-bg-void border border-edge-subtle transition-colors"
            >
              <FaGithub className="size-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo for ${project.title}`}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-bg-void border border-edge-subtle transition-colors"
            >
              <ArrowUpRight className="size-4" />
            </a>
          )}
          <Button
            size="sm"
            variant="default"
            onClick={() => onOpenDetail(project)}
            className="rounded-full px-4 text-xs font-medium bg-brand-500 hover:bg-brand-600 text-white"
          >
            <FileText className="size-3.5 mr-1" />
            Deep Dive Case Study
          </Button>
        </div>
      </article>
    );
  }

  // Grid View Mode
  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenDetail(project)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      className="group relative flex flex-col rounded-3xl bg-bg-surface/90 hover:bg-bg-elevated border border-edge-default hover:border-brand-500/50 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer"
    >
      {/* Media Preview Box */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-bg-void border-b border-edge-subtle">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 ${
              isHovered ? "scale-105 brightness-105" : "scale-100"
            }`}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          <div className="size-full flex flex-col items-center justify-center p-6 text-center bg-linear-to-br from-bg-surface to-bg-void">
            <div className="p-3.5 rounded-2xl bg-brand-500/10 text-brand-500 border border-brand-500/20 mb-3">
              <Layers className="size-7" />
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Enterprise System
            </p>
          </div>
        )}

        {/* Video overlay if available */}
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            loop
            muted
            playsInline
            preload="none"
            className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${
              isVideoPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        )}

        {/* Media Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 text-[11px] font-mono font-medium">
            {project.category}
          </span>
          {project.video && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-500/90 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase">
              <Video className="size-2.5" />
              Preview
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono mb-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-brand-500 font-medium">
            <UserCheck className="size-3 shrink-0" />
            <span className="truncate max-w-[190px] text-foreground/80 font-mono">
              {project.role}
            </span>
          </span>
          <div className="flex items-center gap-2">
            <span>{project.year}</span>
            {project.featured && (
              <span className="text-brand-500 font-semibold tracking-wider uppercase text-[10px]">
                ★
              </span>
            )}
          </div>
        </div>

        <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground group-hover:text-brand-500 transition-colors leading-tight mb-1.5">
          {project.title}
        </h3>

        <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
          {project.subtitle}
        </p>

        {/* Metrics Pill Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-bg-void/60 border border-edge-subtle/80 mb-4 select-none">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <span className="block font-heading text-xs sm:text-sm font-bold text-foreground">
                  {metric.value}
                </span>
                <span className="block font-mono text-[10px] text-muted-foreground uppercase truncate">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-md bg-bg-void text-muted-foreground border border-edge-subtle text-[11px] font-mono"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-1.5 py-0.5 rounded-md text-muted-foreground/60 text-[11px] font-mono">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Footer Actions */}
        <div
          className="flex items-center justify-between pt-3 border-t border-edge-subtle/60 mt-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            size="sm"
            variant="default"
            onClick={() => onOpenDetail(project)}
            className="rounded-full px-4 text-xs font-medium bg-brand-500 hover:bg-brand-600 text-white shadow-xs"
          >
            <FileText className="size-3.5 mr-1" />
            Deep Dive Case Study
          </Button>

          <div className="flex items-center gap-1.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Source repository for ${project.title}`}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-bg-void transition-colors"
              >
                <FaGithub className="size-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live website for ${project.title}`}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-bg-void transition-colors"
              >
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
});
