import {
  JourneyMilestone,
  EducationItem,
  CertificationItem,
  ActivityItem,
} from "./types";

export const DEFAULT_MILESTONES: ReadonlyArray<JourneyMilestone> = [
  {
    year: "June 2025 - September 2025",
    title: "Full-Stack Web Developer",
    role: "Office of Curriculum and Instruction Development (OCID - Caraga State University)",
    description:
      "Leading frontend architecture and team execution for modern next-gen enterprise platforms.",
    location: "Butuan, PH (On-site Intern)",
    tags: ["React.js", "Tailwind CSS", "Shadcn UI", "Laravel", "PostgreSQL"],
    highlights: [
      "Engineered the backend architecture and core database logic for an employee database management system using Laravel and PostgreSQL, reducing average query time by ~35% through optimized schema design and indexing.",
      "Developed and integrated secure RESTful APIs, enabling reliable data exchange across 5+ core system modules with zero reported downtime.",
      "Designed and programmed responsive frontend views for the system's administrative dashboard using React.js and Tailwind CSS, facilitating seamless data management and full-stack integration.",
      "Led the full Software Development Lifecycle (SDLC), delivering the system on schedule within a 3-month timeline",
    ],
    metrics: [
      { label: "Query Speedup", value: "35%" },
      { label: "Core Modules", value: "5+" },
      { label: "Project Timeline", value: "3 Mos" },
    ],
  },
  {
    year: "January 2025 - April 2025",
    title: "Frontend Developer",
    role: "VZ Stellar Realty",
    description:
      "Developed immersive visual marketing experiences and robust headless commerce applications.",
    location: "Remote",
    tags: ["Vue.js", "Vuetify", "Supabase", "PostgreSQL"],
    highlights: [
      "Spearheaded the end-to-end design and development of a responsive web application for a local real estate agency as the sole developer, establishing their online brand presence.",
      "Engineered an intuitive frontend using Vue.js and Vuetify, featuring advanced search filters and dynamic UI components to streamline browsing of 40+ property listings.",
      "Implemented a secure, real-time backend and database architecture using Supabase and PostgreSQL, managing user authentication and 40+ live listings, deployed to production on Vercel within a 3-month timeline.",
    ],
    metrics: [
      { label: "Property Listings", value: "40+" },
      { label: "Project Timeline", value: "3 Months" },
      { label: "Property Views", value: "1k+" },
    ],
  },
  {
    year: "2025",
    title: "UI/UX Designer",
    role: "Freelance",
    description:
      "Designed and built tailormade web solutions and digital design systems for growth-stage businesses.",
    location: "Hybrid / Remote",
    tags: ["Figma"],
    highlights: [
      "Created end-to-end user interfaces, brand identities, and high-fidelity prototypes in Figma, translating them directly to React code.",
      "Constructed modular design systems that reduced future development cycles by up to 35% for clients.",
      "Optimized SEO performance and semantic HTML structures, helping clients rank on the first page of Google search results.",
    ],
    metrics: [
      { label: "Dev Cycle Speedup", value: "35%" },
      { label: "Clients Served", value: "15+" },
      { label: "Projects Completed", value: "15+" },
    ],
  },
  {
    year: "October 2024 - February 2025",
    title: "Video Editor",
    role: "Freelance",
    description:
      "Produced and edited high-engagement short-form video content for diverse clients across multiple platforms.",
    location: "Remote",
    tags: ["CapCut", "Adobe Premiere Pro"],
    highlights: [
      "Produced 10+ short-form videos for Instagram Reels and Facebook across e-commerce retail, cosmetic surgery, and travel/lifestyle vlog accounts, growing average post reach by ~40%.",
      "Collaborated with clients to integrate feedback, meet brand standards, and deliver projects on deadline.",
      "Leveraged dynamic text overlays, transitions, and trending audio to enhance storytelling and viewer retention across platforms.",
    ],
    metrics: [
      { label: "Videos Produced", value: "10+" },
      { label: "Average Reach Increase", value: "40%" },
      { label: "Clients Served", value: "3" },
    ],
  },
] as const;

