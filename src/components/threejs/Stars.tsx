'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Stars = () => {
  const pointsRef = useRef<THREE.Points>(null!)
  const velocitiesRef = useRef<Float32Array>(null!)

  const [positions, velocities] = useMemo(() => {
    const starCount = 500
    const positions = new Float32Array(starCount * 3)
    const velocities = new Float32Array(starCount)

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000 // x
      positions[i * 3 + 1] = Math.random() * 2000 // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000 // z
      velocities[i] = Math.random() * 2 + 0.5 // falling speed
    }

    return [positions, velocities]
  }, [])

  // Store velocities in ref so we can access them in useFrame
  velocitiesRef.current = velocities

  useFrame(() => {
    if (!pointsRef.current || !velocitiesRef.current) return

    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array
    const velocities = velocitiesRef.current
    const starCount = positions.length / 3

    for (let i = 0; i < starCount; i++) {
      positions[i * 3 + 1] -= velocities[i] // Move stars down

      // Reset star position when it goes off screen
      if (positions[i * 3 + 1] < -1000) {
        positions[i * 3 + 1] = 1000
        positions[i * 3] = (Math.random() - 0.5) * 2000
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0xffffff}
        size={2}
        transparent={true}
        opacity={0.8}
      />
    </points>
  )
}
