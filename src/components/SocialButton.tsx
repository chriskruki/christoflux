'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ReactNode, useRef } from 'react'

interface SocialButtonProps {
  href: string
  label: string
  sublabel?: string
  icon: ReactNode
  accent?: string
  external?: boolean
}

const SocialButton = ({
  href,
  label,
  sublabel,
  icon,
  accent = '16, 185, 129',
  external = true,
}: SocialButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null)

  // Raw mouse position relative to button center (-1 to 1)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spotlight position in pixels (for radial gradient)
  const spotX = useMotionValue(50)
  const spotY = useMotionValue(50)

  // Spring for magnetic pull
  const xSpring = useSpring(mouseX, { stiffness: 200, damping: 18, mass: 0.4 })
  const ySpring = useSpring(mouseY, { stiffness: 200, damping: 18, mass: 0.4 })

  // 3D tilt derived from mouse offset
  const rotateY = useTransform(xSpring, [-1, 1], [-12, 12])
  const rotateX = useTransform(ySpring, [-1, 1], [10, -10])

  // Magnetic translate (subtle)
  const translateX = useTransform(xSpring, [-1, 1], [-6, 6])
  const translateY = useTransform(ySpring, [-1, 1], [-4, 4])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    const nx = (px / rect.width) * 2 - 1
    const ny = (py / rect.height) * 2 - 1
    mouseX.set(nx)
    mouseY.set(ny)
    spotX.set((px / rect.width) * 100)
    spotY.set((py / rect.height) * 100)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    spotX.set(50)
    spotY.set(50)
  }

  // Build CSS custom-property style for the spotlight
  const spotlightBg = useTransform(
    [spotX, spotY] as never,
    ([x, y]: number[]) =>
      `radial-gradient(220px circle at ${x}% ${y}%, rgba(${accent}, 0.45), transparent 60%)`
  )

  const borderGlow = useTransform(
    [spotX, spotY] as never,
    ([x, y]: number[]) =>
      `radial-gradient(180px circle at ${x}% ${y}%, rgba(${accent}, 1), rgba(${accent}, 0.2) 40%, transparent 70%)`
  )

  return (
    <motion.div
      style={{ perspective: 800 }}
      className='inline-block'
    >
      <motion.a
        ref={ref}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: 0.96 }}
        className='group relative block w-72 cursor-pointer select-none'
      >
        {/* Animated gradient border */}
        <motion.div
          aria-hidden
          style={{ background: borderGlow }}
          className='absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        />

        {/* Card body */}
        <div className='relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md'>
          {/* Cursor-tracked spotlight */}
          <motion.div
            aria-hidden
            style={{ background: spotlightBg }}
            className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          />

          {/* Subtle grid texture */}
          <div
            aria-hidden
            className='pointer-events-none absolute inset-0 opacity-[0.06]'
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          {/* Content */}
          <div className='relative flex items-center gap-4 px-5 py-4'>
            <div
              className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6'
              style={{
                borderColor: `rgba(${accent}, 0.45)`,
                background: `linear-gradient(135deg, rgba(${accent}, 0.25), rgba(${accent}, 0.05))`,
                boxShadow: `inset 0 0 20px rgba(${accent}, 0.25)`,
              }}
            >
              {icon}
            </div>

            <div className='flex-1 min-w-0'>
              <div className='text-[10px] font-mono uppercase tracking-[0.2em] text-white/40'>
                {sublabel ?? '↗ link'}
              </div>
              <div className='text-lg font-medium text-white truncate'>
                {label}
              </div>
            </div>

            <svg
              className='h-5 w-5 shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M7 17L17 7M9 7h8v8' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>

          {/* Bottom accent line */}
          <div
            aria-hidden
            className='absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100'
            style={{
              background: `linear-gradient(90deg, transparent, rgba(${accent}, 1), transparent)`,
            }}
          />
        </div>
      </motion.a>
    </motion.div>
  )
}

export default SocialButton
