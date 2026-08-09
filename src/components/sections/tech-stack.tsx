"use client";

import React, { useState, useSyncExternalStore } from "react";
import {
  LazyMotion,
  m,
  Variants,
  AnimatePresence,
  MotionConfig,
} from "motion/react";
import StackIcon, { IconName } from "tech-stack-icons";

const loadFeatures = () => import("motion/react").then((res) => res.domMax);

export const CATEGORIES = [
  "Languages",
  "Frontend",
  "Mobile",
  "Backend",
  "Database",
  "Tools",
  "Agentic IDEs",
  "OS",
] as const;

export type TechCategory = (typeof CATEGORIES)[number];

export type TechItem = {
  readonly name: string;
  readonly color: string;
  readonly darkColor?: string;
  readonly category?: TechCategory;
  readonly preferred?: boolean;
  readonly iconName?: IconName;
  readonly iconClass?: string;
};

export const TECH_STACK: readonly TechItem[] = [
  // ==========================================
  // LANGUAGES
  // ==========================================
  { name: "HTML5", iconName: "html5", color: "#E34F26" },
  { name: "CSS3", iconName: "css3", color: "#1572B6" },
  {
    name: "JavaScript",
    iconName: "js",
    color: "#F7DF1E",
    category: "Languages",
  },
  {
    name: "TypeScript",
    iconName: "typescript",
    color: "#3178C6",
    category: "Languages",
    preferred: true,
  },
  {
    name: "Python",
    iconName: "python",
    color: "#3776AB",
    category: "Languages",
  },

  // ==========================================
  // FRONTEND
  // ==========================================
  {
    name: "Bootstrap",
    iconName: "bootstrap5",
    color: "#7952B3",
    category: "Frontend",
  },
  {
    name: "Electron",
    iconName: "electron",
    color: "#2E3242",
    category: "Frontend",
  },
  { name: "React", iconName: "react", color: "#61DAFB", category: "Frontend" },
  {
    name: "Next.js",
    iconName: "nextjs2",
    color: "#000000",
    darkColor: "#FFFFFF",
    category: "Frontend",
    preferred: true,
  },
  { name: "Vue.js", iconName: "vuejs", color: "#4FC08D", category: "Frontend" },
  {
    name: "Tailwind CSS",
    iconName: "tailwindcss",
    color: "#06B6D4",
    category: "Frontend",
    preferred: true,
  },

  {
    name: "Shadcn UI",
    iconName: "shadcnui",
    color: "#000000",
    darkColor: "#FFFFFF",
    category: "Frontend",
    preferred: true,
  },
  {
    name: "Motion",
    iconName: "motion",
    color: "#000000",
    darkColor: "#FFFFFF",
    category: "Frontend",
    preferred: true,
  },
  {
    name: "Zustand",
    iconName: "zustand",
    color: "#443E38",
    darkColor: "#F4F4F5",
    category: "Frontend",
  },

  // ==========================================
  // MOBILE
  // ==========================================
  {
    name: "Capacitor",
    iconName: "ionic",
    color: "#119EFF",
    category: "Mobile",
  },
  {
    name: "React Native",
    iconName: "reactnative",
    color: "#61DAFB",
    category: "Mobile",
  },

  // ==========================================
  // BACKEND (Servers, BaaS, & ORMs)
  // ==========================================
  {
    name: "Node.js",
    iconName: "nodejs",
    color: "#339933",
    category: "Backend",
    preferred: true,
  },
  {
    name: "Django",
    iconName: "django",
    color: "#092E20",
    darkColor: "#44B78B",
    category: "Backend",
  },
  {
    name: "Firebase",
    iconName: "firebase",
    color: "#FFCA28",
    category: "Backend",
  },
  {
    name: "Laravel",
    iconName: "laravel",
    color: "#FF2D20",
    category: "Backend",
  },
  {
    name: "Supabase",
    iconName: "supabase",
    color: "#3ECF8E",
    category: "Backend",
    preferred: true,
  },
  {
    name: "Prisma ORM",
    iconName: "prisma",
    color: "#2D3748",
    darkColor: "#FFFFFF",
    category: "Backend",
    preferred: true,
  },

  // ==========================================
  // DATABASE (Raw Storage & Caching)
  // ==========================================
  {
    name: "PostgreSQL",
    iconName: "postgresql",
    color: "#4169E1",
    category: "Database",
    preferred: true,
  },
  { name: "MySQL", iconName: "mysql", color: "#4479A1", category: "Database" },
  { name: "Redis", iconName: "redis", color: "#EE0000", category: "Database" },

  // ==========================================
  // TOOLS
  // ==========================================
  { name: "Docker", iconName: "docker", color: "#2496ED", category: "Tools" },
  { name: "ESLint", iconName: "eslint", color: "#4B32C3", category: "Tools" },
  {
    name: "Figma",
    iconName: "figma",
    color: "#F24E1E",
    category: "Tools",
    preferred: true,
  },
  {
    name: "Git",
    iconName: "git",
    color: "#F05032",
    category: "Tools",
    preferred: true,
  },
  {
    name: "GitHub",
    iconName: "github",
    color: "#000000",
    darkColor: "#FFFFFF",
    category: "Tools",
    preferred: true,
  },
  {
    name: "NPM",
    iconName: "npm",
    color: "#CB3837",
    darkColor: "#CB3837",
    category: "Tools",
  },
  {
    name: "Playwright",
    iconName: "playwright",
    color: "#2EAD33",
    category: "Tools",
  },
  {
    name: "PNPM",
    iconName: "pnpm",
    color: "#F69220",
    darkColor: "#F69220",
    category: "Tools",
    preferred: true,
  },
  { name: "Postman", iconName: "postman", color: "#FF6C37", category: "Tools" },
  {
    name: "Prettier",
    iconName: "prettier",
    color: "#F7B93E",
    category: "Tools",
  },
  {
    name: "Sentry",
    iconName: "sentry",
    color: "#362D59",
    darkColor: "#FFFFFF",
    category: "Tools",
  },
  {
    name: "Vercel",
    iconName: "vercel",
    color: "#000000",
    darkColor: "#FFFFFF",
    category: "Tools",
    preferred: true,
  },
  { name: "Vite", iconName: "vitejs", color: "#646CFF", category: "Tools" },
  {
    name: "Vitest",
    iconName: "vitest",
    color: "#FCC72B",
    category: "Tools",
  },

  // ==========================================
  // Agentic IDEs & CODING ASSISTANTS
  // ==========================================
  {
    name: "Antigravity",
    iconName: "antigravity",
    color: "#4285F4",
    darkColor: "#8AB4F8",
    category: "Agentic IDEs",
    preferred: true,
  },
  {
    name: "Claude Code",
    iconName: "claude",
    color: "#DA7756",
    darkColor: "#F59E0B",
    category: "Agentic IDEs",
  },
  {
    name: "Cursor",
    iconName: "cursor",
    color: "#000000",
    darkColor: "#FFFFFF",
    category: "Agentic IDEs",
  },
  {
    name: "Copilot",
    iconName: "copilotgithub",
    color: "#000000",
    darkColor: "#FFFFFF",
    category: "Agentic IDEs",
  },
  {
    name: "Codex",
    iconName: "openai",
    color: "#10A37F",
    darkColor: "#10A37F",
    category: "Agentic IDEs",
  },
  {
    name: "VS Code",
    iconName: "vscode",
    color: "#007ACC",
    darkColor: "#007ACC",
    category: "Agentic IDEs",
  },

  // ==========================================
  // OPERATING SYSTEMS
  // ==========================================
  {
    name: "Kali Linux",
    iconClass: "devicon-kalilinux-original",
    color: "#557C94",
    category: "OS",
  },
  {
    name: "Linux",
    iconName: "linux",
    color: "#FCC624",
    category: "OS",
  },
  {
    name: "Ubuntu",
    iconName: "ubuntu",
    color: "#E95420",
    darkColor: "#E95420",
    category: "OS",
  },
  { name: "Windows", iconName: "windows11", color: "#0078D4", category: "OS" },
];

