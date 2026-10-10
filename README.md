# Muhammad Talha Anjum — 3D Award-Winning Portfolio

A premium, futuristic, award-winning developer portfolio website built for **Muhammad Talha Anjum** (AI & Full-Stack Developer & Social Media Marketing Specialist).

Inspired by Awwwards, futuristic AI interfaces, and high-end creative developer portfolios, featuring interactive Three.js 3D WebGL animations, glassmorphism, cyber neon accents, and interactive systems.

---

## 🌟 Highlights & Key Features

1. **Interactive 3D Neural AI Core (Three.js WebGL)**:
   - Dynamic pulsing energy core with crystalline icosahedron lattice
   - Dual gyroscopic quantum rings counter-rotating on distinct Euler angles
   - Real-time mouse parallax, camera lerping, and click-to-pulse acceleration
   - 1,400+ floating particle starfield with depth blending
   - Automatic graceful CSS3D fallback for devices without WebGL support
2. **Strict Content Integrity**:
   - Preserves 100% of authentic credentials from the source HTML:
     - **Education**: BS Artificial Intelligence
     - **University**: The University of Faisalabad
     - **CGPA**: 3.34 / 4.00
     - **Location**: Jhang, Pakistan
     - **Email**: talhaanjum6735@gmail.com
     - **Phone / WhatsApp**: +92 310 6505299
     - **GitHub**: https://github.com/maliktalha2006
3. **Preserved 6 Projects with Custom Product UI Mockups**:
   - **Zavio Restaurant POS** (Next.js, TypeScript, Prisma, PostgreSQL) → GitHub Repo
   - **PAU University Finder** (Web App, Recommendation, Decision Tree) → Netlify Live Demo
   - **Custom AI Chatbot** (Python, Gemini API, AI) → AI Project
   - **HireOrbit** (Web, Full-Stack, Deployment) → Vercel Live Demo & GitHub Repo
   - **Login System** (Web, Auth, Database) → Netlify Live Demo & GitHub Repo
   - **AI Voice Call-Center Trainer** (Python, FastAPI, AI) → Backend Project
4. **Digital Growth & Marketing Dashboard**:
   - Social Media Strategy
   - Page Management
   - Meta Ads (Campaign funnel, audience layering, A/B creative testing workflow)
5. **Interactive Developer Experience**:
   - Built-in Interactive Cyber Terminal (`talha@core:~$`) with commands: `whoami`, `skills`, `projects`, `contact`, `clear`
   - High-tech Web Audio API sound effects synthesizer (muted by default with navbar toggle)
   - Desktop fluid laser cursor with interactive hover detection
   - Quick inquiry composer with celebration effects that pre-fills email or WhatsApp

---

## 📂 Project Structure

```
talha-portfolio/
├── index.html                   # HTML entry point with metadata, fonts & favicon
├── package.json                 # Project dependencies and npm scripts
├── vite.config.ts               # Vite & Tailwind CSS v4 configuration
├── tsconfig.json                # TypeScript compiler config
└── src/
    ├── main.tsx                 # React application mounting
    ├── App.tsx                  # Master application layout & hero section
    ├── index.css                # Global cyber styles & accessibility overrides
    ├── data/
    │   └── portfolioData.ts     # Single source of truth for all verified data
    └── components/
        ├── Hero3D.tsx           # Three.js 3D AI Core with mouse parallax & fallback
        ├── ProfileBadge.tsx     # 3D tilted glassmorphic profile card
        ├── AboutSection.tsx     # 4 expertise pillars & engineering manifesto
        ├── SkillsSection.tsx    # Technical toolkit with category filters
        ├── MarketingSection.tsx # Social media & Meta Ads command center
        ├── ProjectsSection.tsx  # 6 featured projects with filters & deep-dive modal
        ├── ProjectMockups.tsx   # Custom rich UI mockups for all 6 projects
        ├── ProjectModal.tsx     # Architectural inspection modal
        ├── ContactSection.tsx   # Direct contact channels & interactive composer
        ├── Footer.tsx           # Polished footer with back-to-top button
        ├── Navbar.tsx           # Sticky glassmorphic navbar with audio toggle
        ├── TerminalModal.tsx    # Interactive CLI console
        ├── CustomCursor.tsx     # Fluid desktop laser cursor
        ├── Icons.tsx            # Crisp SVG brand icons
        └── SoundController.ts   # Web Audio API sci-fi sound effects
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18.0 or newer recommended, tested on Node v20)
- npm (v9.0 or newer)

### 1. Navigate to Project Directory
```bash
cd /Users/mmt/.gemini/antigravity/scratch/talha-portfolio
```

### 2. Install Dependencies (if not already installed)
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Install Vercel CLI (optional) or push to GitHub:
   ```bash
   npm i -g vercel
   vercel
   ```
2. Or import your repository on [vercel.com](https://vercel.com):
   - **Framework Preset**: `Vite`
   - **Root Directory**: `talha-portfolio` (or `./`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - Click **Deploy**.

### Deploy to Netlify
1. Connect repository on [netlify.com](https://netlify.com) or run:
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod --dir=dist
   ```
2. In the Netlify UI build settings:
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
