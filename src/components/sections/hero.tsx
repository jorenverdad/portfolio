"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { motion, AnimatePresence, Variants } from "motion/react";
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

export function HeroSection({ className }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

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
            <div className="inline-flex items-center gap-3.5 px-4.5 py-2 rounded-full border border-edge-default bg-bg-surface/50 text-xs font-medium text-muted-foreground mb-8 backdrop-blur-md shadow-sm hover:border-brand-500/30 hover:bg-bg-surface/80 transition-all duration-300 group cursor-default">
              <span className="flex items-center gap-2 text-foreground/90">
                <MapPin className="size-3.5 text-brand-500 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-sans tracking-wide">Philippines</span>
              </span>
              <span className="w-px h-3.5 bg-edge-subtle" />
              <span className="flex items-center gap-2">
                <Clock className="size-3.5 text-brand-500 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-sans">PHT (UTC+8)</span>
                {time && (
                  <span className="font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded text-[10px] border border-brand-500/25 select-none">
                    {time}
                  </span>
                )}
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground max-w-5xl mb-6"
          >
            Engineering digital experiences with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">
              precision.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
          >
            I&apos;m a frontend engineer dedicated to building exceptional,
            high-performance interfaces. Currently focused on shipping
            accessible, human-centric products that feel as good as they look.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
          >
            <Button
              size="lg"
              className="h-14 px-8 text-base shadow-[0_0_30px_-5px_rgba(224,32,32,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_-5px_rgba(224,32,32,0.5)] rounded-full group"
            >
              <Download className="mr-2 size-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              Download Résumé
            </Button>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/jorenverdad/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center size-14 rounded-full border border-edge-default bg-bg-surface/30 backdrop-blur-md hover:bg-bg-elevated text-muted-foreground hover:text-foreground transition-all hover:scale-[1.05] group"
                aria-label="Instagram Profile"
              >
                <FaInstagram className="size-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.facebook.com/jorenverdad/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center size-14 rounded-full border border-edge-default bg-bg-surface/30 backdrop-blur-md hover:bg-bg-elevated text-muted-foreground hover:text-foreground transition-all hover:scale-[1.05] group"
                aria-label="Facebook Profile"
              >
                <FaFacebook className="size-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/jorenverdad/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center size-14 rounded-full border border-edge-default bg-bg-surface/30 backdrop-blur-md hover:bg-bg-elevated text-muted-foreground hover:text-foreground transition-all hover:scale-[1.05] group"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="size-5 group-hover:scale-110 transition-transform" />
              </a>
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex items-center justify-center size-14 rounded-full border border-edge-default bg-bg-surface/30 backdrop-blur-md hover:bg-bg-elevated text-muted-foreground hover:text-foreground transition-all hover:scale-[1.05] group relative"
                aria-label="Copy Email"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Check className="size-5 text-green-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Copy className="size-5 group-hover:scale-110 transition-transform" />
                    </motion.div>
                  )}
                </AnimatePresence>

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
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
