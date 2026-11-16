import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectsStageView } from "../projects-stage-view";
import { PROJECTS_ARCHIVE } from "@/lib/projects-data";

describe("ProjectsStageView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the active project title and engineering HUD", () => {
    const handleOpenDetail = vi.fn();
    render(
      <ProjectsStageView
        projects={PROJECTS_ARCHIVE}
        onOpenDetail={handleOpenDetail}
      />,
    );

    expect(screen.getByText("Featured Build")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: PROJECTS_ARCHIVE[0]!.title,
        level: 3,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Deep Dive Case Study")).toBeInTheDocument();
  });

  it("triggers onOpenDetail when clicking 'Deep Dive Case Study'", () => {
    const handleOpenDetail = vi.fn();
    render(
      <ProjectsStageView
        projects={PROJECTS_ARCHIVE}
        onOpenDetail={handleOpenDetail}
      />,
    );

    const deepDiveBtn = screen.getByRole("button", {
      name: /deep dive case study/i,
    });
    fireEvent.click(deepDiveBtn);

    expect(handleOpenDetail).toHaveBeenCalledWith(PROJECTS_ARCHIVE[0]);
  });

  it("renders previous and next project cards and allows switching", () => {
    const handleOpenDetail = vi.fn();
    render(
      <ProjectsStageView
        projects={PROJECTS_ARCHIVE}
        onOpenDetail={handleOpenDetail}
      />,
    );

    const prevButton = screen.getByRole("button", {
      name: new RegExp(`Switch to previous project: ${PROJECTS_ARCHIVE[PROJECTS_ARCHIVE.length - 1]!.title}`, "i"),
    });
    const nextButton = screen.getByRole("button", {
      name: new RegExp(`Switch to next project: ${PROJECTS_ARCHIVE[1]!.title}`, "i"),
    });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // Click next
    fireEvent.click(nextButton);

    // Active project state changed: prev project is now JoSan Website
    expect(
      screen.getByRole("button", {
        name: new RegExp(`Switch to previous project: ${PROJECTS_ARCHIVE[0]!.title}`, "i"),
      }),
    ).toBeInTheDocument();
  });

  it("supports keyboard navigation with arrow keys", () => {
    const handleOpenDetail = vi.fn();
    render(
      <ProjectsStageView
        projects={PROJECTS_ARCHIVE}
        onOpenDetail={handleOpenDetail}
      />,
    );

    // Press ArrowRight to go forward
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(
      screen.getByRole("button", {
        name: new RegExp(`Switch to previous project: ${PROJECTS_ARCHIVE[0]!.title}`, "i"),
      }),
    ).toBeInTheDocument();

    // Press ArrowLeft to go back
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(
      screen.getByRole("button", {
        name: new RegExp(`Switch to next project: ${PROJECTS_ARCHIVE[1]!.title}`, "i"),
      }),
    ).toBeInTheDocument();
  });

  it("renders full team and role information without truncation", () => {
    const handleOpenDetail = vi.fn();
    const acemcProject = PROJECTS_ARCHIVE.find((p) =>
      p.title.includes("ACEMC"),
    )!;

    render(
      <ProjectsStageView
        projects={[acemcProject]}
        onOpenDetail={handleOpenDetail}
      />,
    );

    // Full role and full team name should be completely present
    expect(screen.getByText(acemcProject.role)).toBeInTheDocument();
    expect(screen.getByText(acemcProject.team)).toBeInTheDocument();
  });

  it("renders empty state when projects array is empty", () => {
    const handleOpenDetail = vi.fn();
    render(
      <ProjectsStageView projects={[]} onOpenDetail={handleOpenDetail} />,
    );

    expect(
      screen.getByText("No projects available matching this filter."),
    ).toBeInTheDocument();
  });
});
