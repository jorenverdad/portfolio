import React from 'react';
import { CountMeIn } from '@/components/layout/count-me-in';
import { CurrentYear } from '@/components/ui/current-year';

export interface FooterProps {
  readonly className?: string;
}

export function Footer({
  className,
}: FooterProps) {
  return (
    <footer className={`bg-bg-base border-t border-edge-subtle pt-12 pb-8 relative overflow-hidden ${className ?? ''}`}>
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="w-full flex justify-center pointer-events-none select-none overflow-hidden mb-2">
          <span className="text-[28vw] md:text-[22vw] lg:text-[20vw] font-black leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white/10 via-white/5 to-transparent/0">
            JOREN
          </span>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm font-sans">
            &copy; <CurrentYear /> Joren Verdad. All rights reserved.
          </p>
          
          <CountMeIn />
        </div>
      </div>
    </footer>
  );
}

