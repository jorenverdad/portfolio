import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MagneticTextParticles } from '../magnetic-text-particles';

describe('MagneticTextParticles Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders fallback stylized text in non-WebGL / SSR environment', () => {
    render(<MagneticTextParticles text="JOREN" />);
    const textElement = screen.getByText('JOREN');
    expect(textElement).toBeDefined();
    expect(textElement.className).toContain('bg-gradient-to-b');
    expect(textElement.className).toContain('to-transparent');
    expect(textElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders custom text properly in fallback mode', () => {
    render(<MagneticTextParticles text="CUSTOM_TEXT" />);
    expect(screen.getByText('CUSTOM_TEXT')).toBeDefined();
  });

  it('applies custom className to the wrapper element', () => {
    const { container } = render(
      <MagneticTextParticles text="JOREN" className="custom-test-class" />
    );
    const wrapper = container.querySelector('.custom-test-class');
    expect(wrapper).toBeDefined();
  });
});
