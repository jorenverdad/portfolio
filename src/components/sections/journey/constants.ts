import { 
  JourneyMilestone, 
  EducationItem, 
  CertificationItem, 
  ActivityItem 
} from './types';

export const DEFAULT_MILESTONES: ReadonlyArray<JourneyMilestone> = [
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

export const EDUCATION_ITEMS: readonly EducationItem[] = [
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

export const CERTIFICATION_ITEMS: readonly CertificationItem[] = [
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

export const ACTIVITY_ITEMS: readonly ActivityItem[] = [
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
