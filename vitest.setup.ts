import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { vi, expect } from "vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect matchers type definitions
declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Assertion<T> extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
}

// Extend Vitest's expect matchers at runtime
expect.extend(matchers);

// Mock Next.js cache functions globally
vi.mock("next/cache", () => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
  revalidateTag: vi.fn(),
  revalidatePath: vi.fn(),
}));

// Mock EventSource globally for JSDOM/Node testing
class MockEventSource {
  url: string;
  onopen: (() => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: (() => void) | null = null;
  listeners: Record<string, Array<(e: Event) => void>> = {};
  readyState: number = 0; // 0 = CONNECTING, 1 = OPEN, 2 = CLOSED

  static instances: MockEventSource[] = [];

  constructor(url: string) {
    this.url = url;
    MockEventSource.instances.push(this);
  }

  addEventListener(event: string, cb: (e: Event) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(cb);
  }

  removeEventListener(event: string, cb: (e: Event) => void) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((x) => x !== cb);
  }

  close() {
    this.readyState = 2; // CLOSED
  }

  // Test helpers to trigger events
  emitOpen() {
    this.readyState = 1; // OPEN
    if (this.onopen) {
      this.onopen();
    }
    const handlers = this.listeners["open"] || [];
    const ev = new Event("open");
    handlers.forEach((h) => h(ev));
  }

  emitMessage(data: unknown) {
    const ev = new MessageEvent("message", {
      data: typeof data === "string" ? data : JSON.stringify(data),
    });
    if (this.onmessage) {
      this.onmessage(ev);
    }
    const handlers = this.listeners["message"] || [];
    handlers.forEach((h) => h(ev));
  }

  emitError() {
    if (this.onerror) {
      this.onerror();
    }
    const handlers = this.listeners["error"] || [];
    const ev = new Event("error");
    handlers.forEach((h) => h(ev));
  }

  static clearInstances() {
    MockEventSource.instances = [];
  }
}

global.EventSource = MockEventSource as unknown as typeof EventSource;
// Expose on window for components running in JSDOM
if (typeof window !== "undefined") {
  (window as unknown as { EventSource: typeof EventSource }).EventSource = MockEventSource as unknown as typeof EventSource;
}

// Mock IntersectionObserver globally for JSDOM
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "0px";
  readonly thresholds: readonly number[] = [0];

  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn(() => []);
  unobserve = vi.fn();

  constructor(
    public callback?: IntersectionObserverCallback,
    public options?: IntersectionObserverInit
  ) {}
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
if (typeof window !== "undefined") {
  (window as unknown as { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
}

