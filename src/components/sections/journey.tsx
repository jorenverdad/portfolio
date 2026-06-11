'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { GridPattern } from '@/components/ui/grid-pattern';
import { 
  Calendar, 
  Briefcase, 
  MapPin, 
  ChevronRight, 
  Cpu, 
  Award, 
  Terminal, 
  GraduationCap, 
  Activity, 
  ShieldCheck, 
  ExternalLink,
  BookOpen
} from 'lucide-react';

// ============================================================================
// Data Models & Mock Data
// ============================================================================

export interface JourneyMilestone {
  readonly year: string;
  readonly title: string;
  readonly role: string;
  readonly description: string;
  readonly location?: string;
  readonly tags?: readonly string[];
  readonly highlights?: readonly string[];
  readonly metrics?: readonly { label: string; value: string }[];
}

export interface JourneyProps {
  readonly className?: string;
  readonly milestones?: ReadonlyArray<JourneyMilestone>;
}

const DEFAULT_MILESTONES: ReadonlyArray<JourneyMilestone> = [
  {
    year: '2025 - Present',
    title: 'Senior Frontend Engineer',
    role: 'Tech Innovators Inc.',
    description: 'Leading frontend architecture and team execution for modern next-gen enterprise platforms.',
    location: 'San Francisco, CA (Remote)',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind v4', 'Framer Motion', 'GraphQL'],
    highlights: [
      'Architected a micro-frontend migration from legacy SPA to Next.js App Router, reducing initial page load times by 40%.',
      'Established core component library with high accessibility standards (WCAG 2.1 AA) and token-driven styles.',
      'Mentored 6 junior/mid-level engineers, running design reviews and enforcing strict type-safe code standards.'
    ],
    metrics: [
      { label: 'Load Time Reduction', value: '-40%' },
      { label: 'LCP Score', value: '1.2s' },
      { label: 'Team Led', value: '6 Eng' }
    ]
  },
  {
    year: '2022 - 2024',
    title: 'Frontend Developer',
    role: 'Creative Agency Co.',
    description: 'Developed immersive visual marketing experiences and robust headless commerce applications.',
    location: 'Los Angeles, CA',
    tags: ['React', 'Next.js', 'Three.js / WebGL', 'Tailwind', 'Stripe API'],
    highlights: [
      'Built custom interactive 3D landing pages using Three.js and react-three-fiber, yielding a 25% increase in visitor engagement.',
      'Implemented headless e-commerce integrations using Shopify Admin API and Stripe with optimized server-side rendering.',
      'Managed design-to-code pipeline, ensuring exact styling fidelity and smooth UI animations.'
    ],
    metrics: [
      { label: 'Engagement Increase', value: '+25%' },
      { label: 'Conversion Rate', value: '4.8%' },
      { label: 'Custom 3D Builds', value: '8+' }
    ]
  },
  {
    year: '2020 - 2022',
    title: 'UI/UX Designer & Dev',
    role: 'Freelance',
    description: 'Designed and built tailormade web solutions and digital design systems for growth-stage businesses.',
    location: 'Hybrid / Remote',
    tags: ['Figma', 'React', 'Gatsby', 'CSS Modules', 'WordPress Headless'],
    highlights: [
      'Created end-to-end user interfaces, brand identities, and high-fidelity prototypes in Figma, translating them directly to React code.',
      'Constructed modular design systems that reduced future development cycles by up to 35% for clients.',
      'Optimized SEO performance and semantic HTML structures, helping clients rank on the first page of Google search results.'
    ],
    metrics: [
      { label: 'Dev Cycle Speedup', value: '35%' },
      { label: 'SEO Audit Score', value: '100' },
      { label: 'Clients Served', value: '15+' }
    ]
  }
] as const;

export interface EducationItem {
  readonly degree: string;
  readonly school: string;
  readonly period: string;
  readonly gpa: string;
  readonly courses: readonly string[];
  readonly highlights: readonly string[];
}

