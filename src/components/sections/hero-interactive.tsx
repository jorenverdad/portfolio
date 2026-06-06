'use client';

import { useEffect, useState, ReactNode } from 'react';

export interface HeroInteractiveProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function HeroInteractive({ children, className }: HeroInteractiveProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Add a slight delay for a premium feel
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      } flex flex-col items-center ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
