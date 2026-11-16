export type ProjectCategory =
  | "All"
  | "Full-stack Web App"
  | "Frontend Web App"
  | "Chromium Web Extension"
  | "Mobile App";

export type ProjectMetric = {
  readonly label: string;
  readonly value: string;
};

export type ProjectDetail = {
  readonly overview: string;
  readonly problem: string;
  readonly solution: string;
  readonly roleDescription?: string;
  readonly myContributions: ReadonlyArray<string>;
  readonly highlights: ReadonlyArray<string>;
  readonly architecture: ReadonlyArray<string>;
  readonly challenges: ReadonlyArray<string>;
};

export type ProjectItem = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly category: ProjectCategory;
  readonly year: string;
  readonly role: string;
  readonly team: string;
  readonly image?: string;
  readonly images?: ReadonlyArray<string>;
  readonly video?: string;
  readonly tags: ReadonlyArray<string>;
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly featured: boolean;
  readonly metrics?: ReadonlyArray<ProjectMetric>;
  readonly details: ProjectDetail;
};

export const PROJECTS_ARCHIVE: ReadonlyArray<ProjectItem> = [
  {
    id: "proj-1",
    title: "JoSan Website",
    subtitle: "AI-Powered Content Moderation Web Application",
    category: "Frontend Web App",
    year: "2024",
    role: "Frontend & AI Integration Engineer",
    team: "Collaborative Team",
    image: "/projects/josan-preview.webp",
    video: "/projects/JoSan - AI-Powered Content Moderation - Google Chrome.mp4",
    tags: ["React", "TypeScript", "Tailwind CSS", "AI Moderation", "REST API"],
    liveUrl: "https://josan.vercel.app",
    githubUrl: "https://github.com/jorenverdad",
    featured: true,
    metrics: [
      { label: "Accuracy", value: "98.5%" },
      { label: "Latency", value: "<150ms" },
      { label: "Rules Tested", value: "40+" },
    ],
    details: {
      overview:
        "JoSan is an intelligent web application designed to detect, flag, and filter harmful or toxic user-generated content in real time before it reaches public feeds.",
      problem:
        "Online communities and interactive platforms struggle with surging spam, hate speech, and harassment that overwhelm human moderation teams and create unsafe community experiences.",
      solution:
        "Architected an intuitive, high-performance moderation console that visualizes real-time text analysis, sentiment scoring, and automated rule execution with zero perceptible lag.",
      roleDescription:
        "Owned client-side interface architecture, live API integration, and performance optimization for real-time inference streaming.",
      myContributions: [
        "Architected and built the full client-side React moderation dashboard with real-time streaming updates.",
        "Engineered the live API integration and response caching layer, reducing redundant inference requests by 65%.",
        "Implemented requestAnimationFrame batching to eliminate UI frame drops during high-frequency text evaluation.",
        "Designed the responsive dark/light UI using Tailwind CSS, adhering to strict WCAG contrast standards.",
      ],
      highlights: [
        "Interactive real-time moderation dashboard displaying confidence scores across toxicity categories.",
        "Custom rule-tuning engine allowing administrators to adjust sensitivity thresholds on the fly.",
        "Optimized client-side caching reducing redundant inference requests by 65%.",
      ],
      architecture: [
        "Modular React architecture structured with custom reactive state hooks and memoized components.",
        "Tailwind CSS design system supporting high-density audit interfaces and accessible alerts.",
        "Streaming REST client that displays live progress indicators during batch text evaluations.",
      ],
      challenges: [
        "Eliminated UI frame drops during high-frequency real-time text streaming using requestAnimationFrame batching.",
        "Implemented strict client-side rate limiting and error boundaries to gracefully handle API throttling.",
      ],
    },
  },
  {
    id: "proj-2",
    title: "VzStellar Website",
    subtitle: "Modern Real Estate & Property Discovery Platform",
    category: "Full-stack Web App",
    year: "2024",
    role: "Full-Stack Engineer & UI Designer",
    team: "Client Project",
    image: "/projects/vzstellar-preview.webp",
    video: "/projects/VZ Stellar Realty - Google Chrome.mp4",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    liveUrl: "https://vzstellar.vercel.app",
    githubUrl: "https://github.com/jorenverdad",
    featured: true,
    metrics: [
      { label: "Listings", value: "60+" },
      { label: "Buyers Reached", value: "40+" },
      { label: "Search Latency", value: "<80ms" },
    ],
    details: {
      overview:
        "A full-stack real estate discovery platform built for VzStellar Realty, featuring categorized property listings, dynamic price estimations, and responsive inquiry workflows.",
      problem:
        "Prospective buyers faced fragmented property listings, sluggish image galleries, and poor mobile search experiences when trying to explore residential and commercial units.",
      solution:
        "Delivered a fast, server-rendered Next.js web application paired with a PostgreSQL database, featuring instant search filtering, interactive image carousels, and automated WhatsApp/email lead triggers.",
      roleDescription:
        "Sole engineer and designer responsible for end-to-end system design, full-stack implementation, database configuration, and client deployment.",
      myContributions: [
        "Designed and implemented the complete Next.js App Router frontend with responsive mobile-first layouts.",
        "Configured the Supabase PostgreSQL database schema with Row-Level Security safeguarding customer inquiries.",
        "Engineered multi-parameter filtering for property searches and optimized image delivery with WebP formats.",
        "Created client-side lead capture pipelines with direct WhatsApp and email agent notifications.",
      ],
      highlights: [
        "Multi-parameter property search engine with instant price, bedroom, and location filters.",
        "High-performance media gallery with responsive WebP image optimization and lazy-loading.",
        "Secure inquiry pipeline connecting buyers directly to licensed property agents.",
      ],
      architecture: [
        "Next.js App Router for hybrid static and dynamic rendering of property pages.",
        "Supabase PostgreSQL database with Row-Level Security safeguarding private customer inquiries.",
        "Tailwind CSS design system providing a clean luxury real estate aesthetic.",
      ],
      challenges: [
        "Optimized Largest Contentful Paint (LCP) on image-heavy listing pages by preloading hero assets.",
        "Designed flexible relational database schemas accommodating changing property specifications.",
      ],
    },
  },
  {
    id: "proj-3",
    title: "Portfolio",
    subtitle: "High-Performance Personal Engineering Showcase",
    category: "Frontend Web App",
    year: "2024",
    role: "Lead Frontend Engineer & Designer",
    team: "Solo Project",
    image: "/projects/portfolio-preview.webp",
    video: "/projects/Portfolio- Honey.mp4",
    tags: ["Next.js 16", "React 19", "Tailwind CSS v4", "Motion", "Base UI"],
    liveUrl: "https://jorenverdad.dev",
    githubUrl: "https://github.com/jorenverdad/portfolio",
    featured: true,
    metrics: [
      { label: "Performance", value: "100" },
      { label: "Accessibility", value: "100" },
      { label: "Framework", value: "Next.js 16" },
    ],
    details: {
      overview:
        "The flagship personal portfolio website showcasing software engineering projects, technical milestones, and interactive UI design experiments.",
      problem:
        "Traditional developer portfolios often rely on cookie-cutter templates with bloated dependencies, poor accessibility, and sluggish animations that fail to demonstrate engineering craftsmanship.",
      solution:
        "Engineered from scratch using Next.js 16 App Router, React 19, Motion, and Tailwind CSS v4, achieving fluid 60fps animations, zero layout shifts, and full keyboard navigation.",
      roleDescription:
        "Sole creator, designer, and developer owning the design token system, component primitives, animations, and deployment pipeline.",
      myContributions: [
        "Designed the design token architecture in Tailwind CSS v4 using dynamic OKLCH color palettes.",
        "Engineered the Next.js 16 and React 19 application structure with strict Server/Client component separation.",
        "Built custom interactive components: hover-intent video accordion, Base UI accessible dialogs, and smooth spring physics.",
        "Implemented automated GitHub commit telemetry pipeline and zero-flicker theme hydration scripts.",
      ],
      highlights: [
        "Interactive project accordion with hover-intent video stream loading and custom carousels.",
        "Dynamic dark/light theme engine using OKLCH color spaces and zero-flicker hydration scripts.",
        "Automated GitHub stats pipeline fetching live repository commit and telemetry counts.",
      ],
      architecture: [
        "Strict separation between Server Components and interactive client leaves.",
        "Base UI unstyled primitives for robust accessible dialogs, tooltips, and buttons.",
        "Motion spring physics configured to respect user `prefers-reduced-motion` settings.",
      ],
      challenges: [
        "Kept client bundle size exceptionally lean while delivering custom video previewing and marquee animations.",
        "Prevented hydration mismatches across theme detection with inline pre-render bootstrap execution.",
      ],
    },
  },
  {
    id: "proj-4",
    title: "JoSan Extension",
    subtitle: "Chromium Browser Content Moderation Extension",
    category: "Chromium Web Extension",
    year: "2024",
    role: "Browser Extension Developer",
    team: "Collaborative Team",
    image: "/projects/josan-extension-preview.webp",
    video: "/projects/JoSan Extension - Chromium.mp4",
    tags: ["Manifest V3", "TypeScript", "Tailwind CSS", "DOM MutationObserver"],
    liveUrl: "https://github.com/jorenverdad",
    githubUrl: "https://github.com/jorenverdad",
    featured: true,
    metrics: [
      { label: "Scan Time", value: "<15ms" },
      { label: "DOM Overhead", value: "<1%" },
      { label: "Standard", value: "Manifest V3" },
    ],
    details: {
      overview:
        "A lightweight Chromium extension that actively scans web pages in real time to redact offensive language, hate speech, and spam before users see it.",
      problem:
        "Users browsing open social media platforms frequently encounter graphic or harassment-laden comments without personal protective filtering controls.",
      solution:
        "Built a Manifest V3 browser extension utilizing high-efficiency DOM MutationObservers to intercept and blur toxic comments on active feeds without degrading browser rendering performance.",
      roleDescription:
        "Engineered the content script DOM observer, background service worker, and the popup configuration user interface.",
      myContributions: [
        "Architected the Manifest V3 background service worker and content script communication protocol.",
        "Implemented debounced DOM MutationObserver routines that scan and redact toxic text in under 15ms.",
        "Built the extension popup dashboard using TypeScript and Tailwind CSS with custom sensitivity sliders.",
        "Engineered click-to-reveal blur overlays allowing users to safely inspect redacted content.",
      ],
      highlights: [
        "Instant text redactor and blur overlays with a click-to-reveal safety mechanism.",
        "Customizable user dictionary and severity sliders accessible via the browser action popup.",
        "Background service worker architecture with minimal CPU and memory footprints.",
      ],
      architecture: [
        "Manifest V3 architecture complying with the latest Chrome Web Store security guidelines.",
        "Isolated content script DOM observers decoupling heavy regex matching into idle callback tasks.",
        "Modern Tailwind-styled popup UI built with TypeScript and Vite bundler.",
      ],
      challenges: [
        "Prevented browser lag on infinite-scroll pages (Twitter/Reddit) by debouncing mutation batches.",
        "Ensured zero cross-site script leakage by sanitizing all injected preview elements.",
      ],
    },
  },
  {
    id: "proj-5",
    title: "Uwu Hotel Booking",
    subtitle: "Mobile Hotel & Accommodation Reservation Experience",
    category: "Mobile App",
    year: "2024",
    role: "Mobile UI/UX Designer & Developer",
    team: "Solo Project",
    image: "/projects/UwU.png",
    images: [
      "/projects/UwU.png",
      "/projects/UwU1.png",
      "/projects/UwU2.png",
      "/projects/UwU3.png",
      "/projects/UwU4.png",
      "/projects/UwU5.png",
    ],
    tags: ["Mobile UI", "Kotlin", "Android", "Material Design", "Figma"],
    liveUrl: "https://github.com/jorenverdad",
    githubUrl: "https://github.com/jorenverdad",
    featured: true,
    metrics: [
      { label: "Screens", value: "12+" },
      { label: "Rating", value: "4.9/5" },
      { label: "Flows", value: "End-to-End" },
    ],
    details: {
      overview:
        "A mobile application designed to simplify boutique hotel reservations, room customizations, and localized check-in services.",
      problem:
        "Existing hotel reservation apps are often cluttered with excessive cross-selling ads and complicated checkout steps that frustrate travelers.",
      solution:
        "Designed and implemented an inviting, mobile-first booking experience featuring one-tap room browsing, date picking, transparent amenity breakdowns, and digital reservation passes.",
      roleDescription:
        "Conducted UI/UX research, wireframing in Figma, and implemented native Android views following Material Design 3 guidelines.",
      myContributions: [
        "Designed the complete design system and 12+ mobile mockups in Figma with modern typography and pastel palettes.",
        "Built the interactive room browsing showcase with multi-photo carousels and smooth swipe gestures.",
        "Implemented the dynamic booking date selector and automated guest price recalculation logic.",
        "Created digital boarding pass passes with offline-accessible QR check-in codes.",
      ],
      highlights: [
        "Visual room showcase with interactive multi-angle high-resolution photo galleries.",
        "Interactive calendar booking selector with live price calculation and discount vouchers.",
        "Digital boarding pass and booking confirmation screen with offline QR check-in.",
      ],
      architecture: [
        "Material Design 3 principles tailored with friendly typography and pastel accent palettes.",
        "Clean architectural pattern separating UI state, booking business logic, and mock data sources.",
        "Adaptive layouts accommodating small phone viewports up to large tablet screens.",
      ],
      challenges: [
        "Handled complex date-range overlap calculations and multi-guest pricing adjustments smoothly.",
        "Created fluid micro-interactions for hearting favorites and transitioning between booking steps.",
      ],
    },
  },
  {
    id: "proj-6",
    title: "ACEMC Enterprise HRIS",
    subtitle: "Hospital-Wide Human Resource & Batch Payroll System",
    category: "Full-stack Web App",
    year: "2024",
    role: "Lead Full-Stack Engineer",
    team: "Hospital IT Team (Allied Care Experts)",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "PostgreSQL 16",
      "Docker",
      "Realtime",
    ],
    liveUrl: "https://github.com/jorenverdad",
    githubUrl: "https://github.com/jorenverdad",
    featured: true,
    metrics: [
      { label: "Staff Served", value: "400+" },
      { label: "Payroll Speed", value: "<1s" },
      { label: "Shift Coverage", value: "24/7" },
    ],
    details: {
      overview:
        "An enterprise hospital HRIS and biometric payroll platform developed for Allied Care Experts (ACE) Medical Center, replacing manual spreadsheets for over 400 clinical and administrative staff.",
      problem:
        "Hospital payroll for 400+ doctors, nurses, and staff involved multi-tiered rotating 24/7 shifts, complex Philippine statutory tax formulas (SSS, PhilHealth, Pag-IBIG, BIR), and error-prone spreadsheet calculations.",
      solution:
        "Engineered a full-stack Next.js 16 and self-hosted PostgreSQL platform featuring an in-memory batch payroll engine, automated biometric DTR compilation, and self-service portals with real-time notifications.",
      roleDescription:
        "Led the end-to-end full-stack software architecture, database schema design, payroll calculation engine, and on-premises server infrastructure.",
      myContributions: [
        "Engineered the in-memory batch payroll engine replacing sequential queries with bulk parallel pre-fetching (<1s execution).",
        "Designed the biometric punch pipeline computing 24/7 rotating shifts, night differentials, tardiness, and overtime.",
        "Secured employee PII across four role tiers using PostgreSQL Row-Level Security policies and session middleware.",
        "Architected on-premises deployment on Proxmox VE utilizing Docker, Coolify, Nginx reverse proxy, and Kong gateway.",
        "Built Employee Self-Service portals for leave and overtime requests with Supabase Realtime alerts.",
      ],
      highlights: [
        "Sub-second in-memory payroll engine replacing sequential queries with bulk parallel pre-fetching.",
        "Biometric punch pipeline compiling 24/7 rotating shifts, night differentials, and overtime rules.",
        "Four-tier Role-Based Access Control (Employee, Dept Head, HR Staff, HR Admin) via PostgreSQL RLS.",
      ],
      architecture: [
        "Self-hosted PostgreSQL 16 on Proxmox VE utilizing Docker, Coolify, Nginx, and Kong.",
        "Next.js App Router with Server Components for instantaneous initial page loads and secure session middleware.",
        "Supabase Realtime channels for instant notification of leave and overtime approvals.",
      ],
      challenges: [
        "Handled 24/7 midnight shift boundary calculations where punch-in and punch-out occurred on different calendar dates.",
        "Ensured strict Data Privacy Act compliance through robust database audit logging and row-level encryption.",
      ],
    },
  },
  {
    id: "proj-7",
    title: "Zionix Real Estate MIS",
    subtitle: "Core Sales, Inventory & Commission Tracking System",
    category: "Full-stack Web App",
    year: "2024",
    role: "Sole Full-Stack Developer & PM (Contract)",
    team: "Contract Project (Zionix Consultancy)",
    tags: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "PostgreSQL",
      "RPC Functions",
    ],
    liveUrl: "https://github.com/jorenverdad",
    githubUrl: "https://github.com/jorenverdad",
    featured: false,
    metrics: [
      { label: "Property Inventory", value: "60+" },
      { label: "Buyers Managed", value: "40+" },
      { label: "Concurrency", value: "Zero Race" },
    ],
    details: {
      overview:
        "A specialized Management Information System built for Zionix Realty to manage property inventory reservations, agent commissions, and buyer contracts without race conditions.",
      problem:
        "Simultaneous reservations by multiple property agents often led to double-booking prime lots and miscalculated agent commission splits.",
      solution:
        "Built Phase 1 of the MIS as sole developer, engineering custom PostgreSQL stored procedures (RPCs) with pessimistic row locking to guarantee zero transaction conflicts.",
      roleDescription:
        "Sole developer and project manager for Phase 1, owning technical architecture, database safeguards, and client delivery.",
      myContributions: [
        "Architected and delivered Phase 1 (Core Sales & Inventory Tracker) from discovery through production deployment.",
        "Implemented PostgreSQL RPC functions with pessimistic row locking to eliminate concurrent reservation race conditions.",
        "Designed the dynamic agent commission ledger tracking multi-level commission splits and contract milestones.",
        "Established complete immutable audit logging across all property price updates and buyer profile edits.",
      ],
      highlights: [
        "Transactional lot reservation pipeline with automated lock expiration timers.",
        "Dynamic commission calculation ledger tracking multi-level agent commission tiers.",
        "Complete immutable audit trail recording every state change and price adjustment.",
      ],
      architecture: [
        "Next.js App Router paired with Supabase RPC functions for atomic transaction operations.",
        "Strict PostgreSQL Row-Level Security policies restricting sales data to assigned team leaders.",
        "Shadcn/ui component library customized to adhere to the Zionix brand palette.",
      ],
      challenges: [
        "Solved high-concurrency race conditions during promotional sales launches using pessimistic locking RPCs.",
        "Designed a seamless data export pipeline generating official PDF reservation agreements.",
      ],
    },
  },
  {
    id: "proj-8",
    title: "OCID Employee Database",
    subtitle: "Curriculum & Administrative Human Resource Management",
    category: "Full-stack Web App",
    year: "2023",
    role: "Full-Stack Developer Intern",
    team: "Department Team (OCID)",
    tags: ["Laravel", "PostgreSQL", "React.js", "Tailwind CSS", "RESTful API"],
    liveUrl: "https://github.com/jorenverdad",
    githubUrl: "https://github.com/jorenverdad",
    featured: false,
    metrics: [
      { label: "Query Speedup", value: "35%" },
      { label: "Modules", value: "5+" },
      { label: "Uptime", value: "100%" },
    ],
    details: {
      overview:
        "An administrative human resource and curriculum database system developed for the Office of Curriculum and Instruction Development to automate faculty profiling and course tracking.",
      problem:
        "Legacy file systems resulted in duplicate faculty records, unindexed curriculum files, and slow report generation that hindered accreditation audits.",
      solution:
        "Architected an indexed PostgreSQL relational database backend with a Laravel RESTful API and responsive React administrative dashboard, boosting query speed by ~35%.",
      roleDescription:
        "Full-stack engineering intern responsible for backend relational database logic, REST API endpoints, and React admin dashboards.",
      myContributions: [
        "Engineered the backend architecture and database schema in PostgreSQL, boosting query execution speeds by ~35%.",
        "Developed and integrated secure RESTful APIs powering data exchange across 5+ core modules.",
        "Built responsive administrative dashboards with React.js and Tailwind CSS for rapid faculty record management.",
        "Authored technical documentation across the SDLC and delivered the complete system on schedule in 3 months.",
      ],
      highlights: [
        "Unified faculty database tracking teaching loads, credentials, and curriculum assignments.",
        "Automated accreditation report generator compiling departmental metrics into printable sheets.",
        "Optimized database indexing and composite keys reducing search latency across 5+ core modules.",
      ],
      architecture: [
        "Laravel backend providing secure token-based authentication and structured REST endpoints.",
        "PostgreSQL database utilizing strict foreign keys, cascade rules, and query optimization.",
        "React frontend styled with Tailwind CSS for high data density and quick tabular editing.",
      ],
      challenges: [
        "Migrated legacy disparate Excel and Access files into a normalized 3NF relational schema without data loss.",
        "Built responsive data table views with multi-column sorting and client-side filtering.",
      ],
    },
  },
] as const;

export function getAllProjects(): ReadonlyArray<ProjectItem> {
  return PROJECTS_ARCHIVE;
}

export function getProjectById(id: string): ProjectItem | undefined {
  return PROJECTS_ARCHIVE.find((project) => project.id === id);
}

export function getAllCategories(): ReadonlyArray<ProjectCategory> {
  return [
    "All",
    "Full-stack Web App",
    "Frontend Web App",
    "Chromium Web Extension",
    "Mobile App",
  ];
}
