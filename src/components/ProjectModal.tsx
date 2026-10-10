import React from 'react'
import { X, ExternalLink, CheckCircle, Layers } from 'lucide-react'
import type { Project } from '../data/portfolioData'
import { GithubIcon } from './Icons'
import { ProjectMockup } from './ProjectMockups'
import { soundFx } from './SoundController'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  soundEnabled: boolean
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  soundEnabled
}) => {
  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-2xl bg-[#0d1117] border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={() => {
            if (soundEnabled) soundFx.click()
            onClose()
          }}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
          aria-label="Close Project Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Category & Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-400 px-2 py-0.5 rounded bg-blue-600/10 border border-blue-500/20">
            {project.category}
          </span>
          {project.badgeLabel && (
            <span className="text-[10px] font-mono text-[#87834F] px-2 py-0.5 rounded bg-white/5 border border-white/10">
              {project.badgeLabel}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-5">
          {project.description}
        </p>

        {/* UI Mockup Showcase */}
        <div className="mb-5">
          <ProjectMockup projectId={project.id} />
        </div>

        {/* Architecture Highlights */}
        <div className="mb-5 bg-black/40 rounded-xl p-4 border border-white/[0.08]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-white flex items-center gap-1.5 mb-3 font-semibold">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            Key Architecture Features
          </h4>
          <div className="space-y-1.5 text-xs text-zinc-300 font-mono">
            {project.architectureHighlights.map((feat) => (
              <div key={feat} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#87834F] mt-0.5 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs tracking-wide transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              GitHub Repository
            </a>
          )}

          {!project.liveDemoUrl && !project.githubUrl && (
            <div className="text-xs font-mono text-zinc-500 italic">
              Production build for {project.badgeLabel || 'Internal Business Workflow'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
