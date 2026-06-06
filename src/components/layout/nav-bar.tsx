'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Dialog } from '@base-ui/react/dialog';
import { Menu, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';

export interface NavBarLink {
  readonly label: string;
  readonly href: string;
}

export interface NavBarProps {
  readonly links?: ReadonlyArray<NavBarLink>;
  readonly className?: string;
}

const DEFAULT_LINKS: ReadonlyArray<NavBarLink> = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Project', href: '#projects' },
  { label: 'Service', href: '#service' },
  { label: 'Testimonial', href: '#testimonial' },
  { label: 'Contact', href: '#contact' },
] as const;

export function NavBar({ links = DEFAULT_LINKS, className }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [resizeKey, setResizeKey] = useState(0);
  
  const [pillStyle, setPillStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Theme synchronization and handler
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme as 'light' | 'dark');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Resize listener to re-evaluate pill position
  useEffect(() => {
    const handleResize = () => setResizeKey(prev => prev + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll listener for floating transition & active bottom section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Fallback for reaching the bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for tracking active section
  useEffect(() => {
    const sectionIds = links.map(link => link.href.replace('#', '')).filter(Boolean);
    const elements = sectionIds.map(id => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // trigger when section is in active view
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Only trigger active updates if we aren't near the bottom
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
        if (entry.isIntersecting && !atBottom) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [links]);

  // Position pill style based on active link or hovered link
  useEffect(() => {
    const targetIndex = hoveredIndex !== null 
      ? hoveredIndex 
      : links.findIndex(l => l.href.replace('#', '') === activeSection);

    if (targetIndex !== -1 && linkRefs.current[targetIndex] && navRef.current) {
      const targetEl = linkRefs.current[targetIndex];
      const navEl = navRef.current;
      if (targetEl && navEl) {
        const targetRect = targetEl.getBoundingClientRect();
        const navRect = navEl.getBoundingClientRect();
        
        setPillStyle({
          left: targetRect.left - navRect.left,
          width: targetRect.width,
          opacity: 1,
        });
        return;
      }
    }

    setPillStyle(prev => ({ ...prev, opacity: 0 }));
  }, [hoveredIndex, activeSection, links, resizeKey]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none ${className ?? ''}`}>
      <div className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center bg-bg-surface/65 backdrop-blur-xl backdrop-saturate-150 border border-edge-subtle ${
        isScrolled 
          ? 'w-[calc(100%-2rem)] xl:w-[1024px] mt-4 h-16 rounded-full shadow-lg shadow-black/10 px-6 md:px-8' 
          : 'w-full h-20 rounded-none border-t-transparent border-x-transparent px-6'
      }`}>
        <div className="w-full flex items-center justify-between container mx-auto">
          <Link href="/" className="group font-heading text-2xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-90">
            Joren<span className="inline-block text-brand-500 transition-transform duration-300 ease-out group-hover:scale-130 group-hover:rotate-12 group-hover:translate-x-0.5">.</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav 
            ref={navRef}
            onMouseLeave={() => setHoveredIndex(null)}
            className="hidden md:flex items-center gap-1 relative py-2"
          >
            {/* Sliding Pill Backdrop */}
            <span
              className="absolute h-8 bg-brand-500/10 rounded-full transition-all duration-300 ease-out pointer-events-none"
              style={{
                left: pillStyle.left,
                width: pillStyle.width,
                opacity: pillStyle.opacity,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            {links.map((link, idx) => {
              const isActive = link.href.replace('#', '') === activeSection;
              return (
                <a 
                  key={link.label} 
                  href={link.href}
                  ref={(el) => {
                    linkRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={`relative z-10 px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 ${
                    isActive 
                      ? 'text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/jorenverdad"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden flex items-center gap-2 h-10 px-4 rounded-full border border-edge-default bg-bg-surface/80 hover:bg-bg-elevated hover:border-brand-500 text-muted-foreground hover:text-brand-500 text-sm font-medium transition-all duration-300 group shadow-sm hover:shadow-[0_0_15px_rgba(224,32,32,0.05)] active:scale-95"
            >
              <div className="absolute inset-0 rounded-full bg-brand-500/0 group-hover:bg-brand-500/5 transition-all duration-300 blur-sm" />
              <FaGithub className="relative z-10 size-4.5 transition-all duration-300 group-hover:scale-115 group-hover:rotate-6 text-foreground group-hover:text-brand-500" />
              <span className="relative z-10 text-foreground group-hover:text-brand-500 transition-colors duration-300">GitHub</span>
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="h-10 w-10 rounded-full flex items-center justify-center border border-edge-default bg-bg-surface/80 hover:bg-bg-elevated hover:border-brand-500 text-muted-foreground hover:text-foreground transition-all duration-300 active:scale-95 cursor-pointer relative overflow-hidden group shadow-sm"
            >
              <div className="absolute inset-0 rounded-full bg-brand-500/0 group-hover:bg-brand-500/5 transition-all duration-300 blur-sm" />
              <div className="relative h-5 w-5 flex flex-col items-center justify-center transition-transform duration-500 group-hover:rotate-90">
                <FiMoon className="size-4.5 absolute transition-all duration-300 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-50 text-foreground" />
                <FiSun className="size-4.5 absolute transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 text-brand-500" />
              </div>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-edge-default bg-bg-surface/80 hover:bg-bg-elevated text-foreground transition-all duration-200 active:scale-95 focus:outline-none">
            <Menu className="size-5" />
          </Dialog.Trigger>
          
          <Dialog.Portal>
            {/* Backdrop */}
            <Dialog.Backdrop className="fixed inset-0 z-50 bg-bg-void/80 backdrop-blur-sm transition-opacity duration-300 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
            
            {/* Drawer Content */}
            <Dialog.Popup className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-bg-surface border-l border-edge-subtle p-8 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full">
              <div>
                <div className="flex items-center justify-between mb-12">
                  <span className="font-heading text-2xl font-bold tracking-tight text-foreground">
                    Menu<span className="text-brand-500">.</span>
                  </span>
                  <Dialog.Close className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge-default bg-bg-surface hover:bg-bg-elevated text-foreground transition-all duration-200 active:scale-95 focus:outline-none">
                    <X className="size-5" />
                  </Dialog.Close>
                </div>
                
                <nav className="flex flex-col gap-6">
                  {links.map((link, idx) => {
                    const isActive = link.href.replace('#', '') === activeSection;
                    return (
                      <a 
                        key={link.label} 
                        href={link.href} 
                        onClick={() => setOpen(false)}
                        className={`text-lg font-medium transition-all duration-500 ease-out transform ${
                          isActive 
                            ? 'text-brand-500' 
                            : 'text-muted-foreground hover:text-foreground'
                        } ${
                          open 
                            ? 'translate-x-0 opacity-100' 
                            : 'translate-x-8 opacity-0'
                        }`}
                        style={{
                          transitionDelay: `${idx * 60}ms`
                        }}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className={`flex items-center gap-3 mt-12 transition-all duration-700 ease-out transform ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ transitionDelay: `${links.length * 60}ms` }}>
                <a
                  href="https://github.com/jorenverdad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-edge-default bg-bg-surface hover:bg-bg-elevated hover:border-brand-500 text-muted-foreground hover:text-brand-500 text-base font-medium transition-all duration-300 group"
                >
                  <div className="absolute inset-0 rounded-xl bg-brand-500/0 group-hover:bg-brand-500/5 transition-all duration-300 blur-sm" />
                  <FaGithub className="relative z-10 size-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 text-muted-foreground group-hover:text-brand-500" />
                  <span className="relative z-10 text-muted-foreground group-hover:text-brand-500 transition-colors duration-300">jorenverdad</span>
                </a>
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                  className="h-12 w-12 rounded-xl flex items-center justify-center border border-edge-default bg-bg-surface hover:bg-bg-elevated hover:border-brand-500 text-muted-foreground hover:text-foreground transition-all duration-300 active:scale-95 cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute inset-0 rounded-xl bg-brand-500/0 group-hover:bg-brand-500/5 transition-all duration-300 blur-sm" />
                  <div className="relative h-5 w-5 flex flex-col items-center justify-center transition-transform duration-500 group-hover:rotate-90">
                    <FiMoon className="size-5 absolute transition-all duration-300 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-50 text-foreground" />
                    <FiSun className="size-5 absolute transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 text-brand-500" />
                  </div>
                </button>
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      </div>
    </header>
  );
}

