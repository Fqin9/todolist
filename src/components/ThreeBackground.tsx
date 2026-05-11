import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface FloatingShape {
  mesh: THREE.Mesh
  rotationSpeed: THREE.Vector3
  floatSpeed: number
  floatAmplitude: number
  initialY: number
  phase: number
}

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 18

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0x8888ff, 0.8)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0xff6b9d, 1.5, 30)
    pointLight1.position.set(5, 3, 8)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x4ecdc4, 1.5, 30)
    pointLight2.position.set(-5, -2, 6)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(0xffe66d, 1.2, 25)
    pointLight3.position.set(0, 4, -3)
    scene.add(pointLight3)

    const shapes: FloatingShape[] = []
    const geometries = [
      new THREE.TorusGeometry(0.8, 0.2, 16, 32),
      new THREE.IcosahedronGeometry(0.6, 0),
      new THREE.OctahedronGeometry(0.6, 0),
      new THREE.TorusKnotGeometry(0.5, 0.15, 64, 8),
      new THREE.DodecahedronGeometry(0.5, 0),
      new THREE.TetrahedronGeometry(0.6, 0),
      new THREE.ConeGeometry(0.5, 1, 4),
      new THREE.RingGeometry(0.4, 0.7, 32),
      new THREE.TorusGeometry(0.5, 0.15, 8, 16),
      new THREE.IcosahedronGeometry(0.4, 0),
    ]

    const materialConfigs = [
      { color: 0xff6b9d, opacity: 0.15, emissive: 0xff6b9d, emissiveIntensity: 0.3 },
      { color: 0x4ecdc4, opacity: 0.15, emissive: 0x4ecdc4, emissiveIntensity: 0.3 },
      { color: 0xffe66d, opacity: 0.12, emissive: 0xffe66d, emissiveIntensity: 0.25 },
      { color: 0xa78bfa, opacity: 0.15, emissive: 0xa78bfa, emissiveIntensity: 0.3 },
      { color: 0xf97316, opacity: 0.12, emissive: 0xf97316, emissiveIntensity: 0.25 },
      { color: 0x06b6d4, opacity: 0.15, emissive: 0x06b6d4, emissiveIntensity: 0.3 },
    ]

    for (let i = 0; i < 15; i++) {
      const geom = geometries[i % geometries.length]
      const matConfig = materialConfigs[i % materialConfigs.length]
      const material = new THREE.MeshStandardMaterial({
        color: matConfig.color,
        metalness: 0.1,
        roughness: 0.5,
        transparent: true,
        opacity: matConfig.opacity,
        emissive: matConfig.emissive,
        emissiveIntensity: matConfig.emissiveIntensity,
        wireframe: i % 3 === 0,
      })

      const mesh = new THREE.Mesh(geom, material)
      mesh.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      )
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      )
      scene.add(mesh)

      shapes.push({
        mesh,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005
        ),
        floatSpeed: 0.3 + Math.random() * 0.7,
        floatAmplitude: 0.5 + Math.random() * 1.5,
        initialY: mesh.position.y,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const particlesGeom = new THREE.BufferGeometry()
    const particlesCount = 200
    const particlesPositions = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlesPositions[i] = (Math.random() - 0.5) * 20
      particlesPositions[i + 1] = (Math.random() - 0.5) * 15
      particlesPositions[i + 2] = (Math.random() - 0.5) * 10
    }
    particlesGeom.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3))
    const particlesMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particlesGeom, particlesMat)
    scene.add(particles)

    let animationId: number
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    const clock = new THREE.Clock()

    function animate() {
      animationId = requestAnimationFrame(animate)

      const delta = clock.getDelta()
      const elapsed = clock.elapsedTime

      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.02
      camera.position.y += (mouseY * 1.0 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      shapes.forEach(shape => {
        shape.mesh.rotation.x += shape.rotationSpeed.x
        shape.mesh.rotation.y += shape.rotationSpeed.y
        shape.mesh.rotation.z += shape.rotationSpeed.z

        shape.mesh.position.y = shape.initialY + Math.sin(elapsed * shape.floatSpeed + shape.phase) * shape.floatAmplitude
      })

      particles.rotation.y += 0.0002
      particles.rotation.x += 0.0001

      pointLight1.intensity = 1.5 + Math.sin(elapsed * 0.7) * 0.3
      pointLight2.intensity = 1.5 + Math.cos(elapsed * 0.6) * 0.3

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
