import React, { useEffect, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Mic } from 'lucide-react'
import { voiceIntroManager } from './VoiceIntroController'
import type { VoiceState, AvatarGesture } from './VoiceIntroController'

interface DeveloperAvatar3DProps {
  className?: string
}

export const DeveloperAvatar3D: React.FC<DeveloperAvatar3DProps> = ({ className = '' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [gesture, setGesture] = useState<AvatarGesture>('statue')
  const [typedText, setTypedText] = useState<string>('')
  const [isMuted, setIsMuted] = useState(false)

  // Pre-load all 3 gesture states so switching is instantaneous with zero delay
  useEffect(() => {
    const preloadImages = [
      '/talha-avatar-idle.jpg',
      '/talha-avatar-waving.jpg',
      '/talha-avatar-hand-on-chest.jpg'
    ]
    preloadImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })

    voiceIntroManager.setListener((state: VoiceState) => {
      setIsSpeaking(state.isSpeaking)
      setIsPaused(state.isPaused)
      setGesture(state.gesture)
      setTypedText(state.typedText)
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

  // Active avatar gesture mapping:
  // 1. "Hello" -> Waving hand
  // 2. "I am Muhammad Talha Anjum" -> Hand on chest
  // 3. Remainder of speech & Idle -> Statue posture (hands clasped in front, stationary & dignified)
  const getAvatarImageSrc = () => {
    if (isSpeaking) {
      if (gesture === 'waving') return '/talha-avatar-waving.jpg'
      if (gesture === 'hand-on-chest') return '/talha-avatar-hand-on-chest.jpg'
      return '/talha-avatar-idle.jpg'
    }
    return '/talha-avatar-idle.jpg'
  }

  return (
    <div className={`relative w-full flex flex-col items-center select-none ${className}`}>
      {/* Grounded Stage Plate (Stationary, Solid, Completely Motionless) */}
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

        {/* Standing Avatar Display (Fixed Height, Seamless Zero-Flicker Transitions) */}
        <div className="relative w-full flex flex-col items-center justify-center my-2 min-h-[440px]">
          <div className="relative w-full max-w-[280px] h-[440px] flex items-center justify-center">
            <img
              key={getAvatarImageSrc()}
              src={getAvatarImageSrc()}
              alt="Muhammad Talha Anjum Standing 3D Avatar"
              className="w-full h-full object-contain select-none pointer-events-none transition-opacity duration-200"
              onError={(e) => {
                e.currentTarget.src = '/talha-avatar-idle.jpg'
              }}
            />

            {/* Speaking Audio Badge */}
            {isSpeaking && (
              <div className="absolute top-3 right-2 px-2.5 py-1 rounded-full bg-black/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-lg">
                <Mic className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Bold Voice</span>
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
              ? gesture === 'waving'
                ? '👋 Saying hello...'
                : gesture === 'hand-on-chest'
                ? 'Introducing himself...'
                : 'Speaking with deep baritone voice...'
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
                <span>{isPaused ? 'Resume Voice' : 'Play Introduction'}</span>
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

        {/* Progressive Real-time Word-by-Word Typing Subtitle Container */}
        {/* Opens ONCE when started, stays solidly open, and types words as spoken */}
        {typedText && (
          <div className="w-full mt-4 p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs text-zinc-200 leading-relaxed min-h-[56px] transition-all">
            <span className="font-sans text-zinc-200">
              "{typedText}
              {isSpeaking && (
                <span className="inline-block w-1.5 h-3.5 ml-1 bg-emerald-400 animate-pulse align-middle" />
              )}"
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default DeveloperAvatar3D
