'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { MotionValue, useTransform } from 'framer-motion'
import * as THREE from 'three'

interface ScrollBackgroundProps {
  scrollProgress: MotionValue<number>
}

export const ScrollBackground = ({ scrollProgress }: ScrollBackgroundProps) => {
  const { scene } = useThree()
  const scrollTo = 2

  // Transform scroll progress to color values
  const backgroundHue = useTransform(scrollProgress, [0, scrollTo], [0.4, 0.5]) // Cyan to purple
  const backgroundSaturation = useTransform(
    scrollProgress,
    [0, scrollTo],
    [0, 0.5]
  )
  const backgroundLightness = useTransform(
    scrollProgress,
    [0, scrollTo],
    [0, 0.3]
  )

  useFrame(() => {
    // Create HSL color based on scroll progress
    const hue = backgroundHue.get()
    const sat = backgroundSaturation.get()
    const light = backgroundLightness.get()

    // Convert HSL to RGB for Three.js
    const color = new THREE.Color().setHSL(hue, sat, light)
    scene.background = color
  })

  return null // This component doesn't render anything visible
}
