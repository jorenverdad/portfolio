export type ProjectCategory =
  | "All"
  | "Full-stack Web App"
  | "Frontend Web App"
  | "Chromium Web Extension"
  | "Mobile App"
  | "Desktop App";

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
    subtitle: "Product Landing Page & Interactive AI Demo for JoSan Extension",
    category: "Frontend Web App",
    year: "2026",
    role: "Frontend Developer",
    team: "Collaborative Team",
    image: "/projects/josan-preview.webp",
    video:
      "/projects/JoSan - AI-Powered Content Moderation - Google Chrome.mp4",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "pnpm",
      "REST API",
    ],
    liveUrl: "https://josan.vercel.app",
    githubUrl: "https://github.com/jorenverdad",
    featured: true,
    metrics: [
      { label: "Load Speed", value: "<1s" },
      { label: "Interactive Demo", value: "Real-Time" },
      { label: "API Caching", value: "65% Saved" },
    ],
    details: {
      overview:
        "JoSan Website is the primary product showcase and client-acquisition landing page for the JoSan Chromium extension, featuring an interactive real-time AI moderation playground that lets prospective clients test content filtering live.",
      problem:
        "The JoSan extension needed an engaging marketing hub to demonstrate sub-15ms AI moderation in action, overcome client skepticism around filtering speed, and convert inbound visitors into active extension users and B2B clients.",
      solution:
        "Engineered a high-converting web showcase featuring a hands-on interactive sandbox where users type or paste text to test real-time sentiment scoring, toxicity categorization, and instant redaction before downloading the extension.",
      roleDescription:
        "Led Next.js web architecture, interactive demo sandbox engineering, and responsive UI design to optimize conversion and showcase the extension's capabilities.",
      myContributions: [
        "Architected the interactive live-moderation demo sandbox in Next.js allowing users to test toxicity thresholds with zero friction.",
        "Engineered the live API inference pipeline and response caching layer, slashing redundant evaluation requests by 65%.",
        "Implemented requestAnimationFrame UI batching to prevent frame drops during rapid real-time keystroke analysis.",
        "Designed the conversion-focused dark/light landing page and sandbox controls using Shadcn UI and Tailwind CSS, meeting strict WCAG contrast standards.",
      ],
      highlights: [
        "Hands-on interactive demo sandbox displaying real-time confidence scores and instant text redaction.",
        "Client acquisition funnels tailored for both individual Chromium extension users and B2B platform teams.",
        "Optimized client-side caching reducing redundant inference requests by 65%.",
      ],
      architecture: [
        "Next.js App Router architecture structured with custom reactive state hooks and memoized client components.",
        "Tailwind CSS and Shadcn UI component architecture powering accessible demo sliders, dialogs, and high-density alerts.",
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
    role: "Full-Stack Developer",
    team: "Client Project",
    image: "/projects/vzstellar-preview.webp",
    video: "/projects/VZ Stellar Realty - Google Chrome.mp4",
    tags: [
      "Vue.js",
      "JavaScript",
      "Vuetify",
      "Pinia",
      "Supabase",
      "PostgreSQL",
    ],
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
        "Delivered a fast Vue.js web application built with Vuetify and Pinia, backed by Supabase PostgreSQL, Supabase Auth, and Storage buckets for instant search filtering and optimized property image delivery.",
      roleDescription:
        "Sole full-stack developer responsible for Vue.js architecture, Pinia state stores, Supabase backend configuration (Auth, Storage buckets, and PostgreSQL RLS), and client deployment.",
      myContributions: [
        "Designed and implemented the Vue.js frontend with Vuetify component layouts and responsive mobile-first views.",
        "Implemented Pinia stores for multi-parameter property filtering, caching search states and buyer favorites.",
        "Configured Supabase Auth and PostgreSQL database schemas with Row-Level Security safeguarding customer inquiries.",
        "Integrated Supabase Storage buckets for high-resolution property image uploads and fast CDN-cached delivery.",
      ],
      highlights: [
        "Multi-parameter property search engine with instant price, bedroom, and location filters powered by Pinia.",
        "High-performance property media gallery served directly from dedicated Supabase Storage buckets.",
        "Secure inquiry pipeline protected by Supabase Auth and PostgreSQL Row-Level Security.",
      ],
      architecture: [
        "Vue.js application utilizing Vuetify for Material Design components and Pinia for reactive store management.",
        "Supabase backend infrastructure integrating PostgreSQL database, Supabase Auth, and Storage buckets for media assets.",
        "PostgreSQL Row-Level Security (RLS) policies safeguarding private customer inquiries and agent credentials.",
      ],
      challenges: [
        "Optimized Largest Contentful Paint (LCP) on image-heavy listing pages by preloading hero assets via Supabase Storage CDN.",
        "Designed flexible relational database schemas accommodating changing property specifications.",
      ],
    },
  },
  {
    id: "proj-3",
    title: "HM Portfolio",
    subtitle: "Interactive 3D Single-Page Portfolio for Honey Mae Omela",
    category: "Frontend Web App",
    year: "2025",
    role: "Frontend Developer",
    team: "Client Project",
    image: "/projects/portfolio-preview.webp",
    video: "/projects/Portfolio- Honey.mp4",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Three.js",
      "Motion",
      "Radix UI",
    ],
    liveUrl: "https://github.com/hachimitsue/portfolio",
    githubUrl: "https://github.com/hachimitsue/portfolio",
    featured: true,
    metrics: [
      { label: "Framework", value: "React 19" },
      { label: "Bundler", value: "Vite 6" },
      { label: "Visuals", value: "Three.js" },
    ],
    details: {
      overview:
        "HM Portfolio is a bespoke single-page personal portfolio engineered for client, featuring dynamic 3D backgrounds, smooth section observation, circular theme transitions, and responsive bento-grid layouts.",
      problem:
        "The client needed a distinctive, high-impact personal brand website that stood out from standard static portfolios, requiring seamless multi-theme transitions, interactive 3D particle visuals, and mobile-friendly navigation without performance lag.",
      solution:
        "Engineered a single-page React 19 web application built with Vite 6 and Tailwind CSS 3, integrating Three.js and React Three Fiber for dynamic starfields and birds, Framer Motion for bento-grid filtering, and a custom circular-reveal theme transition.",
      roleDescription:
        "Sole frontend engineer and UI designer commissioned by the client, owning system architecture, 3D visual integration, responsive layout design, and component library implementation.",
      myContributions: [
        "Architected the React 19 and Vite 6 single-page application structure with decoupled data layers and responsive section layouts.",
        "Integrated Three.js and React Three Fiber backgrounds (interactive starfield and Vanta.js birds) with reduced-motion support.",
        "Engineered an active-section navigation system with smooth scrolling and dynamic navbar resizing via IntersectionObserver.",
        "Built a circular-reveal theme transition system with localStorage persistence and system color preference detection.",
        "Designed and coded modular bento-style service cards and category-filtered project showcases using Framer Motion and Radix UI.",
      ],
      highlights: [
        "Dynamic 3D background pipeline combining Three.js starfields and Vanta.js interactive birds.",
        "Custom circular-reveal light/dark theme transition with state persistence in LocalStorage.",
        "Active-section observer tracking scrolling viewport state for desktop and mobile bottom navigation.",
        "Bento-style services showcase and animated project filtering with Framer Motion.",
      ],
      architecture: [
        "React 19 single-page architecture built with Vite 6, SWC, and strict TypeScript.",
        "Tailwind CSS 3 design token system utilizing custom HSL properties, Satoshi, and Clash Display typography.",
        "Radix UI primitives paired with Lucide React and Class Variance Authority for accessible UI components.",
        "Modular Three.js / React Three Fiber visual layers isolated from core DOM layout rendering.",
      ],
      challenges: [
        "Balanced heavy 3D WebGL rendering (Three.js and Vanta.js) with 60fps scrolling performance through lazy background initialization.",
        "Engineered smooth circular-reveal clip-path theme animations across both desktop and mobile viewports.",
      ],
    },
  },
  {
    id: "proj-4",
    title: "JoSan Extension",
    subtitle: "AI-Powered Chromium Content Moderation Extension",
    category: "Chromium Web Extension",
    year: "2025",
    role: "Lead Extension & AI Engineer",
    team: "Thesis Project (2 Members)",
    image: "/projects/josan-extension-preview.webp",
    video: "/projects/JoSan Extension - Chromium.mp4",
    tags: [
      "Manifest V3",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "OpenAI API",
      "DOM MutationObserver",
    ],
    liveUrl: "https://github.com/jorenverdad/JoSan",
    githubUrl: "https://github.com/jorenverdad/JoSan",
    featured: true,
    metrics: [
      { label: "Scan Time", value: "<15ms" },
      { label: "Languages", value: "3 (EN/TL/BIS)" },
      { label: "Privacy", value: "DMs Excluded" },
    ],
    details: {
      overview:
        "JoSan Extension is an intelligent Chromium browser extension built on Manifest V3, employing a two-stage hybrid filtering engine (fast local regex plus OpenAI moderation) to redact profanity, hate speech, and harassment in real time across 13 major platforms.",
      problem:
        "Social media feeds expose users to toxic comments and harassment, while existing content blockers either rely solely on rigid keywords causing false positives or slow down page scrolling with heavy server roundtrips.",
      solution:
        "Engineered a two-stage filtering architecture combining sub-15ms client-side regex detection (with English, Tagalog, and Bisaya wordlists) and contextual OpenAI Moderation API analysis (omni-moderation and GPT-5-mini), ensuring public feed protection without touching private messages.",
      roleDescription:
        "Co-creator and lead extension engineer for undergraduate thesis, owning Manifest V3 service worker architecture, DOM MutationObserver filtering pipelines, and OpenAI Moderation integration.",
      myContributions: [
        "Architected the Manifest V3 background service worker and content script communication protocol with 5-minute response caching.",
        "Engineered debounced DOM MutationObservers that intercept and blur toxic comments in under 15ms across dynamic infinite-scroll feeds.",
        "Integrated OpenAI's Moderation API (omni-moderation-latest and GPT-5-mini) for context-aware classification to eliminate false positives.",
        "Built trilingual detection pipelines supporting English, Tagalog, and Bisaya with automated language detection.",
        "Designed strict privacy boundaries that exclude DMs, chat boxes, and password fields across all 13 supported platforms.",
        "Developed the React 19 popup and options analytics dashboard using Tailwind CSS and Recharts for 30-day usage tracking.",
      ],
      highlights: [
        "Two-stage hybrid moderation engine: sub-15ms local regex filter paired with OpenAI contextual analysis.",
        "Trilingual detection supporting English, Tagalog, and Bisaya profanity lexicons with confidence scoring.",
        "Strict privacy safeguard: active feed filtering only, permanently excluding private messages and chat inputs.",
        "Real-time usage dashboard with 30-day rate-limit tracking and click-to-reveal blur overlays.",
      ],
      architecture: [
        "Manifest V3 architecture complying with Chromium extension security standards.",
        "Hybrid build system using Webpack for background scripts and Vite for React 19 popup/options pages.",
        "Isolated content script DOM observers decoupling heavy regex matching into idle callback tasks.",
        "Local browser storage (chrome.storage.local) keeping API keys and user wordlists strictly on-device.",
      ],
      challenges: [
        "Prevented UI lag on high-frequency infinite scroll feeds (Twitter/X, Reddit, TikTok) by batching mutation records with requestIdleCallback.",
        "Avoided API rate-limit bottlenecks (30 RPM) through aggressive 5-minute client caching and selective AI dispatch only for ambiguous text.",
      ],
    },
  },
  {
    id: "proj-5",
    title: "Uwu Hotel Booking",
    subtitle: "Cross-Platform Hotel Reservation & Stay Management Mobile App",
    category: "Mobile App",
    year: "2024",
    role: "Lead Developer & Mobile UI/UX Designer",
    team: "Collaborative Team",
    image: "/projects/UwU.png",
    images: [
      "/projects/UwU.png",
      "/projects/UwU1.png",
      "/projects/UwU2.png",
      "/projects/UwU3.png",
      "/projects/UwU4.png",
      "/projects/UwU5.png",
    ],
    tags: [
      "Capacitor",
      "Android Studio",
      "JavaScript",
      "Vite",
      "Supabase",
      "Bootstrap",
    ],
    liveUrl: "https://github.com/shinjitsue/uwu-mobile-app",
    githubUrl: "https://github.com/shinjitsue/uwu-mobile-app",
    featured: true,
    metrics: [
      { label: "Platform", value: "Android" },
      { label: "Runtime", value: "Capacitor" },
      { label: "Backend", value: "Supabase" },
    ],
    details: {
      overview:
        "Uwu Hotel Booking is a cross-platform mobile accommodation reservation app built with Capacitor, Android Studio, and Supabase, providing travelers with real-time room availability, dynamic stay calculations, and native device camera capabilities.",
      problem:
        "Traditional travel booking interfaces frequently suffer from heavy mobile bundles, cluttered upsells, and fragmented checkout experiences that complicate quick hotel and room reservations.",
      solution:
        "Engineered a lightweight mobile application packaged via Capacitor for Android, integrating a Supabase real-time backend with secure authentication, multi-date stay computation, high-res image galleries, and an administrative analytics dashboard.",
      roleDescription:
        "Lead mobile developer and UI/UX designer on a collaborative team, directing mobile interface workflows, Capacitor native bridge configuration, Android Studio APK builds, and Supabase backend services.",
      myContributions: [
        "Architected the cross-platform mobile client using Capacitor and configured native Android Studio compilation workflows.",
        "Designed the complete mobile UI/UX in Figma and built responsive mobile screens with Bootstrap 5 and SCSS.",
        "Configured Supabase PostgreSQL database schemas, Supabase Auth with Google OAuth, and Storage media buckets.",
        "Implemented native device plugins including Camera for user profile uploads and custom splash screen initialization.",
        "Engineered client-side reservation compute logic (hotel_compute.js) and administrative Chart.js analytics.",
      ],
      highlights: [
        "Native Android deployment packaged via Capacitor with native Camera and Splash Screen plugins.",
        "Complete booking lifecycle: multi-day pricing calculations, date selection, and instant confirmation toasts.",
        "Supabase cloud backend managing property databases, user authentication, and high-res image buckets.",
        "Administrative analytics dashboard with Chart.js tracking booking volume and revenue metrics.",
      ],
      architecture: [
        "Capacitor 5 runtime bridging native Android SDK capabilities with high-performance web views.",
        "Modular JavaScript architecture with custom client router and SCSS design tokens.",
        "Supabase BaaS integrating PostgreSQL, row security, user authentication, and CDN storage buckets.",
        "Android Studio Gradle build configuration supporting native APK compilation and device debugging.",
      ],
      challenges: [
        "Ensured smooth 60fps transitions and fast modal rendering across lower-spec Android devices by optimizing asset loading.",
        "Bridged native device permissions (camera storage access) seamlessly within Capacitor's security lifecycle.",
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
  {
    id: "proj-9",
    title: "ChattingHub",
    subtitle: "End-to-End Encrypted Full-Stack Chat & User Dashboard",
    category: "Full-stack Web App",
    year: "2024",
    role: "Full-Stack & Authentication Contributor",
    team: "Collaborative Team (3 Members)",
    image: "/projects/chattinghub-preview.png",
    images: [
      "/projects/chattinghub-preview.png",
      "/projects/chattinghub-1.png",
      "/projects/chattinghub-2.png",
      "/projects/chattinghub-3.png",
    ],
    tags: [
      "Django",
      "Python",
      "Vue.js",
      "Vuetify",
      "Pinia",
      "Crypto-JS",
      "Vite",
    ],
    liveUrl: "https://github.com/centmarde/ChattingHub",
    githubUrl: "https://github.com/centmarde/ChattingHub",
    featured: true,
    metrics: [
      { label: "Encryption", value: "AES-256" },
      { label: "Frontends", value: "Vue 3 & Svelte" },
      { label: "Auth Flow", value: "JWT Guard" },
    ],
    details: {
      overview:
        "ChattingHub is an end-to-end encrypted messaging and user management system built with Django REST Framework and modern client frontends (Vue 3 and Svelte 5), guaranteeing cryptographic privacy across client-server boundaries.",
      problem:
        "Standard web chat platforms frequently transmit unencrypted payloads or store readable conversations directly in database tables, exposing user communications to network snooping and unauthorized database inspection.",
      solution:
        "Engineered an end-to-end cryptographic architecture where chat payloads are encrypted client-side using Crypto-JS before network transmission, decrypted on-the-fly for authorized recipients, and guarded by Django REST Framework authentication and SimpleJWT tokens.",
      roleDescription:
        "Core full-stack contributor and UI architect on a 3-engineer collaborative team, directing Vue 3 authentication views, localStorage-persisted tab navigation, client encryption layers, and public setup documentation.",
      myContributions: [
        "Architected client-side cryptographic encryption and decryption workflows with Crypto-JS, safeguarding message payloads before they reach network transit.",
        "Engineered the Vue 3 authentication layout (AuthView, LoginForm, RegisterForm) with form validation and real-time toast feedback.",
        "Built the responsive administrative Dashboard with localStorage-persisted tab navigation and dynamic user data tables.",
        "Configured Pinia authentication stores and Axios interceptors for automatic JWT token attachment and session expiration handling.",
        "Integrated Svelte Material UI (SMUI) design tokens and theme palettes for the secondary high-speed frontend client.",
        "Authored comprehensive backend and frontend setup guides, API specifications, and architectural documentation in the public repository.",
      ],
      highlights: [
        "Client-side cryptographic encryption preventing plaintext message interception across network boundaries.",
        "Dual-frontend architecture featuring a primary Vue 3/Vuetify portal and an alternative Svelte 5/SMUI interface.",
        "Secure JWT authentication lifecycle with protected route guards and automatic token refresh.",
        "Administrative analytics dashboard displaying active user directories and conversation metrics.",
      ],
      architecture: [
        "Django 4.2 backend structured with Django REST Framework, SimpleJWT authentication, and custom cryptographic middleware.",
        "Vue 3 client styled with Vuetify 3 Material components and managed with Pinia state stores.",
        "Dual-client architecture supporting both Vue.js and Svelte 5 interfaces consuming the same unified REST API.",
      ],
      challenges: [
        "Kept cryptographic operations non-blocking during high-volume messaging by offloading key transformations before DOM rendering.",
        "Maintained consistent authentication states across browser page reloads using reactive Pinia stores synced with localStorage.",
      ],
    },
  },
  {
    id: "proj-10",
    title: "Sinawali Showdown",
    subtitle: "Turn-Based Strategy Card Game Inspired by Filipino Martial Arts",
    category: "Desktop App",
    year: "2024",
    role: "Full-Stack UI/UX & Game Systems Contributor",
    team: "Collaborative Team (Sinawali Logic Raiders)",
    image: "/projects/sinawali-preview.png",
    images: [
      "/projects/sinawali-preview.png",
      "/projects/sinawali-1.png",
      "/projects/sinawali-2.png",
      "/projects/sinawali-3.png",
      "/projects/sinawali-4.png",
    ],
    tags: [
      "Electron",
      "Vue.js",
      "Vuetify",
      "Pinia",
      "Socket.io",
      "Supabase",
      "Groq AI",
      "Vite",
    ],
    liveUrl:
      "https://github.com/centmarde/Sinawali_Showdown-version-Alpha-0.0.1",
    githubUrl:
      "https://github.com/centmarde/Sinawali_Showdown-version-Alpha-0.0.1",
    featured: true,
    metrics: [
      { label: "Combat Engine", value: "Turn-Based" },
      { label: "Platform", value: "Electron Desktop" },
      { label: "Multiplayer", value: "WebSocket Live" },
    ],
    details: {
      overview:
        "Sinawali Showdown is a cross-platform desktop turn-based strategy card game built on Electron, Vue 3, and Node.js WebSockets, translating the tactical strikes, parries, and combinations of Filipino martial arts (Arnis/Kali) into competitive digital deck-building combat.",
      problem:
        "Traditional digital card games rely heavily on standard Western fantasy tropes and static turn resolutions, lacking authentic cultural representation and the rapid, reactive combat flow characteristic of traditional martial arts like Arnis.",
      solution:
        "Engineered a desktop card battle system featuring dual-stick Arnis weapon mechanics (Sinawali weave patterns), real-time peer-to-peer WebSocket synchronization, AI-powered sparring opponents via Groq SDK, and responsive battle HUDs with animated health and mana gauges.",
      roleDescription:
        "Core UI/UX and game systems engineer on the Sinawali Logic Raiders development team, responsible for in-game combat HUD indicators, administrative player management portals, Google authentication workflows, and image optimization pipelines.",
      myContributions: [
        "Engineered the full-featured Administrative Dashboard (AdminBase.vue, UserList.vue) with navigation drawers, card collection previews, and real-time status monitoring.",
        "Implemented complete user management CRUD dialogs with Vuetify (v-dialog), enabling player account updates and deletions synchronized across Supabase auth.users and public.users tables.",
        "Built responsive in-game combat HUD components including dynamic animated health bars (HealthBar.vue), mana pools, and turn timers with real-time state binding.",
        "Integrated Google OAuth and Supabase authentication into the main menu login flow, enabling persistent player identity and cloud profile synchronization.",
        "Developed dynamic battle scene backgrounds (Background.vue, bg.gif, parallax layers) with viewport auto-resizing across desktop display resolutions.",
        "Coordinated Electron desktop packaging (electron-forge, electron-builder) and synchronized cross-branch merges between game logic and desktop shell environments.",
        "Automated repository media asset compression with Imgbot, significantly optimizing image payload sizes for fast desktop and web loads.",
      ],
      highlights: [
        "Full-featured Administrative Dashboard with user CRUD dialogs synced directly across Supabase auth and public schemas.",
        "Tactical Arnis martial arts card system with attack combos, defensive parries, and buff statuses.",
        "Cross-platform desktop runtime powered by Electron 33 and packaged via Electron Forge.",
        "Real-time multiplayer synchronization using Node.js and Socket.io WebSocket channels.",
      ],
      architecture: [
        "Electron 33 desktop application wrapping a Vue 3 SPA with Vuetify components and Pinia state stores.",
        "Lightweight Node.js Socket.io server broadcasting real-time attack, buff, and hit animations on port 3002.",
        "Supabase backend for user profile persistence, cloud card collections, and Google OAuth sessions.",
        "Groq SDK integration powering dynamic AI decision-making for single-player sparring scenarios.",
      ],
      challenges: [
        "Synchronized dual-player combat animation states over WebSockets without frame stuttering or desynchronized turn phases.",
        "Packaged multi-process Node.js WebSocket servers alongside the Electron desktop application bundle cleanly.",
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
    "Desktop App",
  ];
}
