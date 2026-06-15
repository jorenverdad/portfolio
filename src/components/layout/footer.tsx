'use client';

import React, { useEffect, useState } from 'react';
import { CountMeIn } from '@/components/layout/count-me-in';

export interface FooterProps {
  readonly className?: string;
}

export function Footer({
  className,
}: FooterProps) {
  const [year, setYear] = useState('2026');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className={`bg-bg-base border-t border-edge-subtle py-8 relative overflow-hidden ${className ?? ''}`}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm font-sans">
            &copy; {year} Joren. All rights reserved.
          </p>
          
          <CountMeIn />
        </div>
      </div>
    </footer>
  );
}

