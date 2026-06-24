import { describe, it, expect, beforeEach, vi } from "vitest";
import fs from "fs/promises";
import { getCount, incrementCount, subscribeToCount } from "../db-count";
import type { EventEmitter } from "events";

type DbState = {
  count: number;
  emitter: EventEmitter;
  isLoaded: boolean;
  writePromise: Promise<void>;
};

vi.mock("fs/promises", () => ({
  default: {
    readFile: vi.fn(),
    writeFile: vi.fn(),
  },
}));

describe("db-count utility", () => {
  beforeEach(() => {
    // Reset the properties of the global state object in-place to ensure test isolation
    const globalState = (globalThis as unknown as { __count_db_state__?: DbState }).__count_db_state__;
    if (globalState) {
      globalState.count = 0;
      globalState.isLoaded = false;
      globalState.writePromise = Promise.resolve();
      if (globalState.emitter) {
        globalState.emitter.removeAllListeners();
      }
    }
    vi.clearAllMocks();
  });

  describe("getCount", () => {
    it("should read the count from the database file if it exists", async () => {
      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify({ count: 123 }));

      const count = await getCount();

      expect(count).toBe(123);
      expect(fs.readFile).toHaveBeenCalledTimes(1);
      expect(fs.readFile).toHaveBeenCalledWith(
        expect.stringContaining("db-count.json"),
        "utf-8"
      );
    });

    it("should default to 0 and create the file if it does not exist", async () => {
      // Simulate file-not-found error
      vi.mocked(fs.readFile).mockRejectedValue(new Error("ENOENT: no such file or directory"));
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const count = await getCount();

      expect(count).toBe(0);
      expect(fs.readFile).toHaveBeenCalledTimes(1);
      expect(fs.writeFile).toHaveBeenCalledTimes(1);
      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining("db-count.json"),
        expect.stringContaining('"count": 0')
      );
    });
  });

  describe("incrementCount", () => {
    it("should increment the count and trigger a write to the database file", async () => {
      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify({ count: 10 }));
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const newCount = await incrementCount();

      expect(newCount).toBe(11);

      // Verify state was updated in memory immediately
      const currentCount = await getCount();
      expect(currentCount).toBe(11);

      // Verify disk write was queued. Wait for potential promises to resolve in the background
      // since the write is done asynchronously in the queue without blocking the return.
      const state = (globalThis as unknown as { __count_db_state__?: DbState }).__count_db_state__;
      if (state) {
        await state.writePromise;
      }

      expect(fs.writeFile).toHaveBeenCalledTimes(1);
      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining("db-count.json"),
        expect.stringContaining('"count": 11')
      );
    });
  });

  describe("subscribeToCount", () => {
    it("should notify subscribers when the count is incremented", async () => {
      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify({ count: 5 }));
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const callback1 = vi.fn();
      const callback2 = vi.fn();

      const unsubscribe1 = subscribeToCount(callback1);
      const unsubscribe2 = subscribeToCount(callback2);

      await incrementCount();

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback1).toHaveBeenCalledWith(6);
      expect(callback2).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledWith(6);

      // Unsubscribe callback1
      unsubscribe1();

      await incrementCount();

      expect(callback1).toHaveBeenCalledTimes(1); // Still 1
      expect(callback2).toHaveBeenCalledTimes(2); // Incremented to 2
      expect(callback2).toHaveBeenLastCalledWith(7);

      // Cleanup remaining subscription
      unsubscribe2();
    });
  });
});
