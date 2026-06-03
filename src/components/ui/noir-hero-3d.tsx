/**
 * @registry-slug noir-hero-3d
 * @registry-name Noir Hero 3D
 * @registry-description A Future UI Noir Hero 3D component.
 * @registry-category ui
 * @registry-dependency @react-three/fiber @react-three/drei three
 */
"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, MeshTransmissionMaterial, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// ─────────────────────────────────────────────────────────────────────────────
// Detect low-end device once at module level (never re-evaluates)
// ─────────────────────────────────────────────────────────────────────────────
function detectLowEnd(): boolean {
  if (typeof navigator === "undefined") return false;
  const mem = (navigator as any).deviceMemory;
  if (mem !== undefined && mem <= 4) return true;
  const cores = navigator.hardwareConcurrency;
  if (cores !== undefined && cores <= 4) return true;
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// GeometricCore
// Low-end:  IcosahedronGeometry (20 faces, 0 subdivision) — trivial cost
// High-end: TorusKnotGeometry with moderate tessellation
// ─────────────────────────────────────────────────────────────────────────────
function GeometricCore({ lowEnd }: { lowEnd: boolean }) {
  const meshRef = React.useRef<THREE.Mesh>(null!)
  const speed = lowEnd ? 0.12 : 0.18

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * speed
    meshRef.current.rotation.y += delta * (speed * 1.3)
    meshRef.current.rotation.z += delta * (speed * 0.65)
  })

  return (
    <mesh ref={meshRef}>
      {lowEnd ? (
        // Extremely cheap fallback — icosahedron with 1 subdivision = 80 faces
        <icosahedronGeometry args={[1.8, 1]} />
      ) : (
        // Moderate tessellation — 64×16 = 1,024 segments (was 256×64 = 16,384)
        <torusKnotGeometry args={[1.6, 0.6, 64, 16]} />
      )}

      {lowEnd ? (
        // Cheap physically-based material — zero FBO cost
        <meshStandardMaterial
          color="#c0a8ff"
          metalness={0.6}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      ) : (
        // Transmission glass — FBO resolution reduced to 256 (was 1024)
        <MeshTransmissionMaterial
          backside={false}
          thickness={1.2}
          chromaticAberration={0.04}
          anisotropicBlur={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
          envMapIntensity={2}
          resolution={256}
          distortion={0.15}
          distortionScale={0.2}
          temporalDistortion={0.05}
          color="#e0d4ff"
        />
      )}
    </mesh>
  )
}

export function NoirHero3D({ className }: { className?: string }) {
  const [lowEnd] = React.useState(detectLowEnd)

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{
          alpha: true,
          // Disable antialias on low-end — huge GPU cost savings
          antialias: !lowEnd,
          powerPreference: lowEnd ? "low-power" : "high-performance",
          // Limit pixel ratio hard — prevents GPU thrash on retina + low-end
        }}
        // dpr: low-end locked to 1, high-end capped at 1.5
        dpr={lowEnd ? 1 : [1, 1.5]}
        // Only re-render when something changes — saves battery/CPU when idle
        frameloop="always"
        style={{ overflow: "visible" }}
      >
        <React.Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            // Disable damping on low-end to avoid extra per-frame work
            enableDamping={!lowEnd}
            dampingFactor={0.08}
            autoRotate={lowEnd}
            autoRotateSpeed={0.5}
          />

          <ambientLight intensity={lowEnd ? 0.5 : 0.2} />
          <directionalLight position={[10, 10, 10]} intensity={lowEnd ? 1.2 : 2} color="#8b5cf6" />
          {!lowEnd && <pointLight position={[-10, -10, -10]} intensity={1} color="#c6c6c6" />}

          <GeometricCore lowEnd={lowEnd} />

          {/* preset="dawn" is lighter than "city" — smaller env map */}
          <Environment preset="dawn" />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
