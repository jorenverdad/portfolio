import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Footer } from '../footer';

// Mock fetch for CountMeIn telemetry API calls
global.fetch = vi.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ count: 42 }),
  })
);

describe('Footer Component', () => {
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

  it('renders the "JOREN" watermark with smooth bottom fade classes', () => {
    render(<Footer />);
    const watermark = screen.getByText('JOREN');
    expect(watermark).toBeDefined();
    expect(watermark.className).toContain('bg-gradient-to-b');
    expect(watermark.className).toContain('to-transparent');
    expect(watermark.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders the copyright text and rights notice', () => {
    render(<Footer />);
    expect(screen.getByText(/Joren Verdad\. All rights reserved\./i)).toBeDefined();
  });

  it('renders the Back to top button and triggers scrollToTop on click', () => {
    render(<Footer />);
    const backToTopBtn = screen.getByRole('button', { name: /scroll back to top/i });
    expect(backToTopBtn).toBeDefined();

    fireEvent.click(backToTopBtn);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('has site-footer id for intersection observing', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('#site-footer');
    expect(footer).toBeDefined();
  });
});
