'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LazyMountProps {
  children: React.ReactNode;
  minHeight?: string | number;
  rootMargin?: string;
  className?: string;
  id?: string;
}

export function LazyMount({ 
  children, 
  minHeight = '100vh', 
  rootMargin = '200% 0px',
  className,
  id
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

  // Support programmatic mounting when nav items are clicked
  useEffect(() => {
    if (!id) return;

    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail === id) {
        setIsMounted(true);
      }
    };

    window.addEventListener('lazy-mount-trigger', handleTrigger);
    return () => window.removeEventListener('lazy-mount-trigger', handleTrigger);
  }, [id]);

  return (
    <div 
      ref={containerRef} 
      className={className} 
      id={id}
      style={{ minHeight: isMounted ? 'auto' : actualHeight }}
    >
      {isMounted ? children : null}
    </div>
  );
}
