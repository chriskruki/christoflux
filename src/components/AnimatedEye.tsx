'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMousePosition } from '@/contexts/MousePositionContext'

interface AnimatedEyeProps {
  size?: number
  className?: string
}

const AnimatedEye = ({ size = 200, className = '' }: AnimatedEyeProps) => {
  const eyeRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()

  // Iris rings configuration - easily modify number and properties
  const irisRings = [
    { fill: '#87CEEB', r: 20 }, // Light blue - outermost
    { fill: '#8A2BE2', r: 12 }, // Purple - middle
    { fill: '#FF6B6B', r: 8 }, // Red - inner (optional)
    { fill: '#4ECDC4', r: 5 }, // Teal - innermost (optional)
  ]

  // Spring values for smooth pupil movement
  const pupilX = useMotionValue(0)
  const pupilY = useMotionValue(0)

  // Spring configuration for smooth animation
  const springConfig = {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  }

  // Apply spring physics to pupil movement
  const springX = useSpring(pupilX, springConfig)
  const springY = useSpring(pupilY, springConfig)

  useEffect(() => {
    const updatePupilPosition = () => {
      if (eyeRef.current) {
        const rect = eyeRef.current.getBoundingClientRect()
        const eyeCenterX = rect.left + rect.width / 2
        const eyeCenterY = rect.top + rect.height / 2

        // Calculate distance from eye center to mouse
        const deltaX = mousePosition.x - eyeCenterX
        const deltaY = mousePosition.y - eyeCenterY

        // Limit pupil movement to prevent it from going outside the iris
        const maxMovement = 3 // Maximum pixels the pupil can move
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        if (distance > maxMovement) {
          const angle = Math.atan2(deltaY, deltaX)
          const limitedDeltaX = Math.cos(angle) * maxMovement
          const limitedDeltaY = Math.sin(angle) * maxMovement
          pupilX.set(limitedDeltaX)
          pupilY.set(limitedDeltaY)
        } else {
          pupilX.set(deltaX)
          pupilY.set(deltaY)
        }
      }
    }

    // Update pupil position when mouse position changes
    updatePupilPosition()
  }, [mousePosition.x, mousePosition.y, pupilX, pupilY])

  return (
    <div
      ref={eyeRef}
      className={`relative inline-block ${className}`}
      style={{
        width: size,
        height: size * 0.75,
      }}
    >
      <svg
        width='200'
        height='150'
        viewBox='0 0 200 150'
        xmlns='http://www.w3.org/2000/svg'
        className='w-full h-full'
      >
        {/* White Sclera (outermost circle) */}
        <circle cx='100' cy='75' r='40' fill='white' />

        {/* Dark Green Outline */}
        <circle
          cx='100'
          cy='75'
          r='40'
          fill='none'
          stroke='#1a4d1a'
          strokeWidth='2'
        />

        {/* Iris and Pupil Group */}
        <g transform='translate(100, 75)'>
          {/* Iris Rings - dynamically generated from array */}
          {irisRings.map((ring, index) => (
            <circle key={index} cx='0' cy='0' r={ring.r} fill={ring.fill} />
          ))}

          {/* Animated Pupil (Black) */}
          <motion.circle
            cx='0'
            cy='0'
            r='5'
            fill='black'
            style={{
              x: springX,
              y: springY,
            }}
          />
        </g>
      </svg>
    </div>
  )
}

export default AnimatedEye
