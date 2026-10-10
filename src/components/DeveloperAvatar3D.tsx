import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Play, Pause, Volume2, VolumeX, MessageSquare } from 'lucide-react'
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

  // Subscribe to speech state
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
    camera.position.z = 8

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

    // Central Audio Reactive Rings
    const ringGroup = new THREE.Group()
    scene.add(ringGroup)

    // Ring 1 (Emerald Outer Orbit)
    const ring1Geo = new THREE.TorusGeometry(3.2, 0.03, 16, 80)
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.5
    })
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1.rotation.x = Math.PI / 3
    ringGroup.add(ring1)

    // Ring 2 (White Thin Precision Axis)
    const ring2Geo = new THREE.TorusGeometry(3.6, 0.02, 16, 80)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25
    })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.y = Math.PI / 4
    ringGroup.add(ring2)

    // Floating Data Particle Matrix (Emerald & White)
    const particleCount = 700
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(particleCount * 3)
    const pColors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 16
      pPos[i + 1] = (Math.random() - 0.5) * 16
      pPos[i + 2] = (Math.random() - 0.5) * 10

      const isEmerald = Math.random() > 0.4
      pColors[i] = isEmerald ? 0.06 : 0.9 // R
      pColors[i + 1] = isEmerald ? 0.72 : 0.9 // G
      pColors[i + 2] = isEmerald ? 0.5 : 0.95 // B
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))

    const pMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.7
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // Mouse movement
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

    // Animation loop
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      // Orbit rotations
      ring1.rotation.z += delta * (isSpeaking ? 1.2 : 0.3)
      ring2.rotation.z -= delta * (isSpeaking ? 0.9 : 0.2)

      // Audio reactive pulse
      const pulse = isSpeaking ? Math.sin(elapsed * 6) * 0.15 : 0
      ringGroup.scale.set(1 + pulse, 1 + pulse, 1 + pulse)

      ringGroup.position.x = targetX * 0.8
      ringGroup.position.y = targetY * 0.6

      particles.rotation.y = elapsed * 0.04
      particles.rotation.x = targetY * 0.1

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

  // Mouse Parallax for the Avatar Card
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotX = -(y / rect.height) * 12
    const rotY = (x / rect.width) * 12
    setTransform3D(`perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`)
  }

  const handleCardMouseLeave = () => {
    setTransform3D('perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
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
        className="relative z-10 w-full max-w-sm rounded-2xl bg-[#0d1117] border border-white/10 p-5 shadow-2xl overflow-hidden"
      >
        {/* Subtle top indicator bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isSpeaking
                  ? 'bg-emerald-400 animate-ping shadow-[0_0_12px_#10b981]'
                  : 'bg-emerald-500'
              }`}
            />
            <span className="font-mono text-xs font-semibold text-white tracking-wider uppercase flex items-center gap-1.5">
              <span>Talha Anjum</span>
              <span className="text-zinc-500">•</span>
              <span className="text-emerald-400">Digital Avatar</span>
            </span>
          </div>

          <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
            {isSpeaking ? 'Speaking...' : isPaused ? 'Paused' : 'Ready'}
          </span>
        </div>

        {/* Real Photo Portrait Frame */}
        <div className="relative rounded-xl overflow-hidden border-2 border-emerald-500/40 bg-[#08090d] aspect-[4/5] max-h-72 w-full flex items-center justify-center shadow-lg group">
          <img
            src="/talha-portrait.jpg"
            alt="Muhammad Talha Anjum"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback to full photo if portrait not loaded
              e.currentTarget.src = '/talha.jpg'
            }}
          />

          {/* Holographic Scanline Overlay while speaking */}
          {isSpeaking && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent animate-pulse pointer-events-none" />
          )}

          {/* Bottom Audio Visualizer Bar Overlay */}
          <div className="absolute bottom-3 left-3 right-3 p-2 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-mono text-zinc-300">
                {isSpeaking ? 'AI Voice Active' : 'Voice Intro Ready'}
              </span>
            </div>

            {/* 5-Bar Equalizer Wave */}
            <div className="flex items-end gap-1 h-3.5">
              {[60, 100, 40, 85, 50].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full bg-emerald-400 ${
                    isSpeaking ? 'animate-pulse' : 'h-1'
                  }`}
                  style={{
                    height: isSpeaking ? `${h}%` : '3px',
                    animationDuration: `${0.4 + i * 0.15}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= AUDIO CONTROLS STRICTLY NEXT TO AVATAR ================= */}
        <div className="mt-4 pt-3.5 border-t border-white/[0.08] flex items-center justify-between gap-3">
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
                <span>Pause Intro</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>{isPaused ? 'Resume Intro' : 'Listen to Intro'}</span>
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
          <div className="mt-3 p-3 rounded-xl bg-black/60 border border-emerald-500/30 text-[11px] font-mono text-zinc-300 leading-relaxed animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1 text-[10px]">
              <MessageSquare className="w-3 h-3" />
              <span>TALHA SAYS:</span>
            </div>
            <p className="line-clamp-3">
              "{transcript || INTRO_SCRIPT}"
            </p>
          </div>
        )}
      </div>

      {/* Subtle Caption Note */}
      <p className="text-[11px] font-mono text-zinc-500 mt-3 text-center">
        Click <span className="text-emerald-400 font-semibold">"Listen to Intro"</span> to hear Talha speak about his AI & Full-Stack work
      </p>
    </div>
  )
}
