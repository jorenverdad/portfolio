'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function TelemetryRadar() {
  return (
    <div className="relative w-36 h-36 mx-auto flex items-center justify-center select-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes radar-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes radar-blip-1 {
          0%, 8% { opacity: 0.15; transform: translate(-50%, -50%) scale(0.9); }
          11% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); filter: drop-shadow(0 0 6px oklch(0.56 0.215 25)); }
          16% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.0); }
          40% { opacity: 0.15; transform: translate(-50%, -50%) scale(0.9); }
          100% { opacity: 0.15; }
        }
        @keyframes radar-blip-2 {
          0%, 63% { opacity: 0.1; transform: translate(-50%, -50%) scale(0.9); }
          66% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); filter: drop-shadow(0 0 6px oklch(0.56 0.215 25)); }
          71% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.0); }
          95% { opacity: 0.1; transform: translate(-50%, -50%) scale(0.9); }
          100% { opacity: 0.1; }
        }
        @keyframes radar-blip-3 {
          0%, 81% { opacity: 0.1; transform: translate(-50%, -50%) scale(0.9); }
          84% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); filter: drop-shadow(0 0 6px oklch(0.56 0.215 25)); }
          89% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.0); }
          10% { opacity: 0.1; transform: translate(-50%, -50%) scale(0.9); }
          100% { opacity: 0.1; }
        }
        @keyframes hud-lock {
          0%, 100% { border-color: rgba(224, 32, 32, 0.4); transform: scale(1); }
          50% { border-color: rgba(224, 32, 32, 0.8); transform: scale(1.08); }
        }
        @keyframes ping-ring {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}} />

      <div 
        className="absolute inset-[2%] rounded-full overflow-hidden pointer-events-none" 
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, transparent 50%, oklch(0.56 0.215 25 / 0.02) 60%, oklch(0.56 0.215 25 / 0.1) 85%, oklch(0.56 0.215 25 / 0.22) 100%)',
          animation: 'radar-spin 6s linear infinite',
          transformOrigin: 'center center'
        }}
      >
        <div className="absolute top-0 left-[calc(50%-1px)] w-[1.5px] h-[50%] bg-gradient-to-t from-brand-500/30 to-brand-500 shadow-[0_0_8px_oklch(0.56_0.215_25)]" />
      </div>

      <svg className="w-full h-full text-brand-500/15 pointer-events-none z-10" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="0.5 2" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
        <circle cx="50" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="0.25" />
        
        <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
        <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
        
        <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.56 0.215 25 / 0.05)" strokeWidth="4" />

        <text x="50" y="9" textAnchor="middle" dominantBaseline="middle" className="fill-brand-500/40 font-mono text-[3.5px] font-bold">00</text>
        <text x="91" y="50.7" textAnchor="middle" dominantBaseline="middle" className="fill-brand-500/40 font-mono text-[3.5px] font-bold">09</text>
        <text x="50" y="92.5" textAnchor="middle" dominantBaseline="middle" className="fill-brand-500/40 font-mono text-[3.5px] font-bold">18</text>
        <text x="9" y="50.7" textAnchor="middle" dominantBaseline="middle" className="fill-brand-500/40 font-mono text-[3.5px] font-bold">27</text>
      </svg>

      <div 
        className="absolute z-20 pointer-events-none"
        style={{
          top: '25%',
          left: '70%',
          animation: 'radar-blip-1 6s linear infinite'
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_oklch(0.56_0.215_25)]" />
        <div 
          className="absolute inset-[-6px] rounded-full border border-brand-500/40"
          style={{
            animation: 'ping-ring 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite',
            animationDelay: '0.65s'
          }}
        />
        <div 
          className="absolute -top-1.5 -left-1.5 w-[18px] h-[18px] border border-brand-500/40 rounded-sm"
          style={{
            animation: 'hud-lock 3s ease-in-out infinite'
          }}
        >
          <span className="absolute -bottom-3.5 left-[-4px] font-mono text-[5px] text-brand-400/80 bg-bg-void/90 px-0.5 border border-brand-500/20 rounded-sm scale-90 origin-left">
            TRK-2025
          </span>
        </div>
      </div>

      <div 
        className="absolute z-20 pointer-events-none"
        style={{
          top: '65%',
          left: '25%',
          animation: 'radar-blip-2 6s linear infinite'
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_oklch(0.56_0.215_25)]" />
        <div 
          className="absolute inset-[-6px] rounded-full border border-brand-500/30"
          style={{
            animation: 'ping-ring 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite',
            animationDelay: '4.0s'
          }}
        />
        <span className="absolute -top-3 left-[-6px] font-mono text-[5px] text-muted-foreground/40 scale-75 origin-bottom">
          NODE_B
        </span>
      </div>

      <div 
        className="absolute z-20 pointer-events-none"
        style={{
          top: '40%',
          left: '35%',
          animation: 'radar-blip-3 6s linear infinite'
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_oklch(0.56_0.215_25)]" />
        <div 
          className="absolute inset-[-6px] rounded-full border border-brand-500/30"
          style={{
            animation: 'ping-ring 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite',
            animationDelay: '5.06s'
          }}
        />
      </div>

      <div className="absolute w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(224,32,32,0.6)] animate-ping" />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-brand-500 z-30" />
    </div>
  );
}

export function AcademicTelemetryDashboard() {
  return (
    <div className="relative w-36 h-36 mx-auto flex items-center justify-center select-none mb-2">
      <svg className="w-full h-full text-brand-500/15 pointer-events-none z-10" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1.5 1.5" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" />
        
        {/* GPA Progress Circle (97.5% full for 3.9/4.0) */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="36" 
          fill="none" 
          stroke="oklch(0.56 0.215 25)" 
          strokeWidth="3" 
          strokeLinecap="round"
          strokeDasharray="226"
          initial={{ strokeDashoffset: 226 }}
          animate={{ strokeDashoffset: 5.6 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ transformOrigin: 'center center', rotate: '-90deg' }}
        />

        {/* Major Core Completion (100% full) */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="28" 
          fill="none" 
          stroke="oklch(0.62 0.17 45)" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          strokeDasharray="176"
          initial={{ strokeDashoffset: 176 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          style={{ transformOrigin: 'center center', rotate: '-90deg' }}
        />

        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        
        <text x="50" y="47" textAnchor="middle" dominantBaseline="middle" className="fill-foreground font-mono text-[9px] font-bold">3.90</text>
        <text x="50" y="56" textAnchor="middle" dominantBaseline="middle" className="fill-brand-400/80 font-mono text-[4px] uppercase tracking-wider font-semibold">GPA</text>
      </svg>
      <div className="absolute w-24 h-24 rounded-full border border-brand-500/5 animate-pulse pointer-events-none" />
    </div>
  );
}

export function CertificationsTelemetryDashboard() {
  const [log, setLog] = useState<readonly string[]>([
    'SYS: LOADING KEYCHAIN...',
    'AUTH: CONNECTING SSL/TLS',
    'SEC: VALIDATING SHA-256',
    'LIC: SYNC KEY (0x8F2D)'
  ]);

  useEffect(() => {
    const lines = [
      'SEC: HASH VALIDATION... OK',
      'STATUS: SIGNED BY AUTHORITIES',
      'SERVER: CERT-NET PORT 443 SECURE',
      'DB-SYNC: CREDENTIAL OK',
      'LIC-CHK: EXPIRE DATES CURRENT',
      'KEY-VALID: NODE TRUSTED',
      'AUTH: KEY DECRYPTION SUCCESS'
    ];
    let counter = 0;
    const interval = setInterval(() => {
      setLog(prev => {
        const next = [...prev.slice(1), lines[counter % lines.length]!];
        counter++;
        return next;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-bg-void/60 border border-edge-subtle/70 rounded-2xl p-4.5 font-mono text-[9.5px] text-brand-400 flex flex-col gap-2 min-h-[145px] shadow-inner select-none relative overflow-hidden text-left">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/20 to-transparent animate-pulse" />
      <div className="text-[8.5px] text-muted-foreground/40 border-b border-edge-subtle/30 pb-1.5 flex justify-between uppercase font-bold tracking-wider">
        <span>Crypto Validation</span>
        <span className="animate-pulse flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500" /> LIVE
        </span>
      </div>
      <div className="flex-1 flex flex-col gap-1.5 text-brand-400/90 font-medium">
        {log.map((line, idx) => (
          <div key={idx} className="truncate">
            <span className="text-brand-500/40 mr-1.5">&gt;</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ActivitiesTelemetryDashboard() {
  const gridCells = [
    [3, 0, 1, 2, 0, 1, 3, 0],
    [0, 1, 2, 0, 3, 1, 0, 2],
    [1, 3, 0, 2, 1, 0, 3, 1],
    [0, 2, 1, 0, 2, 3, 0, 1],
    [2, 0, 3, 1, 0, 1, 2, 0],
    [1, 2, 0, 3, 2, 0, 1, 3]
  ];

  return (
    <div className="flex flex-col gap-3.5 border border-edge-subtle/50 bg-bg-surface/10 rounded-2xl p-4.5 select-none text-left">
      <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground/50 font-bold uppercase tracking-wider">
        <span>Activity Grid</span>
        <span className="text-brand-400">Node: OS-CONTRIB</span>
      </div>
      
      <div className="flex flex-col gap-1.5 mx-auto">
        {gridCells.map((row, rIdx) => (
          <div key={rIdx} className="flex gap-1.5">
            {row.map((val, cIdx) => {
              const colors = [
                'bg-bg-void/40 border-edge-subtle/30',
                'bg-brand-500/15 border-brand-500/10',
                'bg-brand-500/45 border-brand-500/20',
                'bg-brand-500/85 border-brand-500/50 shadow-[0_0_8px_rgba(224,32,32,0.15)] animate-pulse'
              ];
              return (
                <div 
                  key={cIdx} 
                  className={`w-3.5 h-3.5 rounded-sm border transition-colors duration-500 ${colors[val]!}`}
                  style={{ transitionDelay: `${(rIdx + cIdx) * 35}ms` }}
                />
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-[8px] font-mono text-muted-foreground/40 mt-0.5 uppercase font-semibold">
        <span>Less</span>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded bg-bg-void/40 border border-edge-subtle/30" />
          <span className="w-2 h-2 rounded bg-brand-500/15 border border-brand-500/10" />
          <span className="w-2 h-2 rounded bg-brand-500/45 border border-brand-500/20" />
          <span className="w-2 h-2 rounded bg-brand-500/85 border border-brand-500/50" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
