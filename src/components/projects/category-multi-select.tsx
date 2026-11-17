"use client";

import React, { useCallback } from "react";
import { SlidersHorizontal, ChevronDown, Check, X } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover";
import type { ProjectCategory } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

export interface CategoryMultiSelectProps {
  readonly allCategories: ReadonlyArray<ProjectCategory>;
  readonly selectedCategories: ReadonlyArray<ProjectCategory>;
  readonly categoryCounts: Record<string, number>;
  readonly onToggleCategory: (category: ProjectCategory) => void;
  readonly onSelectAll: () => void;
  readonly onClearAll: () => void;
  readonly className?: string;
}

export function CategoryMultiSelect({
  allCategories,
  selectedCategories,
  categoryCounts,
  onToggleCategory,
  onSelectAll,
  onClearAll,
  className,
}: CategoryMultiSelectProps) {
  const actualCategories = allCategories.filter((c) => c !== "All");
  const selectedCount = selectedCategories.length;
  const isAllSelected = selectedCount === 0;

  const handleToggle = useCallback(
    (category: ProjectCategory) => {
      onToggleCategory(category);
    },
    [onToggleCategory],
  );

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
          selectedCount > 0
            ? "bg-brand-500/10 border border-brand-500/40 text-brand-400 hover:bg-brand-500/15"
            : "bg-bg-surface/90 border border-edge-default text-foreground hover:bg-bg-elevated hover:text-foreground",
          className,
        )}
        aria-label="Filter by category"
      >
        <SlidersHorizontal className="size-3.5 text-brand-500 shrink-0" />
        <span className="whitespace-nowrap">
          {isAllSelected
            ? "All Categories"
            : selectedCount === 1
              ? selectedCategories[0]
              : `Categories (${selectedCount})`}
        </span>

        {selectedCount > 0 && (
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-500 text-white leading-none">
            {selectedCount}
          </span>
        )}

        <ChevronDown className="size-3.5 text-muted-foreground/70 shrink-0 transition-transform duration-200" />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-72 sm:w-80 p-3 bg-bg-surface/95 backdrop-blur-xl border border-edge-default shadow-2xl rounded-2xl flex flex-col gap-2.5 z-50 text-foreground"
      >
        {/* Header & Quick Action Row */}
        <PopoverHeader className="flex flex-row items-center justify-between pb-2 border-b border-edge-subtle">
          <PopoverTitle className="text-xs font-mono font-semibold tracking-wider uppercase text-muted-foreground">
            Categories ({actualCategories.length})
          </PopoverTitle>

          <div className="flex items-center gap-2">
            {!isAllSelected && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-[11px] font-mono text-brand-500 hover:text-brand-400 transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
            <button
              type="button"
              onClick={onSelectAll}
              className="text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Select All
            </button>
          </div>
        </PopoverHeader>

        {/* Category List */}
        <div className="flex flex-col gap-1 max-h-64 overflow-y-auto pr-1">
          {actualCategories.map((category) => {
            const isChecked = selectedCategories.includes(category);
            const count = categoryCounts[category] ?? 0;

            return (
              <button
                key={category}
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => handleToggle(category)}
                className={cn(
                  "flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left group",
                  isChecked
                    ? "bg-brand-500/10 text-foreground"
                    : "hover:bg-bg-elevated/70 text-muted-foreground hover:text-foreground",
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={cn(
                      "size-4 rounded-md border flex items-center justify-center shrink-0 transition-all duration-150",
                      isChecked
                        ? "bg-brand-500 border-brand-500 text-white"
                        : "border-edge-default bg-bg-void/60 group-hover:border-edge-subtle",
                    )}
                  >
                    {isChecked && <Check className="size-3 stroke-[3]" />}
                  </div>
                  <span className="truncate font-sans font-medium text-xs">
                    {category}
                  </span>
                </div>

                <span
                  className={cn(
                    "text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ml-2",
                    isChecked
                      ? "bg-brand-500/20 text-brand-400"
                      : "bg-bg-void text-muted-foreground/80",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export interface ActiveCategoryChipsProps {
  readonly selectedCategories: ReadonlyArray<ProjectCategory>;
  readonly onRemoveCategory: (category: ProjectCategory) => void;
  readonly onClearAll: () => void;
  readonly className?: string;
}

export function ActiveCategoryChips({
  selectedCategories,
  onRemoveCategory,
  onClearAll,
  className,
}: ActiveCategoryChipsProps) {
  if (selectedCategories.length === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-1.5 pt-1 text-xs select-none",
        className,
      )}
    >
      <span className="text-muted-foreground/70 font-mono text-[11px] mr-1">
        Filtered by:
      </span>

      {selectedCategories.map((category) => (
        <span
          key={category}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-brand-500/10 border border-brand-500/30 text-brand-400 hover:border-brand-500/50 transition-colors"
        >
          <span>{category}</span>
          <button
            type="button"
            onClick={() => onRemoveCategory(category)}
            className="p-0.5 rounded-full hover:bg-brand-500/20 text-brand-400 hover:text-white transition-colors cursor-pointer"
            aria-label={`Remove ${category} filter`}
          >
            <X className="size-3" />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="text-[11px] font-mono text-muted-foreground hover:text-brand-500 hover:underline underline-offset-4 transition-colors ml-1.5 cursor-pointer"
      >
        Clear all
      </button>
    </div>
  );
}
