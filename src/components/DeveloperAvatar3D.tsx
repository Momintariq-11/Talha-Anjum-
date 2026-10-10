import React, { useEffect, useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { voiceIntroManager, INTRO_SCRIPT } from './VoiceIntroController'
import type { VoiceState } from './VoiceIntroController'

interface DeveloperAvatar3DProps {
  className?: string
}

export const DeveloperAvatar3D: React.FC<DeveloperAvatar3DProps> = ({ className = '' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isGreeting, setIsGreeting] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [transcript, setTranscript] = useState<string>('')
  const [transform3D, setTransform3D] = useState<string>('')

  useEffect(() => {
    voiceIntroManager.setListener((state: VoiceState) => {
      setIsSpeaking(state.isSpeaking)
      setIsPaused(state.isPaused)
      setIsGreeting(Boolean(state.isGreeting))
      if (state.progressText) {
        setTranscript(state.progressText)
      } else if (!state.isSpeaking) {
        setTranscript('')
      }
    })

    return () => {
      voiceIntroManager.stop()
    }
  }, [])

  // Mouse Parallax for subtle 3D depth
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotX = -(y / rect.height) * 8
    const rotY = (x / rect.width) * 8
    setTransform3D(`perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`)
  }

  const handleMouseLeave = () => {
    setTransform3D('perspective(900px) rotateX(0deg) rotateY(0deg)')
  }

  const handleTogglePlay = () => {
    if (isSpeaking) {
      voiceIntroManager.pause()
    } else {
      voiceIntroManager.play()
    }
  }

  const handleToggleMute = () => {
    const muted = voiceIntroManager.toggleMute()
    setIsMuted(muted)
  }

  // Waving posture on greeting intro ("Hello, I am Muhammad Talha Anjum"), then settles into poised clasped-hands stance
  const avatarImageSrc = isGreeting ? '/talha-avatar-waving.jpg' : '/talha-avatar-idle.jpg'

  return (
    <div className={`relative w-full flex flex-col items-center select-none ${className}`}>
      {/* 3D Grounded Stage Card */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: transform3D,
          transition: 'transform 0.15s ease-out'
        }}
        className="relative w-full max-w-md rounded-2xl bg-[#0d1117] border border-white/10 p-6 shadow-xl flex flex-col items-center overflow-hidden"
      >
        {/* Top Header Label */}
        <div className="w-full flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isSpeaking ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500'
              }`}
            />
            <span className="font-mono text-xs font-semibold text-white tracking-wider uppercase">
              Voice Introduction
            </span>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
            {isSpeaking ? 'Playing' : isPaused ? 'Paused' : 'Interactive'}
          </span>
        </div>

        {/* Standing Character Display */}
        <div className="relative w-full flex flex-col items-center justify-center my-2 min-h-[440px]">
          <div className="relative w-full max-w-[280px] h-[440px] flex items-center justify-center">
            <img
              src={avatarImageSrc}
              alt="Muhammad Talha Anjum Standing 3D Avatar"
              className={`w-full h-full object-contain transition-all duration-300 select-none pointer-events-none ${
                isGreeting ? 'scale-[1.02]' : isSpeaking ? 'scale-[1.01]' : 'scale-100'
              }`}
              onError={(e) => {
                e.currentTarget.src = '/talha-avatar-idle.jpg'
              }}
            />
          </div>

          {/* Ground Shadow */}
          <div className="w-44 h-3 bg-black/70 rounded-full blur-sm -mt-2" />
        </div>

        {/* Identity & Status */}
        <div className="text-center mt-2 mb-3">
          <h3 className="text-lg font-bold text-white tracking-tight">
            Muhammad Talha Anjum
          </h3>
          <p className="text-xs font-mono text-emerald-400 mt-0.5">
            {isSpeaking
              ? isGreeting
                ? 'Introducing himself...'
                : 'Speaking...'
              : isPaused
              ? 'Introduction paused'
              : 'AI & Full-Stack Developer'}
          </p>
        </div>

        {/* Audio Controls Strictly Beside Avatar */}
        <div className="w-full pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
          {/* Main Play / Pause Button */}
          <button
            onClick={handleTogglePlay}
            className={`flex-1 py-2.5 px-4 rounded-xl font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 ${
              isSpeaking
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
            }`}
          >
            {isSpeaking ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>{isPaused ? 'Resume Intro' : 'Play Introduction'}</span>
              </>
            )}
          </button>

          {/* Volume / Mute Toggle Button */}
          <button
            onClick={handleToggleMute}
            className={`p-2.5 rounded-xl border font-mono text-xs transition-colors ${
              isMuted
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white'
            }`}
            title={isMuted ? 'Unmute voice' : 'Mute voice'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>

        {/* Live Subtitle Transcript Caption */}
        {(isSpeaking || isPaused) && (
          <div className="w-full mt-3 p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-zinc-300 leading-relaxed">
            <p className="italic text-zinc-300">
              "{transcript || INTRO_SCRIPT}"
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DeveloperAvatar3D
