import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { NavBar } from "../nav-bar";

describe("NavBar Theme Toggle", () => {
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

    document.documentElement.classList.remove("dark", "theme-transitioning");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize with dark theme if documentElement has dark class", () => {
    document.documentElement.classList.add("dark");
    render(<NavBar />);
    const buttons = screen.getAllByRole("button", { name: /toggle dark mode/i });
    expect(buttons.length).toBeGreaterThan(0);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("should toggle to light mode on click, update localStorage and document class", () => {
    document.documentElement.classList.add("dark");
    render(<NavBar />);

    const [desktopBtn] = screen.getAllByRole("button", { name: /toggle dark mode/i });
    expect(desktopBtn).toBeDefined();
    if (!desktopBtn) throw new Error("Desktop button not found");

    act(() => {
      fireEvent.click(desktopBtn);
    });

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");

    act(() => {
      fireEvent.click(desktopBtn);
    });

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
