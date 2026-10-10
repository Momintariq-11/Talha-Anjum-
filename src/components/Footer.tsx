import React from 'react'
import { ArrowUp, Mail, Phone } from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'
import { GithubIcon } from './Icons'

interface FooterProps {
  brandMode?: 'personal' | 'solvix'
}

export const Footer: React.FC<FooterProps> = ({ brandMode = 'personal' }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/[0.08] bg-[#07090e] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="flex items-start gap-3">
            {brandMode === 'solvix' ? (
              <div>
                <div className="font-gotham font-black text-xl text-white flex items-center">
                  <span>Solviq</span>
                  <span className="text-emerald-400">x</span>
                </div>
                <div className="text-xs font-gotham text-zinc-400 font-medium mt-0.5">
                  Your Vision, Our Digital Expertise
                </div>
                <div className="text-xs font-mono text-emerald-400 font-semibold mt-1">
                  Founded by Muhammad Talha Anjum • Lead Architect
                </div>
              </div>
            ) : (
              <>
                <div className="w-8 h-8 rounded-lg bg-[#0d1117] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-white mt-0.5">
                  TA
                </div>
                <div>
                  <div className="font-bold text-sm text-white">
                    Muhammad Talha Anjum
                  </div>
                  <div className="text-xs font-mono text-emerald-400 font-semibold mt-0.5">
                    CEO & Founder of Studio Vertex Agency
                  </div>
                  <div className="text-xs font-mono text-zinc-400 mt-0.5">
                    AI & Full Stack Developer | Social Media Marketing
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.contact.email}`}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-emerald-400 transition-colors"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white font-mono text-xs transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex items-center justify-center text-xs font-mono text-zinc-500">
          <div>
            © 2026 {PERSONAL_INFO.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