export type CellInfo = {
  readonly x: number;
  readonly y: number;
  readonly distance: number;
  readonly index: number;
  readonly tech?: TechItem;
  readonly delay: number;
};

export type GridData = {
  readonly cols: number;
  readonly rows: number;
  readonly cells: readonly CellInfo[];
};

function computeGridData(
  cols: number,
  rows: number,
  isMobile: boolean,
): GridData {
  const cx = Math.floor(cols / 2);
  const cy = Math.floor(rows / 2);

  const cells: Array<{
    x: number;
    y: number;
    distance: number;
    index: number;
    tech?: TechItem;
    delay: number;
  }> = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const distance = isMobile ? dx * dx * 5 + dy * dy : dx * dx + dy * dy * 5;

      cells.push({ x, y, distance, index: y * cols + x, delay: 0 });
    }
  }

  const sortedCells = [...cells].sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    if (a.y !== b.y) return a.y - b.y;
    return a.x - b.x;
  });

  TECH_STACK.forEach((tech, i) => {
    const cell = sortedCells[i];
    if (cell) {
      cell.tech = tech;
    }
  });

  cells.sort((a, b) => a.index - b.index);

  const maxDist = Math.max(...cells.map((c) => c.distance));
  cells.forEach((c) => {
    const normDist = c.distance / (maxDist || 1);
    c.delay = Math.sqrt(normDist) * 0.45;
  });

  return { cols, rows, cells };
}

