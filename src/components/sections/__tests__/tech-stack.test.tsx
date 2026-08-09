import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import {
  TechStackSection,
  CATEGORIES,
  TECH_STACK,
} from '../tech-stack';

describe('TechStackSection', () => {
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

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    // Default matchMedia mock (desktop)
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

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('exports valid categories and tech stack data constants', () => {
    expect(CATEGORIES).toHaveLength(9);
    expect(CATEGORIES).toContain('Frontend');
    expect(CATEGORIES).toContain('Backend');
    expect(CATEGORIES).toContain('Tools');
    expect(CATEGORIES).toContain('Agentic IDEs');
    expect(CATEGORIES).toContain('OS');
    expect(TECH_STACK.length).toBe(49);
  });

  it('includes newly added tech-stack-icons (Vitest, Sentry, Antigravity, Claude Code, Codex, Cursor, Copilot) without Husky', () => {
    const names = TECH_STACK.map((t) => t.name);
    expect(names).toContain('Vitest');
    expect(names).toContain('Sentry');
    expect(names).toContain('Antigravity');
    expect(names).toContain('Claude Code');
    expect(names).toContain('Codex');
    expect(names).toContain('Cursor');
    expect(names).toContain('Copilot');
    expect(names).not.toContain('Husky');
  });

  it('renders section title, description and toggle buttons', () => {
    render(<TechStackSection />);

    expect(screen.getByText('Stack.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /grid/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /list/i })).toBeInTheDocument();
  });

  it('renders grid view with tech stack items by default', () => {
    render(<TechStackSection />);

    expect(screen.getAllByText('TypeScript').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Vitest').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Antigravity').length).toBeGreaterThanOrEqual(1);
  });

  it('switches to list view and displays categories when list button is clicked', async () => {
    render(<TechStackSection />);

    const listButton = screen.getByRole('button', { name: /list/i });

    await act(async () => {
      fireEvent.click(listButton);
    });

    // In list view, all categories including Agentic IDEs should be displayed
    CATEGORIES.forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });

    expect(window.localStorage.setItem).toHaveBeenCalledWith('tech-stack-view', 'list');
  });

  it('restores view mode preference from localStorage on initial render', () => {
    store['tech-stack-view'] = 'list';

    render(<TechStackSection />);

    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Agentic IDEs')).toBeInTheDocument();
  });
});