const EDUCATION_ITEMS: readonly EducationItem[] = [
  {
    degree: 'B.S. in Computer Science',
    school: 'Tech University / Elite Institution',
    period: '2018 - 2022',
    gpa: '3.9/4.0',
    courses: ['Distributed Systems', 'Advanced Algorithms', 'Web Security', 'Database Engineering'],
    highlights: [
      'Graduated with Summa Cum Laude honors, specializing in high-performance computing.',
      'Completed a capstone project building a distributed task orchestrator, achieving sub-10ms task delays.',
      'Undergraduate researcher in Web Performance Engineering, publishing a paper on WASM-based optimizations.'
    ]
  },
  {
    degree: 'Advanced Web Engineering Track',
    school: 'Frontend Masters & Tech Institutes',
    period: '2022 - 2023',
    gpa: 'N/A',
    courses: ['V8 JS Engine Tuning', 'React Concurrent Architecture', 'HTTP/3 Protocols', 'LCP Diagnostic Audits'],
    highlights: [
      'Mastered the inner workings of React Fiber architecture, concurrent rendering, and rendering lifecycle optimization.',
      'Achieved certification in Web Performance Diagnostics and Largest Contentful Paint (LCP) engineering.'
    ]
  }
];

export interface CertificationItem {
  readonly title: string;
  readonly issuer: string;
  readonly date: string;
  readonly credId: string;
  readonly verifyKey: string;
  readonly skills: readonly string[];
}

const CERTIFICATION_ITEMS: readonly CertificationItem[] = [
  {
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2025',
    credId: 'AWS-ASA-99212',
    verifyKey: '0x8f2d9a3b00fe41',
    skills: ['VPC Architecture', 'Serverless (Lambda)', 'ECS/EKS Containerization', 'Cloud Security']
  },
  {
    title: 'Meta Advanced React Developer',
    issuer: 'Meta (Coursera)',
    date: '2024',
    credId: 'META-ARD-88341',
    verifyKey: '0x4c2b9a78fd1230',
    skills: ['Custom Hooks', 'Concurrent Mode', 'React Performance Profiling', 'State Managers']
  },
  {
    title: 'Vercel Next.js Developer Certification',
    issuer: 'Vercel',
    date: '2025',
    credId: 'VRC-NJS-77429',
    verifyKey: '0x9e107d3fa20bb1',
    skills: ['App Router Architecture', 'Server Actions', 'PPR Configurations', 'Edge Middleware']
  }
];

export interface ActivityItem {
  readonly title: string;
  readonly role: string;
  readonly period: string;
  readonly metrics: readonly { label: string; value: string }[];
  readonly highlights: readonly string[];
  readonly tags: readonly string[];
}

const ACTIVITY_ITEMS: readonly ActivityItem[] = [
  {
    title: 'Global Hackathon 2024',
    role: 'Team Lead & Lead Engineer',
    period: '48 Hours (2024)',
    metrics: [
      { label: 'Team size', value: '4 Eng' },
      { label: 'Rank', value: '1st Place' },
      { label: 'Teams competed', value: '200+' }
    ],
    tags: ['Next.js', 'WebRTC', 'Tailwind', 'Socket.io'],
    highlights: [
      'Led the architecture and engineering of "SyncBoard" — a collaborative real-time whiteboarding tool utilizing WebRTC for ultra-low latency mesh networking.',
      'Won the Grand Prize for Best Technical Implementation and UI/UX fluid design out of 200+ global teams.'
    ]
  },
  {
    title: 'Open Source Ecosystem',
    role: 'Core Contributor',
    period: '2023 - Present',
    metrics: [
      { label: 'PRs merged', value: '45+' },
      { label: 'Repos helped', value: '6+' },
      { label: 'Commits', value: '120+' }
    ],
    tags: ['React', 'Next.js', 'Framer Motion', 'TypeScript'],
    highlights: [
      'Regular contributor to web standard libraries, focusing on optimizing CSS-in-JS transitions and reducing library sizes.',
      'Optimized performance in rendering loops, helping resolve memory leaks on standard routing frameworks.'
    ]
  },
  {
    title: 'Technical Author & Speaker',
    role: 'Tech Evangelist',
    period: '2022 - Present',
    metrics: [
      { label: 'Articles', value: '18+' },
      { label: 'Reads', value: '50k+' },
      { label: 'Talks given', value: '4' }
    ],
    tags: ['Blogging', 'Public Speaking', 'Mentorship'],
    highlights: [
      'Published articles on Dev.to and Medium covering advanced React 19 concepts, compiler optimization, and Framer Motion spring physics.',
      'Spoke at local frontend meetups about Next.js App Router performance audits and layout shifts.'
    ]
  }
];

