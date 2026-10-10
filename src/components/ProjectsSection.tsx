import React, { useState } from 'react'
import { ExternalLink, ArrowUpRight, Eye } from 'lucide-react'
import { PROJECTS_DATA } from '../data/portfolioData'
import type { Project } from '../data/portfolioData'
import { ProjectMockup } from './ProjectMockups'
import { ProjectModal } from './ProjectModal'

export const ProjectsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'Full-Stack', label: 'Full-Stack' },
    { id: 'AI & ML', label: 'AI & Machine Learning' },
    { id: 'Web', label: 'Web Applications' },
    { id: 'Backend', label: 'Backend APIs' }
  ]

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (selectedFilter === 'all') return true
    return p.category === selectedFilter
  })

  return (
    <section id="projects" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-zinc-400 bg-white/5 border border-white/10 uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Selected Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Projects I've built.
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-base leading-relaxed">
            Real projects and practical builds across AI, web development and business software.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-white/[0.08]">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                selectedFilter === tab.id
                  ? 'bg-emerald-600 text-black border-emerald-500 font-bold'
                  : 'bg-[#0d1117] text-zinc-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 6 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="rounded-xl p-5 bg-[#0d1117] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Visual Preview */}
                <div className="mb-4 relative rounded-lg overflow-hidden border border-white/[0.08]">
                  <ProjectMockup projectId={project.id} />
                </div>

                {/* Category & Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {project.category}
                  </span>
                  {project.badgeLabel && (
                    <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {project.badgeLabel}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}

                  {!project.liveDemoUrl && !project.githubUrl && project.badgeLabel && (
                    <span className="text-xs font-mono text-zinc-400">
                      {project.badgeLabel}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setActiveModalProject(project)}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                  title="Inspect architecture details"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  )
}
