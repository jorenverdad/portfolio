"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  m,
  useScroll,
  AnimatePresence,
  useMotionValueEvent,
  LazyMotion,
  domMax,
} from "motion/react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Briefcase, GraduationCap, Award, Activity } from "lucide-react";
import { ExperienceView } from "./journey/experience-view";
import { EducationView } from "./journey/education-view";
import { CertificationsView } from "./journey/certifications-view";
import { ActivitiesView } from "./journey/activities-view";
import type { JourneyProps, SubSectionTab } from "./journey/types";
import { DEFAULT_MILESTONES } from "./journey/constants";

export type {
  JourneyMilestone,
  JourneyProps,
  EducationItem,
  CertificationItem,
  ActivityItem,
} from "./journey/types";

const TABS: readonly SubSectionTab[] = [
  "experience",
  "education",
  "certifications",
  "activities",
] as const;
let globalActiveTab: SubSectionTab = "experience";

export function JourneySection({
  className,
  milestones = DEFAULT_MILESTONES,
}: JourneyProps) {
  const [activeTab, setActiveTab] = useState<SubSectionTab>(globalActiveTab);
  const [[, direction], setTabState] = useState<readonly [number, number]>(
    () => {
      const initialIndex = TABS.indexOf(globalActiveTab);
      return [initialIndex, 0];
    },
  );

  const sectionRef = useRef<HTMLElement>(null);

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Section scroll progress for HUD Menu visibility
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start 10%", "end 90%"],
  });

  useMotionValueEvent(sectionProgress, "change", (latest) => {
    setIsMenuVisible(latest > 0 && latest < 1);
  });

  // Persist active tab across unmounts/remounts
  useEffect(() => {
    globalActiveTab = activeTab;
  }, [activeTab]);

  const switchTab = (newTab: SubSectionTab) => {
    const currentIndex = TABS.indexOf(activeTab);
    const newIndex = TABS.indexOf(newTab);
    if (currentIndex === newIndex) return;

    const dir = newIndex > currentIndex ? 1 : -1;
    setTabState([newIndex, dir]);
    setActiveTab(newTab);

    // Scroll back to the top of the journey section when switching tabs
    if (sectionRef.current) {
      const offset = 80;
      const elementRect = sectionRef.current.getBoundingClientRect().top;
      const elementPosition = elementRect + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const MENU_ITEMS = [
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "activities", label: "Activities", icon: Activity },
  ] as const;

  return (
    <LazyMotion features={domMax}>
      <>
        <section
          id="journey"
          ref={sectionRef}
          className={`py-24 md:py-32 bg-bg-void relative border-t border-edge-subtle overflow-clip ${className ?? ""}`}
        >
          {/* Background glowing rings */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-[40%] left-[60%] w-[60%] h-[60%] rounded-full bg-brand-500/10 blur-[130px]" />
            <div className="absolute top-[10%] right-[70%] w-[40%] h-[40%] rounded-full bg-warm-500/5 blur-[120px]" />
          </div>

          <GridPattern className="opacity-[0.06]" />

          <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10 min-h-[60vh]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <m.div
                key={activeTab}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 260, damping: 28 },
                  opacity: { duration: 0.15 },
                }}
                className="w-full"
              >
                {activeTab === "experience" && (
                  <ExperienceView milestones={milestones} />
                )}
                {activeTab === "education" && <EducationView />}
                {activeTab === "certifications" && <CertificationsView />}
                {activeTab === "activities" && <ActivitiesView />}
              </m.div>
            </AnimatePresence>
          </div>
        </section>

        {typeof document !== "undefined" &&
          createPortal(
            <>
              {/* Desktop HUD Sidebar (Visible xl and up) */}
              <AnimatePresence>
                {isMenuVisible && (
                  <m.div
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      x: 20,
                      scale: 0.95,
                      transition: { duration: 0.5, ease: "easeInOut" },
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                    className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-4 bg-bg-surface/40 backdrop-blur-xl border border-edge-subtle/80 px-3 py-6 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] select-none"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500/40 animate-pulse mb-1" />

                    {MENU_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => switchTab(item.id)}
                          aria-label={`Switch to ${item.label}`}
                          className="group relative w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          {isActive && (
                            <m.div
                              layoutId="activeHUDTabDesktop"
                              className="absolute inset-0 rounded-full bg-brand-500/15 border border-brand-500/30 shadow-[0_0_15px_rgba(224,32,32,0.15)]"
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                              }}
                            />
                          )}

                          <Icon
                            className={`size-5 relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-brand-100" : "text-muted-foreground/60 group-hover:text-foreground"}`}
                          />

                          <div className="absolute right-14 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <div className="bg-bg-surface border border-edge-subtle/80 text-foreground font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
                              <span className="text-brand-500 mr-1.5">
                                {"//"}
                              </span>
                              {item.label}
                            </div>
                          </div>
                        </button>
                      );
                    })}

                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500/40 animate-pulse mt-1" />
                  </m.div>
                )}
              </AnimatePresence>

              {/* Mobile HUD Dock (Visible below xl) */}
              <AnimatePresence>
                {isMenuVisible && (
                  <m.div
                    initial={{ opacity: 0, y: 30, x: "-50%", scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                    exit={{
                      opacity: 0,
                      y: 20,
                      scale: 0.95,
                      transition: { duration: 0.5, ease: "easeInOut" },
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex xl:hidden items-center gap-1.5 sm:gap-3 bg-bg-surface/75 backdrop-blur-xl border border-edge-subtle/80 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] select-none max-w-[95vw]"
                  >
                    {MENU_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => switchTab(item.id)}
                          aria-label={`Switch to ${item.label}`}
                          className="group relative p-2.5 sm:px-3 sm:py-2 rounded-full flex items-center gap-1 sm:gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          {isActive && (
                            <m.div
                              layoutId="activeHUDTabMobile"
                              className="absolute inset-0 rounded-full bg-brand-500/10 border border-brand-500/20 shadow-[0_0_12px_rgba(224,32,32,0.1)]"
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                              }}
                            />
                          )}

                          <Icon
                            className={`size-4.5 relative z-10 ${isActive ? "text-brand-100" : "text-muted-foreground/60"}`}
                          />
                          {isActive && (
                            <span className="relative z-10 font-mono text-[9px] font-bold uppercase tracking-wider text-brand-100 whitespace-nowrap hidden sm:inline-block">
                              {item.label}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </m.div>
                )}
              </AnimatePresence>
            </>,
            document.body,
          )}
      </>
    </LazyMotion>
  );
}
