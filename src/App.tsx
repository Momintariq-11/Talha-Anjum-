import { Send, ArrowDown } from 'lucide-react'
import { GithubIcon } from './components/Icons'
import { Navbar } from './components/Navbar'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { MarketingSection } from './components/MarketingSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import {
  PERSONAL_INFO,
  EXPERTISE_CARDS,
  TECHNICAL_SKILLS,
  MARKETING_PILLARS
} from './data/personalData'

export function App() {
  return (
    <div className="min-h-screen bg-[#08090d] text-[#f4f4f6] font-sans selection:bg-emerald-500/30 selection:text-white relative">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        {/* ===================== HERO SECTION ===================== */}
        <section
          id="home"
          className="relative min-h-[92vh] pt-32 pb-20 flex flex-col items-center justify-center border-b border-white/[0.06]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center text-center">
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium text-zinc-300 bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{PERSONAL_INFO.availability}</span>
            </div>

            {/* MUHAMMAD TALHA ANJUM in full uppercase */}
            <div className="w-full mb-6 select-none">
              <h2 className="w-full font-mono font-black text-emerald-400 uppercase tracking-[0.2em] sm:tracking-[0.35em] md:tracking-[0.5em] lg:tracking-[0.65em] text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center">
                MUHAMMAD TALHA ANJUM
              </h2>
            </div>

            {/* FULL STACK */}
            <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-mono font-bold tracking-[0.3em] sm:tracking-[0.45em] text-zinc-400 uppercase mb-2 select-none">
              FULL STACK
            </div>

            {/* DEVELOPER */}
            <h1 className="font-tech-space text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] font-black text-white uppercase tracking-tight leading-[0.85] mb-8 select-none">
              DEVELOPER
            </h1>

            {/* Supporting Professional Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-zinc-400 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Full-stack developer and AI student based in Pakistan. Building clean web applications with Next.js & PostgreSQL, practical AI tools with Python, and performance-driven digital marketing campaigns.
            </p>

            {/* Three Centered Hero CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-lg font-bold text-xs tracking-wide bg-emerald-500 hover:bg-emerald-400 text-black transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>View Projects</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.contact.email}`}
                className="px-6 py-3.5 rounded-lg font-semibold text-xs tracking-wide bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                Let's Talk
              </a>

              <a
                href={PERSONAL_INFO.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-lg font-semibold text-xs tracking-wide bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4 text-emerald-400" />
                GitHub Profile
              </a>
            </div>

            {/* Live Focus Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-zinc-400 border border-white/10 bg-[#0d1117] px-4 py-2.5 rounded-full">
              <span className="text-emerald-400 font-semibold">Active Focus:</span>
              <span className="text-zinc-600">•</span>
              <span>Next.js Full-Stack</span>
              <span className="text-zinc-600">•</span>
              <span>Gemini AI / LLMs</span>
              <span className="text-zinc-600">•</span>
              <span>Vertex Studios Agency</span>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT SECTION ===================== */}
        <AboutSection cards={EXPERTISE_CARDS} />

        {/* ===================== SKILLS & TECH STACK ===================== */}
        <SkillsSection skills={TECHNICAL_SKILLS} />

        {/* ===================== MARKETING ARCHITECTURE ===================== */}
        <MarketingSection pillars={MARKETING_PILLARS} />

        {/* ===================== FEATURED PROJECTS ===================== */}
        <ProjectsSection />

        {/* ===================== CONTACT & REACH OUT ===================== */}
        <ContactSection />
      </main>

      {/* ===================== FOOTER ===================== */}
      <Footer />
    </div>
  )
}

export default App
