export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveDemoUrl?: string
  badgeLabel?: string
  category: 'Full-Stack' | 'AI & ML' | 'Backend' | 'Web'
  featured: boolean
  architectureHighlights: string[]
  metrics?: string
}

export interface SkillCategory {
  title: string
  skills: string
  category: string
  icon: string
  techs: string[]
}

export interface MarketingPillar {
  title: string
  description: string
  icon: string
  tags: string[]
  deliverables: string[]
}

export const PERSONAL_INFO = {
  name: "Muhammad Talha Anjum",
  initials: "TA",
  roles: [
    "AI & Full-Stack Developer",
    "Machine Learning & Automation Builder",
    "Digital Growth & Social Media Specialist"
  ],
  headline: "Building Intelligent Digital Experiences.",
  subheadline: "I'm Muhammad Talha Anjum, an Artificial Intelligence student and AI & Full-Stack Developer focused on practical software, intelligent applications, automation, and modern web development.",
  aboutPitch: "I enjoy turning real-world problems into clean, useful digital products — from business systems and websites to AI-powered tools.",
  education: {
    degree: "BS Artificial Intelligence",
    university: "The University of Faisalabad",
    cgpa: "3.34 / 4.00",
    location: "Jhang, Pakistan"
  },
  availability: "Open to remote & freelance opportunities",
  contact: {
    email: "talhaanjum6735@gmail.com",
    github: "https://github.com/maliktalha2006",
    phone: "+92 310 6505299",
    phoneTel: "tel:+923106505299",
    whatsapp: "https://wa.me/923106505299"
  }
}

export const EXPERTISE_CARDS = [
  {
    icon: "Bot",
    title: "AI Development",
    description: "Chatbots, recommendation systems, RAG concepts, prompt engineering and practical machine-learning applications.",
    highlight: "Gemini API • RAG • Decision Trees",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    borderGlow: "rgba(34, 211, 238, 0.4)"
  },
  {
    icon: "Zap",
    title: "Full-Stack Web",
    description: "Modern responsive applications using React, Next.js, TypeScript, APIs, databases and production deployment workflows.",
    highlight: "React • Next.js • TypeScript",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    borderGlow: "rgba(168, 85, 247, 0.4)"
  },
  {
    icon: "Wrench",
    title: "Problem Solving",
    description: "Business-focused software with real CRUD workflows, authentication, databases and user-friendly interfaces.",
    highlight: "Auth • Database Schemas • CRUD",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderGlow: "rgba(52, 211, 153, 0.4)"
  },
  {
    icon: "TrendingUp",
    title: "Social Media Marketing",
    description: "Social media strategy, content planning, page handling, audience engagement, Meta Ads setup and performance-focused marketing for businesses.",
    highlight: "Meta Ads • Content • Page Mgmt",
    gradient: "from-fuchsia-500/20 via-pink-500/10 to-transparent",
    borderGlow: "rgba(232, 121, 249, 0.4)",
    tags: ["Social Media", "Meta Ads", "Content Strategy", "Page Management"]
  }
]

export const TECHNICAL_SKILLS: SkillCategory[] = [
  {
    title: "Python",
    skills: "AI / ML • APIs • Automation",
    category: "AI & Backend",
    icon: "Terminal",
    techs: ["Python 3", "Data Structures", "Scripting", "Automation Scripts"]
  },
  {
    title: "JavaScript / TypeScript",
    skills: "React • Next.js • Modern Web",
    category: "Frontend & Full-Stack",
    icon: "Code2",
    techs: ["TypeScript", "React", "Next.js", "Tailwind CSS", "ESNext"]
  },
  {
    title: "FastAPI",
    skills: "REST APIs • Backend Services",
    category: "Backend Engineering",
    icon: "Cpu",
    techs: ["RESTful Endpoints", "Pydantic Schemas", "Async Handlers", "Microservices"]
  },
  {
    title: "SQL / PostgreSQL",
    skills: "Database Design • Prisma • Neon",
    category: "Database & ORM",
    icon: "Database",
    techs: ["PostgreSQL", "Prisma ORM", "Neon DB", "Relational Modeling"]
  },
  {
    title: "AI / ML",
    skills: "Decision Trees • RAG • Chatbots • Prompt Engineering",
    category: "Intelligent Systems",
    icon: "Brain",
    techs: ["Decision Trees", "RAG Pipelines", "Conversational Agents", "Prompt Architecture"]
  },
  {
    title: "Git & Deployment",
    skills: "GitHub • Vercel • Netlify • Cloud workflows",
    category: "DevOps & Cloud",
    icon: "GitBranch",
    techs: ["GitHub Workflows", "Vercel Edge", "Netlify CI/CD", "Production Hosting"]
  },
  {
    title: "Social Media Marketing",
    skills: "Meta Ads • Content Strategy • Page Management • Campaigns",
    category: "Growth & Strategy",
    icon: "Megaphone",
    techs: ["Meta Ads Manager", "Creative Direction", "Engagement Tactics", "Audience Retargeting"]
  }
]

