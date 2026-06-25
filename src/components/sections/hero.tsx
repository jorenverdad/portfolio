"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { GridPattern } from "@/components/ui/grid-pattern";
import {
  motion,
  AnimatePresence,
  Variants,
  useMotionValue,
  useMotionTemplate,
} from "motion/react";
import { Download, Copy, Check, MapPin, Clock } from "lucide-react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export interface HeroProps {
  readonly className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0, duration: 0.8 },
  },
};

function DownloadResumeButton() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    rectRef.current = event.currentTarget.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!rectRef.current) {
      rectRef.current = event.currentTarget.getBoundingClientRect();
    }
    const rect = rectRef.current;
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
  }, []);

  return (
    <motion.a
      href="/pdfs/CV_JorenVerdad-2026.pdf"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 },
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className="relative flex items-center justify-center gap-2.5 h-14 px-8 text-base font-semibold text-white bg-brand-500 rounded-full overflow-hidden group shadow-[0_0_30px_-5px_rgba(224,32,32,0.4)] hover:shadow-[0_0_40px_-5px_rgba(224,32,32,0.6)] transition-all duration-300"
    >
      {/* Interactive Glow */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(100px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.25), transparent 80%)`,
        }}
      />

      {/* Animated Shine Layer */}
      <motion.div
        variants={{
          initial: { x: "-100%", opacity: 0 },
          hover: {
            x: "200%",
            opacity: [0, 1, 0],
            transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
          },
        }}
        className="absolute inset-0 w-1/2 z-0 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
      />

      <div className="relative z-10 flex items-center justify-center size-5 overflow-hidden">
        <motion.div
          variants={{
            initial: { y: 0, opacity: 1 },
            hover: {
              y: 24,
              opacity: 0,
              transition: { type: "spring", bounce: 0, duration: 0.3 },
            },
          }}
          className="absolute flex items-center justify-center"
        >
          <Download className="size-4 text-white" />
        </motion.div>
        <motion.div
          variants={{
            initial: { y: -24, opacity: 0 },
            hover: {
              y: 0,
              opacity: 1,
              transition: { type: "spring", bounce: 0, duration: 0.3 },
            },
          }}
          className="absolute flex items-center justify-center"
        >
          <Download className="size-4 text-white" />
        </motion.div>
      </div>
      <span className="relative z-10 tracking-wide text-white transition-colors duration-300">
        Download Resume
      </span>
    </motion.a>
  );
}

function SocialIconButton({
  href,
  icon: Icon,
  label,
  tooltip,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  tooltip: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    setIsHovered(true);
    rectRef.current = event.currentTarget.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!rectRef.current) {
      rectRef.current = event.currentTarget.getBoundingClientRect();
    }
    const rect = rectRef.current;
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rectRef.current = null;
  }, []);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
      className="relative flex items-center justify-center size-14 rounded-full border border-brand-500/20 bg-bg-surface/30 backdrop-blur-md text-muted-foreground hover:text-foreground transition-colors group shadow-sm hover:shadow-[0_0_20px_-5px_rgba(224,32,32,0.2)]"
      aria-label={label}
    >
      {/* Spotlight Border */}
      <motion.div
        className="absolute -inset-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
        style={{
          padding: "1px",
          background: useMotionTemplate`radial-gradient(50px circle at ${x}px ${y}px, rgba(224,32,32,0.8), transparent 100%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Spotlight Inner Glow */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
        style={{
          background: useMotionTemplate`radial-gradient(40px circle at ${x}px ${y}px, rgba(224,32,32,0.1), transparent 100%)`,
        }}
      />

      <Icon className="size-5 z-10 relative transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.8,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: 2,
              scale: 0.9,
              filter: "blur(2px)",
            }}
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.3,
            }}
            className="absolute bottom-full mb-3 px-3 py-1.5 rounded-md bg-foreground text-background shadow-xl whitespace-nowrap z-20 pointer-events-none flex flex-col items-center"
          >
            <span className="text-xs font-semibold tracking-wide">
              {tooltip}
            </span>
            <div className="absolute -bottom-1 w-2 h-2 bg-foreground rotate-45 rounded-sm" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

