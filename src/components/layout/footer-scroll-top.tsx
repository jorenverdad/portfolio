'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from '@/lib/scroll';

export interface FooterScrollTopProps {
  readonly className?: string;
}

export function FooterScrollTop({ className = '' }: FooterScrollTopProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      aria-label="Scroll back to top of page"
      className={`group relative inline-flex h-10 items-center gap-2 rounded-full border border-edge-subtle/70 bg-bg-surface/50 px-4 py-2 text-xs font-mono font-medium tracking-wider uppercase text-muted-foreground transition-colors duration-300 hover:border-brand-500/40 hover:bg-bg-surface/90 hover:text-foreground hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 select-none cursor-pointer ${className}`}
    >
      <span className="transition-colors group-hover:text-foreground">Back to top</span>
      <motion.span
        whileHover={shouldReduceMotion ? {} : { y: -2 }}
        transition={{ type: 'spring', stiffness: 450, damping: 20 }}
        className="flex size-5 items-center justify-center rounded-full bg-foreground/[0.04] dark:bg-white/5 transition-colors duration-300 group-hover:bg-brand-500/10"
      >
        <ArrowUp className="size-3 text-brand-500" />
      </motion.span>
    </motion.button>
  );
}