const DESKTOP_GRID: GridData = computeGridData(19, 9, false);
const MOBILE_GRID: GridData = computeGridData(5, 13, true);

export type CategorizedGroup = {
  readonly category: TechCategory;
  readonly items: readonly TechItem[];
};

const CATEGORIZED_STACK: readonly CategorizedGroup[] = CATEGORIES.map(
  (category) => ({
    category,
    items: TECH_STACK.filter((t) => t.category === category).sort(
      (a, b) => (b.preferred ? 1 : 0) - (a.preferred ? 1 : 0),
    ),
  }),
).filter((group) => group.items.length > 0);

export type ViewMode = "grid" | "list";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};

const cellVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    y: 10,
  },
  show: (delay: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: [0.16, 1, 0.3, 1],
      duration: 0.4,
    },
  },
};

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function subscribeMediaQuery(callback: () => void) {
  const mql = window.matchMedia("(max-width: 767px)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getMobileSnapshot() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function getServerMobileSnapshot() {
  return false;
}

function subscribeDarkMode(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getDarkSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerDarkSnapshot() {
  return true;
}

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStoredViewModeSnapshot(): ViewMode {
  const saved = localStorage.getItem("tech-stack-view");
  return saved === "list" ? "list" : "grid";
}

function getServerViewModeSnapshot(): ViewMode {
  return "grid";
}

export function TechStackSection({
  className,
}: {
  readonly className?: string;
}) {
  const mounted = useMounted();
  const isMobile = useSyncExternalStore(
    subscribeMediaQuery,
    getMobileSnapshot,
    getServerMobileSnapshot,
  );
  const isDark = useSyncExternalStore(
    subscribeDarkMode,
    getDarkSnapshot,
    getServerDarkSnapshot,
  );
  const storedViewMode = useSyncExternalStore(
    subscribeStorage,
    getStoredViewModeSnapshot,
    getServerViewModeSnapshot,
  );

  const [activeViewMode, setActiveViewMode] = useState<ViewMode | null>(null);
  const viewMode = activeViewMode ?? storedViewMode;

  const handleViewModeChange = (mode: ViewMode) => {
    setActiveViewMode(mode);
    try {
      localStorage.setItem("tech-stack-view", mode);
    } catch {
      // Ignore storage write errors in private browsing/sandboxes
    }
  };

  const gridData = isMobile ? MOBILE_GRID : DESKTOP_GRID;

  if (!mounted) {
    return (
      <section
        id="tech-stack"
        className={`py-32 md:py-48 bg-bg-base relative overflow-hidden min-h-[800px] flex flex-col items-center justify-center ${className ?? ""}`}
      >
        <div className="container mx-auto px-6 relative z-10 w-full">
          <div className="mb-8 text-center flex flex-col items-center">
            <h2 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight uppercase mb-6 text-foreground">
              The <span className="text-brand-500">Stack.</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed font-sans">
              A curated collection of languages, frameworks, and tools
              calibrated for sub-second performance, strict type-safety, and
              interactive fluidity.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="tech-stack"
      className={`py-32 md:py-48 bg-bg-base relative overflow-hidden flex flex-col items-center justify-center ${className ?? ""}`}
    >
      <LazyMotion features={loadFeatures}>
        <MotionConfig reducedMotion="user">
          <div className="container mx-auto px-6 relative z-30 mb-8">
            <div className="text-center flex flex-col items-center">
              <m.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight uppercase mb-6 text-foreground"
              >
                The <span className="text-brand-500">Stack.</span>
              </m.h2>

              <m.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed font-sans"
              >
                A curated collection of languages, frameworks, and tools
                calibrated for sub-second performance, strict type-safety, and
                interactive fluidity.
              </m.p>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-8 flex items-center p-1.5 bg-muted/40 border border-border/60 rounded-full backdrop-blur-md shadow-sm"
              >
                {(["grid", "list"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleViewModeChange(mode)}
                    className={`relative px-8 py-2.5 rounded-full text-sm font-bold transition-colors ${
                      viewMode === mode
                        ? "text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {viewMode === mode && (
                      <m.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-foreground rounded-full shadow-md"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    )}
                    <span className="relative z-10 capitalize tracking-wide">
                      {mode}
                    </span>
                  </button>
                ))}
              </m.div>
            </div>
          </div>

          <div className="w-full relative min-h-[600px] flex flex-col items-center">
            <AnimatePresence mode="wait">
              {viewMode === "grid" && (
                <m.div
                  key="grid-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full flex justify-center items-center relative z-20 pointer-events-none overflow-visible flex-1"
                >
                  <div className="relative">
                    <m.div
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-100px" }}
                      className="grid gap-2 md:gap-3 lg:gap-4 pointer-events-auto w-max"
                      style={{
                        gridTemplateColumns: `repeat(${gridData.cols}, max-content)`,
                        gridTemplateRows: `repeat(${gridData.rows}, max-content)`,
                      }}
                    >
                      {gridData.cells.map((cell) =>
                        cell.tech ? (
                          <TechCell
                            key={cell.index}
                            tech={cell.tech}
                            delay={cell.delay}
                            isDark={isDark}
                          />
                        ) : (
                          <EmptyCell key={cell.index} delay={cell.delay} />
                        ),
                      )}
                    </m.div>

                    {/* Gradient fade overlays — blend grid edges into the background */}
                    {/* Radial vignette */}
                    <div
                      className="absolute inset-0 pointer-events-none z-10"
                      style={{
                        background:
                          "radial-gradient(ellipse 55% 60% at 50% 50%, transparent 0%, oklch(0.095 0.018 17 / 0.0) 20%, oklch(0.095 0.018 17 / 0.45) 50%, oklch(0.095 0.018 17 / 0.85) 70%, oklch(0.095 0.018 17) 90%)",
                        transform: "translateZ(0)",
                      }}
                    />
                    {/* Left edge fade */}
                    <div
                      className="absolute inset-y-0 left-0 w-[25%] pointer-events-none z-10"
                      style={{
                        background:
                          "linear-gradient(to right, oklch(0.095 0.018 17) 0%, oklch(0.095 0.018 17 / 0.7) 40%, transparent 100%)",
                        transform: "translateZ(0)",
                      }}
                    />
                    {/* Right edge fade */}
                    <div
                      className="absolute inset-y-0 right-0 w-[25%] pointer-events-none z-10"
                      style={{
                        background:
                          "linear-gradient(to left, oklch(0.095 0.018 17) 0%, oklch(0.095 0.018 17 / 0.7) 40%, transparent 100%)",
                        transform: "translateZ(0)",
                      }}
                    />
                    {/* Top edge fade */}
                    <div
                      className="absolute inset-x-0 top-0 h-[30%] pointer-events-none z-10"
                      style={{
                        background:
                          "linear-gradient(to bottom, oklch(0.095 0.018 17) 0%, oklch(0.095 0.018 17 / 0.6) 40%, transparent 100%)",
                        transform: "translateZ(0)",
                      }}
                    />
                    {/* Bottom edge fade */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none z-10"
                      style={{
                        background:
                          "linear-gradient(to top, oklch(0.095 0.018 17) 0%, oklch(0.095 0.018 17 / 0.6) 40%, transparent 100%)",
                        transform: "translateZ(0)",
                      }}
                    />
                  </div>
                </m.div>
              )}

              {viewMode === "list" && (
                <m.div
                  key="list-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full max-w-5xl mx-auto relative z-20 px-6 py-12"
                >
                  <TechStackList isDark={isDark} />
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </MotionConfig>
      </LazyMotion>
    </section>
  );
}

const TechStackList = React.memo(function TechStackList({
  isDark,
}: {
  readonly isDark: boolean;
}) {
  return (
    <m.div
      variants={listContainerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col w-full"
    >
      {CATEGORIZED_STACK.map(({ category, items }, index) => {
        const isLast = index === CATEGORIZED_STACK.length - 1;

        return (
          <m.div
            key={category}
            variants={rowVariants}
            className={`flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-8 md:py-10 ${!isLast ? "border-b border-black/5 dark:border-white/[0.05]" : ""}`}
          >
            <div className="md:w-48 flex-shrink-0 pt-2">
              <h3 className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.25em]">
                {category}
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {items.map((tech) => (
                <m.div
                  key={tech.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full 
                    bg-white dark:bg-white/[0.02] 
                    border border-black/[0.08] dark:border-white/[0.08]
                    hover:border-black/20 dark:hover:border-white/[0.2]
                    shadow-sm hover:shadow-md dark:shadow-none
                    transition-all duration-300 cursor-pointer"
                >
                  {/* Background effects container */}
                  <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none -z-10">
                    {/* Subtle Glow background on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] dark:group-hover:opacity-[0.1] transition-opacity duration-300"
                      style={{ backgroundColor: tech.color }}
                    />
                    {/* Decorative corner accent - very subtle */}
                    <div
                      className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at top right, ${tech.color}30, transparent 60%)`,
                      }}
                    />
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 w-5 h-5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {tech.iconName ? (
                      <StackIcon
                        name={tech.iconName}
                        variant={isDark ? "dark" : "light"}
                        className={`w-full h-full ${tech.iconName === "nextjs" ? "dark:invert" : ""}`}
                      />
                    ) : tech.iconClass ? (
                      <i
                        className={tech.iconClass}
                        style={{
                          color: tech.darkColor ?? tech.color,
                          fontSize: "1.25rem",
                        }}
                      />
                    ) : null}
                  </div>

                  {/* Text */}
                  <span className="relative z-10 text-sm font-semibold text-zinc-700 dark:text-zinc-300 pr-1">
                    {tech.name}
                  </span>

                  {/* Preferred Stack Star Badge */}
                  {tech.preferred && (
                    <div
                      className="absolute -top-1 -right-1 z-20 flex items-center justify-center 
                        w-4 h-4 md:w-[18px] md:h-[18px] rounded-full 
                        bg-gradient-to-br from-amber-400 to-amber-500 
                        text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                        border border-background dark:border-background
                        transition-all duration-300 ease-out
                        group-hover:scale-110 group-hover:rotate-[15deg]"
                      title="Preferred Choice"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-2.5 h-2.5 md:w-3 md:h-3 fill-white text-white"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                  )}
                </m.div>
              ))}
            </div>
          </m.div>
        );
      })}
    </m.div>
  );
});