export function HeroSection({ className }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  const copyX = useMotionValue(0);
  const copyY = useMotionValue(0);
  const badgeX = useMotionValue(0);
  const badgeY = useMotionValue(0);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    // Update every minute (aligning with the next minute boundary)
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      updateTime();
      intervalId = setInterval(updateTime, 60000);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("jorenverdad@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const badgeRectRef = useRef<DOMRect | null>(null);
  const copyRectRef = useRef<DOMRect | null>(null);

  const handleBadgeMouseEnter = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    badgeRectRef.current = event.currentTarget.getBoundingClientRect();
  }, []);

  const handleBadgeMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRectRef.current) {
      badgeRectRef.current = event.currentTarget.getBoundingClientRect();
    }
    const rect = badgeRectRef.current;
    badgeX.set(event.clientX - rect.left);
    badgeY.set(event.clientY - rect.top);
  }, [badgeX, badgeY]);

  const handleBadgeMouseLeave = useCallback(() => {
    badgeRectRef.current = null;
  }, []);

  const handleCopyMouseEnter = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    copyRectRef.current = event.currentTarget.getBoundingClientRect();
  }, []);

  const handleCopyMouseMove = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!copyRectRef.current) {
      copyRectRef.current = event.currentTarget.getBoundingClientRect();
    }
    const rect = copyRectRef.current;
    copyX.set(event.clientX - rect.left);
    copyY.set(event.clientY - rect.top);
  }, [copyX, copyY]);

  const handleCopyMouseLeave = useCallback(() => {
    setIsHovered(false);
    copyRectRef.current = null;
  }, []);

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-void pt-20 ${className ?? ""}`}
    >
      {/* Background Grid Pattern */}
      <GridPattern className="opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

      {/* Subtle Glow at the top */}
      <div className="absolute top-0 inset-x-0 h-64 bg-brand-500/10 blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              onMouseEnter={handleBadgeMouseEnter}
              onMouseMove={handleBadgeMouseMove}
              onMouseLeave={handleBadgeMouseLeave}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.05 },
                tap: { scale: 0.95 },
              }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="relative inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 px-3.5 sm:px-4.5 py-2 rounded-full border border-edge-default bg-bg-surface/50 text-xs font-medium text-muted-foreground mb-8 backdrop-blur-md shadow-sm hover:border-brand-500/30 hover:bg-bg-surface/80 transition-all duration-300 group cursor-default hover:shadow-[0_0_20px_-5px_rgba(224,32,32,0.2)]"
            >
              {/* Spotlight Border */}
              <motion.div
                className="absolute -inset-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                style={{
                  padding: "1px",
                  background: useMotionTemplate`radial-gradient(100px circle at ${badgeX}px ${badgeY}px, rgba(224,32,32,0.8), transparent 100%)`,
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              {/* Spotlight Inner Glow */}
              <motion.div
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                style={{
                  background: useMotionTemplate`radial-gradient(80px circle at ${badgeX}px ${badgeY}px, rgba(224,32,32,0.1), transparent 100%)`,
                }}
              />

              <span className="relative z-10 flex items-center gap-2 text-foreground/90">
                <MapPin className="size-3.5 text-brand-500 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-sans tracking-wide">Philippines</span>
              </span>
              <span className="relative z-10 w-px h-3.5 bg-edge-subtle hidden sm:block" />
              <span className="relative z-10 flex items-center gap-2">
                <Clock className="size-3.5 text-brand-500 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-sans">PHT (UTC+8)</span>
                {time && (
                  <span className="font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded text-[10px] border border-brand-500/25 select-none">
                    {time}
                  </span>
                )}
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground max-w-5xl mb-6"
          >
            Engineering digital experiences with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">
              precision.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
          >
            Full-stack engineer specializing in frontend development. I build
            scalable applications from design to deployment, with a focus on
            crafting interfaces that feel as good as they look.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
          >
            <DownloadResumeButton />

            <div className="flex items-center gap-3">
              <SocialIconButton
                href="https://www.instagram.com/verdadjoren/"
                icon={FaInstagram}
                label="Instagram Profile"
                tooltip="Instagram"
              />
              <SocialIconButton
                href="https://www.facebook.com/jorenverdad/"
                icon={FaFacebook}
                label="Facebook Profile"
                tooltip="Facebook"
              />
              <SocialIconButton
                href="https://www.linkedin.com/in/jorenverdad/"
                icon={FaLinkedin}
                label="LinkedIn Profile"
                tooltip="LinkedIn"
              />
              <motion.button
                onClick={handleCopyEmail}
                onMouseEnter={handleCopyMouseEnter}
                onMouseMove={handleCopyMouseMove}
                onMouseLeave={handleCopyMouseLeave}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 },
                }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                className="relative flex items-center justify-center size-14 rounded-full border border-brand-500/20 bg-bg-surface/30 backdrop-blur-md text-muted-foreground hover:text-foreground transition-colors group shadow-sm hover:shadow-[0_0_20px_-5px_rgba(224,32,32,0.2)]"
                aria-label="Copy Email"
              >
                {/* Spotlight Border */}
                <motion.div
                  className="absolute -inset-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                  style={{
                    padding: "1px",
                    background: useMotionTemplate`radial-gradient(50px circle at ${copyX}px ${copyY}px, rgba(224,32,32,0.8), transparent 100%)`,
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                {/* Spotlight Inner Glow */}
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                  style={{
                    background: useMotionTemplate`radial-gradient(40px circle at ${copyX}px ${copyY}px, rgba(224,32,32,0.1), transparent 100%)`,
                  }}
                />

                <div className="z-10 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                        transition={{
                          type: "spring",
                          bounce: 0,
                          duration: 0.3,
                        }}
                      >
                        <Check className="size-5 text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        transition={{
                          type: "spring",
                          bounce: 0,
                          duration: 0.3,
                        }}
                      >
                        <Copy className="size-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {(isHovered || copied) && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                        scale: 0.8,
                        filter: "blur(4px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        y: 2,
                        scale: 0.9,
                        filter: "blur(2px)",
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.3,
                      }}
                      className="absolute bottom-full mb-3 px-3 py-1.5 rounded-md bg-foreground text-background shadow-xl whitespace-nowrap z-20 pointer-events-none flex flex-col items-center"
                    >
                      <span className="text-xs font-semibold tracking-wide">
                        {copied ? "Copied!" : "Copy Email"}
                      </span>
                      <div className="absolute -bottom-1 w-2 h-2 bg-foreground rotate-45 rounded-sm" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
