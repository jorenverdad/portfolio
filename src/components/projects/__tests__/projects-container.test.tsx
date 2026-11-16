import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectsContainer } from "../projects-container";

const mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => "/projects",
  useSearchParams: () => mockSearchParams,
}));

describe("ProjectsContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams.delete("id");
    mockSearchParams.delete("project");

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the hero heading and project cards by default", () => {
    render(<ProjectsContainer />);

    expect(
      screen.getByRole("heading", {
        name: /engineered systems & creative interfaces\./i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("JoSan Website")).toBeInTheDocument();
    expect(screen.getByText("VzStellar Website")).toBeInTheDocument();
    expect(screen.getByText("ACEMC Enterprise HRIS")).toBeInTheDocument();
  });

  it("filters projects when a category pill is clicked", () => {
    render(<ProjectsContainer />);

    // Click "Mobile App" category pill
    const mobilePill = screen.getByRole("button", { name: /mobile app/i });
    fireEvent.click(mobilePill);

    // "Uwu Hotel Booking" should be visible
    expect(screen.getByText("Uwu Hotel Booking")).toBeInTheDocument();

    // "VzStellar Website" (Full-stack) should not be visible
    expect(screen.queryByText("VzStellar Website")).not.toBeInTheDocument();
  });

  it("filters projects according to text search", () => {
    render(<ProjectsContainer />);

    const searchInput = screen.getByRole("textbox", {
      name: /search projects by name/i,
    });

    fireEvent.change(searchInput, { target: { value: "Payroll" } });

    expect(screen.getByText("ACEMC Enterprise HRIS")).toBeInTheDocument();
    expect(screen.queryByText("JoSan Website")).not.toBeInTheDocument();
  });

  it("shows an empty state when no projects match the search query and allows reset", () => {
    render(<ProjectsContainer />);

    const searchInput = screen.getByRole("textbox", {
      name: /search projects by name/i,
    });

    fireEvent.change(searchInput, {
      target: { value: "NonExistentTechnology12345" },
    });

    expect(
      screen.getByText("No matching projects found"),
    ).toBeInTheDocument();

    const resetButton = screen.getByRole("button", {
      name: /clear all filters/i,
    });
    fireEvent.click(resetButton);

    expect(screen.getByText("JoSan Website")).toBeInTheDocument();
  });

  it("opens the detail modal when 'Case Study' is clicked", () => {
    render(<ProjectsContainer />);

    const caseStudyButtons = screen.getAllByRole("button", {
      name: /case study/i,
    });
    expect(caseStudyButtons.length).toBeGreaterThan(0);

    fireEvent.click(caseStudyButtons[0]!);

    // Dialog title should match the first project
    expect(
      screen.getByRole("heading", { name: "JoSan Website" }),
    ).toBeInTheDocument();

    // Problem and solution sections should be visible
    expect(screen.getByText("The Challenge")).toBeInTheDocument();
    expect(screen.getByText("The Engineering Solution")).toBeInTheDocument();
    expect(
      screen.getByText("What I Built & Personally Delivered"),
    ).toBeInTheDocument();
  });

  it("switches to the Interactive Showcase Stage view mode when the stage button is clicked", () => {
    render(<ProjectsContainer />);

    const stageButton = screen.getByRole("button", {
      name: /interactive showcase stage view/i,
    });
    fireEvent.click(stageButton);

    expect(screen.getByText(/featured build/i)).toBeInTheDocument();
    expect(screen.getByText(/deep dive case study/i)).toBeInTheDocument();
  });
});
