import React from 'react'
import { GraduationCap, MapPin, Award, BookOpen, MessageCircle, Mail } from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'

interface ProfileCardProps {
  className?: string
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ className = '' }) => {
  return (
    <div className={`rounded-2xl border border-white/10 bg-[#0d1117] p-6 lg:p-7 shadow-xl ${className}`}>
      {/* Top Header Label */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
            Developer Profile
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-400">
          Pakistan
        </span>
      </div>

      {/* Main Identity Area */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
        {/* Photo Frame */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-lg bg-[#07090e]">
            <img
              src="/talha-portrait.jpg"
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.currentTarget.src = '/talha.jpg'
              }}
            />
          </div>
          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0d1117]" />
        </div>

        {/* Identity Details */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white tracking-tight mb-1">
            {PERSONAL_INFO.name}
          </h3>
          <p className="text-sm text-emerald-400 font-medium mb-1">
            AI & Full-Stack Developer
          </p>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            Social Media Marketing & Intelligent Automation
          </p>
        </div>
      </div>

      {/* Academic & Location Credentials */}
      <div className="space-y-3 font-mono text-xs border-t border-white/[0.08] pt-4">
        <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
          <span className="text-zinc-400 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            Degree
          </span>
          <span className="font-semibold text-white">
            {PERSONAL_INFO.education.degree}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
          <span className="text-zinc-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            University
          </span>
          <span className="font-medium text-zinc-300 text-right">
            {PERSONAL_INFO.education.university}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
          <span className="text-zinc-400 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            CGPA
          </span>
          <span className="font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            {PERSONAL_INFO.education.cgpa}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5">
          <span className="text-zinc-400 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            Location
          </span>
          <span className="font-medium text-zinc-300">
            {PERSONAL_INFO.education.location}
          </span>
        </div>

        {/* Direct WhatsApp & Email Actions */}
        <div className="pt-3 border-t border-white/[0.08] grid grid-cols-2 gap-2.5">
          <a
            href={PERSONAL_INFO.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-2 transition-all outline-none focus:outline-none focus:ring-0"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.contact.email}`}
            className="py-2.5 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-2 transition-all outline-none focus:outline-none focus:ring-0"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
