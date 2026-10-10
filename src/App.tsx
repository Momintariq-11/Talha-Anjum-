import { useState } from 'react'
import { Send } from 'lucide-react'
import { GithubIcon } from './components/Icons'
import { Navbar } from './components/Navbar'
import { DeveloperGlobe } from './components/DeveloperGlobe'
import { ProfileCard } from './components/ProfileCard'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { MarketingSection } from './components/MarketingSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { PERSONAL_INFO } from './data/portfolioData'
import { soundFx } from './components/SoundController'

export function App() {
  const [soundEnabled, setSoundEnabled] = useState(false)

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  const handleSmoothScroll = (href: string) => {
    if (soundEnabled) soundFx.click()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f4f4f6] font-sans selection:bg-blue-600/30 selection:text-white relative">
      {/* Sticky Navigation */}
      <Navbar
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {/* ===================== HERO SECTION ===================== */}
        <section
          id="home"
          className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
            {/* Top Hero Text */}
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-zinc-300 bg-white/5 border border-white/10 mb-5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>{PERSONAL_INFO.availability}</span>
              </div>

              <div className="text-xs font-mono font-semibold tracking-wider text-[#87834F] uppercase mb-2">
                {PERSONAL_INFO.name}
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] text-white mb-6">
                Building Intelligent{' '}
                <span className="text-blue-500">
                  Digital Experiences.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed mb-8 max-w-2xl">
                I'm <span className="text-white font-medium">Muhammad Talha Anjum</span>, an Artificial Intelligence student and{' '}
                <span className="text-blue-400 font-medium">AI & Full-Stack Developer</span> and{' '}
                <span className="text-zinc-200 font-medium">Social Media Marketing</span> professional focused on practical software, intelligent applications, automation tools, modern websites, and business-focused digital products.
              </p>

              {/* Three Hero CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault()
                    handleSmoothScroll('#projects')
                  }}
                  className="px-5 py-3 rounded-lg font-semibold text-xs tracking-wide bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  Explore My Work
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.contact.email}`}
                  className="px-5 py-3 rounded-lg font-semibold text-xs tracking-wide bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-blue-400" />
                  Let's Work Together
                </a>

                <a
                  href={PERSONAL_INFO.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg font-semibold text-xs tracking-wide bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub ↗
                </a>
              </div>
            </div>

            {/* Balanced 2-Column Showcase: Profile Picture/Card + 3D Developer Globe */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-white/[0.08] pt-10">
              {/* Left Column: Dedicated Profile & Image Section */}
              <div className="lg:col-span-6">
                <ProfileCard />
              </div>

              {/* Right Column: 3D Developer Globe with connected nodes */}
              <div className="lg:col-span-6 relative h-[380px] sm:h-[420px] rounded-2xl bg-[#0d1117] border border-white/10 p-2 overflow-hidden flex items-center justify-center">
                <DeveloperGlobe />
              </div>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT SECTION ===================== */}
        <AboutSection soundEnabled={soundEnabled} />

        {/* ===================== SKILLS SECTION ===================== */}
        <SkillsSection soundEnabled={soundEnabled} />

        {/* ===================== MARKETING SECTION ===================== */}
        <MarketingSection soundEnabled={soundEnabled} />

        {/* ===================== PROJECTS SECTION ===================== */}
        <ProjectsSection soundEnabled={soundEnabled} />

        {/* ===================== CONTACT SECTION ===================== */}
        <ContactSection soundEnabled={soundEnabled} />
      </main>

      {/* Footer */}
      <Footer soundEnabled={soundEnabled} />
    </div>
  )
}
export default App
