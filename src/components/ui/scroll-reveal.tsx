'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface ScrollRevealProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly threshold?: number;
  readonly rootMargin?: string;
  readonly initialTransform?: string; // e.g. 'translate-y-8' or 'translate-y-12'
  readonly duration?: string; // e.g. 'duration-[1000ms]' or 'duration-700'
}

export function ScrollReveal({
  children,
  className,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  initialTransform = 'translate-y-8',
  duration = 'duration-[1000ms]',
}: ScrollRevealProps) {
  const [hasRevealed, setHasRevealed] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Skip observer if we've already revealed it
    if (hasRevealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setHasRevealed(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, hasRevealed]);

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all ease-[cubic-bezier(0.16,1,0.3,1)] transform motion-reduce:transition-none motion-reduce:transform-none',
        duration,
        hasRevealed ? 'opacity-100 translate-y-0 scale-100' : cn('opacity-0 scale-[0.98]', initialTransform),
        className
      )}
    >
      {children}
    </div>
  );
}