type SubSectionTab = 'experience' | 'education' | 'certifications' | 'activities';

// ============================================================================
// Telemetry & Visual Subcomponents
// ============================================================================

function TelemetryRadar() {
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

function AcademicTelemetryDashboard() {
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

function CertificationsTelemetryDashboard() {
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

function ActivitiesTelemetryDashboard() {
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

// ============================================================================
// Layout View Containers (Experience, Education, Certifications, Activities)
// ============================================================================

interface ExperienceViewProps {
  readonly activeIndex: number;
  readonly milestones: ReadonlyArray<JourneyMilestone>;
  readonly scrollToMilestone: (index: number) => void;
  readonly scaleY: any;
  readonly milestoneRefs: any;
}

function ExperienceView({ 
  activeIndex, 
  milestones, 
  scrollToMilestone, 
  scaleY, 
  milestoneRefs 
}: ExperienceViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Sticky Telemetry Console (4-cols) */}
      <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit flex flex-col gap-6">
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-4">
            The <span className="text-brand-500">Chronology.</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed font-sans max-w-md">
            A trace of system architecture, team leadership, and interactive design milestones.
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
                SYSTEM ACTIVE
              </div>
              <div>LOC: 37.7749° N</div>
            </div>

            <TelemetryRadar />

            <div className="flex flex-col gap-2.5 mt-2">
              {milestones.map((milestone, index) => (
                <button
                  key={index}
                  onClick={() => scrollToMilestone(index)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border font-mono text-xs text-left transition-all duration-300 cursor-pointer ${
                    activeIndex === index
                      ? 'border-brand-500/30 bg-brand-500/5 text-brand-400 font-bold shadow-[0_0_15px_rgba(224,32,32,0.06)]'
                      : 'border-edge-subtle/40 hover:border-edge-subtle bg-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] ${activeIndex === index ? 'text-brand-500' : 'text-muted-foreground/30'}`}>
                      0{index + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-semibold tracking-wide truncate max-w-[150px] md:max-w-[200px]">{milestone.role}</span>
                      <span className="text-[10px] font-normal text-muted-foreground/60">{milestone.year}</span>
                    </div>
                  </div>
                  <ChevronRight className={`size-3.5 transition-transform duration-300 ${activeIndex === index ? 'translate-x-0.5 text-brand-500' : 'text-muted-foreground/30'}`} />
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-edge-subtle/30 pt-4 font-mono text-center">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">5+</span>
                <span className="text-[9px] text-muted-foreground/60 uppercase font-semibold">Yrs Code</span>
              </div>
              <div className="flex flex-col border-x border-edge-subtle/30">
                <span className="text-lg font-bold text-foreground">3</span>
                <span className="text-[9px] text-muted-foreground/60 uppercase font-semibold">Companies</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">20+</span>
                <span className="text-[9px] text-muted-foreground/60 uppercase font-semibold">Builds</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Cards (8-cols) */}
      <div className="lg:col-span-8 relative">
        <div className="absolute left-3 md:left-8 top-3 bottom-3 w-[2px] bg-edge-subtle/40 pointer-events-none z-0">
          <motion.div
            style={{ scaleY }}
            className="w-full h-full bg-gradient-to-b from-brand-500 via-warm-500 to-brand-500 origin-top shadow-[0_0_12px_rgba(224,32,32,0.4)]"
          />
        </div>

        <div className="space-y-12 md:space-y-16 pl-10 md:pl-20 relative z-10">
          {milestones.map((milestone, index) => {
            const isRich = 'highlights' in milestone || 'metrics' in milestone;
            const highlights = milestone.highlights ?? [milestone.description];
            const metrics = milestone.metrics ?? [];
            const tags = milestone.tags ?? [];
            const location = milestone.location ?? '';
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                id={`milestone-${index}`}
                ref={(el) => {
                  milestoneRefs.current[index] = el;
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
                  <div className={`absolute inset-0 bg-radial from-brand-500/5 via-transparent to-transparent pointer-events-none transition-opacity duration-700 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover/card:opacity-100'
                  }`} />

                  <div className="absolute top-4 right-4 text-[9px] font-mono text-muted-foreground/20 group-hover/card:text-brand-500/40 transition-colors duration-500 select-none">
                    [EXP-0{index + 1}]
                  </div>

                  <div className="flex flex-col gap-1.5 mb-5 relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover/card:text-brand-400 transition-colors duration-300">
                        {milestone.title}
                      </h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full font-mono border transition-all duration-300 ${
                        isActive
                          ? 'text-brand-400 bg-brand-500/10 border-brand-500/20'
                          : 'text-warm-500 bg-warm-500/5 border-warm-500/10 group-hover/card:border-warm-500/20'
                      }`}>
                        {milestone.year}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-medium text-brand-500">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="size-3.5 text-brand-500/60" />
                        {milestone.role}
                      </div>
                      {location && (
                        <div className="flex items-center gap-1.5 text-muted-foreground/60 font-mono text-[11px] md:text-xs">
                          <MapPin className="size-3 text-muted-foreground/40" />
                          {location}
                        </div>
                      )}
                    </div>
                  </div>

                  {isRich && metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 relative z-10">
                      {metrics.map((metric: any, mIndex: number) => (
                        <div
                          key={mIndex}
                          className="border border-edge-subtle/50 bg-bg-void/40 px-3.5 py-2.5 rounded-2xl flex flex-col items-center justify-center text-center group/metric transition-all duration-300 hover:border-brand-500/20 hover:bg-bg-void/60"
                        >
                          <span className="text-[9px] md:text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider mb-1 truncate w-full">
                            {metric.label}
                          </span>
                          <span className="text-base md:text-xl font-bold font-heading text-brand-500 tracking-tight animate-fade-in">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3 mb-6 relative z-10">
                    {highlights.map((highlight: string, hIndex: number) => (
                      <div key={hIndex} className="flex items-start gap-2.5 text-sm md:text-base text-muted-foreground leading-relaxed">
                        <span className="text-brand-500/60 font-mono mt-1 text-[11px] select-none">&gt;</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {isRich && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-edge-subtle/30 relative z-10 select-none">
                      {tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 font-mono text-[10px] md:text-xs rounded-lg border border-edge-subtle/60 bg-bg-void/20 text-muted-foreground/80 hover:border-brand-500/20 hover:bg-brand-500/5 hover:text-brand-400 hover:shadow-[0_0_12px_rgba(224,32,32,0.05)] transition-all duration-300 cursor-default"
                        >
                          {tag}
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

interface EducationViewProps {
  readonly activeEduIndex: number;
  readonly setActiveEduIndex: (idx: number) => void;
  readonly items?: ReadonlyArray<EducationItem>;
}

function EducationView({ 
  activeEduIndex, 
  setActiveEduIndex, 
  items = EDUCATION_ITEMS 
}: EducationViewProps) {
  const scrollToEdu = (index: number) => {
    setActiveEduIndex(index);
    const element = document.getElementById(`education-${index}`);
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
      <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit flex flex-col gap-6">
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-4">
            Academic <span className="text-brand-500">Vector.</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed font-sans max-w-md">
            Systematic learning, core algorithms, and foundational computer science principles.
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
                ACADEMICS ACTIVE
              </div>
              <div>GPA: 3.90</div>
            </div>

            <AcademicTelemetryDashboard />

            <div className="flex flex-col gap-2.5 mt-2">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToEdu(index)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border font-mono text-xs text-left transition-all duration-300 cursor-pointer ${
                    activeEduIndex === index
                      ? 'border-brand-500/30 bg-brand-500/5 text-brand-400 font-bold shadow-[0_0_15px_rgba(224,32,32,0.06)]'
                      : 'border-edge-subtle/40 hover:border-edge-subtle bg-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] ${activeEduIndex === index ? 'text-brand-500' : 'text-muted-foreground/30'}`}>
                      0{index + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-semibold tracking-wide truncate max-w-[150px] md:max-w-[200px]">{item.degree}</span>
                      <span className="text-[10px] font-normal text-muted-foreground/60">{item.period}</span>
                    </div>
                  </div>
                  <ChevronRight className={`size-3.5 transition-transform duration-300 ${activeEduIndex === index ? 'translate-x-0.5 text-brand-500' : 'text-muted-foreground/30'}`} />
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-edge-subtle/30 pt-4 font-mono text-center">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">3.90</span>
                <span className="text-[9px] text-muted-foreground/60 uppercase font-semibold">CS GPA</span>
              </div>
              <div className="flex flex-col border-l border-edge-subtle/30">
                <span className="text-lg font-bold text-foreground">120+</span>
                <span className="text-[9px] text-muted-foreground/60 uppercase font-semibold">Credits</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Timeline Cards (8-cols) */}
      <div className="lg:col-span-8 relative">
        <div className="absolute left-3 md:left-8 top-3 bottom-3 w-[2px] bg-edge-subtle/40 pointer-events-none z-0">
          <div className="w-full h-full bg-brand-500/20 origin-top" />
        </div>

        <div className="space-y-12 md:space-y-16 pl-10 md:pl-20 relative z-10">
          {items.map((item, index) => {
            const isActive = activeEduIndex === index;
            return (
              <div
                key={index}
                id={`education-${index}`}
                className="relative scroll-mt-28 group"
              >
                <div className="absolute -left-[45px] md:-left-[73px] top-4 select-none pointer-events-none flex items-center justify-center size-9 md:size-[52px]">
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
                    [EDU-0{index + 1}]
                  </div>

                  <div className="flex flex-col gap-1.5 mb-5 relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover/card:text-brand-400 transition-colors duration-300">
                        {item.degree}
                      </h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full font-mono border transition-all duration-300 ${
                        isActive
                          ? 'text-brand-400 bg-brand-500/10 border-brand-500/20'
                          : 'text-warm-500 bg-warm-500/5 border-warm-500/10 group-hover/card:border-warm-500/20'
                      }`}>
                        {item.period}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-medium text-brand-500">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="size-3.5 text-brand-500/60" />
                        {item.school}
                      </div>
                      {item.gpa !== 'N/A' && (
                        <div className="flex items-center gap-1.5 text-muted-foreground/60 font-mono text-[11px] md:text-xs">
                          GPA: {item.gpa}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 relative z-10">
                    {item.highlights.map((highlight: string, hIndex: number) => (
                      <div key={hIndex} className="flex items-start gap-2.5 text-sm md:text-base text-muted-foreground leading-relaxed">
                        <span className="text-brand-500/60 font-mono mt-1 text-[11px] select-none">&gt;</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {item.courses.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-edge-subtle/30 relative z-10 select-none">
                      {item.courses.map((course: string) => (
                        <span
                          key={course}
                          className="px-2.5 py-1 font-mono text-[10px] md:text-xs rounded-lg border border-edge-subtle/60 bg-bg-void/20 text-muted-foreground/80 hover:border-brand-500/20 hover:bg-brand-500/5 hover:text-brand-400 transition-all duration-300 cursor-default"
                        >
                          {course}
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

interface CertificationsViewProps {
  readonly activeCertIndex: number;
  readonly setActiveCertIndex: (idx: number) => void;
  readonly items?: ReadonlyArray<CertificationItem>;
}

function CertificationsView({ 
  activeCertIndex, 
  setActiveCertIndex, 
  items = CERTIFICATION_ITEMS 
}: CertificationsViewProps) {
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
      <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit flex flex-col gap-6">
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
      <div className="lg:col-span-8 relative">
        <div className="absolute left-3 md:left-8 top-3 bottom-3 w-[2px] bg-edge-subtle/40 pointer-events-none z-0">
          <div className="w-full h-full bg-brand-500/20 origin-top" />
        </div>

        <div className="space-y-12 md:space-y-16 pl-10 md:pl-20 relative z-10">
          {items.map((item, index) => {
            const isActive = activeCertIndex === index;
            return (
              <div
                key={index}
                id={`certification-${index}`}
                className="relative scroll-mt-28 group"
              >
                <div className="absolute -left-[45px] md:-left-[73px] top-4 select-none pointer-events-none flex items-center justify-center size-9 md:size-[52px]">
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
                      {item.skills.map((skill: string) => (
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

interface ActivitiesViewProps {
  readonly activeActIndex: number;
  readonly setActiveActIndex: (idx: number) => void;
  readonly items?: ReadonlyArray<ActivityItem>;
}

function ActivitiesView({ 
  activeActIndex, 
  setActiveActIndex, 
  items = ACTIVITY_ITEMS 
}: ActivitiesViewProps) {
  const scrollToAct = (index: number) => {
    setActiveActIndex(index);
    const element = document.getElementById(`activity-${index}`);
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
      <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit flex flex-col gap-6">
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-4">
            Active <span className="text-brand-500">Nodes.</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed font-sans max-w-md">
            Open-source contributions, technical writing, and hackathon milestones.
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
                CONTRIBUTIONS ACTIVE
              </div>
              <div>GIT: ACTIVE</div>
            </div>

            <ActivitiesTelemetryDashboard />

            <div className="flex flex-col gap-2.5 mt-2">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToAct(index)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border font-mono text-xs text-left transition-all duration-300 cursor-pointer ${
                    activeActIndex === index
                      ? 'border-brand-500/30 bg-brand-500/5 text-brand-400 font-bold shadow-[0_0_15px_rgba(224,32,32,0.06)]'
                      : 'border-edge-subtle/40 hover:border-edge-subtle bg-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] ${activeActIndex === index ? 'text-brand-500' : 'text-muted-foreground/30'}`}>
                      0{index + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-semibold tracking-wide truncate max-w-[150px] md:max-w-[200px]">{item.title}</span>
                      <span className="text-[10px] font-normal text-muted-foreground/60">{item.period}</span>
                    </div>
                  </div>
                  <ChevronRight className={`size-3.5 transition-transform duration-300 ${activeActIndex === index ? 'translate-x-0.5 text-brand-500' : 'text-muted-foreground/30'}`} />
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-edge-subtle/30 pt-4 font-mono text-center">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">45+</span>
                <span className="text-[9px] text-muted-foreground/60 uppercase font-semibold">PRs Merged</span>
              </div>
              <div className="flex flex-col border-l border-edge-subtle/30">
                <span className="text-lg font-bold text-foreground">50k+</span>
                <span className="text-[9px] text-muted-foreground/60 uppercase font-semibold">Readers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Activities List (8-cols) */}
      <div className="lg:col-span-8 relative">
        <div className="absolute left-3 md:left-8 top-3 bottom-3 w-[2px] bg-edge-subtle/40 pointer-events-none z-0">
          <div className="w-full h-full bg-brand-500/20 origin-top" />
        </div>

        <div className="space-y-12 md:space-y-16 pl-10 md:pl-20 relative z-10">
          {items.map((item, index) => {
            const isActive = activeActIndex === index;
            return (
              <div
                key={index}
                id={`activity-${index}`}
                className="relative scroll-mt-28 group"
              >
                <div className="absolute -left-[45px] md:-left-[73px] top-4 select-none pointer-events-none flex items-center justify-center size-9 md:size-[52px]">
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
                    [ACT-0{index + 1}]
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
                        {item.period}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-medium text-brand-500">
                      <div className="flex items-center gap-1.5">
                        <Activity className="size-3.5 text-brand-500/60" />
                        {item.role}
                      </div>
                    </div>
                  </div>

                  {item.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 relative z-10 font-mono">
                      {item.metrics.map((metric, mIndex) => (
                        <div
                          key={mIndex}
                          className="border border-edge-subtle/50 bg-bg-void/40 px-3.5 py-2.5 rounded-2xl flex flex-col items-center justify-center text-center hover:border-brand-500/20 hover:bg-bg-void/60 transition-colors duration-300"
                        >
                          <span className="text-[9px] md:text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1 truncate w-full">
                            {metric.label}
                          </span>
                          <span className="text-base md:text-lg font-bold text-brand-500 tracking-tight">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3 mb-6 relative z-10">
                    {item.highlights.map((highlight: string, hIndex: number) => (
                      <div key={hIndex} className="flex items-start gap-2.5 text-sm md:text-base text-muted-foreground leading-relaxed">
                        <span className="text-brand-500/60 font-mono mt-1 text-[11px] select-none">&gt;</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-edge-subtle/30 relative z-10 select-none">
                      {item.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 font-mono text-[10px] md:text-xs rounded-lg border border-edge-subtle/60 bg-bg-void/20 text-muted-foreground/80 hover:border-brand-500/20 hover:bg-brand-500/5 hover:text-brand-400 transition-all duration-300 cursor-default"
                        >
                          {tag}
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

// ============================================================================
// Main Section Wrapper Component
// ============================================================================

export function JourneySection({ className, milestones = DEFAULT_MILESTONES }: JourneyProps) {
  const [activeTab, setActiveTab] = useState<SubSectionTab>('experience');
  const [[tabIndex, direction], setTabState] = useState<readonly [number, number]>([0, 0]);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeEduIndex, setActiveEduIndex] = useState<number>(0);
  const [activeCertIndex, setActiveCertIndex] = useState<number>(0);
  const [activeActIndex, setActiveActIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<Array<HTMLDivElement | null>>([]);
  
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Scroll Progress Tracker for Experience Timeline Line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Section Observer for showing/hiding the floating HUD menu
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMenuVisible(entry?.isIntersecting ?? false);
      },
      {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.05
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Milestones Intersection Observer (for tracking which milestone card is focused in view)
  useEffect(() => {
    if (activeTab !== 'experience') return;

    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -45% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = parseInt(id.replace('milestone-', ''), 10);
          if (!isNaN(index)) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    milestoneRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [milestones, activeTab]);

  const scrollToMilestone = (index: number) => {
    const element = document.getElementById(`milestone-${index}`);
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
      setActiveIndex(index);
    }
  };

  const tabs: readonly SubSectionTab[] = ['experience', 'education', 'certifications', 'activities'] as const;

  const switchTab = (newTab: SubSectionTab) => {
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = tabs.indexOf(newTab);
    if (currentIndex === newIndex) return;

    const dir = newIndex > currentIndex ? 1 : -1;
    setTabState([newIndex, dir]);
    setActiveTab(newTab);

    // Scroll back to the top of the journey section when switching tabs
    if (sectionRef.current) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = sectionRef.current.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const MENU_ITEMS = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'activities', label: 'Activities', icon: Activity },
  ] as const;

  return (
    <section 
      id="journey" 
      ref={sectionRef}
      className={`py-24 md:py-32 bg-bg-void relative border-t border-edge-subtle overflow-clip ${className ?? ''}`}
    >
      {/* Background glowing rings */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[40%] left-[60%] w-[60%] h-[60%] rounded-full bg-brand-500/10 blur-[130px]" />
        <div className="absolute top-[10%] right-[70%] w-[40%] h-[40%] rounded-full bg-warm-500/5 blur-[120px]" />
      </div>
      
      <GridPattern className="opacity-[0.06]" />

      <div ref={containerRef} className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10 min-h-[60vh]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeTab}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 260, damping: 28 },
              opacity: { duration: 0.15 }
            }}
            className="w-full"
          >
            {activeTab === 'experience' && (
              <ExperienceView
                activeIndex={activeIndex}
                milestones={milestones}
                scrollToMilestone={scrollToMilestone}
                scaleY={scaleY}
                milestoneRefs={milestoneRefs}
              />
            )}
            {activeTab === 'education' && (
              <EducationView 
                activeEduIndex={activeEduIndex}
                setActiveEduIndex={setActiveEduIndex}
              />
            )}
            {activeTab === 'certifications' && (
              <CertificationsView
                activeCertIndex={activeCertIndex}
                setActiveCertIndex={setActiveCertIndex}
              />
            )}
            {activeTab === 'activities' && (
              <ActivitiesView
                activeActIndex={activeActIndex}
                setActiveActIndex={setActiveActIndex}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ============================================================================
          Responsive Floating HUD Menus
          ============================================================================ */}

      {/* Desktop HUD Sidebar (Visible md and up) */}
      <AnimatePresence>
        {isMenuVisible && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4 bg-bg-surface/40 backdrop-blur-xl border border-edge-subtle/80 px-3 py-6 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] select-none"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500/40 animate-pulse mb-1" />
            
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => switchTab(item.id)}
                  aria-label={`Switch to ${item.label}`}
                  className="group relative w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeHUDTabDesktop"
                      className="absolute inset-0 rounded-full bg-brand-500/15 border border-brand-500/30 shadow-[0_0_15px_rgba(224,32,32,0.15)]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <Icon className={`size-5 relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-brand-400' : 'text-muted-foreground/60 group-hover:text-foreground'}`} />
                  
                  <div className="absolute right-14 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <div className="bg-bg-surface border border-edge-subtle/80 text-foreground font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
                      <span className="text-brand-500 mr-1.5">//</span>{item.label}
                    </div>
                  </div>
                </button>
              );
            })}
            
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500/40 animate-pulse mt-1" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile HUD Dock (Visible below md) */}
      <AnimatePresence>
        {isMenuVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 50, x: '-50%', scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex md:hidden items-center gap-3 bg-bg-surface/75 backdrop-blur-xl border border-edge-subtle/80 px-4 py-2.5 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] select-none max-w-[95vw]"
          >
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => switchTab(item.id)}
                  aria-label={`Switch to ${item.label}`}
                  className="group relative px-3 py-2 rounded-full flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeHUDTabMobile"
                      className="absolute inset-0 rounded-full bg-brand-500/10 border border-brand-500/20 shadow-[0_0_12px_rgba(224,32,32,0.1)]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <Icon className={`size-4.5 relative z-10 ${isActive ? 'text-brand-400' : 'text-muted-foreground/60'}`} />
                  {isActive && (
                    <span className="relative z-10 font-mono text-[9px] font-bold uppercase tracking-wider text-brand-400 whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
