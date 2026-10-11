import React, { useState } from 'react'
import { Terminal, Code2, Cpu, Database, Brain, GitBranch, Megaphone, CheckCircle } from 'lucide-react'
import { TECHNICAL_SKILLS } from '../data/portfolioData'

import type { SkillCategory } from '../data/portfolioData'

const SKILL_ICONS: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-5 h-5 text-emerald-400" />,
  Code2: <Code2 className="w-5 h-5 text-emerald-400" />,
  Cpu: <Cpu className="w-5 h-5 text-emerald-400" />,
  Database: <Database className="w-5 h-5 text-emerald-400" />,
  Brain: <Brain className="w-5 h-5 text-emerald-400" />,
  GitBranch: <GitBranch className="w-5 h-5 text-emerald-400" />,
  Megaphone: <Megaphone className="w-5 h-5 text-emerald-400" />
}

interface SkillsSectionProps {
  skills?: SkillCategory[]
  skillsList?: SkillCategory[]
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  skillsList = skills || TECHNICAL_SKILLS
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'AI & ML', label: 'AI & Intelligence' },
    { id: 'Web & Backend', label: 'Web & APIs' },
    { id: 'Data & Growth', label: 'Data & Marketing' }
  ]

  const filteredSkills = skillsList.filter((item) => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'AI & ML') {
      return item.title === 'Python' || item.title === 'AI / ML'
    }
    if (activeCategory === 'Web & Backend') {
      return (
        item.title === 'JavaScript / TypeScript' ||
        item.title === 'FastAPI' ||
        item.title === 'Git & Deployment'
      )
    }
    if (activeCategory === 'Data & Growth') {
      return item.title === 'SQL / PostgreSQL' || item.title === 'Social Media Marketing'
    }
    return true
  })

  return (
    <section id="skills" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-zinc-400 bg-white/5 border border-white/10 uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              What I Use
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Technical toolkit.
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-base leading-relaxed">
            A practical stack for building AI applications, websites, APIs and business software.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/[0.08]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                activeCategory === cat.id
                  ? 'bg-emerald-500 text-black border-emerald-400 font-bold shadow-sm'
                  : 'bg-[#0d1117] text-zinc-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, index) => {
            const isFullWidth = filteredSkills.length === 7 && index === 6

            return (
              <div
                key={skill.title}
                className={`rounded-xl p-5 bg-[#0d1117] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between group ${
                  isFullWidth ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
              >
                <div>
                  <div className={`flex items-center gap-3 mb-3 ${isFullWidth ? 'sm:justify-between' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/40 transition-colors">
                        {SKILL_ICONS[skill.icon] || SKILL_ICONS.Code2}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {skill.title}
                        </h3>
                        <span className="text-[11px] font-mono text-zinc-400 block">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    {isFullWidth && (
                      <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-semibold">
                        Growth Toolkit
                      </span>
                    )}
                  </div>

                  <div className="bg-black/40 rounded-lg p-2.5 border border-white/[0.06] mb-3">
                    <span className="text-xs text-zinc-300 font-mono flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{skill.skills}</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                  {skill.techs.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
