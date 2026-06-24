import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import type { Mock } from "vitest";
import {
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import { CountMeIn } from "../count-me-in";

describe("CountMeIn Component", () => {
  let mockFetch: Mock<typeof fetch>;

  beforeEach(() => {
    // Reset global EventSource mock instances
    (global.EventSource as unknown as { clearInstances: () => void }).clearInstances();

    // Setup global fetch mock
    mockFetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      if (url === "/api/count") {
        if (options?.method === "POST") {
          return Promise.resolve({
            ok: true,
            json: async () => ({ count: 101 }),
          } as Response);
        }
        // GET request
        return Promise.resolve({
          ok: true,
          json: async () => ({ count: 100 }),
        } as Response);
      }
      return Promise.reject(new Error("Unknown URL"));
    });

    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should render initial loading state and then fetch the current count", async () => {
    render(<CountMeIn />);

    // Initial state before fetch resolves should show placeholder
    expect(screen.getByText("---")).toBeInTheDocument();
    expect(screen.getByText("Visitors")).toBeInTheDocument();

    // Wait for the fetch to resolve and the UI to update to 100
    const countElement = await screen.findByText("100");
    expect(countElement).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledWith("/api/count");
  });

  it("should establish an SSE connection and update count dynamically on message", async () => {
    render(<CountMeIn />);

    // Wait for initial fetch
    await screen.findByText("100");

    // EventSource should have been instantiated
    const EventSourceClass = global.EventSource as unknown as {
      instances: Array<{
        url: string;
        emitOpen: () => void;
        emitMessage: (data: unknown) => void;
        emitError: () => void;
      }>;
    };
    expect(EventSourceClass.instances.length).toBe(1);
    const eventSourceInstance = EventSourceClass.instances[0];
    if (!eventSourceInstance) {
      throw new Error("EventSource instance not found");
    }
    expect(eventSourceInstance.url).toBe("/api/count");

    // Simulate SSE connection open
    act(() => {
      eventSourceInstance.emitOpen();
    });

    // Simulate an SSE message event carrying count 150
    act(() => {
      eventSourceInstance.emitMessage({ count: 150 });
    });

    // UI should update to show 150
    const updatedCountElement = await screen.findByText("150");
    expect(updatedCountElement).toBeInTheDocument();
  });

  it("should optimistically update count and send a POST request on click", async () => {
    render(<CountMeIn />);

    await screen.findByText("100");

    const button = screen.getByRole("button", { name: /count me in/i });

    // Click the button
    await act(async () => {
      fireEvent.click(button);
    });

    // Should optimistically update to 101 immediately in the UI
    expect(screen.getByText("101")).toBeInTheDocument();

    // Verify POST was dispatched
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/count",
      expect.objectContaining({
        method: "POST",
      }),
    );
  });

  it("should fallback to polling when the SSE connection encounters an error", async () => {
    render(<CountMeIn />);

    // Resolve initial fetch first
    await screen.findByText("100");

    const EventSourceClass = global.EventSource as unknown as {
      instances: Array<{
        url: string;
        emitOpen: () => void;
        emitMessage: (data: unknown) => void;
        emitError: () => void;
      }>;
    };
    const eventSourceInstance = EventSourceClass.instances[0];
    if (!eventSourceInstance) {
      throw new Error("EventSource instance not found");
    }

    // Enable fake timers specifically for the polling ticks
    vi.useFakeTimers();
    mockFetch.mockClear();

    // Simulate SSE error
    act(() => {
      eventSourceInstance.emitError();
    });

    // Advance fake timers by 3000ms (the polling interval)
    // Using asynchronous timer advancement under act to resolve pending microtasks cleanly
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });

    // It should have triggered a polling REST request to GET /api/count
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenLastCalledWith("/api/count");

    // Advance by another 3000ms
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });
    expect(mockFetch).toHaveBeenCalledTimes(2);

    // Restore real timers for other tests
    vi.useRealTimers();
  });
});

