"use client";

import React, { useSyncExternalStore } from "react";
import StackIcon, { type IconName } from "tech-stack-icons";
import {
  Sparkles,
  Webhook,
  ScanEye,
  Smartphone,
  Radio,
  TerminalSquare,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";

function subscribeDarkMode(callback: () => void) {
  if (typeof window === "undefined" || !window.MutationObserver) {
    return () => {};
  }
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getDarkSnapshot(): boolean {
  if (typeof document === "undefined") return true;
  return document.documentElement.classList.contains("dark");
}

function getServerDarkSnapshot(): boolean {
  return true;
}

export function useIsDarkMode(): boolean {
  return useSyncExternalStore(
    subscribeDarkMode,
    getDarkSnapshot,
    getServerDarkSnapshot,
  );
}

/**
 * Official Base UI SVG Logo Mark (@base-ui/react)
 */
export function BaseUiIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      viewBox="0 0 17 24"
      fill="currentColor"
      className={cn("size-full", className)}
      aria-hidden="true"
    >
      <path d="M9.5001 7.01537C9.2245 6.99837 9 7.22385 9 7.49999V23C13.4183 23 17 19.4183 17 15C17 10.7497 13.6854 7.27351 9.5001 7.01537Z" />
      <path d="M8 9.8V12V23C3.58172 23 0 19.0601 0 14.2V12V1C4.41828 1 8 4.93989 8 9.8Z" />
    </svg>
  );
}

export interface TechResolution {
  readonly iconName?: IconName;
  readonly renderCustom?: (isDark: boolean) => React.ReactNode;
  readonly label: string;
}

/**
 * Resolves a tag string from project archive to an icon representation
 */
export function resolveTechIcon(tag: string): TechResolution {
  const normalized = tag.trim().toLowerCase();

  // Next.js (supports "Next.js", "Next.js 16", etc.)
  if (normalized.includes("next.js") || normalized.includes("nextjs")) {
    return { iconName: "nextjs2", label: tag };
  }

  // React (supports "React", "React 19", "React.js")
  if (normalized.includes("react")) {
    return { iconName: "react", label: tag };
  }

  // TypeScript
  if (normalized.includes("typescript") || normalized === "ts") {
    return { iconName: "typescript", label: tag };
  }

  // Tailwind CSS (supports "Tailwind CSS", "Tailwind CSS v4")
  if (normalized.includes("tailwind")) {
    return { iconName: "tailwindcss", label: tag };
  }

  // Supabase
  if (normalized.includes("supabase")) {
    return { iconName: "supabase", label: tag };
  }

  // PostgreSQL (supports "PostgreSQL", "PostgreSQL 16", "Postgres")
  if (normalized.includes("postgres")) {
    return { iconName: "postgresql", label: tag };
  }

  // Docker
  if (normalized.includes("docker")) {
    return { iconName: "docker", label: tag };
  }

  // Laravel
  if (normalized.includes("laravel")) {
    return { iconName: "laravel", label: tag };
  }

  // Figma
  if (normalized.includes("figma")) {
    return { iconName: "figma", label: tag };
  }

  // Kotlin
  if (normalized.includes("kotlin")) {
    return { iconName: "kotlin", label: tag };
  }

  // Android
  if (normalized.includes("android")) {
    return { iconName: "android", label: tag };
  }

  // Material Design
  if (normalized.includes("material design") || normalized.includes("material")) {
    return { iconName: "materialui", label: tag };
  }

  // Motion
  if (normalized.includes("motion") || normalized.includes("framer")) {
    return { iconName: "motion", label: tag };
  }

  // Chrome / Manifest V3 extension
  if (
    normalized.includes("manifest") ||
    normalized.includes("chrome") ||
    normalized.includes("extension")
  ) {
    return { iconName: "chrome", label: tag };
  }

  // Base UI
  if (normalized.includes("base ui") || normalized.includes("base-ui")) {
    return {
      renderCustom: () => <BaseUiIcon className="text-foreground" />,
      label: tag,
    };
  }

  // AI Moderation
  if (normalized.includes("ai") || normalized.includes("moderation")) {
    return {
      renderCustom: () => (
        <Sparkles className="size-full text-brand-500" aria-hidden="true" />
      ),
      label: tag,
    };
  }

  // REST API / RESTful API
  if (normalized.includes("api") || normalized.includes("rest")) {
    return {
      renderCustom: () => (
        <Webhook className="size-full text-sky-500" aria-hidden="true" />
      ),
      label: tag,
    };
  }

  // DOM MutationObserver
  if (
    normalized.includes("mutation") ||
    normalized.includes("observer") ||
    normalized.includes("dom")
  ) {
    return {
      renderCustom: () => (
        <ScanEye className="size-full text-violet-500" aria-hidden="true" />
      ),
      label: tag,
    };
  }

  // Mobile UI
  if (normalized.includes("mobile")) {
    return {
      renderCustom: () => (
        <Smartphone className="size-full text-blue-500" aria-hidden="true" />
      ),
      label: tag,
    };
  }

  // Realtime
  if (normalized.includes("realtime")) {
    return {
      renderCustom: () => (
        <Radio className="size-full text-emerald-500" aria-hidden="true" />
      ),
      label: tag,
    };
  }

  // RPC Functions
  if (normalized.includes("rpc") || normalized.includes("functions")) {
    return {
      renderCustom: () => (
        <TerminalSquare className="size-full text-amber-500" aria-hidden="true" />
      ),
      label: tag,
    };
  }

  // Safe Fallback
  return {
    renderCustom: () => (
      <Code2 className="size-full text-muted-foreground" aria-hidden="true" />
    ),
    label: tag,
  };
}

