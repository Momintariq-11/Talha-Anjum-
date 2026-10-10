import React from 'react'
import { Bot, Zap, Wrench, TrendingUp, CheckCircle2 } from 'lucide-react'
import { EXPERTISE_CARDS, PERSONAL_INFO } from '../data/portfolioData'
import { ProfileCard } from './ProfileCard'
import { DeveloperAvatar3D } from './DeveloperAvatar3D'

export const AboutSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-5 h-5 text-emerald-400" />
      case 'Zap':
        return <Zap className="w-5 h-5 text-emerald-400" />
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-white" />
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />
      default:
        return <Zap className="w-5 h-5 text-emerald-400" />
    }
  }

  return (
    <section id="about" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-zinc-400 bg-white/5 border border-white/10 uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              About Me & Digital Avatar
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              From ideas to working software.
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-base leading-relaxed">
            {PERSONAL_INFO.aboutPitch}
          </p>
        </div>

        {/* ================= DATA ABOUT HIM & 3D FACE AVATAR SHOWCASE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left Column: Data & Verified Credentials Card */}
          <div className="lg:col-span-6">
            <ProfileCard />
          </div>

          {/* Right Column: 3D Face Avatar with Heavy-Voice Speech Intro */}
          <div className="lg:col-span-6">
            <DeveloperAvatar3D />
          </div>
        </div>

        {/* 4 Pillars Expertise Grid */}
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-4">
            Core Technical & Growth Pillars
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {EXPERTISE_CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-xl p-6 bg-[#0d1117] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-emerald-500/40 transition-colors">
                    {getIcon(card.icon)}
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
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
        </div>

        {/* Engineering Standards Bar */}
        <div className="rounded-xl border border-white/10 bg-[#0d1117] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08] mb-4">
            <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
              Engineering Focus & Standards
            </span>
            <span className="font-mono text-xs text-zinc-500">
              Clean Architecture • Practical AI Systems • Measurable Outcomes
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-zinc-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Full CRUD workflows with type-safe schema definitions and robust authentication.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
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
