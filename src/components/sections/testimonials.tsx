"use client";

import React from 'react';
import { motion } from 'motion/react';

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
    quote: "Joren's ability to translate complex design requirements into flawless, performant code is unmatched. The attention to micro-interactions completely elevated our product.",
    author: "Sarah Jenkins",
    role: "Product Lead at TechNova",
  },
  {
    quote: "Not just a developer, but a true design engineer. They brought a level of polish to our frontend that we didn't even know was possible.",
    author: "Marcus Chen",
    role: "Creative Director",
  },
  {
    quote: "Working with Joren was a game-changer. The codebase is incredibly maintainable, and the user experience is smoother than ever.",
    author: "Elena Rodriguez",
    role: "CTO at StartupX",
  },
  {
    quote: "I've never seen someone so meticulous about both code quality and visual aesthetics. A rare combination of talents.",
    author: "David Kim",
    role: "Senior Designer",
  },
  {
    quote: "Joren delivered beyond our expectations. The animations are buttery smooth, and the architecture is robust and scalable.",
    author: "Alex Thompson",
    role: "Founder at WebStudio",
  },
  {
    quote: "A visionary engineer who understands that performance and design must work hand-in-hand to build something unforgettable.",
    author: "Liam Harper",
    role: "VP of Engineering",
  }
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="pr-6 flex-shrink-0">
      <div className="relative w-[320px] md:w-[400px] h-full p-8 md:p-10 rounded-[2rem] bg-bg-surface border border-edge-subtle hover:border-brand-500/30 transition-colors group flex flex-col">
        {/* Decorative large quote mark */}
        <div className="text-brand-500/10 font-serif text-8xl absolute -top-2 left-4 leading-none select-none group-hover:text-brand-500/20 transition-colors duration-500">
          "
        </div>
        
        <div className="relative z-10 flex flex-col h-full justify-between flex-grow">
          <p className="text-base md:text-lg text-foreground font-sans leading-relaxed mb-8 pt-4">
            {testimonial.quote}
          </p>
          
          <div className="flex items-center gap-4 mt-auto">
            <div className="h-12 w-12 flex-shrink-0 rounded-full bg-bg-void border border-brand-500/30 flex items-center justify-center font-heading text-lg text-brand-500 shadow-inner overflow-hidden">
              <span className="opacity-80 group-hover:scale-110 transition-transform duration-300">
                {testimonial.author.charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-foreground font-heading tracking-wide">
                {testimonial.author}
              </h4>
              <p className="text-xs text-brand-500/80 uppercase tracking-wider font-semibold mt-0.5">
                {testimonial.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection({ className, testimonials = DEFAULT_TESTIMONIALS }: TestimonialsProps) {
  // We duplicate the array multiple times to ensure enough content to fill the screen width before it loops
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className={`py-32 relative bg-bg-void overflow-hidden flex flex-col items-center ${className ?? ''}`}>
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
              Client <span className="text-brand-500 font-serif italic font-normal">Perspectives</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-2xl mx-auto">
              Don't just take my word for it. Here's what people I've worked with have to say about my approach to design engineering.
            </p>
          </motion.div>
        </div>
      </div>

      <div 
        className="relative w-full max-w-[100vw] overflow-hidden flex flex-col gap-6" 
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' 
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