export interface ProjectTechIconProps {
  readonly tag: string;
  readonly isDark?: boolean;
  readonly className?: string;
}

/**
 * Pure icon component for a single tech tag
 */
export function ProjectTechIcon({
  tag,
  isDark,
  className,
}: ProjectTechIconProps) {
  const resolution = resolveTechIcon(tag);

  if (resolution.renderCustom) {
    return (
      <span className={cn("size-full flex items-center justify-center", className)}>
        {resolution.renderCustom(isDark ?? true)}
      </span>
    );
  }

  if (resolution.iconName) {
    return (
      <StackIcon
        name={resolution.iconName}
        variant={isDark ? "dark" : "light"}
        className={cn("size-full", className)}
      />
    );
  }

  return null;
}

export interface ShowcaseTechStackProps {
  readonly tags: ReadonlyArray<string>;
  readonly maxVisible?: number;
  readonly className?: string;
}

/**
 * Showcase Stage HUD Tech Stack:
 * Renders logo-only badges up to maxVisible (default 6), with a +N badge for any overflow items.
 */
export function ShowcaseTechStack({
  tags,
  maxVisible = 6,
  className,
}: ShowcaseTechStackProps) {
  const isDark = useIsDarkMode();
  const visibleTags = tags.slice(0, maxVisible);
  const hiddenTags = tags.slice(maxVisible);
  const hiddenCount = hiddenTags.length;

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2 sm:gap-2.5 2xl:gap-3 py-1", className)}
      role="group"
      aria-label="Technologies used in this project"
    >
      {visibleTags.map((tag) => (
        <div key={tag} className="group relative flex items-center justify-center">
          <div
            className="size-10 sm:size-11 2xl:size-12 rounded-xl bg-bg-void/60 hover:bg-bg-elevated border border-edge-subtle/80 hover:border-brand-500/50 flex items-center justify-center p-2 sm:p-2.5 transition-all duration-200 hover:scale-110 active:scale-95 shadow-xs hover:shadow-md hover:shadow-brand-500/10 cursor-default"
            title={tag}
            aria-label={tag}
            tabIndex={0}
          >
            <ProjectTechIcon tag={tag} isDark={isDark} />
          </div>

          {/* Clean HUD Tooltip */}
          <div
            role="tooltip"
            className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-foreground text-background text-xs font-mono font-bold tracking-wide whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-150 z-50 shadow-xl scale-95 group-hover:scale-100 group-focus-within:scale-100"
          >
            {tag}
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 bg-foreground rotate-45 rounded-xs"
              aria-hidden="true"
            />
          </div>
        </div>
      ))}

      {hiddenCount > 0 && (
        <div className="group relative flex items-center justify-center">
          <div
            className="h-10 sm:h-11 2xl:h-12 px-3 sm:px-3.5 rounded-xl bg-bg-void/60 hover:bg-bg-elevated border border-edge-subtle/80 hover:border-brand-500/50 flex items-center justify-center text-xs sm:text-sm font-mono font-bold text-muted-foreground hover:text-brand-500 transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs cursor-default"
            title={hiddenTags.join(", ")}
            aria-label={`+${hiddenCount} more technologies: ${hiddenTags.join(", ")}`}
            tabIndex={0}
          >
            +{hiddenCount}
          </div>

          {/* Clean Overflow HUD Tooltip */}
          <div
            role="tooltip"
            className="absolute bottom-full mb-2.5 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-mono font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-150 z-50 shadow-xl scale-95 group-hover:scale-100 group-focus-within:scale-100 flex items-center gap-1.5"
          >
            <span className="font-bold text-brand-500 dark:text-brand-600">
              +{hiddenCount} more:
            </span>
            <span>{hiddenTags.join(", ")}</span>
            <div
              className="absolute -bottom-1 right-3 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 size-2 bg-foreground rotate-45 rounded-xs"
              aria-hidden="true"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export interface DetailedTechStackProps {
  readonly tags: ReadonlyArray<string>;
  readonly className?: string;
}

/**
 * Detailed View Case Study Tech Stack:
 * Displays ALL technologies with official logo icon and technology name.
 */
export function DetailedTechStack({
  tags,
  className,
}: DetailedTechStackProps) {
  const isDark = useIsDarkMode();

  return (
    <div
      className={cn("flex flex-wrap gap-2.5", className)}
      role="group"
      aria-label="Technologies and Infrastructure used in this project"
    >
      {tags.map((tag) => (
        <div
          key={tag}
          className="group inline-flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-bg-void/60 hover:bg-bg-elevated border border-edge-subtle/80 hover:border-brand-500/40 text-xs sm:text-sm font-mono font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 shadow-xs hover:shadow-md select-none"
        >
          <span className="size-5 shrink-0 flex items-center justify-center">
            <ProjectTechIcon tag={tag} isDark={isDark} />
          </span>
          <span>{tag}</span>
        </div>
      ))}
    </div>
  );
}
