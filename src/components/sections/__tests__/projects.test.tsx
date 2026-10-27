import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ProjectsSection } from "../projects";

describe("ProjectsSection", () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("min-width"),
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
    vi.useRealTimers();
  });

  it("renders section heading and all project titles", () => {
    render(<ProjectsSection />);

    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getByText("Projects.")).toBeInTheDocument();
    expect(screen.getByText("JoSan Website")).toBeInTheDocument();
    expect(screen.getByText("VzStellar Website")).toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("JoSan Extension")).toBeInTheDocument();
    expect(screen.getByText("Uwu Hotel Booking")).toBeInTheDocument();
  });

  it("renders static poster images for all projects so cards are never blank", () => {
    const { container } = render(<ProjectsSection />);

    // Check that img tags are rendered for poster images
    const images = container.querySelectorAll("img");
    expect(images.length).toBeGreaterThanOrEqual(5);
  });

  it("does not mount video elements when cards are in initial inactive state", () => {
    const { container } = render(<ProjectsSection />);

    const videos = container.querySelectorAll("video");
    expect(videos.length).toBe(0);
  });

  it("mounts video only after hover-intent debounce period when hovered", () => {
    vi.useFakeTimers();
    const { container } = render(<ProjectsSection />);

    const joSanTitle = screen.getByText("JoSan Website");
    const card = joSanTitle.closest('[tabindex="0"]');
    expect(card).not.toBeNull();

    // Trigger hover
    act(() => {
      fireEvent.mouseEnter(card!);
    });

    // Immediately after hover (< 250ms), video should NOT be mounted yet
    expect(container.querySelectorAll("video").length).toBe(0);

    // Fast-forward past the 250ms hover-intent delay
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Now the video element should be mounted
    const videos = container.querySelectorAll("video");
    expect(videos.length).toBe(1);
    expect(videos[0]!.getAttribute("src")).toContain("JoSan");

    // Unhovering should cleanly unmount the video
    act(() => {
      const accordion = card?.parentElement;
      if (accordion) {
        fireEvent.mouseLeave(accordion);
      }
    });

    // Fast-forward
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(container.querySelectorAll("video").length).toBe(0);
  });
});
