import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Play, Pause, Volume2, VolumeX, MessageSquare, ShieldCheck } from 'lucide-react'
import { voiceIntroManager, INTRO_SCRIPT } from './VoiceIntroController'

interface DeveloperAvatar3DProps {
  className?: string
}

export const DeveloperAvatar3D: React.FC<DeveloperAvatar3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [transcript, setTranscript] = useState<string>('')
  const [transform3D, setTransform3D] = useState<string>('')
  const [avatarMode, setAvatarMode] = useState<'3d' | 'photo'>('3d')

  useEffect(() => {
    voiceIntroManager.setListener((state) => {
      setIsSpeaking(state.isSpeaking)
      setIsPaused(state.isPaused)
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

  // 3D Canvas Ambient Effects (Interactive Particle Lattice & Audio Rings)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 7.5

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      })
    } catch {
      return
    }

    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const ringGroup = new THREE.Group()
    scene.add(ringGroup)

    // Ring 1 (Emerald Outer Orbit)
    const ring1Geo = new THREE.TorusGeometry(2.8, 0.03, 16, 80)
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.55
    })
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1.rotation.x = Math.PI / 3.2
    ringGroup.add(ring1)

    // Ring 2 (White Thin Precision Axis)
    const ring2Geo = new THREE.TorusGeometry(3.1, 0.02, 16, 80)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25
    })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.y = Math.PI / 4
    ringGroup.add(ring2)

    // Floating Data Particle Matrix (Emerald & White)
    const particleCount = 500
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(particleCount * 3)
    const pColors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 14
      pPos[i + 1] = (Math.random() - 0.5) * 14
      pPos[i + 2] = (Math.random() - 0.5) * 8

      const isEmerald = Math.random() > 0.4
      pColors[i] = isEmerald ? 0.06 : 0.9
      pColors[i + 1] = isEmerald ? 0.72 : 0.9
      pColors[i + 2] = isEmerald ? 0.5 : 0.95
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))

    const pMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }

    window.addEventListener('mousemove', handleMouseMove)

    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      ring1.rotation.z += delta * (isSpeaking ? 1.4 : 0.35)
      ring2.rotation.z -= delta * (isSpeaking ? 1.1 : 0.25)

      const pulse = isSpeaking ? Math.sin(elapsed * 7) * 0.12 : 0
      ringGroup.scale.set(1 + pulse, 1 + pulse, 1 + pulse)

      ringGroup.position.x = targetX * 0.6
      ringGroup.position.y = targetY * 0.5

      particles.rotation.y = elapsed * 0.035
      particles.rotation.x = targetY * 0.08

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      ring1Geo.dispose()
      ring1Mat.dispose()
      ring2Geo.dispose()
      ring2Mat.dispose()
      pGeo.dispose()
      pMat.dispose()
      renderer.dispose()
    }
  }, [isSpeaking])

  // Mouse Parallax for the Avatar Face
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotX = -(y / rect.height) * 14
    const rotY = (x / rect.width) * 14
    setTransform3D(`perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`)
  }

  const handleCardMouseLeave = () => {
    setTransform3D('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
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

  return (
    <div className={`relative w-full flex flex-col items-center select-none ${className}`}>
      {/* Background Three.js Holographic Ring Canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* 3D Holographic Developer Avatar Container */}
      <div
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        style={{
          transform: transform3D,
          transition: 'transform 0.12s ease-out'
        }}
        className="relative z-10 w-full max-w-sm rounded-3xl bg-[#0d1117] border border-white/10 p-6 shadow-2xl overflow-hidden flex flex-col items-center"
      >
        {/* Top Header Label */}
        <div className="w-full flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-5">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isSpeaking
                  ? 'bg-emerald-400 animate-ping shadow-[0_0_12px_#10b981]'
                  : 'bg-emerald-500'
              }`}
            />
            <span className="font-mono text-xs font-semibold text-white tracking-wider uppercase">
              Digital Avatar // Voice Core
            </span>
          </div>

          <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            {isSpeaking ? 'Speaking (Deep Voice)' : isPaused ? 'Paused' : 'Ready'}
          </span>
        </div>

        {/* Mode Selector Toggle: 3D Avatar vs Reference Photo */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-white/5 border border-white/10 mb-4">
          <button
            onClick={() => setAvatarMode('3d')}
            className={`px-3 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
              avatarMode === '3d'
                ? 'bg-emerald-500 text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            3D Avatar
          </button>
          <button
            onClick={() => setAvatarMode('photo')}
            className={`px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all ${
              avatarMode === 'photo'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Reference Photo
          </button>
        </div>

        {/* ================= TRUE 3D STYLIZED AVATAR BUST ================= */}
        <div className="relative my-2">
          {/* Outer Pulsing Emerald Halo */}
          <div
            className={`absolute -inset-3 rounded-full transition-all duration-300 ${
              isSpeaking
                ? 'bg-emerald-500/25 blur-lg animate-pulse'
                : 'bg-emerald-500/10 blur-sm'
            }`}
          />

          {/* Precision 3D Circular Face Aperture */}
          <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-emerald-400 shadow-2xl bg-[#08090d] flex items-center justify-center group">
            <img
              src={avatarMode === '3d' ? '/talha-avatar-face.jpg' : '/talha-face.jpg'}
              alt="Muhammad Talha Anjum 3D Avatar"
              className={`w-full h-full object-cover transition-all duration-300 ${
                isSpeaking ? 'scale-105 filter brightness-110' : 'hover:scale-105'
              }`}
              onError={(e) => {
                e.currentTarget.src = '/talha-avatar.jpg'
              }}
            />

            {/* Speaking Scanline Glow & Audio Pulse */}
            {isSpeaking && (
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-transparent to-emerald-400/10 pointer-events-none" />
            )}

            {/* Subtle Stylized Badge Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/30 text-[9px] font-mono text-emerald-300 whitespace-nowrap">
              {avatarMode === '3d' ? '3D Model • Cap & Beard' : 'Reference Image'}
            </div>
          </div>

          {/* Verified Badge */}
          <div className="absolute bottom-1 right-2 w-7 h-7 rounded-full bg-[#0d1117] border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-md">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        {/* Dynamic Audio Equalizer Waveform Bars */}
        <div className="flex items-center justify-center gap-1 my-3 h-5">
          {[40, 75, 100, 60, 90, 45, 80, 95, 55, 85, 65, 40].map((height, idx) => (
            <span
              key={idx}
              className={`w-1 rounded-full bg-emerald-400 transition-all duration-150 ${
                isSpeaking ? 'animate-pulse' : 'opacity-30'
              }`}
              style={{
                height: isSpeaking ? `${Math.max(6, (height * (idx % 2 === 0 ? 1 : 0.7)))}%` : '4px',
                animationDelay: `${idx * 60}ms`
              }}
            />
          ))}
        </div>

        {/* Identity Title */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-white tracking-tight">
            Muhammad Talha Anjum
          </h3>
          <p className="text-xs font-mono text-emerald-400 mt-0.5">
            Heavy-Voice 3D Interactive Avatar
          </p>
        </div>

        {/* ================= AUDIO CONTROLS STRICTLY NEXT TO AVATAR ================= */}
        <div className="w-full pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
          {/* Main Play / Pause Button */}
          <button
            onClick={handleTogglePlay}
            className={`flex-1 py-2.5 px-4 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              isSpeaking
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/25'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
            }`}
          >
            {isSpeaking ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause Voice</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>{isPaused ? 'Resume Voice' : 'Listen to Voice'}</span>
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

        {/* Live Subtitle Transcript Bubble */}
        {(isSpeaking || isPaused) && (
          <div className="w-full mt-3 p-3 rounded-xl bg-black/60 border border-emerald-500/30 text-[11px] font-mono text-zinc-300 leading-relaxed animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1 text-[10px]">
              <MessageSquare className="w-3 h-3" />
              <span>SPOKEN TRANSCRIPT:</span>
            </div>
            <p className="line-clamp-3">
              "{transcript || INTRO_SCRIPT}"
            </p>
          </div>
        )}
      </div>

      <p className="text-[11px] font-mono text-zinc-500 mt-3 text-center">
        Press <span className="text-emerald-400 font-semibold">"Listen to Voice"</span> to hear Talha speak in a heavy, natural baritone voice
      </p>
    </div>
  )
}
