"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { Terminal, X } from "lucide-react";
import { MdConstruction } from "react-icons/md";
import { cn } from "@/lib/utils";

export interface WorkInProgressProps {
  readonly children: React.ReactElement<{
    className?: string;
    onClick?: React.MouseEventHandler;
  }>;
  readonly title?: string;
  readonly description?: string;
  readonly featureName?: string;
  readonly status?: string;
  readonly position?: "top" | "bottom" | "left" | "right";
  readonly className?: string;
}

export function WorkInProgress({
  children,
  title = "Refining the Light Theme",
  description = "I am hand-crafting a tailored light mode to match the dark theme's design standards. I am currently tuning every shadow density, border oklch value, and contrast ratio to ensure a pristine viewing experience. Stay tuned!",
  featureName = "Light Mode",
  status = "Under Construction",
  position = "bottom",
  className,
}: WorkInProgressProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-4",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-4",
    left: "right-full top-1/2 -translate-y-1/2 mr-4",
    right: "left-full top-1/2 -translate-y-1/2 ml-4",
  };

  const tooltipVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: position === "bottom" ? -15 : position === "top" ? 15 : 0,
      x: position === "right" ? -15 : position === "left" ? 15 : 0,
      rotateX: position === "bottom" ? -20 : position === "top" ? 20 : 0,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: position === "bottom" ? -10 : position === "top" ? 10 : 0,
      x: position === "right" ? -10 : position === "left" ? 10 : 0,
      filter: "blur(5px)",
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const triggerElement = React.cloneElement(children, {
    onClick: handleTriggerClick,
    className: cn(
      children.props.className,
      "cursor-pointer",
      isOpen &&
        "border-brand-500 text-brand-500 shadow-[0_0_15px_rgba(var(--color-brand-500),0.3)] transition-all duration-300",
    ),
  });

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      style={{ perspective: "1000px" }}
    >
      {triggerElement}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              transformOrigin:
                position === "bottom"
                  ? "top center"
                  : position === "top"
                    ? "bottom center"
                    : "center",
            }}
            className={cn(
              "absolute z-50 w-72 sm:w-[340px] p-[1px] rounded-[16px] pointer-events-auto overflow-hidden",
              positionClasses[position],
              className,
            )}
          >
            {/* Animated Gradient Border */}
            <motion.div
              className="absolute inset-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,var(--color-brand-500)_20%,transparent_40%)] opacity-70"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner Container */}
            <div className="relative h-full w-full rounded-[15px] bg-bg-surface/95 backdrop-blur-3xl p-5 border border-white/5 flex flex-col gap-4 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              {/* Noise Texture Overlay */}
              <div
                className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none rounded-[15px]"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
              ></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-4">
                {/* Top Bar: System Status */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <MdConstruction className="size-5.5 text-amber-500" />
                    <span className="font-mono text-[11px] text-amber-500 uppercase tracking-[0.2em] flex items-center gap-2">
                      {status}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Title & Target */}
                <div className="mt-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-500 uppercase tracking-widest mb-1.5 opacity-80">
                    <Terminal className="size-3.5 text-brand-500" />
                    {featureName}
                  </div>
                  <h4 className="text-xl font-bold text-white font-heading leading-tight tracking-tight">
                    {title}
                  </h4>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed font-sans mt-1">
                  {description}
                </p>

                {/* Tech Progress Bar */}
                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex justify-between font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                    <span>Building</span>
                    <span className="text-brand-500">75%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-brand-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "75%" }}
                      transition={{
                        delay: 0.4,
                        duration: 1.8,
                        ease: "circOut",
                      }}
                    />
                    {/* Scanning line effect */}
                    <motion.div
                      className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      animate={{ x: ["-100%", "300%"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
