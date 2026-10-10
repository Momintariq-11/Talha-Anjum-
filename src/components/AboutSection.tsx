import React from 'react'
import { Bot, Zap, Wrench, TrendingUp, CheckCircle2 } from 'lucide-react'
import { EXPERTISE_CARDS, PERSONAL_INFO } from '../data/portfolioData'
import { soundFx } from './SoundController'

interface AboutSectionProps {
  soundEnabled: boolean
}

export const AboutSection: React.FC<AboutSectionProps> = ({ soundEnabled }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-5 h-5 text-blue-400" />
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#87834F]" />
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-white" />
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-blue-400" />
      default:
        return <Zap className="w-5 h-5 text-blue-400" />
    }
  }

  return (
    <section id="about" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-zinc-400 bg-white/5 border border-white/10 uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#87834F]" />
              About Me
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              From ideas to working software.
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-base leading-relaxed">
            {PERSONAL_INFO.aboutPitch}
          </p>
        </div>

        {/* 4 Pillars Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {EXPERTISE_CARDS.map((card) => (
            <div
              key={card.title}
              onMouseEnter={() => soundEnabled && soundFx.hover()}
              className="rounded-xl p-6 bg-[#0d1117] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {getIcon(card.icon)}
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>

              {card.tags && (
                <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/[0.08]">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Engineering Philosophy Bar */}
        <div className="rounded-xl border border-white/10 bg-[#0d1117] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08] mb-4">
            <span className="font-mono text-xs text-[#87834F] font-bold uppercase tracking-wider">
              Engineering Focus & Standards
            </span>
            <span className="font-mono text-xs text-zinc-500">
              Clean Code • Practical Systems • Measurable Outcomes
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-zinc-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Full CRUD workflows with type-safe schema definitions and robust authentication.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#87834F] shrink-0 mt-0.5" />
              <span>AI integrations (Gemini API, RAG, Decision Trees) tailored for actual business use.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <span>Production edge deployments across Vercel & Netlify with automated CI/CD workflows.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
