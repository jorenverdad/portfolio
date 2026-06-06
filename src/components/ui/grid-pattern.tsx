import React from 'react';
import { cn } from '@/lib/utils';

export interface GridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function GridPattern({ className, ...props }: GridPatternProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 pointer-events-none opacity-20",
        "bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]",
        "bg-[size:4rem_4rem]",
        "[mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]",
        className
      )}
      {...props}
    />
  );
}
