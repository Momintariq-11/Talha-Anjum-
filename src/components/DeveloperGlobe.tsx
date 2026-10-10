import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { RotateCw } from 'lucide-react'

interface DeveloperGlobeProps {
  className?: string
}

export const DeveloperGlobe: React.FC<DeveloperGlobeProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const activeLocation = 'Jhang / Faisalabad, Pakistan'

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 10.5

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

    const globeGroup = new THREE.Group()
    scene.add(globeGroup)

    // Initial tilt (Earth's axial tilt: ~23.5 deg)
    globeGroup.rotation.x = 0.28
    globeGroup.rotation.y = -1.2

    // 1. Subtle Inner Sphere (Dark occlusion base)
    const sphereRadius = 3.6
    const baseGeo = new THREE.SphereGeometry(sphereRadius * 0.99, 48, 48)
    const baseMat = new THREE.MeshBasicMaterial({
      color: 0x05070c,
      transparent: true,
      opacity: 0.92
    })
    const baseSphere = new THREE.Mesh(baseGeo, baseMat)
    globeGroup.add(baseSphere)

    // 2. Wireframe Latitudes & Longitudes (Clean engineering look)
    const wireGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(sphereRadius, 24, 24))
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x1d293d,
      transparent: true,
      opacity: 0.45
    })
    const wireLines = new THREE.LineSegments(wireGeo, wireMat)
    globeGroup.add(wireLines)

    // 3. Equator and Prime Meridians in Primary Blue & #87834F
    const ringGeo = new THREE.RingGeometry(sphereRadius * 1.002, sphereRadius * 1.008, 64)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    })
    const equator = new THREE.Mesh(ringGeo, ringMat)
    equator.rotation.x = Math.PI / 2
    globeGroup.add(equator)

    // 4. Dot Grid Matrix across the sphere (GitHub Globe effect)
    const dotCount = 1800
    const dotGeo = new THREE.BufferGeometry()
    const dotPositions: number[] = []
    const dotColors: number[] = []

    for (let i = 0; i < dotCount; i++) {
      // Fibonacci sphere distribution for perfectly even grid
      const phi = Math.acos(-1 + (2 * i) / dotCount)
      const theta = Math.sqrt(dotCount * Math.PI) * phi

      const x = sphereRadius * Math.cos(theta) * Math.sin(phi)
      const y = sphereRadius * Math.sin(theta) * Math.sin(phi)
      const z = sphereRadius * Math.cos(phi)

      dotPositions.push(x, y, z)

      // Color scheme: clean white / deep blue with subtle #87834F
      if (Math.random() > 0.85) {
        // Accent #87834F (0.529, 0.514, 0.310)
        dotColors.push(0.53, 0.51, 0.31)
      } else if (Math.random() > 0.6) {
        // Developer Blue (#3b82f6)
        dotColors.push(0.23, 0.51, 0.96)
      } else {
        // Subtle Slate / White
        dotColors.push(0.35, 0.42, 0.52)
      }
    }

    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3))
    dotGeo.setAttribute('color', new THREE.Float32BufferAttribute(dotColors, 3))

    const dotMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    })
    const dotField = new THREE.Points(dotGeo, dotMat)
    globeGroup.add(dotField)

    // Helper: Convert Lat/Long to 3D Sphere coordinates
    const latLongToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lon + 180) * (Math.PI / 180)
      const x = -(radius * Math.sin(phi) * Math.cos(theta))
      const z = radius * Math.sin(phi) * Math.sin(theta)
      const y = radius * Math.cos(phi)
      return new THREE.Vector3(x, y, z)
    }

    // Key Global Developer Coordinates
    const coords = {
      jhang: { lat: 31.27, lon: 72.31, label: 'Jhang / Faisalabad, Pakistan (Talha Anjum)' },
      london: { lat: 51.5074, lon: -0.1278, label: 'London, UK' },
      sanFrancisco: { lat: 37.7749, lon: -122.4194, label: 'San Francisco, USA' },
      tokyo: { lat: 35.6762, lon: 139.6503, label: 'Tokyo, Japan' },
      dubai: { lat: 25.2048, lon: 55.2708, label: 'Dubai, UAE' }
    }

    // 5. Pulsing Location Marker at Pakistan (Home location)
    const homePos = latLongToVector3(coords.jhang.lat, coords.jhang.lon, sphereRadius * 1.02)
    const markerGeo = new THREE.SphereGeometry(0.12, 16, 16)
    const markerMat = new THREE.MeshBasicMaterial({ color: 0x87834f }) // #87834F Primary Accent
    const homeMarker = new THREE.Mesh(markerGeo, markerMat)
    homeMarker.position.copy(homePos)
    globeGroup.add(homeMarker)

    // Concentric pulse wave for home
    const pulseRingGeo = new THREE.RingGeometry(0.12, 0.28, 32)
    const pulseRingMat = new THREE.MeshBasicMaterial({
      color: 0x87834f,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    })
    const pulseRing = new THREE.Mesh(pulseRingGeo, pulseRingMat)
    pulseRing.position.copy(homePos)
    pulseRing.lookAt(new THREE.Vector3(0, 0, 0))
    globeGroup.add(pulseRing)

    // Remote Hub Markers
    const hubPoints = [coords.london, coords.sanFrancisco, coords.tokyo, coords.dubai]
    const hubMarkers: THREE.Mesh[] = []

    hubPoints.forEach((hub) => {
      const pos = latLongToVector3(hub.lat, hub.lon, sphereRadius * 1.01)
      const mGeo = new THREE.SphereGeometry(0.07, 12, 12)
      const mMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 })
      const m = new THREE.Mesh(mGeo, mMat)
      m.position.copy(pos)
      globeGroup.add(m)
      hubMarkers.push(m)
    })

    // 6. Curved Great-Circle Arcs (Connecting Pakistan to Global Hubs)
    const createConnectionArc = (startVec: THREE.Vector3, endVec: THREE.Vector3) => {
      const midVec = startVec.clone().add(endVec).multiplyScalar(0.5)
      const distance = startVec.distanceTo(endVec)
      midVec.normalize().multiplyScalar(sphereRadius + distance * 0.28)

      const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec)
      const points = curve.getPoints(50)
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points)
      const arcMat = new THREE.LineBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.75
      })
      return new THREE.Line(arcGeo, arcMat)
    }

    hubPoints.forEach((hub) => {
      const hubPos = latLongToVector3(hub.lat, hub.lon, sphereRadius * 1.01)
      const arc = createConnectionArc(homePos, hubPos)
      globeGroup.add(arc)
    })

    // Mouse Interaction (Click & Drag Rotation)
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let mouseVelocityX = 0
    let mouseVelocityY = 0

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      const deltaY = e.clientY - prevMouseY

      globeGroup.rotation.y += deltaX * 0.005
      globeGroup.rotation.x += deltaY * 0.005

      mouseVelocityX = deltaX * 0.005
      mouseVelocityY = deltaY * 0.005

      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseUp = () => {
      isDragging = false
    }

    // Touch support for mobile devices
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true
        prevMouseX = e.touches[0].clientX
        prevMouseY = e.touches[0].clientY
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return
      const deltaX = e.touches[0].clientX - prevMouseX
      const deltaY = e.touches[0].clientY - prevMouseY

      globeGroup.rotation.y += deltaX * 0.006
      globeGroup.rotation.x += deltaY * 0.006

      prevMouseX = e.touches[0].clientX
      prevMouseY = e.touches[0].clientY
    }

    const onTouchEnd = () => {
      isDragging = false
    }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    // Resize Handling
    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      if (!isDragging && autoRotate) {
        globeGroup.rotation.y += 0.0035
      }

      // Smooth inertia dampening
      if (!isDragging) {
        globeGroup.rotation.y += mouseVelocityX
        globeGroup.rotation.x += mouseVelocityY
        mouseVelocityX *= 0.95
        mouseVelocityY *= 0.95
      }

      // Pulse ring animation
      const scale = 1 + (elapsed % 1.5) * 1.4
      pulseRing.scale.set(scale, scale, scale)
      const pMat = pulseRing.material as THREE.MeshBasicMaterial
      pMat.opacity = Math.max(0, 0.8 - (elapsed % 1.5) * 0.5)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }

      // Memory cleanup
      baseGeo.dispose()
      baseMat.dispose()
      wireGeo.dispose()
      wireMat.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      dotGeo.dispose()
      dotMat.dispose()
      markerGeo.dispose()
      markerMat.dispose()
      pulseRingGeo.dispose()
      pulseRingMat.dispose()
      renderer.dispose()
    }
  }, [autoRotate])

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Interactive 3D Developer Globe • Click & drag to rotate"
      />

      {/* Clean Developer Status Badge Bar */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-400 pointer-events-none">
        <div className="flex items-center gap-2 bg-[#0c1017]/90 px-3 py-1.5 rounded-lg border border-white/10 pointer-events-auto backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#87834F] shadow-[0_0_8px_#87834F]" />
          <span className="text-white font-medium">Node:</span>
          <span className="text-zinc-300">{activeLocation}</span>
        </div>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="flex items-center gap-1.5 bg-[#0c1017]/90 px-3 py-1.5 rounded-lg border border-white/10 pointer-events-auto text-zinc-300 hover:text-white hover:border-[#87834F] transition-colors"
          title="Toggle globe auto-rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin [animation-duration:8s]' : ''}`} />
          <span>{autoRotate ? 'Auto-Rotate' : 'Paused'}</span>
        </button>
      </div>
    </div>
  )
}
