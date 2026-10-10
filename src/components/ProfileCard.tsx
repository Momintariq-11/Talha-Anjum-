import React, { useState, useRef } from 'react'
import { GraduationCap, MapPin, Award, BookOpen, Camera, Upload, Trash2 } from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'

interface ProfileCardProps {
  className?: string
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ className = '' }) => {
  // Support custom photo or default avatar with an image upload / toggle
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [showImageMode, setShowImageMode] = useState<boolean>(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setProfileImage(uploadEvent.target.result as string)
          setShowImageMode(true)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setProfileImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={`rounded-2xl border border-white/10 bg-[#0d1117] p-6 lg:p-7 shadow-xl ${className}`}>
      {/* Top Header Controls: Toggle Image vs Monogram */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#87834F]" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
            Developer Profile
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowImageMode(!showImageMode)}
            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors border ${
              showImageMode
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/40'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            title="Toggle between Photo view and Monogram view"
          >
            {showImageMode ? 'Photo Mode' : 'Monogram'}
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1 rounded text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 transition-colors"
            title="Upload or change profile picture"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {profileImage && (
            <button
              onClick={handleRemoveImage}
              className="p-1 rounded text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500 transition-colors"
              title="Remove uploaded picture"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Identity Area (Photo or Monogram) */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
        {/* Avatar / Portrait Frame */}
        <div className="relative group shrink-0">
          {showImageMode && profileImage ? (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#87834F] shadow-lg bg-[#07090e]">
              <img
                src={profileImage}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-[#87834F]/80 bg-gradient-to-br from-[#121622] to-[#0a0d14] flex flex-col items-center justify-center text-white relative shadow-md">
              <span className="font-mono text-3xl font-extrabold tracking-tight text-white">
                {PERSONAL_INFO.initials}
              </span>
              <span className="text-[10px] font-mono text-[#87834F] font-semibold mt-1">
                DEV
              </span>
            </div>
          )}

          {/* Quick Upload Hover Cue */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-mono cursor-pointer transition-opacity"
          >
            <Upload className="w-4 h-4 mb-1" />
            <span>Upload Photo</span>
          </div>

          {/* Online Indicator */}
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-[#0d1117]" />
        </div>

        {/* Identity Details */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {PERSONAL_INFO.name}
            </h3>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono text-[#87834F] bg-[#87834F]/15 border border-[#87834F]/30 font-semibold">
              Verified
            </span>
          </div>
          <p className="text-sm text-blue-400 font-medium mb-1">
            AI & Full-Stack Developer
          </p>
          <p className="text-xs text-zinc-400 font-light">
            Social Media Marketing & Automation Specialist
          </p>
        </div>
      </div>

      {/* Verified Academic & Personal Facts */}
      <div className="space-y-3 font-mono text-xs border-t border-white/[0.08] pt-4">
        <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
          <span className="text-zinc-400 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            Degree
          </span>
          <span className="font-semibold text-white">
            {PERSONAL_INFO.education.degree}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
          <span className="text-zinc-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            University
          </span>
          <span className="font-medium text-zinc-300 text-right">
            {PERSONAL_INFO.education.university}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
          <span className="text-zinc-400 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#87834F]" />
            CGPA
          </span>
          <span className="font-bold text-white px-2 py-0.5 rounded bg-white/5 border border-white/10">
            {PERSONAL_INFO.education.cgpa}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5">
          <span className="text-zinc-400 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            Location
          </span>
          <span className="font-medium text-zinc-300">
            {PERSONAL_INFO.education.location}
          </span>
        </div>
      </div>
    </div>
  )
}