export const EDUCATION_ITEMS: readonly EducationItem[] = [
  {
    degree: "B.S. in Information Technology",
    school: "Caraga State University - Main Campus",
    period: "August 2021 - June 2026",
    gpa: "2.00",
    courses: [
      "Web Development",
      "Mobile Application Development",
      "Networking",
      "Database Systems",
      "Software Engineering",
      "Fundamentals of Programming",
      "Data Structures and Algorithms",
      "Systems Integration and Architecture",
      "Information Assurance and Security",
      "Human-Computer Interaction",
      "AI and Intelligent Systems",
    ],
    highlights: [
      "Awarded Vice President's Lister for attaining a 1.38 GPA during the 1st Semester of Academic Year 2025-2026.",
      "Developed an AI-powered multilingual profanity detection Chrome extension for real-time web content filtering as a thesis project.",
      "Represented the Caraga Region at the national level after winning back-to-back Regional Championships at Hack4Gov (2024 & 2025), a cybersecurity Capture The Flag competition, with team CarSU CyberNinja.",
      "Secured 3rd place nationally at the DOST Level Up Game Dev Challenge 2024 building 'Sinawali Showdown' frontend with Vue 3.",
    ],
  },

  {
    degree: "Senior High School",
    school: "ACLC College Butuan",
    period: "2018 - 2020",
    gpa: "2.25",
    courses: ["Computer System Servicing (CSS) NCII"],
    highlights: [
      "Acquired technical skills in computer hardware and software troubleshooting and maintenance.",
      "Completed hands-on training and assessments for practical application of technical knowledge.",
    ],
  },
];

export const CERTIFICATION_ITEMS: readonly CertificationItem[] = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2025",
    credId: "AWS-ASA-99212",
    verifyKey: "0x8f2d9a3b00fe41",
    skills: [
      "VPC Architecture",
      "Serverless (Lambda)",
      "ECS/EKS Containerization",
      "Cloud Security",
    ],
  },
  {
    title: "Meta Advanced React Developer",
    issuer: "Meta (Coursera)",
    date: "2024",
    credId: "META-ARD-88341",
    verifyKey: "0x4c2b9a78fd1230",
    skills: [
      "Custom Hooks",
      "Concurrent Mode",
      "React Performance Profiling",
      "State Managers",
    ],
  },
  {
    title: "Vercel Next.js Developer Certification",
    issuer: "Vercel",
    date: "2025",
    credId: "VRC-NJS-77429",
    verifyKey: "0x9e107d3fa20bb1",
    skills: [
      "App Router Architecture",
      "Server Actions",
      "PPR Configurations",
      "Edge Middleware",
    ],
  },
];

export const ACTIVITY_ITEMS: readonly ActivityItem[] = [
  {
    title: "Global Hackathon 2024",
    role: "Team Lead & Lead Engineer",
    period: "48 Hours (2024)",
    metrics: [
      { label: "Team size", value: "4 Eng" },
      { label: "Rank", value: "1st Place" },
      { label: "Teams competed", value: "200+" },
    ],
    tags: ["Next.js", "WebRTC", "Tailwind", "Socket.io"],
    highlights: [
      'Led the architecture and engineering of "SyncBoard" — a collaborative real-time whiteboarding tool utilizing WebRTC for ultra-low latency mesh networking.',
      "Won the Grand Prize for Best Technical Implementation and UI/UX fluid design out of 200+ global teams.",
    ],
  },
  {
    title: "Open Source Ecosystem",
    role: "Core Contributor",
    period: "2023 - Present",
    metrics: [
      { label: "PRs merged", value: "45+" },
      { label: "Repos helped", value: "6+" },
      { label: "Commits", value: "120+" },
    ],
    tags: ["React", "Next.js", "Framer Motion", "TypeScript"],
    highlights: [
      "Regular contributor to web standard libraries, focusing on optimizing CSS-in-JS transitions and reducing library sizes.",
      "Optimized performance in rendering loops, helping resolve memory leaks on standard routing frameworks.",
    ],
  },
  {
    title: "Technical Author & Speaker",
    role: "Tech Evangelist",
    period: "2022 - Present",
    metrics: [
      { label: "Articles", value: "18+" },
      { label: "Reads", value: "50k+" },
      { label: "Talks given", value: "4" },
    ],
    tags: ["Blogging", "Public Speaking", "Mentorship"],
    highlights: [
      "Published articles on Dev.to and Medium covering advanced React 19 concepts, compiler optimization, and Framer Motion spring physics.",
      "Spoke at local frontend meetups about Next.js App Router performance audits and layout shifts.",
    ],
  },
];
