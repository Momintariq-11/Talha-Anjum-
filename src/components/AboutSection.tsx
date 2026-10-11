import React from 'react'
import { Bot, Zap, Wrench, TrendingUp } from 'lucide-react'
import { EXPERTISE_CARDS, PERSONAL_INFO } from '../data/portfolioData'
import { ProfileCard } from './ProfileCard'
import { DeveloperAvatar3D } from './DeveloperAvatar3D'
import { InstagramIcon, TikTokIcon } from './Icons'

import type { ExpertiseCard } from '../data/portfolioData'

const ICON_MAP: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-5 h-5 text-emerald-400" />,
  Zap: <Zap className="w-5 h-5 text-emerald-400" />,
  Wrench: <Wrench className="w-5 h-5 text-emerald-400" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-emerald-400" />
}

interface AboutSectionProps {
  cards?: ExpertiseCard[]
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  cards = EXPERTISE_CARDS
}) => {
  return (
    <section id="about" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-zinc-400 bg-white/5 border border-white/10 uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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

        {/* Data About Him & Avatar Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left Column: Data & Credentials Card */}
          <div className="lg:col-span-6">
            <ProfileCard />
          </div>

          {/* Right Column: Standing Avatar with Audio Intro */}
          <div className="lg:col-span-6">
            <DeveloperAvatar3D />
          </div>
        </div>

        {/* 4 Pillars Expertise Grid */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-white/5 border border-white/10 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              What I Do
            </div>
            <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
              <span className="text-emerald-400 font-semibold">
                Vertex Studios Agency
              </span>
              <span className="text-zinc-600">•</span>
              <span>CEO & Founder</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((card) => (
              <div
                key={card.title}
                className={`rounded-xl p-6 bg-[#0d1117] transition-all flex flex-col justify-between group ${
                  card.socialLinks
                    ? 'border border-emerald-500/30 hover:border-emerald-500/50 shadow-lg shadow-emerald-500/5'
                    : 'border border-white/10 hover:border-emerald-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/40 transition-colors">
                      {ICON_MAP[card.icon] || ICON_MAP.Zap}
                    </div>
                    {card.role && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-semibold">
                        {card.role}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>

                <div>
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

                  {card.socialLinks && (
                    <div className="mt-4 pt-3.5 border-t border-emerald-500/20 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 font-semibold mb-0.5">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Official Channels
                        </span>
                        <span className="text-[10px] text-zinc-400 font-normal">Vertex Studios</span>
                      </div>
                      {card.socialLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 text-xs font-mono font-medium flex items-center justify-between transition-all group/btn shadow-sm"
                          title={`Visit Vertex Studios ${link.name}`}
                        >
                          <div className="flex items-center gap-2.5">
                            {link.icon === 'instagram' && (
                              <InstagramIcon className="w-4 h-4 text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                            )}
                            {link.icon === 'tiktok' && (
                              <TikTokIcon className="w-4 h-4 text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                            )}
                            <span>{link.name}</span>
                          </div>
                          <span className="text-[11px] text-emerald-400/80 group-hover/btn:text-emerald-300 flex items-center gap-1">
                            <span>Open</span>
                            <span className="transition-transform group-hover/btn:translate-x-0.5">↗</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
