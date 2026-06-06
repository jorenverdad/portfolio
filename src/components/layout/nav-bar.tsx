'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Dialog } from '@base-ui/react/dialog';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  { label: 'Service', href: '#service' },
  { label: 'Project', href: '#projects' },
  { label: 'Testimonial', href: '#testimonial' },
  { label: 'Contact', href: '#contact' },
] as const;

export function NavBar({ links = DEFAULT_LINKS, className }: NavBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 border-b border-edge-subtle bg-bg-surface/60 backdrop-blur-xl ${className ?? ''}`}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-90">
          Joren<span className="text-brand-500">.</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" className="border-edge-default hover:bg-bg-elevated transition-colors duration-200">
            Contact Me
          </Button>
          <Button className="shadow-[0_0_20px_rgba(224,32,32,0.25)] transition-transform duration-200 hover:scale-[1.02]">
            View My Work
          </Button>
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
                  {links.map((link) => (
                    <Link 
                      key={link.label} 
                      href={link.href} 
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-4 mt-12">
                <Button variant="outline" className="w-full h-12 border-edge-default hover:bg-bg-elevated transition-colors duration-200">
                  Contact Me
                </Button>
                <Button className="w-full h-12 shadow-[0_0_20px_rgba(224,32,32,0.25)] transition-transform duration-200 hover:scale-[1.02]">
                  View My Work
                </Button>
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
