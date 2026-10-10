import React, { useEffect, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Mic } from 'lucide-react'
import { voiceIntroManager, INTRO_SCRIPT, VOICE_PROFILES } from './VoiceIntroController'
import type { VoiceState, VoiceProfileId } from './VoiceIntroController'

interface DeveloperAvatar3DProps {
  className?: string
}

export const DeveloperAvatar3D: React.FC<DeveloperAvatar3DProps> = ({ className = '' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isGreeting, setIsGreeting] = useState(false)
  const [mouthOpen, setMouthOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentProfileId, setCurrentProfileId] = useState<VoiceProfileId>('daniel')
  const [transcript, setTranscript] = useState<string>('')

  // Pre-load all avatar animation states for instantaneous zero-flicker transitions
  useEffect(() => {
    const preloadImages = ['/talha-avatar-idle.jpg', '/talha-avatar-speaking.jpg', '/talha-avatar-waving.jpg']
    preloadImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })

    voiceIntroManager.setListener((state: VoiceState) => {
      setIsSpeaking(state.isSpeaking)
      setIsPaused(state.isPaused)
      setIsGreeting(Boolean(state.isGreeting))
      setMouthOpen(Boolean(state.mouthOpen))
      setCurrentProfileId(state.currentProfileId)
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

  const handleProfileChange = (id: VoiceProfileId) => {
    voiceIntroManager.setProfile(id)
  }

  // Active posture and lip-sync state (All images share exact same white polo, maroon collar, and blue jeans):
  // 1. Initial greeting: Waving arm greeting ("Hello, I am Muhammad Talha Anjum")
  // 2. While speaking: Animates mouth between open & closed in sync with speech
  // 3. Paused / Idle: Standing hands clasped together in poised Snapchat-style posture
  const getAvatarImageSrc = () => {
    if (isGreeting) {
      return '/talha-avatar-waving.jpg'
    }
    if (isSpeaking && mouthOpen) {
      return '/talha-avatar-speaking.jpg'
    }
    return '/talha-avatar-idle.jpg'
  }

  const activeProfile = VOICE_PROFILES.find((p) => p.id === currentProfileId) || VOICE_PROFILES[0]

  return (
    <div className={`relative w-full flex flex-col items-center select-none ${className}`}>
      {/* Grounded Stage Plate (Stationary, Solid, No Cursor Tracking) */}
      <div className="relative w-full max-w-md rounded-2xl bg-[#0d1117] border border-white/10 p-6 shadow-xl flex flex-col items-center">
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

          <div className="flex items-center gap-2">
            {isSpeaking && (
              <div className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                <span className="w-0.5 h-2.5 bg-emerald-400 animate-pulse" />
                <span className="w-0.5 h-3.5 bg-emerald-400 animate-pulse delay-75" />
                <span className="w-0.5 h-2 bg-emerald-400 animate-pulse delay-150" />
                <span className="w-0.5 h-3 bg-emerald-400 animate-pulse delay-100" />
              </div>
            )}
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
              {isSpeaking ? 'Speaking' : isPaused ? 'Paused' : 'Ready'}
            </span>
          </div>
        </div>

        {/* Standing Character Display (Consistent White Polo & Blue Jeans) */}
        <div className="relative w-full flex flex-col items-center justify-center my-2 min-h-[440px]">
          <div className="relative w-full max-w-[280px] h-[440px] flex items-center justify-center">
            <img
              key={getAvatarImageSrc()}
              src={getAvatarImageSrc()}
              alt="Muhammad Talha Anjum Standing 3D Avatar"
              className="w-full h-full object-contain select-none pointer-events-none"
              onError={(e) => {
                e.currentTarget.src = '/talha-avatar-idle.jpg'
              }}
            />

            {/* Speaking Audio Indicator */}
            {isSpeaking && (
              <div className="absolute top-3 right-2 px-2.5 py-1 rounded-full bg-black/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-lg">
                <Mic className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Speaking</span>
              </div>
            )}
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
                ? '👋 Introducing himself...'
                : 'Speaking introduction...'
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

        {/* Voice Profile Selector Pills */}
        <div className="w-full mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-[10px] font-mono text-zinc-500">
            Tone: <span className="text-zinc-300 font-semibold">{activeProfile.accent}</span>
          </span>
          <div className="flex items-center gap-1">
            {VOICE_PROFILES.map((prof) => (
              <button
                key={prof.id}
                onClick={() => handleProfileChange(prof.id)}
                className={`px-2 py-1 rounded text-[10px] font-mono transition-colors border ${
                  currentProfileId === prof.id
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 font-semibold'
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                }`}
                title={`${prof.label} (${prof.accent}) - ${prof.description}`}
              >
                {prof.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Subtitle Transcript Caption — Expands ONLY when talking */}
        <div
          className={`w-full transition-all duration-300 ease-in-out ${
            isSpeaking || isPaused
              ? 'max-h-48 opacity-100 mt-3'
              : 'max-h-0 opacity-0 overflow-hidden m-0 p-0 border-0'
          }`}
        >
          {(isSpeaking || isPaused) && (
            <div className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-zinc-300 leading-relaxed">
              <p className="italic text-zinc-300">
                "{transcript || INTRO_SCRIPT}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DeveloperAvatar3D
