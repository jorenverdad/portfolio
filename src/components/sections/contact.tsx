"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa6";

const SOCIALS = [
  { name: "LinkedIn", icon: FaLinkedin, href: "#" },
  { name: "GitHub", icon: FaGithub, href: "#" },
  { name: "Facebook", icon: FaFacebook, href: "#" },
  { name: "Instagram", icon: FaInstagram, href: "#" },
] as const;

export function ContactSection() {
  const email = "jorenverdad@gmail.com";
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <section
      id="contact"
      className="relative py-32 overflow-hidden bg-background"
    >
      {/* Background glow & effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-edge-subtle text-sm font-medium text-brand-500 mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Available for new opportunities
          </motion.div>

          <h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Let&apos;s build something <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-warm-500 relative inline-block">
              exceptional.
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-[4px] bg-brand-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I&apos;m always open to discussing product design work or
            partnership opportunities. Reach out and let&apos;s create the next
            big thing together.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="pt-8"
          >
            <a
              href={`mailto:${email}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-16 px-12 text-xl rounded-full shadow-[0_0_40px_-10px_rgba(224,32,32,0.5)] bg-brand-500 hover:bg-brand-600 text-white transition-all duration-300 shimmer-btn border border-brand-400/20 inline-flex items-center gap-3 group/contact-btn cursor-pointer",
              )}
            >
              <Mail className="size-6 transition-transform duration-300 group-hover/contact-btn:scale-110" />
              <span>Let&apos;s talk</span>
              <ArrowUpRight className="size-6 transition-transform duration-300 group-hover/contact-btn:translate-x-1 group-hover/contact-btn:-translate-y-1" />
            </a>
          </motion.div>

          {/* Socials Row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col justify-center items-center gap-8 pt-16 mt-8 w-full max-w-lg mx-auto relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-edge-subtle before:to-transparent"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-1 bg-background text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] rounded-full border border-edge-subtle/50 backdrop-blur-sm">
              Connect with me
            </div>

            <motion.div
              onMouseLeave={() => setHoveredSocial(null)}
              className="flex items-center gap-2 p-2 rounded-full border border-edge-subtle/50 bg-surface/30 backdrop-blur-md shadow-2xl relative"
            >
              {SOCIALS.map((social, idx) => {
                const Icon = social.icon;
                const isHovered = hoveredSocial === social.name;

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onFocus={() => setHoveredSocial(social.name)}
                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.8,
                      filter: "blur(4px)",
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.7 + idx * 0.05,
                      type: "spring",
                      bounce: 0.2,
                    }}
                    className="relative flex items-center justify-center size-14 rounded-full group cursor-pointer focus:outline-none"
                    aria-label={`Visit my ${social.name}`}
                  >
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          layoutId="dock-hover"
                          className="absolute inset-0 bg-surface border border-edge-subtle/80 rounded-full shadow-[0_0_30px_-5px_rgba(224,32,32,0.15)]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.4,
                          }}
                        />
                      )}
                    </AnimatePresence>

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
                            {social.name}
                          </span>
                          <div className="absolute -bottom-1 w-2 h-2 bg-foreground rotate-45 rounded-sm" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative z-10 flex items-center justify-center w-full h-full"
                    >
                      <Icon
                        className={cn(
                          "size-6 transition-colors duration-300",
                          isHovered
                            ? "text-brand-500 drop-shadow-[0_0_8px_rgba(224,32,32,0.3)]"
                            : "text-muted-foreground",
                        )}
                      />
                    </motion.div>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
