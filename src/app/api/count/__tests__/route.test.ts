import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET, POST } from "../route";
import { getCount, incrementCount, subscribeToCount } from "@/lib/db-count";

vi.mock("@/lib/db-count", () => ({
  getCount: vi.fn(),
  incrementCount: vi.fn(),
  subscribeToCount: vi.fn(),
}));

describe("Count API Route Handlers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("GET - Standard JSON", () => {
    it("should return the current count as JSON when Accept header is not text/event-stream", async () => {
      vi.mocked(getCount).mockResolvedValue(42);

      const request = new NextRequest("http://localhost/api/count", {
        headers: { accept: "application/json" },
      });

      const response = await GET(request);
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("application/json");

      const body = await response.json();
      expect(body).toEqual({ count: 42 });
      expect(getCount).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST", () => {
    it("should increment count and return the new count as JSON", async () => {
      vi.mocked(incrementCount).mockResolvedValue(99);

      const response = await POST();
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("application/json");

      const body = await response.json();
      expect(body).toEqual({ count: 99 });
      expect(incrementCount).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET - Server-Sent Events (SSE) Stream", () => {
    it("should establish a text/event-stream and send initial and updated counts", async () => {
      vi.mocked(getCount).mockResolvedValue(100);

      let changeCallback: ((count: number) => void) | null = null;
      const mockUnsubscribe = vi.fn();
      
      vi.mocked(subscribeToCount).mockImplementation((cb) => {
        changeCallback = cb;
        return mockUnsubscribe;
      });

      const request = new NextRequest("http://localhost/api/count", {
        headers: { accept: "text/event-stream" },
      });

      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toBe("text/event-stream");
      expect(response.headers.get("cache-control")).toBe("no-cache, no-transform");
      expect(response.headers.get("connection")).toBe("keep-alive");

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      // 1. Verify initial count sent immediately
      const firstChunk = await reader.read();
      expect(firstChunk.done).toBe(false);
      const text1 = decoder.decode(firstChunk.value);
      expect(text1).toBe("data: {\"count\":100}\n\n");
      expect(getCount).toHaveBeenCalledTimes(1);
      expect(subscribeToCount).toHaveBeenCalledTimes(1);

      // 2. Verify SSE enqueues new counts on event subscription trigger
      expect(changeCallback).not.toBeNull();
      if (changeCallback) {
        changeCallback(101);
      }

      const secondChunk = await reader.read();
      expect(secondChunk.done).toBe(false);
      const text2 = decoder.decode(secondChunk.value);
      expect(text2).toBe("data: {\"count\":101}\n\n");

      // 3. Verify client cancel cleans up subscription
      await reader.cancel();
      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });

    it("should send periodic heartbeats to keep the connection alive", async () => {
      vi.useFakeTimers();
      vi.mocked(getCount).mockResolvedValue(50);
      vi.mocked(subscribeToCount).mockReturnValue(vi.fn());

      const request = new NextRequest("http://localhost/api/count", {
        headers: { accept: "text/event-stream" },
      });

      const response = await GET(request);
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      // Read initial count chunk
      await reader.read();

      // Advance timers by 15 seconds to trigger heartbeat
      vi.advanceTimersByTime(15000);

      const heartbeatChunk = await reader.read();
      expect(heartbeatChunk.done).toBe(false);
      const text = decoder.decode(heartbeatChunk.value);
      expect(text).toBe(": heartbeat\n\n");

      await reader.cancel();
    });
  });
});
