"use client";

/**
 * @registry-slug bmw-m4
 * @registry-name BMW M4
 * @registry-description A premium 3D BMW M4 component with interactive orbit controls and cinematic lighting.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency framer-motion three @react-three/fiber @react-three/drei
 */

import React, { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, useGLTF, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

try {
  useGLTF.preload("/models/m4.glb");
} catch (_) {}

// ─────────────────────────────────────────────────────────────────────────────
// Detect low-end device once (deviceMemory / hardwareConcurrency heuristic)
// ─────────────────────────────────────────────────────────────────────────────
function detectLowEnd(): boolean {
  if (typeof navigator === "undefined") return false;
  const mem = (navigator as any).deviceMemory;
  if (mem !== undefined && mem <= 4) return true;
  const cores = navigator.hardwareConcurrency;
  if (cores !== undefined && cores <= 4) return true;
  return false;
}

interface ModelProps {
  className?: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
  enableControls?: boolean;
  shadows?: boolean;
  interactive?: boolean;
  scale?: number;
  cameraDistance?: number;
  animation?: boolean;
}

const AutoFitModel = React.memo(function AutoFitModel({
  url,
  scaleMultiplier = 1,
  animation = true,
}: {
  url: string;
  scaleMultiplier?: number;
  animation?: boolean;
}) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  const { mesh, scaleFactor } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3();
    cloned.updateMatrixWorld(true);
    cloned.traverse((node) => {
      if (node instanceof THREE.Mesh && node.geometry) {
        node.geometry.computeBoundingBox();
        if (node.geometry.boundingBox) {
          const b = node.geometry.boundingBox.clone();
          b.applyMatrix4(node.matrixWorld);
          box.union(b);
        }
      }
    });
    if (box.isEmpty()) box.setFromObject(cloned);

    const rSize = new THREE.Vector3();
    const rCenter = new THREE.Vector3();
    box.getSize(rSize);
    box.getCenter(rCenter);

    // Center X/Z, ground the car at Y=0 (wheels on floor)
    rCenter.x = 0;
    cloned.position.sub(rCenter);
    cloned.position.y += rSize.y / 2;

    const maxDim = Math.max(rSize.x, rSize.y, rSize.z);
    const scale = (4.5 / maxDim) * scaleMultiplier;

    return { mesh: cloned, scaleFactor: scale };
  }, [scene, scaleMultiplier]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (animation) {
      groupRef.current.scale.lerp(
        new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor),
        delta * 5
      );
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    } else {
      groupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  });

  return (
    <group ref={groupRef as any} scale={animation ? 0 : scaleFactor}>
      <primitive object={mesh} />
    </group>
  );
});

function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-4 border-muted-foreground/20 border-t-primary animate-spin" />
      </div>
    </Html>
  );
}

export function BmwM4({
  className,
  autoRotate = true,
  rotationSpeed = 1,
  enableControls = true,
  shadows = true,
  interactive = true,
  scale = 1,
  cameraDistance = 5,
  animation = true,
}: ModelProps) {
  const [lowEnd] = useState(detectLowEnd);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Canvas
        dpr={lowEnd ? 1 : [1, 1.5]}
        gl={{
          alpha: true,
          antialias: !lowEnd,
          powerPreference: lowEnd ? "low-power" : "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        camera={{
          position: [cameraDistance * 0.8, cameraDistance * 0.4, cameraDistance],
          fov: 45,
        }}
        style={{ width: "100%", height: "100%", pointerEvents: interactive ? "auto" : "none" }}
      >
        <ambientLight intensity={lowEnd ? 0.9 : 0.6} />
        <directionalLight position={[15, 20, 15]} intensity={lowEnd ? 1.8 : 2.5} castShadow={shadows && !lowEnd} />
        {!lowEnd && <directionalLight position={[-15, 10, -15]} intensity={1.0} color="#aaccff" />}
        {!lowEnd && <directionalLight position={[0, 30, -10]} intensity={1.5} color="#ffffff" />}

        {/* Lightweight env on low-end */}
        <Environment preset={lowEnd ? "sunset" : undefined} files={lowEnd ? undefined : "/hdr/kloppenheim_06_1k.hdr"} background={false} />

        <Suspense fallback={<CanvasLoader />}>
          <AutoFitModel url="/models/m4.glb" scaleMultiplier={scale} animation={animation} />
        </Suspense>

        {/* Skip ContactShadows on low-end — it renders a separate FBO pass */}
        {shadows && !lowEnd && (
          <ContactShadows position={[0, -0.1, 0]} opacity={0.6} scale={15} blur={2.5} far={4} />
        )}

        {enableControls && (
          <OrbitControls
            makeDefault
            target={[0, 0.5, 0]}
            enablePan={false}
            enableZoom={interactive}
            enableDamping={!lowEnd}
            dampingFactor={0.08}
            minDistance={2}
            maxDistance={10}
            autoRotate={autoRotate}
            autoRotateSpeed={rotationSpeed}
          />
        )}
      </Canvas>
    </div>
  );
}
