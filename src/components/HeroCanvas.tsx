import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Group, Mesh } from "three";

const ACCENT_LIGHT = "#5b3fe0";
const ACCENT_DARK = "#9c89f0";

function usePrefersReducedMotion() {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  return reduced;
}

function useAccentColor() {
  const [color, setColor] = useState(ACCENT_LIGHT);

  useEffect(() => {
    const update = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setColor(isDark ? ACCENT_DARK : ACCENT_LIGHT);
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return color;
}

function DistortedForm({ reduced, color }: { reduced: boolean; color: string }) {
  // Mouse tilt and auto-spin are applied to separate nodes so the
  // unbounded auto-spin doesn't fight the bounded mouse-tracking lerp
  // (both were previously accumulating on the same rotation, which made
  // the tilt drift out of sync with the actual pointer position).
  const tiltRef = useRef<Group>(null);
  const spinRef = useRef<Mesh>(null);
  const hovered = useRef(false);
  const { gl } = useThree();

  useEffect(() => {
    const el = gl.domElement;
    const onEnter = () => {
      hovered.current = true;
    };
    const onLeave = () => {
      hovered.current = false;
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [gl]);

  useFrame((state, delta) => {
    if (!reduced && spinRef.current) {
      spinRef.current.rotation.x += delta * 0.08;
      spinRef.current.rotation.y += delta * 0.12;
    }

    // Respect reduced-motion for the mouse-tilt too, and ease back to a
    // neutral pose once the pointer leaves the canvas rather than staying
    // locked at wherever the cursor last was.
    if (tiltRef.current && !reduced) {
      const targetX = hovered.current ? -state.pointer.y * 0.3 : 0;
      const targetY = hovered.current ? state.pointer.x * 0.3 : 0;
      tiltRef.current.rotation.x += (targetX - tiltRef.current.rotation.x) * 0.05;
      tiltRef.current.rotation.y += (targetY - tiltRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={tiltRef}>
      <mesh ref={spinRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

export default function HeroCanvas() {
  const reduced = usePrefersReducedMotion();
  const color = useAccentColor();
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
      <pointLight position={[5, 5, 5]} intensity={40} color={color} />
      <DistortedForm reduced={reduced} color={color} />
    </Canvas>
  );
}
