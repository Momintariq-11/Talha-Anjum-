import type { Project, SkillCategory, MarketingPillar, ExpertiseCard } from './portfolioData'

export const SOLVIX_INFO = {
  name: "Solvix",
  tagline: "Your Vision, Our Digital Expertise",
  headline: "Your Vision, Our Digital Expertise.",
  subheadline: "Solvix is a full-service digital innovation agency specializing in high-performance full-stack web platforms, intelligent AI automation systems, and scalable digital marketing campaigns.",
  aboutPitch: "We engineer scalable digital products and growth engines that help modern brands dominate their markets with speed, precision, and architectural excellence.",
  founder: "Muhammad Talha Anjum",
  founderRole: "Founder & Lead Technical Architect",
  availability: "Accepting select client partnerships & enterprise builds",
  contact: {
    email: "talhaanjum6735@gmail.com",
    github: "https://github.com/maliktalha2006",
    phone: "+92 310 6505299",
    whatsapp: "https://wa.me/923106505299"
  },
  socialLinks: [
    {
      name: "Instagram",
      url: "https://www.instagram.com/vertexstudiosagency02/",
      icon: "instagram" as const
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@vertexstudios2?is_from_webapp=1&sender_device=pc",
      icon: "tiktok" as const
    }
  ]
}

export const SOLVIX_SERVICES: ExpertiseCard[] = [
  {
    icon: "Bot",
    title: "AI & Intelligent Automation",
    description: "Custom conversational AI systems, Gemini API integrations, retrieval-augmented workflows, and automated pipeline tooling.",
    highlight: "Gemini API • Custom LLMs • Automation",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderGlow: "rgba(16, 185, 129, 0.4)"
  },
  {
    icon: "Zap",
    title: "Full-Stack Web Engineering",
    description: "Production Next.js, React, and TypeScript applications crafted for extreme speed, search ranking, and modern user experiences.",
    highlight: "Next.js • React • TypeScript • Tailwind",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderGlow: "rgba(16, 185, 129, 0.4)"
  },
  {
    icon: "Wrench",
    title: "Custom Business Software",
    description: "Bespoke SaaS architectures, database schemas, secure authentication, and robust CRUD backends designed for enterprise reliability.",
    highlight: "PostgreSQL • Prisma • REST APIs",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderGlow: "rgba(16, 185, 129, 0.4)"
  },
  {
    icon: "TrendingUp",
    title: "Growth Strategy & Meta Ads",
    description: "Data-driven advertising campaigns, content direction, and organic distribution engineered to convert traffic into loyal customers.",
    role: "Agency Growth",
    highlight: "Meta Ads • Funnels • Conversions",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderGlow: "rgba(16, 185, 129, 0.4)",
    tags: ["Meta Ads", "Content Strategy", "Performance Funnels", "Conversion Tracking"],
    socialLinks: [
      {
        name: "Instagram",
        url: "https://www.instagram.com/vertexstudiosagency02/",
        icon: "instagram"
      },
      {
        name: "TikTok",
        url: "https://www.tiktok.com/@vertexstudios2?is_from_webapp=1&sender_device=pc",
        icon: "tiktok"
      }
    ]
  }
]

