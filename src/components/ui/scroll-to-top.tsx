'use client';

import React, { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from '@/lib/scroll';

export interface ScrollToTopProps {
  readonly threshold?: number;
  readonly className?: string;
}

export function ScrollToTop({ threshold = 350, className = '' }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Motion-managed scroll position and progress (updates outside React render cycle)
  const { scrollY, scrollYProgress } = useScroll();

  // Physics-based spring smoothing for the progress ring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  // Only update React state when crossing the visibility threshold (prevents re-renders during scrolling)
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const nextVisible = latest > threshold;
    if (nextVisible !== isVisible) {
      setIsVisible(nextVisible);
    }
  });

  // Fallback initial check and window scroll event listener for environments where Motion events need a nudge
  useEffect(() => {
    const checkScroll = () => {
      const currentY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsVisible(currentY > threshold);
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [threshold]);

  // Observer to smoothly hide the floating button when the footer is reached
  useEffect(() => {
    const footerElement = document.getElementById('site-footer');
    if (!footerElement || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(footerElement);
    return () => observer.disconnect();
  }, []);

  const shouldShow = isVisible && !isFooterVisible;

  return (
    <div className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 ${className}`}>
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            key="floating-scroll-to-top"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.75, y: 16 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.75, y: 16 }
            }
            transition={{
              type: 'spring',
              bounce: shouldReduceMotion ? 0 : 0.25,
              visualDuration: 0.3,
            }}
          >
            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              aria-label="Scroll to top of page"
              className="group relative flex size-11 md:size-12 items-center justify-center rounded-full bg-bg-surface/85 backdrop-blur-md border border-edge-subtle/80 shadow-lg shadow-black/5 hover:border-brand-500/50 hover:bg-bg-surface hover:shadow-brand-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors duration-200 select-none cursor-pointer"
            >
              {/* Circular SVG Scroll Progress Ring managed natively by Motion */}
              <svg
                className="absolute inset-0 size-full -rotate-90 pointer-events-none p-0.5"
                viewBox="0 0 44 44"
                aria-hidden="true"
              >
                {/* Background track */}
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  className="stroke-edge-subtle/40 fill-none"
                  strokeWidth="2.5"
                />
                {/* Reactive Progress Ring with GPU pathLength animation */}
                <motion.circle
                  cx="22"
                  cy="22"
                  r="18"
                  className="stroke-brand-500 fill-none"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    pathLength: shouldReduceMotion ? scrollYProgress : smoothProgress,
                  }}
                />
              </svg>

              {/* Upward Arrow Icon with spring hover micro-interaction */}
              <motion.div
                className="relative z-10 flex items-center justify-center"
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              >
                <ArrowUp className="size-4 md:size-4.5 text-foreground/80 transition-colors duration-200 group-hover:text-brand-500" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