export const MARKETING_PILLARS: MarketingPillar[] = [
  {
    title: "Social Media Strategy",
    description: "Content direction, posting plans, brand positioning and audience-focused growth strategy.",
    icon: "Target",
    tags: ["Brand Voice", "Content Calendars", "Audience Research"],
    deliverables: ["Editorial Planning", "Competitor Positioning", "Growth Roadmap"]
  },
  {
    title: "Page Management",
    description: "Professional handling of Facebook, Instagram and other business social profiles with consistent content.",
    icon: "Smartphone",
    tags: ["Community Management", "Consistent Posting", "Profile Optimization"],
    deliverables: ["Visual Feed Curation", "Story Highlights", "Direct Message Handling"]
  },
  {
    title: "Meta Ads",
    description: "Campaign setup, audience targeting, creative testing and performance tracking for Facebook and Instagram.",
    icon: "BarChart3",
    tags: ["Targeting Sets", "A/B Testing", "Conversion Tracking"],
    deliverables: ["Ad Creative Testing", "Custom Audiences", "Campaign Optimization"]
  }
]

export const PROJECTS_DATA: Project[] = [
  {
    id: "zavio-pos",
    title: "Zavio Restaurant POS",
    description: "Full-stack restaurant POS focused on product management, authentication, PostgreSQL, Prisma and production deployment.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/maliktalha2006/zavio-restaurant-pos",
    category: "Full-Stack",
    featured: true,
    architectureHighlights: [
      "Modular product & menu inventory manager",
      "Robust authentication layer with role safeguards",
      "PostgreSQL database connected via Prisma ORM",
      "Optimized for real-world dining point-of-sale efficiency"
    ]
  },
  {
    id: "pau-university-finder",
    title: "PAU University Finder",
    description: "Pakistan-focused university finder with search, fee, scholarship, admission information and recommendation features.",
    tags: ["Web App", "Recommendation", "Decision Tree"],
    liveDemoUrl: "https://dulcet-alfajores-07694e.netlify.app/",
    category: "Web",
    featured: true,
    architectureHighlights: [
      "Algorithmic decision tree recommendation system",
      "Fee structure and scholarship matrix comparisons",
      "Fast client-side indexing and filter mechanics",
      "Designed specifically for student guidance across Pakistan"
    ]
  },
  {
    id: "custom-ai-chatbot",
    title: "Custom AI Chatbot",
    description: "Conversational AI chatbot using Gemini API integration with memory for interactive question-answering.",
    tags: ["Python", "Gemini API", "AI"],
    badgeLabel: "AI Project",
    category: "AI & ML",
    featured: true,
    architectureHighlights: [
      "Stateful conversation memory stream",
      "Gemini API context injection & prompt engineering",
      "High accuracy response parsing and formatting",
      "Clean Python-based interface with streaming output"
    ]
  },
  {
    id: "hire-orbit",
    title: "HireOrbit",
    description: "A job-focused web platform built with modern full-stack technologies and deployed for online use.",
    tags: ["Web", "Full-Stack", "Deployment"],
    liveDemoUrl: "https://hire-orbit-hlhw.vercel.app/",
    githubUrl: "https://github.com/maliktalha2006/HireOrbit",
    category: "Full-Stack",
    featured: true,
    architectureHighlights: [
      "Job application pipeline and role discovery",
      "Full-stack responsive design built for scale",
      "Edge-deployed on Vercel with near-zero latency",
      "Modern applicant workflow with accessible UX"
    ]
  },
  {
    id: "login-system",
    title: "Login System",
    description: "Authentication-focused web project with database-backed login functionality and online deployment.",
    tags: ["Web", "Auth", "Database"],
    liveDemoUrl: "https://talha-login-system.netlify.app/",
    githubUrl: "https://github.com/maliktalha2006/login-project",
    category: "Full-Stack",
    featured: true,
    architectureHighlights: [
      "Secure credential validation & password hashing",
      "Persistent database-backed account sessions",
      "Clean client authentication flow with error boundaries",
      "Deployed and verified on Netlify infrastructure"
    ]
  },
  {
    id: "ai-voice-call-trainer",
    title: "AI Voice Call-Center Trainer",
    description: "FastAPI-based backend project for an AI voice call-center training workflow, designed for practical business use.",
    tags: ["Python", "FastAPI", "AI"],
    badgeLabel: "Backend Project",
    category: "Backend",
    featured: true,
    architectureHighlights: [
      "High-throughput asynchronous FastAPI architecture",
      "Voice dialogue simulation pipeline for agent training",
      "Structured evaluation metrics and response feedback",
      "Built for enterprise customer service onboarding workflows"
    ]
  }
]
