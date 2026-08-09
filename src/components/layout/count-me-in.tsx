'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'motion/react';
import { Plus } from 'lucide-react';

type ConnectionStatus = 'connecting' | 'connected' | 'polling' | 'error';

type Particle = {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly angle: number;
  readonly scale: number;
};

export function CountMeIn() {
  const [count, setCount] = useState<number | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [particles, setParticles] = useState<ReadonlyArray<Particle>>([]);
  const [isTapping, setIsTapping] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const eventSourceRef = useRef<EventSource | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const statusRef = useRef<ConnectionStatus>('connecting');
  const connectSSERef = useRef<() => void>(() => {});

  const updateStatus = useCallback((newStatus: ConnectionStatus) => {
    statusRef.current = newStatus;
    setStatus(newStatus);
  }, []);

  const fetchCurrentCount = useCallback(async () => {
    try {
      const res = await fetch('/api/count');
      if (res.ok) {
        const data = (await res.json()) as { count: number };
        setCount(data.count);
        return data.count;
      }
    } catch {
      // Ignore transient network errors during polling / HMR dev reloads
    }
    return null;
  }, []);

  const startPolling = useCallback(() => {
    if (pollingIntervalRef.current) return;
    pollingIntervalRef.current = setInterval(async () => {
      const latestCount = await fetchCurrentCount();
      updateStatus(latestCount !== null ? 'polling' : 'error');
    }, 3000);
  }, [fetchCurrentCount, updateStatus]);

  const connectSSE = useCallback(() => {
    if (eventSourceRef.current) eventSourceRef.current.close();
    updateStatus('connecting');
    const source = new EventSource('/api/count');
    eventSourceRef.current = source;

    source.onopen = () => {
      updateStatus('connected');
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };

    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as { count: number };
        setCount(data.count);
      } catch {
      }
    };

    source.onerror = () => {
      source.close();
      updateStatus('polling');
      startPolling();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(() => {
        if (statusRef.current === 'polling') connectSSERef.current();
      }, 30000);
    };
  }, [startPolling, updateStatus]);

  useEffect(() => {
    connectSSERef.current = connectSSE;
  }, [connectSSE]);

  useEffect(() => {
    let active = true;
    const init = async () => {
      const latest = await fetchCurrentCount();
      if (active) {
        if (latest !== null) {
          connectSSE();
        } else {
          updateStatus('polling');
          startPolling();
        }
      }
    };

    const timeoutId = setTimeout(() => {
      void init();
    }, 0);

    return () => {
      active = false;
      clearTimeout(timeoutId);
      if (eventSourceRef.current) eventSourceRef.current.close();
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [fetchCurrentCount, connectSSE, startPolling, updateStatus]);

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const rect = rectRef.current;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
  }, []);

  const handleTap = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTapping) return;
    setIsTapping(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      angle: (Math.random() - 0.5) * 60,
      scale: 0.6 + Math.random() * 0.4,
    };

    setParticles((prev) => [...prev, newParticle]);
    setCount((prev) => (prev !== null ? prev + 1 : 1));

    try {
      const res = await fetch('/api/count', { method: 'POST' });
      if (res.ok) {
        const data = (await res.json()) as { count: number };
        setCount(data.count);
      }
    } catch {
      // Ignore network errors on tap
    } finally {
      setTimeout(() => setIsTapping(false), 150);
    }
  };

  const formattedCount = count !== null ? count.toLocaleString() : '---';

  const statusColor = {
    connecting: 'bg-amber-500',
    connected: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
    polling: 'bg-blue-500',
    error: 'bg-red-500',
  }[status];

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex items-center rounded-full bg-bg-surface/30 p-1.5 border border-edge-subtle/40 backdrop-blur-xl transition-all duration-500 hover:border-brand-500/30 overflow-hidden"
    >
      {/* Interactive Spotlight background effect */}
      <motion.div 
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, var(--color-brand-500), transparent 50%)`,
          opacity: 0.15,
          mixBlendMode: 'screen'
        }}
      />

      {/* Telemetry Display */}
      <div className="relative flex h-10 items-center justify-center rounded-full bg-black/40 px-5 shadow-inner border border-white/5 z-10">
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className="relative flex size-1.5 items-center justify-center">
            {status === 'connected' && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
            )}
            <span className={`relative inline-flex size-1.5 rounded-full ${statusColor}`}></span>
          </div>
          
          {/* Digital Counter */}
          <span className="font-mono text-sm font-medium tracking-wider text-brand-500">
            {formattedCount}
          </span>

          <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground text-brand-500">Visitors</span>
        </div>
      </div>

      {/* Interaction Button */}
      <div className="relative z-10">
        <motion.button
          onClick={handleTap}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-10 items-center gap-2 rounded-full px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="relative z-10">Count me in</span>
          <Plus className="size-3 text-brand-500" />
          
          {/* Button Hover Aura */}
          <div className="absolute inset-0 rounded-full bg-brand-500/0 transition-colors duration-300 group-hover:bg-brand-500/10" />
        </motion.button>

        {/* Minimal Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, y: p.y - 10, x: p.x - 5, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 0, y: p.y - 60, x: p.x + p.angle, scale: p.scale, rotate: p.angle }}
              exit={{ opacity: 0 }}
              onAnimationComplete={() => setParticles(prev => prev.filter(particle => particle.id !== p.id))}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="pointer-events-none absolute z-50 text-brand-500 font-mono text-xs font-bold mix-blend-screen"
            >
              +1
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
