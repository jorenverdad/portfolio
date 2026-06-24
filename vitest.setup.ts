import "@testing-library/jest-dom";
import { vi } from "vitest";

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
  listeners: Record<string, Array<(e: any) => void>> = {};
  readyState: number = 0; // 0 = CONNECTING, 1 = OPEN, 2 = CLOSED

  static instances: MockEventSource[] = [];

  constructor(url: string) {
    this.url = url;
    MockEventSource.instances.push(this);
  }

  addEventListener(event: string, cb: (e: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(cb);
  }

  removeEventListener(event: string, cb: (e: any) => void) {
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
    handlers.forEach((h) => h({} as any));
  }

  emitMessage(data: any) {
    const ev = {
      data: typeof data === "string" ? data : JSON.stringify(data),
    } as MessageEvent;
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
    handlers.forEach((h) => h({} as any));
  }

  static clearInstances() {
    MockEventSource.instances = [];
  }
}

global.EventSource = MockEventSource as any;
// Expose on window for components running in JSDOM
if (typeof window !== "undefined") {
  (window as any).EventSource = MockEventSource;
}
