'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Award, ShieldCheck } from 'lucide-react';
import { CertificationsTelemetryDashboard } from './telemetry';
import { CERTIFICATION_ITEMS } from './constants';
import { CertificationItem } from './types';

export interface CertificationsViewProps {
  readonly items?: ReadonlyArray<CertificationItem>;
}

export function CertificationsView({ 
  items = CERTIFICATION_ITEMS 
}: CertificationsViewProps) {
  const [activeCertIndex, setActiveCertIndex] = useState<number>(0);
  const certificationsRefs = useRef<Array<HTMLDivElement | null>>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center']
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -45% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = parseInt(id.replace('certification-', ''), 10);
          if (!isNaN(index)) {
            setActiveCertIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    certificationsRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  const scrollToCert = (index: number) => {
    setActiveCertIndex(index);
    const element = document.getElementById(`certification-${index}`);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Sticky Left Dashboard (4-cols) */}
      <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit flex flex-col gap-6 journey-left-column">
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-4">
            Verified <span className="text-brand-500">Nodes.</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed font-sans max-w-md">
            Industry-standard certifications, technical credentials, and verified expertise keys.
          </p>
        </div>

        <div className="border border-edge-subtle bg-bg-surface/20 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-muted-foreground/20 group-hover:border-brand-500/40 transition-colors duration-500" />
          <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-muted-foreground/20 group-hover:border-brand-500/40 transition-colors duration-500" />
          <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-muted-foreground/20 group-hover:border-brand-500/40 transition-colors duration-500" />
          <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-muted-foreground/20 group-hover:border-brand-500/40 transition-colors duration-500" />
          
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center border-b border-edge-subtle/30 pb-3.5 text-[10px] font-mono text-muted-foreground/50 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                VERIFICATION HUB
              </div>
              <div>CERT: SECURE</div>
            </div>

            <CertificationsTelemetryDashboard />

            <div className="flex flex-col gap-2.5 mt-2">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCert(index)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border font-mono text-xs text-left transition-all duration-300 cursor-pointer ${
                    activeCertIndex === index
                      ? 'border-brand-500/30 bg-brand-500/5 text-brand-400 font-bold shadow-[0_0_15px_rgba(224,32,32,0.06)]'
                      : 'border-edge-subtle/40 hover:border-edge-subtle bg-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] ${activeCertIndex === index ? 'text-brand-500' : 'text-muted-foreground/30'}`}>
                      0{index + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-semibold tracking-wide truncate max-w-[150px] md:max-w-[200px]">{item.title}</span>
                      <span className="text-[10px] font-normal text-muted-foreground/60">{item.issuer}</span>
                    </div>
                  </div>
                  <ChevronRight className={`size-3.5 transition-transform duration-300 ${activeCertIndex === index ? 'translate-x-0.5 text-brand-500' : 'text-muted-foreground/30'}`} />
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-edge-subtle/30 pt-4 font-mono text-center">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">3</span>
                <span className="text-[9px] text-muted-foreground/60 uppercase font-semibold">Active Certs</span>
              </div>
              <div className="flex flex-col border-l border-edge-subtle/30">
                <span className="text-lg font-bold text-foreground">100%</span>
                <span className="text-[9px] text-muted-foreground/60 uppercase font-semibold">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Credentials List (8-cols) */}
      <div ref={timelineRef} className="lg:col-span-8 relative">
        <div className="absolute left-3 md:left-8 top-3 bottom-3 w-[2px] bg-edge-subtle/40 pointer-events-none z-0">
          <motion.div
            style={{ scaleY }}
            className="w-full h-full bg-gradient-to-b from-brand-500 via-warm-500 to-brand-500 origin-top shadow-[0_0_12px_rgba(224,32,32,0.4)]"
          />
        </div>

        <div className="space-y-12 md:space-y-16 pl-10 md:pl-20 relative z-10">
          {items.map((item, index) => {
            const isActive = activeCertIndex === index;
            return (
              <div
                key={index}
                id={`certification-${index}`}
                ref={(el) => {
                  certificationsRefs.current[index] = el;
                }}
                className="relative scroll-mt-28 group"
              >
                <div className="absolute -left-[45px] md:-left-[73px] top-4 select-none pointer-events-none flex items-center justify-center size-9 md:size-[52px]">
                  <AnimatePresence>
                    {isActive && (
                      <motion.svg
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, rotate: 360 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ rotate: { duration: 8, ease: 'linear', repeat: Infinity }, default: { duration: 0.3 } }}
                        className="absolute size-9 md:size-[48px] text-brand-500/40"
                        viewBox="0 0 100 100"
                      >
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="10 8" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                  
                  <div className={`absolute rounded-full transition-all duration-500 ${
                    isActive 
                      ? 'size-6 md:size-8 bg-brand-500/20 shadow-[0_0_15px_rgba(224,32,32,0.5)] scale-110' 
                      : 'size-4 md:size-6 bg-transparent group-hover:bg-brand-500/10'
                  }`} />
                  
                  <div className={`absolute rounded-full transition-all duration-500 ${
                    isActive 
                      ? 'size-2.5 md:size-3.5 bg-brand-500' 
                      : 'size-2 md:size-3 bg-edge-subtle border-2 border-muted-foreground/30 group-hover:border-brand-500/50 group-hover:bg-bg-void'
                  }`} />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                  className={`border p-6 md:p-8 rounded-[2rem] bg-bg-surface/30 backdrop-blur-md shadow-2xl relative overflow-hidden transition-all duration-500 group/card ${
                    isActive 
                      ? 'border-brand-500/30 shadow-[0_0_35px_rgba(224,32,32,0.05)] bg-bg-surface/40' 
                      : 'border-edge-subtle/40 hover:border-brand-500/20 hover:bg-bg-surface/35'
                  }`}
                >
                  <div className="absolute top-4 right-4 text-[9px] font-mono text-muted-foreground/20 group-hover/card:text-brand-500/40 transition-colors duration-500 select-none">
                    [CRT-0{index + 1}]
                  </div>

                  <div className="flex flex-col gap-1.5 mb-5 relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover/card:text-brand-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full font-mono border transition-all duration-300 ${
                        isActive
                          ? 'text-brand-400 bg-brand-500/10 border-brand-500/20'
                          : 'text-warm-500 bg-warm-500/5 border-warm-500/10 group-hover/card:border-warm-500/20'
                      }`}>
                        {item.date}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-medium text-brand-500">
                      <div className="flex items-center gap-1.5">
                        <Award className="size-3.5 text-brand-500/60" />
                        {item.issuer}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground/60 font-mono text-[11px] md:text-xs">
                        ID: {item.credId}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6 relative z-10 text-left font-mono">
                    <div className="border border-edge-subtle/50 bg-bg-void/40 p-4 rounded-xl flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[10px] text-muted-foreground/50 font-bold border-b border-edge-subtle/30 pb-1.5 uppercase">
                        <span>Verification Signatures</span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <ShieldCheck className="size-3" /> VERIFIED
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground/80 leading-relaxed space-y-1">
                        <div><span className="text-brand-500 font-bold">SHA-256 HASH:</span> {item.verifyKey}</div>
                        <div><span className="text-brand-500 font-bold">STATUS:</span> Cryptographically signed and active.</div>
                      </div>
                    </div>
                  </div>

                  {item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-edge-subtle/30 relative z-10 select-none">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 font-mono text-[10px] md:text-xs rounded-lg border border-edge-subtle/60 bg-bg-void/20 text-muted-foreground/80 hover:border-brand-500/20 hover:bg-brand-500/5 hover:text-brand-400 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
