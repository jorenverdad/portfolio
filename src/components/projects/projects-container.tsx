"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  LayoutGrid,
  List,
  GalleryHorizontalEnd,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { ProjectsHeader } from "./projects-header";
import { ProjectsHero } from "./projects-hero";
import { ProjectCard } from "./project-card";
import { ProjectsStageView } from "./projects-stage-view";
import { ProjectDetailModal } from "./project-detail-modal";
import {
  getAllProjects,
  getAllCategories,
  type ProjectItem,
  type ProjectCategory,
} from "@/lib/projects-data";
import {
  CategoryMultiSelect,
  ActiveCategoryChips,
} from "./category-multi-select";

export function ProjectsContainer() {
  const searchParams = useSearchParams();

  const allProjects = useMemo(() => getAllProjects(), []);
  const allCategories = useMemo(() => getAllCategories(), []);

  const [selectedCategories, setSelectedCategories] = useState<
    ReadonlyArray<ProjectCategory>
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"stage" | "grid" | "list">("stage");

  const requestedId =
    searchParams.get("id") ?? searchParams.get("project");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    requestedId,
  );
  const [prevRequestedId, setPrevRequestedId] = useState(requestedId);

  // Guarantee page starts strictly at the top on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  // Sync state when URL search param changes
  if (requestedId !== prevRequestedId) {
    setPrevRequestedId(requestedId);
    setSelectedProjectId(requestedId);
  }

  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return null;
    return allProjects.find((p) => p.id === selectedProjectId) ?? null;
  }, [allProjects, selectedProjectId]);

  const handleOpenDetail = useCallback(
    (project: ProjectItem) => {
      setSelectedProjectId(project.id);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("id", project.id);
        window.history.pushState({}, "", url.toString());
      }
    },
    [],
  );

  const handleCloseDetail = useCallback(() => {
    setSelectedProjectId(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("id");
      url.searchParams.delete("project");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  // Filter projects by category and search term
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return allProjects.filter((project) => {
      // Category filter (multi-category)
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(project.category)
      ) {
        return false;
      }

      // Search query filter
      if (!query) return true;

      const titleMatch = project.title.toLowerCase().includes(query);
      const subtitleMatch = project.subtitle.toLowerCase().includes(query);
      const categoryMatch = project.category.toLowerCase().includes(query);
      const tagMatch = project.tags.some((tag) =>
        tag.toLowerCase().includes(query),
      );
      const metricMatch = project.metrics?.some(
        (m) =>
          m.label.toLowerCase().includes(query) ||
          m.value.toLowerCase().includes(query),
      );
      const overviewMatch = project.details.overview
        .toLowerCase()
        .includes(query);

      return (
        titleMatch ||
        subtitleMatch ||
        categoryMatch ||
        tagMatch ||
        metricMatch ||
        overviewMatch
      );
    });
  }, [allProjects, selectedCategories, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allProjects.length };
    allProjects.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, [allProjects]);

  const handleToggleCategory = useCallback((category: ProjectCategory) => {
    if (category === "All") {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  }, []);

  const handleSelectAllCategories = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  const handleClearCategories = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  const handleRemoveCategory = useCallback((category: ProjectCategory) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  }, []);

  const handleResetFilters = useCallback(() => {
    setSelectedCategories([]);
    setSearchQuery("");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bg-base text-foreground selection:bg-brand-500 selection:text-white overflow-x-clip">
      {/* Top Floating Glassmorphic Header */}
      <ProjectsHeader
        currentCount={filteredProjects.length}
        totalCount={allProjects.length}
      />

      {/* Hero Section */}
      <ProjectsHero totalProjects={allProjects.length} />

      {/* Main Directory Area */}
      <main className="max-w-[1560px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 md:py-6 flex-1 flex flex-col">
        {/* Interactive Filter Toolbar - Centered Command Bar */}
        <div className="w-full max-w-4xl lg:max-w-5xl mx-auto flex flex-col gap-2.5 mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input - Expands dynamically to fill available width */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or stack..."
                className="w-full pl-9.5 pr-28 py-2 rounded-xl text-xs sm:text-sm bg-bg-surface/90 border border-edge-default focus:border-brand-500 focus:bg-bg-surface text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/20"
                aria-label="Search projects by name, technology or description"
              />

              {/* Embedded Status Pill & Clear Button */}
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 select-none">
                {searchQuery ? (
                  <>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-bg-void/80 text-muted-foreground border border-edge-subtle/80">
                      {filteredProjects.length}{" "}
                      {filteredProjects.length === 1 ? "match" : "matches"}
                    </span>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="p-1 text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
                      aria-label="Clear search input"
                    >
                      <X className="size-3.5" />
                    </button>
                  </>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-bg-void/80 text-muted-foreground/80 border border-edge-subtle/80">
                    {filteredProjects.length} builds
                  </span>
                )}
              </div>
            </div>

            {/* Controls Cluster: Category Multi-Select & View Mode Switcher */}
            <div className="flex items-center justify-between sm:justify-start gap-2.5 shrink-0 select-none">
              {/* Multi-Select Category Dropdown Popover */}
              <CategoryMultiSelect
                allCategories={allCategories}
                selectedCategories={selectedCategories}
                categoryCounts={categoryCounts}
                onToggleCategory={handleToggleCategory}
                onSelectAll={handleSelectAllCategories}
                onClearAll={handleClearCategories}
              />

              {/* View Mode Toggle: Stage (1st), Grid (2nd), List (3rd) */}
              <div className="flex items-center p-1 rounded-xl bg-bg-surface border border-edge-default shrink-0">
                <button
                  onClick={() => setViewMode("stage")}
                  className={`p-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer ${
                    viewMode === "stage"
                      ? "bg-brand-500 text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Interactive Showcase Stage view"
                  aria-pressed={viewMode === "stage"}
                  title="Showcase Stage (Spatial Deck)"
                >
                  <GalleryHorizontalEnd className="size-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-brand-500 text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Grid layout view"
                  aria-pressed={viewMode === "grid"}
                  title="Grid View"
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer ${
                    viewMode === "list"
                      ? "bg-brand-500 text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="List layout view"
                  aria-pressed={viewMode === "list"}
                  title="List View"
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips & Reset */}
          <ActiveCategoryChips
            selectedCategories={selectedCategories}
            onRemoveCategory={handleRemoveCategory}
            onClearAll={handleClearCategories}
          />
        </div>

        {/* Projects Layout Container: Stage first, then Grid, then List */}
        {filteredProjects.length > 0 ? (
          viewMode === "stage" ? (
            <ProjectsStageView
              projects={filteredProjects}
              onOpenDetail={handleOpenDetail}
            />
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetail={handleOpenDetail}
                  viewMode="grid"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetail={handleOpenDetail}
                  viewMode="list"
                />
              ))}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-bg-surface/50 border border-edge-subtle/80 my-8">
            <div className="p-4 rounded-2xl bg-brand-500/10 text-brand-500 border border-brand-500/20 mb-4">
              <Sparkles className="size-8" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">
              No matching projects found
            </h3>
            <p className="font-sans text-sm text-muted-foreground max-w-md mb-6">
              No projects matched your active filters or search terms. Try searching
              for something else like &quot;Next.js&quot;, &quot;Supabase&quot;, or &quot;PostgreSQL&quot;.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium bg-brand-500 hover:bg-brand-600 text-white transition-colors"
            >
              <RotateCcw className="size-3.5" />
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={handleCloseDetail}
      />
    </div>
  );
}
