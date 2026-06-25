"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { WorkInProgress } from "@/components/ui/work-in-progress";
import { motion } from "motion/react";

export interface NavBarLink {
  readonly label: string;
  readonly href: string;
}

export interface NavBarProps {
  readonly links?: ReadonlyArray<NavBarLink>;
  readonly className?: string;
}

const DEFAULT_LINKS: ReadonlyArray<NavBarLink> = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Project", href: "#projects" },
  { label: "Service", href: "#service" },
  { label: "Testimonial", href: "#testimonial" },
  { label: "Contact", href: "#contact" },
] as const;

function scrollToSection(sectionId: string, e?: React.MouseEvent): void {
  e?.preventDefault();

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("lazy-mount-trigger", { detail: "all" }),
    );
  }
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", window.location.pathname);
  }
}

export function NavBar({ links = DEFAULT_LINKS, className }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navRef = useRef<HTMLDivElement>(null);

  // // Theme synchronization and handler
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme") || "dark";
  //   // eslint-disable-next-line react-hooks/set-state-in-effect
  //   setTheme(savedTheme as "light" | "dark");
  //   if (savedTheme === "light") {
  //     document.documentElement.classList.remove("dark");
  //   } else {
  //     document.documentElement.classList.add("dark");
  //   }
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("lazy-mount-trigger", { detail: "all" }),
        );
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // const toggleTheme = () => {
  //   const nextTheme = theme === "dark" ? "light" : "dark";
  //   setTheme(nextTheme);
  //   if (nextTheme === "light") {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   } else {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   }
  // };



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (window.scrollY < 50) {
        setActiveSection("home");
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 20
      ) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const baseSectionIds = links
      .map((link) => link.href.replace("#", ""))
      .filter(Boolean);
    const sectionIds = Array.from(
      new Set([...baseSectionIds, "about-journey", "about-tech"]),
    );
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 20;
        if (entry.isIntersecting && !atBottom) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [links]);



  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none ${className ?? ""}`}
    >
      <div
        className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center bg-bg-surface/65 backdrop-blur-xl backdrop-saturate-150 border border-edge-subtle ${
          isScrolled
            ? "w-[calc(100%-2rem)] xl:w-[1024px] mt-4 h-16 rounded-full shadow-lg shadow-black/10 px-6 md:px-8"
            : "w-full h-20 rounded-none border-t-transparent border-x-transparent px-6"
        }`}
      >
        <div className="w-full flex items-center justify-between container mx-auto">
          <Link
            href="/"
            className="group font-heading text-2xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-90"
          >
            Joren
            <span className="inline-block text-brand-500 transition-transform duration-300 ease-out group-hover:scale-130 group-hover:rotate-12 group-hover:translate-x-0.5">
              .
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            ref={navRef}
            onMouseLeave={() => setHoveredIndex(null)}
            className="hidden md:flex items-center gap-1 relative py-2"
          >
            {links.map((link, idx) => {
              const href = link.href.replace("#", "");
              const isActive =
                activeSection === href || activeSection.startsWith(href + "-");
              const isPillActive = hoveredIndex !== null ? hoveredIndex === idx : isActive;
              return (
                <a
                  key={link.label}
                  href={`/${link.href}`}
                  onClick={(e) =>
                    scrollToSection(link.href.replace("#", ""), e)
                  }
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={`relative z-10 px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isPillActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-brand-500/10 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/jorenverdad"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden flex items-center gap-2 h-10 px-4 rounded-full border border-edge-default bg-bg-surface/80 hover:bg-bg-elevated hover:border-brand-500 text-muted-foreground hover:text-brand-500 text-sm font-medium transition-all duration-300 group shadow-sm hover:shadow-[0_0_15px_rgba(224,32,32,0.05)] active:scale-95"
            >
              <div className="absolute inset-0 rounded-full bg-brand-500/0 group-hover:bg-brand-500/5 transition-all duration-300 blur-sm" />
              <FaGithub className="relative z-10 size-4.5 transition-all duration-300 group-hover:scale-115 group-hover:rotate-6 text-foreground group-hover:text-brand-500" />
              <span className="relative z-10 text-foreground group-hover:text-brand-500 transition-colors duration-300">
                GitHub
              </span>
            </a>
            <WorkInProgress position="bottom">
              <button
                type="button"
                aria-label="Toggle dark mode"
                className="h-10 w-10 rounded-full flex items-center justify-center border border-edge-default bg-bg-surface/80 hover:bg-bg-elevated hover:border-brand-500 text-muted-foreground hover:text-foreground transition-all duration-300 active:scale-95 cursor-pointer relative overflow-hidden group shadow-sm"
              >
                <div className="absolute inset-0 rounded-full bg-brand-500/0 group-hover:bg-brand-500/5 transition-all duration-300 blur-sm" />
                <div className="relative h-5 w-5 flex flex-col items-center justify-center transition-transform duration-500 group-hover:rotate-90">
                  <FiMoon className="size-4.5 absolute transition-all duration-300 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-50 text-foreground" />
                  <FiSun className="size-4.5 absolute transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 text-brand-500" />
                </div>
              </button>
            </WorkInProgress>
          </div>

          {/* Mobile Menu Trigger */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-edge-default bg-bg-surface/80 hover:bg-bg-elevated text-foreground transition-all duration-200 active:scale-95 focus:outline-none">
              <Menu className="size-5" />
            </Dialog.Trigger>

            <Dialog.Portal>
              {/* Backdrop */}
              <Dialog.Backdrop className="fixed inset-0 z-50 bg-bg-void/80 backdrop-blur-sm transition-opacity duration-300 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />

              {/* Drawer Content */}
              <Dialog.Popup className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-bg-surface border-l border-edge-subtle p-8 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full">
                <div>
                  <div className="flex items-center justify-between mb-12">
                    <span className="font-heading text-2xl font-bold tracking-tight text-foreground">
                      Menu<span className="text-brand-500">.</span>
                    </span>
                    <Dialog.Close className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge-default bg-bg-surface hover:bg-bg-elevated text-foreground transition-all duration-200 active:scale-95 focus:outline-none">
                      <X className="size-5" />
                    </Dialog.Close>
                  </div>

                  <nav className="flex flex-col gap-6">
                    {links.map((link, idx) => {
                      const href = link.href.replace("#", "");
                      const isActive =
                        activeSection === href ||
                        activeSection.startsWith(href + "-");
                      return (
                        <a
                          key={link.label}
                          href={`/${link.href}`}
                          onClick={(e) => {
                            scrollToSection(link.href.replace("#", ""), e);
                            setOpen(false);
                          }}
                          className={`text-lg font-medium transition-all duration-500 ease-out transform ${
                            isActive
                              ? "text-brand-500"
                              : "text-muted-foreground hover:text-foreground"
                          } ${
                            open
                              ? "translate-x-0 opacity-100"
                              : "translate-x-8 opacity-0"
                          }`}
                          style={{
                            transitionDelay: `${idx * 60}ms`,
                          }}
                        >
                          {link.label}
                        </a>
                      );
                    })}
                  </nav>
                </div>

                <div
                  className={`flex items-center gap-3 mt-12 transition-all duration-700 ease-out transform ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${links.length * 60}ms` }}
                >
                  <a
                    href="https://github.com/jorenverdad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-edge-default bg-bg-surface hover:bg-bg-elevated hover:border-brand-500 text-muted-foreground hover:text-brand-500 text-base font-medium transition-all duration-300 group"
                  >
                    <div className="absolute inset-0 rounded-xl bg-brand-500/0 group-hover:bg-brand-500/5 transition-all duration-300 blur-sm" />
                    <FaGithub className="relative z-10 size-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 text-muted-foreground group-hover:text-brand-500" />
                    <span className="relative z-10 text-muted-foreground group-hover:text-brand-500 transition-colors duration-300">
                      jorenverdad
                    </span>
                  </a>
                  <WorkInProgress
                    position="top"
                    className="bottom-full mb-3 -translate-x-[15%]"
                  >
                    <button
                      type="button"
                      aria-label="Toggle dark mode"
                      className="h-12 w-12 rounded-xl flex items-center justify-center border border-edge-default bg-bg-surface hover:bg-bg-elevated hover:border-brand-500 text-muted-foreground hover:text-foreground transition-all duration-300 active:scale-95 cursor-pointer relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 rounded-xl bg-brand-500/0 group-hover:bg-brand-500/5 transition-all duration-300 blur-sm" />
                      <div className="relative h-5 w-5 flex flex-col items-center justify-center transition-transform duration-500 group-hover:rotate-90">
                        <FiMoon className="size-5 absolute transition-all duration-300 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-50 text-foreground" />
                        <FiSun className="size-5 absolute transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 text-brand-500" />
                      </div>
                    </button>
                  </WorkInProgress>
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
