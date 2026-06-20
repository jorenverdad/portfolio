"use client";

import React from "react";
import { motion } from "motion/react";

export interface Testimonial {
  readonly quote: string;
  readonly author: string;
  readonly role: string;
}

export interface TestimonialsProps {
  readonly className?: string;
  readonly testimonials?: ReadonlyArray<Testimonial>;
}

const DEFAULT_TESTIMONIALS: ReadonlyArray<Testimonial> = [
  {
    quote:
      "Joren's ability to translate complex design requirements into flawless, performant code is unmatched. The attention to micro-interactions completely elevated our product.",
    author: "Sarah Jenkins",
    role: "Product Lead at TechNova",
  },
  {
    quote:
      "Not just a developer, but a true design engineer. They brought a level of polish to our frontend that we didn't even know was possible.",
    author: "Marcus Chen",
    role: "Creative Director",
  },
  {
    quote:
      "Working with Joren was a game-changer. The codebase is incredibly maintainable, and the user experience is smoother than ever.",
    author: "Elena Rodriguez",
    role: "CTO at StartupX",
  },
  {
    quote:
      "I've never seen someone so meticulous about both code quality and visual aesthetics. A rare combination of talents.",
    author: "David Kim",
    role: "Senior Designer",
  },
  {
    quote:
      "Joren delivered beyond our expectations. The animations are buttery smooth, and the architecture is robust and scalable.",
    author: "Alex Thompson",
    role: "Founder at WebStudio",
  },
  {
    quote:
      "A visionary engineer who understands that performance and design must work hand-in-hand to build something unforgettable.",
    author: "Liam Harper",
    role: "VP of Engineering",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="pr-6 flex-shrink-0">
      <motion.div
        className="relative w-[320px] md:w-[400px] h-full p-8 md:p-10 rounded-3xl bg-bg-surface border border-edge-subtle hover:border-brand-500/30 overflow-hidden flex flex-col group transition-colors duration-500"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
      >
        {/* Soft elegant gradient mesh that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-warm-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Noise texture for premium print-like feel */}
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none group-hover:opacity-[0.04] transition-opacity duration-700"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        ></div>

        {/* Ambient glow in the corner */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-500/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full justify-between flex-grow">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-start">
              {/* Premium minimal quote mark */}
              <div className="w-10 h-10 rounded-2xl border border-edge-subtle flex items-center justify-center bg-bg-void shadow-sm group-hover:border-brand-500/30 group-hover:bg-brand-500/10 transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 origin-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-muted-foreground group-hover:text-brand-500 transition-colors duration-500"
                >
                  <path
                    d="M10 11V17H4V11C4 7.68629 6.68629 5 10 5V7C8.34315 7 7 8.34315 7 10V11H10ZM20 11V17H14V11C14 7.68629 16.686 5 20 5V7C18.3431 7 17 8.34315 17 10V11H20Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            <p className="text-base md:text-lg text-foreground/80 font-sans leading-relaxed tracking-wide group-hover:text-foreground transition-colors duration-500">
              {testimonial.quote}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-10 pt-6 border-t border-edge-subtle/50 group-hover:border-edge-subtle transition-colors duration-500">
            <div className="relative h-12 w-12 flex-shrink-0 rounded-full overflow-hidden border border-edge-subtle group-hover:border-brand-500/40 transition-colors duration-500">
              <div className="absolute inset-0 bg-bg-void group-hover:bg-brand-500/10 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center font-heading text-base font-medium text-foreground/80 group-hover:text-brand-400 transition-colors duration-500 group-hover:scale-110">
                {testimonial.author.charAt(0)}
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold text-foreground text-sm tracking-wide group-hover:text-brand-400 transition-colors duration-500">
                {testimonial.author}
              </h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mt-1 group-hover:text-brand-500/80 transition-colors duration-500">
                {testimonial.role}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function TestimonialsSection({
  className,
  testimonials = DEFAULT_TESTIMONIALS,
}: TestimonialsProps) {
  // We duplicate the array multiple times to ensure enough content to fill the screen width before it loops
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section
      className={`py-32 relative bg-bg-void overflow-hidden flex flex-col items-center ${className ?? ""}`}
    >
      {/* Decorative blurred blobs */}
      <div className="absolute top-1/4 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none opacity-50" />
      <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-[500px] h-[500px] bg-warm-500/10 rounded-full blur-[150px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 relative z-10 mb-20">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Client{" "}
              <span className="text-brand-500 font-serif italic font-normal">
                Perspectives
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-2xl mx-auto">
              Don't just take my word for it. Here's what people I've worked
              with have to say about my approach to design engineering.
            </p>
          </motion.div>
        </div>
      </div>

      <div
        className="relative w-full max-w-[100vw] overflow-hidden flex flex-col gap-6 py-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {/* Row 1 - scrolling left */}
        <div className="flex w-max">
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-33.333333%"] }}
            transition={{
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            }}
          >
            {marqueeItems.map((testimonial, idx) => (
              <TestimonialCard key={`row1-${idx}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 - scrolling right */}
        <div className="flex w-max">
          <motion.div
            className="flex w-max"
            initial={{ x: "-33.333333%" }}
            animate={{ x: ["-33.333333%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 45,
              repeat: Infinity,
            }}
          >
            {[...marqueeItems].reverse().map((testimonial, idx) => (
              <TestimonialCard key={`row2-${idx}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
