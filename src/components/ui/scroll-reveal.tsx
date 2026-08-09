"use client";

import React, { useMemo } from "react";
import {
  m,
  LazyMotion,
  domAnimation,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly duration?: number;
  readonly yOffset?: number;
  readonly blur?: number;
  readonly threshold?: number;
  readonly rootMargin?: string;
  readonly once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  yOffset = 30,
  blur = 10,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  once = true,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : yOffset,
        filter: shouldReduceMotion ? "none" : `blur(${blur}px)`,
      },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: shouldReduceMotion
          ? { duration: 0.3 }
          : {
              type: "spring",
              bounce: 0,
              duration,
              delay,
            },
      },
    }),
    [shouldReduceMotion, yOffset, blur, duration, delay],
  );

  const viewportConfig = useMemo(
    () => ({
      once,
      amount: threshold,
      margin: rootMargin,
    }),
    [once, threshold, rootMargin],
  );

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={viewportConfig}
        className={cn(className)}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
