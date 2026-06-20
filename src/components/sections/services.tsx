"use client";

import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { cn } from "@/lib/utils";

export interface Service {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tags?: string[];
}

export interface ServicesProps {
  readonly className?: string;
  readonly services?: ReadonlyArray<Service>;
}

const DEFAULT_SERVICES: ReadonlyArray<Service> = [
  {
    id: "01",
    title: "Frontend Architecture",
    description:
      "Architecting scalable, type-safe foundations using Next.js and React. Built for raw performance, seamless routing, and long-term maintainability.",
    tags: ["Next.js", "React", "TypeScript", "Performance"],
  },
  {
    id: "02",
    title: "Design Engineering",
    description:
      "Bridging the gap between Figma and code. Crafting pixel-perfect, responsive interfaces that respect design tokens and user experience.",
    tags: ["Tailwind CSS", "Figma", "Design Systems", "Accessibility"],
  },
  {
    id: "03",
    title: "Interaction & Motion",
    description:
      "Elevating interfaces with fluid animations, scroll-driven reveals, and micro-interactions that make digital products feel alive and premium.",
    tags: ["Framer Motion", "GSAP", "Micro-interactions", "WebGL"],
  },
];

const ServiceRow = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      onMouseMove={handleMouseMove}
      className="group relative border-t border-edge-subtle py-12 md:py-20 transition-colors duration-500 overflow-hidden hover:bg-bg-surface/30"
    >
      {/* Subtle Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(150, 150, 150, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">
        {/* ID */}
        <div className="md:col-span-2 flex items-start">
          <span className="text-sm font-mono tracking-widest text-brand-500/50 group-hover:text-brand-500 transition-colors duration-500 mt-2">
            /{service.id}
          </span>
        </div>

        {/* Title & Tags */}
        <div className="md:col-span-5 flex flex-col justify-start">
          <motion.h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 transition-transform duration-700 ease-out group-hover:translate-x-2">
            {service.title}
          </motion.h3>
          {service.tags && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {service.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1 + i * 0.05 + 0.3,
                    duration: 0.5,
                  }}
                  className="px-3 py-1 rounded-full border border-edge-subtle text-[11px] uppercase tracking-wider font-mono text-muted-foreground group-hover:border-brand-500/30 group-hover:text-brand-500/80 transition-colors duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-5 md:pl-8 lg:pl-12 flex items-start">
          <p className="text-lg md:text-xl text-muted-foreground font-sans leading-relaxed transition-colors duration-500 group-hover:text-foreground/90">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export function ServicesSection({
  className,
  services = DEFAULT_SERVICES,
}: ServicesProps) {
  return (
    <section
      className={cn(
        "py-32 md:py-48 relative bg-bg-base overflow-hidden",
        className,
      )}
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 relative z-10 mb-24 md:mb-26s">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3.5 mb-10 md:mb-14 select-none"
        >
          <span className="font-mono text-xs md:text-sm font-bold text-brand-500 tracking-widest bg-brand-500/10 px-2.5 py-1 rounded-md border border-brand-500/20">
            03
          </span>
          <span className="font-mono text-xs md:text-sm font-medium text-muted-foreground/30">
            /
          </span>
          <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Services
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-edge-subtle/50 via-edge-subtle/10 to-transparent ml-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-4xl mx-auto flex flex-col items-center text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Expertise &{" "}
            <span className="text-brand-500 font-serif italic font-normal">
              Capabilities.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-2xl leading-relaxed">
            Delivering comprehensive frontend solutions that prioritize both
            aesthetic brilliance and technical excellence.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 w-full border-b border-edge-subtle">
        {services.map((service, index) => (
          <ServiceRow key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
