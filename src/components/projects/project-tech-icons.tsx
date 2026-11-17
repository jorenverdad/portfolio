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
  ShieldCheck,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

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

/**
 * Official Shadcn UI SVG Logo Mark
 */
export function ShadcnIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={cn("size-full", className)}
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        stroke="currentColor"
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        stroke="currentColor"
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Official Matplotlib SVG Logo Mark (Devicon)
 */
export function MatplotlibIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      className={cn("size-full", className)}
      aria-hidden="true"
    >
      <path
        fill="#11557c"
        d="M64 126c-16.56 0-32.13-6.449-43.84-18.159S2 80.561 2 64s6.449-32.13 18.159-43.841S47.439 2 64 2s32.131 6.449 43.841 18.159S126 47.439 126 64s-6.449 32.131-18.159 43.841S80.561 126 64 126zM64 3.82c-16.074 0-31.187 6.26-42.553 17.626C10.08 32.813 3.82 47.925 3.82 64s6.26 31.188 17.626 42.554S47.925 124.18 64 124.18s31.188-6.26 42.554-17.626S124.18 80.075 124.18 64s-6.26-31.187-17.626-42.554C95.187 10.08 80.075 3.82 64 3.82z"
      />
      <path
        fill="#11557c"
        d="M64 112.35c-26.66 0-48.35-21.689-48.35-48.35S37.34 15.65 64 15.65 112.35 37.34 112.35 64 90.66 112.35 64 112.35zm0-96c-26.274 0-47.65 21.375-47.65 47.65S37.726 111.65 64 111.65 111.65 90.274 111.65 64 90.274 16.35 64 16.35z"
      />
      <path
        fill="#11557c"
        d="M64 98.35c-18.94 0-34.35-15.41-34.35-34.35S45.06 29.65 64 29.65 98.35 45.06 98.35 64 82.94 98.35 64 98.35zm0-68c-18.555 0-33.65 15.095-33.65 33.65S45.445 97.65 64 97.65 97.65 82.555 97.65 64 82.555 30.35 64 30.35z"
      />
      <path
        fill="#11557c"
        d="M64 84.35c-11.221 0-20.35-9.129-20.35-20.35S52.779 43.65 64 43.65 84.35 52.779 84.35 64 75.221 84.35 64 84.35zm0-40c-10.835 0-19.65 8.815-19.65 19.65S53.165 83.65 64 83.65 83.65 74.835 83.65 64 74.835 44.35 64 44.35z"
      />
      <path
        fill="#11557c"
        d="M64 71.35c-4.053 0-7.35-3.297-7.35-7.35s3.297-7.35 7.35-7.35 7.35 3.297 7.35 7.35-3.297 7.35-7.35 7.35zm0-14c-3.667 0-6.65 2.983-6.65 6.65s2.983 6.65 6.65 6.65 6.65-2.983 6.65-6.65-2.983-6.65-6.65-6.65z"
      />
      <path
        fill="#11557c"
        d="M107.061 96.836 65.178 64.197l12.373.001a.413.413 0 0 0 .413-.413 13.918 13.918 0 0 0-.684-4.323v-.001a.414.414 0 0 0-.521-.264l-11.604 3.769L89.693 32.2a.414.414 0 0 0-.066-.581 40.996 40.996 0 0 0-11.196-6.351h-.001a.412.412 0 0 0-.531.242L64.072 62.349 52.296 10.752a.414.414 0 0 0-.495-.312 54.784 54.784 0 0 0-22.892 11.342l-.002.002a.412.412 0 0 0-.05.58L62.43 62.578 21.347 42.794h-.001a.413.413 0 0 0-.551.193c-4.378 9.046-5.79 19.471-3.977 29.355a.415.415 0 0 0 .481.332l43.748-7.94-21.715 10.457h-.001a.414.414 0 0 0-.192.552 27.656 27.656 0 0 0 2.177 3.738.42.42 0 0 0 .577.105L63.334 64.73l-7.315 32.049a.416.416 0 0 0 .311.496c2.495.57 5.08.857 7.66.857 1.923.001 3.842-.16 5.738-.481a.414.414 0 0 0 .339-.477l-5.417-31.88 32.857 41.202a.414.414 0 0 0 .58.067 54.696 54.696 0 0 0 9.045-9.146.413.413 0 0 0-.071-.581z"
      />
      <path
        fill="#11557c"
        d="M64.35 125.35h-.7V64.845l-42.784 42.783-.495-.495.248-.247L63.155 64.35H2.65v-.7h60.505L20.372 20.866l.495-.495L63.65 63.155V2.65h.7v60.505l42.784-42.783.495.495-.248.248L64.845 63.65h60.505v.7H64.845l42.783 42.784-.495.495-.247-.248L64.35 64.845v60.505z"
      />
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

  // Vue.js (supports "Vue", "Vue.js", "Vue 3")
  if (normalized.includes("vue") && !normalized.includes("vuetify")) {
    return { iconName: "vuejs", label: tag };
  }

  // Vuetify
  if (normalized.includes("vuetify")) {
    return { iconName: "vuetify", label: tag };
  }

  // Pinia
  if (normalized.includes("pinia")) {
    return { iconName: "pinia", label: tag };
  }

  // TypeScript
  if (normalized.includes("typescript") || normalized === "ts") {
    return { iconName: "typescript", label: tag };
  }

  // JavaScript
  if (
    normalized.includes("javascript") ||
    normalized === "js" ||
    normalized.includes("ecmascript")
  ) {
    return { iconName: "js", label: tag };
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

  // pnpm
  if (normalized.includes("pnpm")) {
    return { iconName: "pnpm", label: tag };
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

  // Material UI / Material Design / MUI
  if (normalized.includes("material") || normalized.includes("mui")) {
    return { iconName: "materialui", label: tag };
  }

  // Svelte / SvelteKit (supports "Svelte", "Svelte 5", "SvelteKit")
  if (normalized.includes("svelte")) {
    return { iconName: "sveltejs", label: tag };
  }

  // Motion
  if (normalized.includes("motion") || normalized.includes("framer")) {
    return { iconName: "motion", label: tag };
  }

  // Chromium / Manifest V3 extension
  if (
    normalized.includes("chromium") ||
    normalized.includes("manifest") ||
    normalized.includes("chrome") ||
    normalized.includes("extension")
  ) {
    return { iconName: "chromium", label: tag };
  }

  // Electron
  if (normalized.includes("electron")) {
    return { iconName: "electron", label: tag };
  }

  // Node.js
  if (normalized.includes("node")) {
    return { iconName: "nodejs", label: tag };
  }

  // Base UI
  if (normalized.includes("base ui") || normalized.includes("base-ui")) {
    return {
      renderCustom: () => <BaseUiIcon className="text-foreground" />,
      label: tag,
    };
  }

  // Shadcn UI
  if (normalized.includes("shadcn")) {
    return {
      renderCustom: () => <ShadcnIcon className="text-foreground" />,
      label: tag,
    };
  }

  // Vite
  if (normalized.includes("vite")) {
    return { iconName: "vitejs", label: tag };
  }

  // Three.js
  if (normalized.includes("three")) {
    return { iconName: "threejs", label: tag };
  }

  // Radix UI
  if (normalized.includes("radix")) {
    return { iconName: "radixui", label: tag };
  }

  // Bootstrap (supports "Bootstrap", "Bootstrap 5")
  if (normalized.includes("bootstrap")) {
    return { iconName: "bootstrap5", label: tag };
  }

  // Capacitor
  if (normalized.includes("capacitor")) {
    return { iconName: "ionic", label: tag };
  }

  // PyTorch (supports "PyTorch", "Torch", "Torchvision")
  if (
    normalized.includes("pytorch") ||
    normalized.includes("torchvision") ||
    normalized === "torch"
  ) {
    return { iconName: "pytorch", label: tag };
  }

  // Scikit-learn (supports "Scikit-learn", "Scikit Learn", "sklearn")
  if (
    normalized.includes("scikit") ||
    normalized.includes("sklearn") ||
    normalized === "scikitlearn"
  ) {
    return { iconName: "scikitlearn", label: tag };
  }

  // NumPy
  if (normalized.includes("numpy")) {
    return { iconName: "numpy", label: tag };
  }

  // Pandas
  if (normalized.includes("pandas")) {
    return { iconName: "pandas", label: tag };
  }

  // Seaborn
  if (normalized.includes("seaborn")) {
    return { iconName: "seaborn", label: tag };
  }

  // Matplotlib
  if (normalized.includes("matplotlib")) {
    return {
      renderCustom: () => <MatplotlibIcon className="text-[#11557c]" />,
      label: tag,
    };
  }

  // Deep Learning / CNN
  if (
    normalized.includes("deep learning") ||
    normalized === "cnn" ||
    normalized.includes("convolutional")
  ) {
    return {
      renderCustom: () => (
        <Brain className="size-full text-brand-500" aria-hidden="true" />
      ),
      label: tag,
    };
  }

  // Computer Vision
  if (normalized.includes("vision") || normalized.includes("cv")) {
    return {
      renderCustom: () => (
        <ScanEye className="size-full text-violet-500" aria-hidden="true" />
      ),
      label: tag,
    };
  }

  // OpenAI / OpenAI API
  if (
    normalized.includes("openai") ||
    normalized.includes("open ai") ||
    normalized.includes("gpt")
  ) {
    return { iconName: "openai", label: tag };
  }

  // Grok / Groq AI (supports "Groq", "Groq AI", "Grok", "Grok AI")
  if (normalized.includes("groq") || normalized.includes("grok")) {
    return { iconName: "grok", label: tag };
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

  // Django (supports "Django", "Django REST Framework")
  if (normalized.includes("django")) {
    return { iconName: "django", label: tag };
  }

  // Python
  if (normalized.includes("python")) {
    return { iconName: "python", label: tag };
  }

  // Cryptography / Encryption / Crypto-JS
  if (
    normalized.includes("crypto") ||
    normalized.includes("encrypt") ||
    normalized.includes("cipher")
  ) {
    return {
      renderCustom: () => (
        <ShieldCheck className="size-full text-emerald-500" aria-hidden="true" />
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

  // Realtime & WebSockets (Socket.io)
  if (
    normalized.includes("realtime") ||
    normalized.includes("socket") ||
    normalized.includes("websocket")
  ) {
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
    <TooltipProvider delay={100} closeDelay={150}>
      <div
        className={cn("flex flex-wrap items-center gap-2 sm:gap-2.5 2xl:gap-3 py-1", className)}
        role="group"
        aria-label="Technologies used in this project"
      >
        {visibleTags.map((tag) => (
          <Tooltip key={tag}>
            <TooltipTrigger
              className="size-10 sm:size-11 2xl:size-12 rounded-xl bg-bg-void/60 hover:bg-bg-elevated border border-edge-subtle/80 hover:border-brand-500/50 flex items-center justify-center p-2 sm:p-2.5 transition-all duration-200 hover:scale-110 active:scale-95 shadow-xs hover:shadow-md hover:shadow-brand-500/10 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              title={tag}
              aria-label={tag}
            >
              <ProjectTechIcon tag={tag} isDark={isDark} />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="center"
              sideOffset={6}
              className="font-mono font-bold tracking-wide"
            >
              {tag}
            </TooltipContent>
          </Tooltip>
        ))}

        {hiddenCount > 0 && (
          <Tooltip>
            <TooltipTrigger
              className="h-10 sm:h-11 2xl:h-12 px-3 sm:px-3.5 rounded-xl bg-bg-void/60 hover:bg-bg-elevated border border-edge-subtle/80 hover:border-brand-500/50 flex items-center justify-center text-xs sm:text-sm font-mono font-bold text-muted-foreground hover:text-brand-500 transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              title={hiddenTags.join(", ")}
              aria-label={`+${hiddenCount} more technologies: ${hiddenTags.join(", ")}`}
            >
              +{hiddenCount}
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="end"
              sideOffset={6}
              className="max-w-[280px] sm:max-w-sm md:max-w-md font-mono text-xs font-medium flex items-center gap-1.5 flex-wrap"
            >
              <span className="font-bold text-brand-500 dark:text-brand-600 shrink-0">
                +{hiddenCount} more:
              </span>
              <span className="text-background/90 break-words">
                {hiddenTags.join(", ")}
              </span>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
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
