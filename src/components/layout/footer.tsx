import React from 'react';
import { CountMeIn } from '@/components/layout/count-me-in';
import { FooterScrollTop } from '@/components/layout/footer-scroll-top';
import { CurrentYear } from '@/components/ui/current-year';
import { MagneticTextParticles } from '@/components/layout/magnetic-text-particles';

export interface FooterProps {
  readonly className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      id="site-footer"
      className={`bg-bg-base border-t border-edge-subtle pt-12 pb-8 relative overflow-hidden ${
        className ?? ''
      }`}
    >
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Interactive Three.js magnetic particle watermark with silky bottom fade */}
        <div className="w-full flex justify-center select-none overflow-hidden mb-4">
          <MagneticTextParticles text="JOREN" />
        </div>

        {/* Footer controls & copyright bar */}
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm font-sans order-3 md:order-1 text-center md:text-left">
            &copy; <CurrentYear /> Joren Verdad. All rights reserved.
          </p>

          <div className="order-1 md:order-2">
            <FooterScrollTop />
          </div>

          <div className="order-2 md:order-3">
            <CountMeIn />
          </div>
        </div>
      </div>
    </footer>
  );
}
