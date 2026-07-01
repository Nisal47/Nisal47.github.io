import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

const ACCENT = "#7c5cff";

function usePrefersReducedMotion() {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  return reduced;
}

function DistortedForm({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (!reduced) {
      meshRef.current.rotation.x += delta * 0.08;
      meshRef.current.rotation.y += delta * 0.12;
    }

    const targetX = pointer.current.y * 0.3;
    const targetY = pointer.current.x * 0.3;
    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.02;

    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshStandardMaterial
        color={ACCENT}
        wireframe
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  const reduced = usePrefersReducedMotion();
  const dpr = useMemo(() => [1, 2] as [number, number], []);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={reduced ? "demand" : "always"}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={40} color={ACCENT} />
      <DistortedForm reduced={reduced} />
    </Canvas>
  );
}
