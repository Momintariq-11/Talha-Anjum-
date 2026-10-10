import { useState } from 'react'
import { Send, ArrowDown, Sparkles } from 'lucide-react'
import { GithubIcon } from './components/Icons'
import { Navbar } from './components/Navbar'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { MarketingSection } from './components/MarketingSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { PERSONAL_INFO } from './data/portfolioData'

const TECH_FONTS = [
  { id: 'space', name: 'Tech Modern (Space Grotesk)', className: 'font-tech-space' },
  { id: 'syne', name: 'Geometric Wide (Syne)', className: 'font-tech-syne' },
  { id: 'unbounded', name: 'Futuristic AI (Unbounded)', className: 'font-tech-unbounded' },
  { id: 'outfit', name: 'Clean Minimal (Outfit)', className: 'font-tech-outfit' },
  { id: 'jakarta', name: 'Silicon Valley (Jakarta)', className: 'font-tech-jakarta' }
]

export function App() {
  const [activeFont, setActiveFont] = useState(TECH_FONTS[0]) // Default: Space Grotesk (Tech Modern)

  const handleSmoothScroll = (href: string) => {
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#08090d] text-[#f4f4f6] font-sans selection:bg-emerald-500/30 selection:text-white relative">
      {/* Sticky Navigation (clean, volume button removed) */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        {/* ===================== HERO SECTION ===================== */}
        <section
          id="home"
          className="relative min-h-[90vh] pt-36 pb-20 flex items-center justify-center border-b border-white/[0.06]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
            <div className="max-w-4xl">
              {/* Top Row: Availability Status Badge + Quick Font Style Presets */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-zinc-300 bg-white/5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                  <span>{PERSONAL_INFO.availability}</span>
                </div>

                {/* Instant 1-Click Font Switcher for FULL STACK DEVELOPMENT */}
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-zinc-400 pl-2 pr-1">Headline Style:</span>
                  {TECH_FONTS.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setActiveFont(font)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-all ${
                        activeFont.id === font.id
                          ? 'bg-emerald-500 text-black font-bold shadow-sm'
                          : 'text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                      title={font.name}
                    >
                      {font.id.charAt(0).toUpperCase() + font.id.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name in Green (standard clean mono) */}
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-emerald-400 tracking-tight mb-3">
                Muhammad Talha Anjum
              </div>

              {/* FULL STACK DEVELOPMENT strictly in the selected modern tech font only */}
              <h1 className={`${activeFont.className} text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-white uppercase leading-[0.92] mb-6 tracking-tight`}>
                FULL STACK DEVELOPMENT
              </h1>

              {/* Supporting Subtitle */}
              <p className="text-base sm:text-lg lg:text-xl text-zinc-400 font-light leading-relaxed mb-8 max-w-2xl">
                Building practical software, intelligent AI applications with Gemini API & Python, modern full-stack web platforms using Next.js & PostgreSQL, and high-converting Meta Ads growth systems.
              </p>

              {/* Interactive 3D Avatar Hero Teaser Card */}
              <div className="p-4 rounded-2xl bg-[#0d1117]/90 border border-emerald-500/30 backdrop-blur-md mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-400 shadow-[0_0_12px_#10b98140] shrink-0 bg-[#08090d]">
                    <img
                      src="/talha-avatar-face.jpg"
                      alt="Muhammad Talha Anjum 3D Avatar"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0d1117] animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white tracking-tight">Talha's 3D Interactive Avatar</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold">
                        Deep Voice Core
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      Modeled from reference photo (white cap, glasses, beard) with heavy baritone voice intro.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleSmoothScroll('#about')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Interact with Avatar ↓</span>
                </button>
              </div>

              {/* Three Prominent Hero CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault()
                    handleSmoothScroll('#projects')
                  }}
                  className="px-6 py-3.5 rounded-lg font-bold text-xs tracking-wide bg-emerald-500 hover:bg-emerald-400 text-black transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Explore My Work
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.contact.email}`}
                  className="px-6 py-3.5 rounded-lg font-semibold text-xs tracking-wide bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  Let's Work Together
                </a>

                <a
                  href={PERSONAL_INFO.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-lg font-semibold text-xs tracking-wide bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub ↗
                </a>
              </div>

              {/* Scroll Down Invitation to Meet Avatar & Data */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3 text-xs font-mono text-zinc-500">
                <button
                  onClick={() => handleSmoothScroll('#about')}
                  className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  <ArrowDown className="w-4 h-4 text-emerald-400 animate-bounce" />
                  <span>Scroll down for verified credentials & interactive voice avatar</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT SECTION (WITH 3D AVATAR & DATA) ===================== */}
        <AboutSection />

        {/* ===================== SKILLS SECTION ===================== */}
        <SkillsSection />

        {/* ===================== MARKETING SECTION ===================== */}
        <MarketingSection />

        {/* ===================== PROJECTS SECTION ===================== */}
        <ProjectsSection />

        {/* ===================== CONTACT SECTION ===================== */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
export default App
