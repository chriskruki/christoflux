'use client'

import { HEADER } from '@/utils/constants'
import {
  motion,
  MotionStyle,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import clsx from 'clsx'
import { useRef } from 'react'

const ACCENT = '16, 185, 129'

export default function NavBtn({
  children,
  target,
  width = HEADER.NAV.BTN_WIDTH,
  isActive = false,
  style = {},
}: {
  children: React.ReactNode
  target: string
  width?: number
  isActive?: boolean
  style?: MotionStyle
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotX = useMotionValue(50)
  const spotY = useMotionValue(50)

  const xSpring = useSpring(mouseX, { stiffness: 220, damping: 18, mass: 0.4 })
  const ySpring = useSpring(mouseY, { stiffness: 220, damping: 18, mass: 0.4 })

  const rotateY = useTransform(xSpring, [-1, 1], [-10, 10])
  const rotateX = useTransform(ySpring, [-1, 1], [8, -8])
  const translateX = useTransform(xSpring, [-1, 1], [-4, 4])
  const translateY = useTransform(ySpring, [-1, 1], [-3, 3])

  const spotlightBg = useTransform(
    [spotX, spotY] as never,
    ([x, y]: number[]) =>
      `radial-gradient(120px circle at ${x}% ${y}%, rgba(${ACCENT}, 0.55), transparent 65%)`
  )

  const borderGlow = useTransform(
    [spotX, spotY] as never,
    ([x, y]: number[]) =>
      `radial-gradient(100px circle at ${x}% ${y}%, rgba(${ACCENT}, 1), rgba(${ACCENT}, 0.25) 45%, transparent 75%)`
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    mouseX.set((px / rect.width) * 2 - 1)
    mouseY.set((py / rect.height) * 2 - 1)
    spotX.set((px / rect.width) * 100)
    spotY.set((py / rect.height) * 100)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    spotX.set(50)
    spotY.set(50)
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetElement = document.getElementById(target)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      })
    }
  }

  return (
    <motion.div
      style={{ width, perspective: 600, ...style }}
      className='inline-block'
    >
      <motion.a
        ref={ref}
        href={`#${target}`}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: 0.94 }}
        className='group relative block w-full cursor-pointer select-none'
      >
        {/* Animated gradient border */}
        <motion.div
          aria-hidden
          style={{ background: borderGlow }}
          className={clsx(
            'absolute -inset-px rounded-lg transition-opacity duration-300',
            isActive ? 'opacity-70' : 'opacity-0 group-hover:opacity-100'
          )}
        />

        {/* Body */}
        <div
          className={clsx(
            'relative overflow-hidden rounded-lg border text-center text-lg px-4 py-2 transition-colors duration-200',
            isActive
              ? 'border-emerald-300/60 bg-emerald-500/15 text-white shadow-lg shadow-emerald-500/20'
              : 'border-white/10 bg-white/10 text-white'
          )}
        >
          {/* Cursor-tracked spotlight */}
          <motion.div
            aria-hidden
            style={{ background: spotlightBg }}
            className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          />
          <span className='relative'>{children}</span>

          {/* Bottom accent line */}
          <div
            aria-hidden
            className={clsx(
              'absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-500',
              isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            )}
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(16,185,129,1), transparent)',
            }}
          />
        </div>
      </motion.a>
    </motion.div>
  )
}
