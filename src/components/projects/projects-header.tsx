"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export interface ProjectsHeaderProps {
  readonly currentCount?: number;
  readonly totalCount?: number;
  readonly className?: string;
}

export function ProjectsHeader({
  currentCount,
  totalCount,
  className = "",
}: ProjectsHeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-edge-subtle/60 transition-colors duration-200 supports-[backdrop-filter]:bg-background/60 ${className}`}
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Go Back to Home Pill Button */}
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground bg-bg-surface/80 hover:bg-bg-elevated border border-edge-default hover:border-brand-500/40 shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="Go back to home page"
        >
          <ArrowLeft className="size-3.5 sm:size-4 transition-transform duration-200 group-hover:-translate-x-1 text-brand-500" />
          <span>Back to Home</span>
        </Link>

        {/* Center Breadcrumb & Count Badge */}
        <div className="hidden md:flex items-center gap-2.5 font-mono text-xs select-none">
          <span className="text-muted-foreground/60">joren.dev</span>
          <span className="text-muted-foreground/30">/</span>
          <span className="text-foreground font-semibold uppercase tracking-wider">
            projects
          </span>
          {typeof currentCount === "number" && typeof totalCount === "number" && (
            <span className="ml-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20 text-[11px] font-medium font-sans">
              <Sparkles className="size-2.5" />
              {currentCount === totalCount
                ? `${totalCount} Projects`
                : `${currentCount} of ${totalCount}`}
            </span>
          )}
        </div>

        {/* Right Side: Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle size="sm" variant="circle" />
        </div>
      </div>
    </header>
  );
}
