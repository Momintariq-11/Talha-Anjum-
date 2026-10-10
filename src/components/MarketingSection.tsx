import React, { useState } from 'react'
import { Target, Smartphone, BarChart3, CheckCircle } from 'lucide-react'
import { MARKETING_PILLARS } from '../data/portfolioData'
import { soundFx } from './SoundController'

interface MarketingSectionProps {
  soundEnabled: boolean
}

export const MarketingSection: React.FC<MarketingSectionProps> = ({ soundEnabled }) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'ads' | 'cadence'>('pipeline')

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-5 h-5 text-blue-400" />
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-[#87834F]" />
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-white" />
      default:
        return <BarChart3 className="w-5 h-5 text-blue-400" />
    }
  }

  return (
    <section id="marketing" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-zinc-400 bg-white/5 border border-white/10 uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#87834F]" />
              Digital Growth
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Social media that works like a business tool.
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-base leading-relaxed">
            Beyond development, I help businesses build a stronger online presence through practical social media strategy and marketing.
          </p>
        </div>

        {/* 3 Core Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {MARKETING_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              onMouseEnter={() => soundEnabled && soundFx.hover()}
              className="rounded-xl p-6 bg-[#0d1117] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {getPillarIcon(pillar.icon)}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light mb-5">
                  {pillar.description}
                </p>

                <div className="space-y-2 mb-6 font-mono text-xs text-zinc-400">
                  {pillar.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#87834F] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.08]">
                {pillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Clean Marketing Architecture Matrix */}
        <div className="rounded-xl border border-white/10 bg-[#0d1117] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08] mb-6">
            <div>
              <h3 className="text-base font-bold text-white">
                Meta Ads & Distribution Architecture
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Audience segmentation and structured campaign testing
              </p>
            </div>

            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
              <button
                onClick={() => {
                  setActiveTab('pipeline')
                  if (soundEnabled) soundFx.click()
                }}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  activeTab === 'pipeline'
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Funnel Steps
              </button>
              <button
                onClick={() => {
                  setActiveTab('ads')
                  if (soundEnabled) soundFx.click()
                }}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  activeTab === 'ads'
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Ads Strategy
              </button>
              <button
                onClick={() => {
                  setActiveTab('cadence')
                  if (soundEnabled) soundFx.click()
                }}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  activeTab === 'cadence'
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Posting Cadence
              </button>
            </div>
          </div>

          <div>
            {activeTab === 'pipeline' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-[#87834F] block mb-1">01 / AUDIENCE</span>
                  <h4 className="text-white font-bold text-sm mb-1">Audience Discovery</h4>
                  <p className="text-xs text-zinc-400">Targeting niches, demographics, and lookalike parameters.</p>
                </div>
                <div className="p-4 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-blue-400 block mb-1">02 / CREATIVE</span>
                  <h4 className="text-white font-bold text-sm mb-1">Creative Production</h4>
                  <p className="text-xs text-zinc-400">Reels, carousel assets, and high-clarity copy variation.</p>
                </div>
                <div className="p-4 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-white block mb-1">03 / ADS LAUNCH</span>
                  <h4 className="text-white font-bold text-sm mb-1">Meta Ads Manager</h4>
                  <p className="text-xs text-zinc-400">Traffic, lead capture, and dynamic budget allocation.</p>
                </div>
                <div className="p-4 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-[#87834F] block mb-1">04 / OPTIMIZE</span>
                  <h4 className="text-white font-bold text-sm mb-1">Testing & Scaling</h4>
                  <p className="text-xs text-zinc-400">A/B analysis to sustain cost-effective lead generation.</p>
                </div>
              </div>
            )}

            {activeTab === 'ads' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-zinc-300">
                <div className="p-4 rounded-lg bg-black/40 border border-white/[0.06]">
                  <h5 className="text-white font-bold mb-2">Campaign Structure</h5>
                  <ul className="space-y-1 text-zinc-400">
                    <li>• Campaign: Lead & Conversion focus</li>
                    <li>• Ad Sets: Precise geo & interest filters</li>
                    <li>• Creative: Formatted for mobile feeds</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-black/40 border border-white/[0.06]">
                  <h5 className="text-white font-bold mb-2">Audience Segmentation</h5>
                  <ul className="space-y-1 text-zinc-400">
                    <li>• Cold Audiences: Lookalike modeling</li>
                    <li>• Warm Audiences: Page engagement</li>
                    <li>• Custom Audiences: Direct inquiries</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-black/40 border border-white/[0.06]">
                  <h5 className="text-white font-bold mb-2">Split Testing</h5>
                  <ul className="space-y-1 text-zinc-400">
                    <li>• Video hook variations</li>
                    <li>• Static vs Carousel comparison</li>
                    <li>• Call-to-action optimization</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'cadence' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-lg bg-black/40 border border-white/[0.06] space-y-2">
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-white font-bold">Facebook Management:</span>
                    <span>Feed posts & direct messenger handling</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-white font-bold">Instagram Business:</span>
                    <span>Reels, story highlights & visual grid</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-white font-bold">Meta Business Suite:</span>
                    <span>Scheduled distribution & response triage</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-black/40 border border-white/[0.06] text-zinc-400 leading-relaxed font-sans text-xs flex items-center">
                  "Marketing works best when treated as an engineering system: consistent scheduling, measurable tracking, and creative iteration."
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
