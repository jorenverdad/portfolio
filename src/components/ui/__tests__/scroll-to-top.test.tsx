import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ScrollToTop } from '../scroll-to-top';

describe('ScrollToTop Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.scrollTo = vi.fn();
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

  it('initially does not render button when scrollY is below threshold', () => {
    render(<ScrollToTop threshold={200} />);
    const button = screen.queryByRole('button', { name: /scroll to top of page/i });
    expect(button).toBeNull();
  });

  it('renders and becomes visible when scrollY exceeds threshold', () => {
    render(<ScrollToTop threshold={200} />);

    // Simulate scroll past threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 350, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: /scroll to top of page/i });
    expect(button).toBeDefined();
  });

  it('triggers scrollToTop when clicked', () => {
    render(<ScrollToTop threshold={100} />);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 250, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: /scroll to top of page/i });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
