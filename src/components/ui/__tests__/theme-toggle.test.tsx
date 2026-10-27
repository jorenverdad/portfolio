import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeToggle } from "../theme-toggle";

describe("ThemeToggle Component", () => {
  let store: Record<string, string> = {};

  beforeEach(() => {
    store = {};
    const localStorageMock = {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value.toString();
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
      configurable: true,
    });

    document.documentElement.classList.remove("dark");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the theme toggle button with accessible aria-label", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /toggle dark mode/i });
    expect(button).toBeInTheDocument();
  });

  it("toggles theme immediately between dark and light without delay", () => {
    document.documentElement.classList.add("dark");
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /toggle dark mode/i });
    const themeChangeSpy = vi.fn();
    window.addEventListener("theme-change", themeChangeSpy);

    // Click to toggle to light
    act(() => {
      fireEvent.click(button);
    });

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
    expect(themeChangeSpy).toHaveBeenCalledWith(
      expect.objectContaining({ detail: "light" }),
    );

    // Click to toggle back to dark
    act(() => {
      fireEvent.click(button);
    });

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(themeChangeSpy).toHaveBeenCalledWith(
      expect.objectContaining({ detail: "dark" }),
    );

    window.removeEventListener("theme-change", themeChangeSpy);
  });
});
