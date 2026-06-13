'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LazyMountProps {
  children: React.ReactNode;
  minHeight?: string | number;
  rootMargin?: string;
  className?: string;
}

export function LazyMount({ 
  children, 
  minHeight = '100vh', 
  rootMargin = '200% 0px',
  className 
}: LazyMountProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [actualHeight, setActualHeight] = useState<number | string>(minHeight);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsMounted(true);
        } else {
          // Record height before unmounting to prevent scrollbar jump
          if (element.offsetHeight > 0) {
            setActualHeight(element.offsetHeight);
          }
          setIsMounted(false);
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={{ minHeight: isMounted ? 'auto' : actualHeight }}
    >
      {isMounted ? children : null}
    </div>
  );
}
