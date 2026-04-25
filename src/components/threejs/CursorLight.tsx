"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const CursorLight = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const targetPosition = useRef(new THREE.Vector3(0, 0, 200));
  const { viewport, camera } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse coordinates to normalized device coordinates (-1 to +1)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Convert to world coordinates using viewport dimensions
      targetPosition.current.set(
        (x * viewport.width) / 2,
        (y * viewport.height) / 2,
        200
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [viewport.width, viewport.height]);

  useFrame(() => {
    if (!meshRef.current) return;

    // Smooth light orb movement (easing)
    const lerpFactor = 0.05;
    meshRef.current.position.lerp(targetPosition.current, lerpFactor);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial color={0x00ffff} transparent={true} opacity={0.1} />

        {/* Glow effect */}
        <mesh>
          <sphereGeometry args={[25, 32, 32]} />
          <meshBasicMaterial
            color={0x00ffff}
            transparent={true}
            opacity={0.05}
          />
        </mesh>
      </mesh>
    </group>
  );
};
