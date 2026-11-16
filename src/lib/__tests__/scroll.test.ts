import { describe, it, expect, vi, beforeEach } from 'vitest';
import { scrollToTop } from '../scroll';

describe('scrollToTop', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('scrolls to top with smooth behavior by default', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

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

    const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');

    scrollToTop();

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'lazy-mount-trigger' })
    );
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('scrolls to top with auto behavior when prefers-reduced-motion matches', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    scrollToTop();

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'auto',
    });
  });
});