type EmptyCellProps = {
  readonly delay: number;
};

const EmptyCell = React.memo(function EmptyCell({ delay }: EmptyCellProps) {
  return (
    <div
      className="w-14 h-14 md:w-[72px] md:h-[72px] lg:w-[88px] lg:h-[88px] rounded-xl md:rounded-2xl 
        border border-white/[0.03] dark:border-white/[0.02] 
        bg-white/[0.01] dark:bg-white/[0.01]
        transition-colors duration-500 hover:bg-white/[0.04] dark:hover:bg-white/[0.04]
        animate-cell-empty"
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: "both",
      }}
    />
  );
});

type TechCellProps = {
  readonly tech: TechItem;
  readonly delay: number;
  readonly isDark: boolean;
};

const TechCell = React.memo(function TechCell({
  tech,
  delay,
  isDark,
}: TechCellProps) {
  return (
    <m.div
      variants={cellVariants}
      custom={delay}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className="relative z-10 hover:z-50 group w-14 h-14 md:w-[72px] md:h-[72px] lg:w-[88px] lg:h-[88px] flex items-center justify-center rounded-xl md:rounded-2xl cursor-pointer
        bg-white/[0.05] dark:bg-white/[0.04]
        border border-white/[0.08] dark:border-white/[0.08]
        shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.1)]
        dark:shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]
        transition-colors transition-shadow duration-300
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
        hover:border-white/[0.2] dark:hover:border-white/[0.15]"
    >
      {/* Subtle colorful aura behind the icon on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl md:rounded-2xl blur-xl -z-10"
        style={{ backgroundColor: tech.color }}
      />

      {/* Icon Container */}
      <div className="relative z-10 text-2xl md:text-3xl lg:text-4xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
        {tech.iconName ? (
          <StackIcon
            name={tech.iconName}
            variant={isDark ? "dark" : "light"}
            className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ${tech.iconName === "nextjs" ? "dark:invert" : ""}`}
          />
        ) : tech.iconClass ? (
          <i
            className={tech.iconClass}
            style={{ color: tech.darkColor ?? tech.color }}
          />
        ) : null}
      </div>

      {/* Preferred Stack Star Badge */}
      {tech.preferred && (
        <div
          className="absolute -top-1 -right-1 z-20 flex items-center justify-center 
            w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full 
            bg-gradient-to-br from-amber-400 to-amber-500 
            text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)]
            border border-background dark:border-background
            transition-all duration-300 ease-out
            group-hover:scale-110 group-hover:rotate-[15deg]"
          title="Preferred Choice"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 fill-white text-white"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
      )}

      {/* Tooltip */}
      <div
        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-[60] px-3.5 py-2 
        bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 
        rounded-xl opacity-0 scale-90 pointer-events-none 
        transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 whitespace-nowrap 
        shadow-[0_8px_24px_rgba(0,0,0,0.3)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.15)]
        border border-white/10 dark:border-black/5 flex flex-col items-center justify-center"
      >
        <span className="text-[10px] md:text-xs font-mono font-bold tracking-wider">
          {tech.name}
        </span>
        {tech.preferred && (
          <span className="text-[9px] md:text-[10px] font-mono font-normal tracking-wide text-amber-500 dark:text-amber-600 mt-0.5">
            (Preferred)
          </span>
        )}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 
          bg-zinc-950 dark:bg-white rotate-45 border-r border-b border-white/10 dark:border-black/5"
        />
      </div>
    </m.div>
  );
});