export const SOLVIX_TOOLKIT: SkillCategory[] = [
  {
    title: "AI & Intelligent Systems",
    skills: "LLM Orchestration • Gemini API • RAG • Prompt Systems",
    category: "AI Engineering",
    icon: "Brain",
    techs: ["Gemini API", "Python 3", "RAG Pipelines", "Conversational AI"]
  },
  {
    title: "Modern Web Platforms",
    skills: "Next.js • React • TypeScript • Responsive Architecture",
    category: "Frontend Excellence",
    icon: "Code2",
    techs: ["Next.js 14+", "React", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Backend & Cloud Services",
    skills: "FastAPI • High-Throughput APIs • Microservices",
    category: "API Architecture",
    icon: "Cpu",
    techs: ["FastAPI", "Pydantic", "Async Architecture", "Microservices"]
  },
  {
    title: "Database Infrastructure",
    skills: "PostgreSQL • Prisma ORM • Neon Cloud Database",
    category: "Data Integrity",
    icon: "Database",
    techs: ["PostgreSQL", "Prisma ORM", "Neon DB", "Schema Design"]
  },
  {
    title: "DevOps & Global Edge",
    skills: "Vercel Edge • GitHub CI/CD • Production Hosting",
    category: "Deployment",
    icon: "GitBranch",
    techs: ["Vercel Edge", "GitHub Actions", "Netlify CI/CD", "Cloud Workflows"]
  },
  {
    title: "Python Automation",
    skills: "Data Processing • Web Scraping • Background Daemons",
    category: "Automation",
    icon: "Terminal",
    techs: ["Automation Scripts", "Data Pipelines", "APIs", "ETL Systems"]
  },
  {
    title: "Performance Digital Marketing",
    skills: "Meta Ads Manager • Creative Strategy • Audience Retargeting",
    category: "Growth & Strategy",
    icon: "Megaphone",
    techs: ["Meta Ads Manager", "Creative Direction", "Engagement Tactics", "Audience Retargeting"]
  }
]

export const SOLVIX_PILLARS: MarketingPillar[] = [
  {
    title: "Strategic Digital Roadmaps",
    description: "Aligning your business vision with targeted digital initiatives, brand positioning, and measurable ROI benchmarks.",
    icon: "Target",
    tags: ["Market Analysis", "Strategic Positioning", "Growth Architecture"],
    deliverables: ["Comprehensive Roadmap", "Audience Blueprint", "Execution Milestones"]
  },
  {
    title: "Content & Multi-Channel Distribution",
    description: "Curating high-retention visual assets, short-form video strategies, and consistent brand presence across platforms.",
    icon: "Smartphone",
    tags: ["Visual Curation", "Story Architecture", "Omnichannel Presence"],
    deliverables: ["Editorial Schedules", "Creative Asset Packs", "Community Operations"]
  },
  {
    title: "Performance Meta Advertising",
    description: "High-return paid media on Facebook and Instagram, combining granular audience segmentation with rigorous creative testing.",
    icon: "BarChart3",
    tags: ["A/B Testing", "Conversion Funnels", "ROAS Optimization"],
    deliverables: ["Ad Set Deployments", "Custom Audiences", "Weekly Analytics Matrix"]
  }
]

export const SOLVIX_PROJECTS: Project[] = [
  {
    id: "zavio-pos",
    title: "Zavio Enterprise POS Platform",
    description: "Full-stack point-of-sale system built for restaurant and retail operations with inventory control, auth, and PostgreSQL database.",
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
    id: "hire-orbit",
    title: "HireOrbit Career & Talent Hub",
    description: "Scalable job discovery and applicant recruitment ecosystem with seamless application pipelines deployed on Vercel Edge.",
    tags: ["Next.js", "Full-Stack", "Vercel Edge"],
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
    id: "custom-ai-chatbot",
    title: "Enterprise AI Conversational Engine",
    description: "Intelligent customer engagement assistant powered by the Gemini API with contextual memory and streaming inference.",
    tags: ["Python", "Gemini API", "AI Systems"],
    badgeLabel: "AI Solution",
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
    id: "ai-voice-call-trainer",
    title: "AI Voice Dialogue Training Suite",
    description: "High-throughput asynchronous FastAPI backend simulating customer dialogue for enterprise onboarding and quality assurance.",
    tags: ["Python", "FastAPI", "Voice AI"],
    badgeLabel: "Backend Suite",
    category: "Backend",
    featured: true,
    architectureHighlights: [
      "High-throughput asynchronous FastAPI architecture",
      "Voice dialogue simulation pipeline for agent training",
      "Structured evaluation metrics and response feedback",
      "Built for enterprise customer service onboarding workflows"
    ]
  },
  {
    id: "pau-university-finder",
    title: "PAU Academic Search & Decision Engine",
    description: "Interactive higher education portal with recommendation algorithms, fee structures, and scholarship discovery.",
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
    id: "login-system",
    title: "Secure Identity & Session Manager",
    description: "Security-first authentication portal featuring encrypted credentials, database persistence, and session tokens.",
    tags: ["Security", "Database", "Authentication"],
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
  }
]
