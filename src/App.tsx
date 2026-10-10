import { useState } from 'react'
import { Send, ArrowDown, Sparkles, Wand2 } from 'lucide-react'
import { GithubIcon } from './components/Icons'
import { Navbar } from './components/Navbar'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { MarketingSection } from './components/MarketingSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { PERSONAL_INFO } from './data/portfolioData'

const FONT_OPTIONS = [
  { id: 'syne', label: 'Syne (Editorial Ultra)', family: "'Syne', sans-serif" },
  { id: 'space', label: 'Space Grotesk (Tech Modern)', family: "'Space Grotesk', sans-serif" },
  { id: 'cinzel', label: 'Cinzel (High Fashion Serif)', family: "'Cinzel', serif" },
  { id: 'bricolage', label: 'Bricolage (Contemporary)', family: "'Bricolage Grotesque', sans-serif" },
  { id: 'playfair', label: 'Playfair (Luxury Serif)', family: "'Playfair Display', serif" },
  { id: 'outfit', label: 'Outfit (Geometric Bold)', family: "'Outfit', sans-serif" },
]

export function App() {
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0])
  const [showFontPicker, setShowFontPicker] = useState(false)

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
              {/* Top Row: Availability Badge + Optional Font Style Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-zinc-300 bg-white/5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                  <span>{PERSONAL_INFO.availability}</span>
                </div>

                {/* Font Style Quick-Selector for testing custom styles */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFontPicker(!showFontPicker)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-emerald-300 transition-colors"
                    title="Change typography font style"
                  >
                    <Wand2 className="w-3 h-3 text-emerald-400" />
                    <span>Font: {selectedFont.label.split(' ')[0]}</span>
                  </button>
                </div>
              </div>

              {/* Collapsible Font Style Picker Tray */}
              {showFontPicker && (
                <div className="mb-6 p-3 rounded-xl bg-[#0d1117] border border-emerald-500/30 flex flex-wrap items-center gap-2 animate-in fade-in duration-200">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold mr-1">Choose Font Style:</span>
                  {FONT_OPTIONS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFont(f)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                        selectedFont.id === f.id
                          ? 'bg-emerald-500 text-black font-bold shadow-sm'
                          : 'bg-white/5 text-zinc-300 hover:text-white border border-white/10'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Name in Green */}
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-emerald-400 tracking-tight mb-3">
                Muhammad Talha Anjum
              </div>

              {/* Full Stack Development in White, Big with Stylish Font */}
              <h1
                style={{ fontFamily: selectedFont.family }}
                className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tight uppercase leading-[0.92] mb-6"
              >
                Full Stack Development
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
