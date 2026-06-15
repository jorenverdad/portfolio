'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export interface SocialLink {
  readonly name: string;
  readonly href: string;
}

export interface FooterProps {
  readonly className?: string;
  readonly socialLinks?: ReadonlyArray<SocialLink>;
}

const DEFAULT_SOCIAL_LINKS: ReadonlyArray<SocialLink> = [
  { name: 'Twitter', href: '#' },
  { name: 'GitHub', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'Dribbble', href: '#' },
] as const;

export function Footer({
  className,
  socialLinks = DEFAULT_SOCIAL_LINKS,
}: FooterProps) {
  const [year, setYear] = useState('2026');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className={`bg-bg-base border-t border-edge-subtle py-12 relative overflow-hidden ${className ?? ''}`}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm font-sans">
            &copy; {year} Joren. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
