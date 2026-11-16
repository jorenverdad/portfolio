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
    expect(CATEGORIES).toHaveLength(10);
    expect(CATEGORIES).toContain('Frontend');
    expect(CATEGORIES).toContain('Backend');
    expect(CATEGORIES).toContain('DevOps & Cloud');
    expect(CATEGORIES).toContain('Tools');
    expect(CATEGORIES).toContain('Agentic IDEs');
    expect(CATEGORIES).toContain('OS');
    expect(TECH_STACK.length).toBe(58);
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
    expect(names).toContain('Coolify');
    expect(names).toContain('Cloudflare');
    expect(names).toContain('Nginx');
    expect(names).toContain('GitHub Actions');
    expect(names).toContain('Vuetify');
    expect(names).toContain('Pinia');
    expect(names).toContain('Proxmox');
    expect(names).toContain('PHP');
    expect(names).toContain('Sass');
    expect(names).toContain('Nuxt');
    expect(names).not.toContain('Husky');
  });

  it('correctly categorizes DevOps & Cloud items and handles grid visibility flags', () => {
    const devopsItems = TECH_STACK.filter((t) =>
      Array.isArray(t.category)
        ? t.category.includes('DevOps & Cloud')
        : t.category === 'DevOps & Cloud'
    );
    const devopsNames = devopsItems.map((t) => t.name);
    expect(devopsNames).toContain('Docker');
    expect(devopsNames).toContain('Vercel');
    expect(devopsNames).toContain('Coolify');
    expect(devopsNames).toContain('Cloudflare');
    expect(devopsNames).toContain('Nginx');
    expect(devopsNames).toContain('Proxmox');
    expect(devopsNames).toContain('GitHub Actions');
    expect(devopsNames).toContain('Sentry');
    expect(devopsNames).toContain('Linux');

    // Docker, Vercel, and Coolify are preferred
    const docker = TECH_STACK.find((t) => t.name === 'Docker');
    const vercel = TECH_STACK.find((t) => t.name === 'Vercel');
    const coolify = TECH_STACK.find((t) => t.name === 'Coolify');
    expect(docker?.preferred).toBe(true);
    expect(vercel?.preferred).toBe(true);
    expect(coolify?.preferred).toBe(true);

    // GitHub Actions is hidden from grid
    const ghActions = TECH_STACK.find((t) => t.name === 'GitHub Actions');
    expect(ghActions?.hideInGrid).toBe(true);

    // Linux is multi-category
    const linux = TECH_STACK.find((t) => t.name === 'Linux');
    expect(linux?.category).toEqual(['OS', 'DevOps & Cloud']);
    expect(linux?.hideInGrid).toBeUndefined();
  });

  it('renders section title, description and toggle buttons', () => {
    render(<TechStackSection />);

    expect(screen.getByText('Stack.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /grid/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /list/i })).toBeInTheDocument();
  });

  it('renders grid view with tech stack items by default and hides grid-hidden items', () => {
    render(<TechStackSection />);

    expect(screen.getAllByText('TypeScript').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Vitest').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Antigravity').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Coolify').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Cloudflare').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Nginx').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Vuetify').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Pinia').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Proxmox').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('PHP').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Sass').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Nuxt').length).toBeGreaterThanOrEqual(1);

    // GitHub Actions must not appear in grid view
    expect(screen.queryByText('GitHub Actions')).toBeNull();
  });

  it('switches to list view and displays categories when list button is clicked', async () => {
    render(<TechStackSection />);

    const listButton = screen.getByRole('button', { name: /list/i });

    await act(async () => {
      fireEvent.click(listButton);
    });

    // In list view, all categories including DevOps & Cloud should be displayed
    CATEGORIES.forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });

    // GitHub Actions should now be visible in list view
    expect(screen.getByText('GitHub Actions')).toBeInTheDocument();

    expect(window.localStorage.setItem).toHaveBeenCalledWith('tech-stack-view', 'list');
  });

  it('restores view mode preference from localStorage on initial render', () => {
    store['tech-stack-view'] = 'list';

    render(<TechStackSection />);

    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Agentic IDEs')).toBeInTheDocument();
  });
});
