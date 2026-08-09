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
    title: "Web Application Development",
    description:
      "Build fast, type-safe web applications that scale. I construct clean architectures using modern frameworks, prioritizing load speed and codebase longevity so your product handles growth without friction.",
    tags: ["Next.js", "React", "TypeScript", "Web Performance"],
  },
  {
    id: "02",
    title: "Design Engineering",
    description:
      "Convert Figma designs into pixel-perfect frontend code. I build responsive, highly accessible interfaces that respect your design system's integrity while ensuring fluid user interactions.",
    tags: ["Tailwind CSS", "Figma", "Design Systems", "Accessibility"],
  },
  {
    id: "03",
    title: "Full-Stack Engineering",
    description:
      "Launch secure, database-driven products from the schema up. I develop robust backends, design secure APIs, and optimize SQL databases so your platform runs fast under heavy traffic.",
    tags: ["Laravel", "Supabase", "PostgreSQL", "API Design", "Vercel"],
  },
  {
    id: "04",
    title: "Mobile Application Development",
    description:
      "Reach users on any screen with native iOS and Android apps. I build lightweight mobile experiences using React Native, guiding your product from initial setup to a successful App Store launch.",
    tags: ["React Native", "iOS & Android", "Mobile UI"],
  },
  {
    id: "05",
    title: "Quality Assurance & Testing",
    description:
      "Ship software with total confidence. I write automated integration and end-to-end tests using Playwright and Vitest to catch bugs before your users do, keeping deployments safe and reliable.",
    tags: ["Playwright", "Vitest", "CI/CD", "E2E Testing"],
  },
  {
    id: "06",
    title: "Video & Content Editing",
    description:
      "Grow your brand's reach with short-form videos tailored for social algorithms. I edit content using dynamic typography, tight pacing, and sound design to hook viewers in the first seconds and turn impressions into engagement.",
    tags: ["CapCut", "Adobe Premiere", "Video Editing", "Content Strategy"],
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
  const rectRef = React.useRef<DOMRect | null>(null);

  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    },
    [],
  );

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!rectRef.current) {
        rectRef.current = e.currentTarget.getBoundingClientRect();
      }
      const { left, top } = rectRef.current;
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = React.useCallback(() => {
    rectRef.current = null;
  }, []);

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
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative border-t border-edge-subtle py-8 sm:py-12 md:py-20 transition-colors duration-500 overflow-hidden hover:bg-bg-surface/30"
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
          <motion.h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 transition-transform duration-700 ease-out group-hover:translate-x-2">
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
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-sans leading-relaxed transition-colors duration-500 group-hover:text-foreground/90">
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
            Services &{" "}
            <span className="text-brand-500 font-serif italic font-normal">
              Capabilities.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-sans max-w-2xl leading-relaxed">
            Building high-performance web applications, reliable APIs,
            pixel-perfect user interfaces, and engaging digital content designed
            to scale your business.
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
