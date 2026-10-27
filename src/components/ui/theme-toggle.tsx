"use client";

import React, { useSyncExternalStore, useId, useCallback } from "react";
import { motion } from "motion/react";

export interface ThemeToggleProps {
  readonly className?: string;
  readonly size?: "sm" | "md" | "lg";
  readonly variant?: "circle" | "rounded";
}

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("theme-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("theme-change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getThemeSnapshot(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getThemeServerSnapshot(): "light" | "dark" {
  return "dark";
}

function subscribeMounted() {
  return () => {};
}

function getMountedSnapshot() {
  return true;
}

function getMountedServerSnapshot() {
  return false;
}

export function ThemeToggle({
  className = "",
  size = "md",
  variant = "circle",
}: ThemeToggleProps) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );
  const mounted = useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getMountedServerSnapshot,
  );
  const maskId = useId();

  const toggleTheme = useCallback((e?: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    const applyTheme = () => {
      if (nextTheme === "light") {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("theme-change", { detail: nextTheme }),
        );
      }
    };

    const doc = typeof document !== "undefined" ? document : null;
    if (!doc) {
      applyTheme();
      return;
    }

    const isReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const docWithTransition = doc as Document & {
      startViewTransition?: (callback: () => void) => {
        ready: Promise<void>;
        finished: Promise<void>;
      };
    };

    if (
      typeof docWithTransition.startViewTransition !== "function" ||
      isReducedMotion
    ) {
      doc.documentElement.classList.add("theme-transitioning");
      applyTheme();
      setTimeout(() => {
        doc.documentElement.classList.remove("theme-transitioning");
      }, 350);
      return;
    }

    // Origin calculation for radial ripple expansion
    const rect = e?.currentTarget?.getBoundingClientRect();
    const hasCoordinates =
      e &&
      typeof e.clientX === "number" &&
      !(e.clientX === 0 && e.clientY === 0);

    const x = hasCoordinates
      ? e.clientX
      : rect
        ? rect.left + rect.width / 2
        : window.innerWidth / 2;
    const y = hasCoordinates
      ? e.clientY
      : rect
        ? rect.top + rect.height / 2
        : 40;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    doc.documentElement.classList.add("theme-ripple-transition");

    const transition = docWithTransition.startViewTransition(() => {
      applyTheme();
    });

    if (transition && typeof transition.ready?.then === "function") {
      transition.ready
        .then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ];

          try {
            doc.documentElement.animate(
              {
                clipPath,
              },
              {
                duration: 450,
                easing: "cubic-bezier(0.2, 0, 0, 1)",
                pseudoElement: "::view-transition-new(root)",
              },
            );
          } catch {
            // Graceful fallback if pseudoElement animation is not supported
          }
        })
        .catch(() => {});
    }

    if (transition && typeof transition.finished?.finally === "function") {
      transition.finished.finally(() => {
        doc.documentElement.classList.remove("theme-ripple-transition");
      });
    } else {
      setTimeout(() => {
        doc.documentElement.classList.remove("theme-ripple-transition");
      }, 500);
    }
  }, [theme]);

  const sizeClasses = {
    sm: "size-9",
    md: "size-10",
    lg: "size-12",
  }[size];

  const shapeClass = variant === "circle" ? "rounded-full" : "rounded-xl";
  const iconSize = size === "lg" ? 22 : 19;
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className={`group relative flex items-center justify-center cursor-pointer select-none
        border transition-all duration-300 ease-out active:scale-90
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background
        /* Dark mode styling: rich specular glass with subtle glow */
        dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:border-white/10 dark:hover:border-brand-500/50
        dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.35)]
        dark:hover:shadow-[0_0_20px_rgba(224,32,32,0.2),inset_0_1px_1px_rgba(255,255,255,0.18)]
        /* Light mode styling: warm architectural frosted stone */
        bg-black/[0.03] hover:bg-black/[0.06] border-black/[0.08] hover:border-brand-500/50
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.04)]
        hover:shadow-[0_0_18px_rgba(224,32,32,0.15)]
        backdrop-blur-md overflow-hidden ${shapeClass} ${sizeClasses} ${className}`}
    >
      {/* Ambient background bloom on hover */}
      <div
        className={`absolute inset-0 bg-radial from-brand-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xs ${shapeClass}`}
      />

      {/* SVG Morph: Sun / Moon */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={iconSize}
        height={iconSize}
        className="relative z-10 overflow-visible"
        animate={{
          rotate: mounted ? (isDark ? 40 : 0) : 40,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
      >
        <defs>
          <mask id={maskId}>
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <motion.circle
              initial={false}
              animate={{
                cx: mounted ? (isDark ? 16 : 28) : 16,
                cy: mounted ? (isDark ? 7 : 0) : 7,
                r: mounted ? (isDark ? 7.5 : 0) : 7.5,
              }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              fill="black"
            />
          </mask>
        </defs>

        {/* Central Core (Sun Disc <-> Crescent Moon) */}
        <motion.circle
          initial={false}
          cx="12"
          cy="12"
          animate={{
            r: mounted ? (isDark ? 8.5 : 4.5) : 8.5,
          }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
          fill="currentColor"
          mask={`url(#${maskId})`}
          className={
            isDark
              ? "text-zinc-100 transition-colors duration-200 group-hover:text-white"
              : "text-brand-500 transition-colors duration-200 group-hover:text-brand-600"
          }
        />

        {/* Sun Rays (Expand/Contract & Spin) */}
        <motion.g
          initial={false}
          animate={{
            scale: mounted ? (isDark ? 0 : 1) : 0,
            opacity: mounted ? (isDark ? 0 : 1) : 0,
            rotate: mounted ? (isDark ? 60 : 0) : 0,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-brand-500 origin-center"
        >
          <line x1="12" y1="1.5" x2="12" y2="3.5" />
          <line x1="12" y1="20.5" x2="12" y2="22.5" />
          <line x1="4.57" y1="4.57" x2="5.99" y2="5.99" />
          <line x1="18.01" y1="18.01" x2="19.43" y2="19.43" />
          <line x1="1.5" y1="12" x2="3.5" y2="12" />
          <line x1="20.5" y1="12" x2="22.5" y2="12" />
          <line x1="4.57" y1="19.43" x2="5.99" y2="18.01" />
          <line x1="18.01" y1="5.99" x2="19.43" y2="4.57" />
        </motion.g>
      </motion.svg>
    </button>
  );
}
