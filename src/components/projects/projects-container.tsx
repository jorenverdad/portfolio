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

export function ProjectsContainer() {
  const searchParams = useSearchParams();

  const allProjects = useMemo(() => getAllProjects(), []);
  const allCategories = useMemo(() => getAllCategories(), []);

  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("All");
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
      // Category filter
      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (!query) return true;

      const titleMatch = project.title.toLowerCase().includes(query);
      const subtitleMatch = project.subtitle.toLowerCase().includes(query);
      const tagMatch = project.tags.some((tag) =>
        tag.toLowerCase().includes(query),
      );
      const overviewMatch = project.details.overview
        .toLowerCase()
        .includes(query);

      return titleMatch || subtitleMatch || tagMatch || overviewMatch;
    });
  }, [allProjects, selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allProjects.length };
    allProjects.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, [allProjects]);

  const handleResetFilters = useCallback(() => {
    setSelectedCategory("All");
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
        {/* Interactive Filter Toolbar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none select-none">
            {allCategories.map((category) => {
              const isSelected = selectedCategory === category;
              const count = categoryCounts[category] ?? 0;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer ${
                    isSelected
                      ? "bg-brand-500 text-white shadow-xs shadow-brand-500/20"
                      : "bg-bg-surface/80 text-muted-foreground hover:text-foreground hover:bg-bg-elevated border border-edge-subtle"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>{category}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-bg-void text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar & View Mode Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or stack..."
                className="w-full pl-9.5 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-bg-surface/90 border border-edge-default focus:border-brand-500 focus:bg-bg-surface text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/20"
                aria-label="Search projects by name, technology or description"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground focus:outline-none"
                  aria-label="Clear search input"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle: Stage (1st), Grid (2nd), List (3rd) */}
            <div className="flex items-center p-1 rounded-xl bg-bg-surface border border-edge-default">
              <button
                onClick={() => setViewMode("stage")}
                className={`p-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
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
                className={`p-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
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
                className={`p-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
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

        {/* Results Counter / Status */}
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-6">
          <span>
            Showing <strong className="text-foreground">{filteredProjects.length}</strong> of{" "}
            {allProjects.length} builds
          </span>
          {(selectedCategory !== "All" || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-brand-500 hover:text-brand-400 transition-colors"
            >
              <RotateCcw className="size-3" />
              Reset filters
            </button>
          )}
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
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetail={handleOpenDetail}
                  viewMode="grid"
                  priority={index < 3}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetail={handleOpenDetail}
                  viewMode="list"
                  priority={index < 4}
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
