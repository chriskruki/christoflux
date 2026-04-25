'use client'

import { TIER_CONFIG } from '@/utils/copy'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

interface Skill {
  name: string
  tier: number
  since?: string
  content?: string | React.ReactNode
}

interface SkillChipProps {
  skill: Skill
  index: number
  onClick?: (skill: Skill) => void
}

/**
 * Compact chip-style component for displaying skills
 * Used for Languages and Work Tech sections
 */
const SkillChip = ({ skill, index, onClick }: SkillChipProps) => {
  const chipRef = useRef(null)
  const isInView = useInView(chipRef, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)

  const config = TIER_CONFIG[skill.tier as keyof typeof TIER_CONFIG]
  const hasContent = skill.content && skill.content !== null

  const handleClick = () => {
    if (hasContent && onClick) {
      onClick(skill)
    }
  }

  // Get border color based on tier
  const getBorderColor = () => {
    if (isHovered) {
      if (config.borderColor.includes('yellow')) {
        return 'rgba(250, 204, 21, 0.5)'
      }
      if (config.borderColor.includes('emerald')) {
        return 'rgba(16, 185, 129, 0.5)'
      }
      return 'rgba(156, 163, 175, 0.5)'
    }
    return 'rgba(255, 255, 255, 0.2)'
  }

  // Get text color based on tier
  const getTextColor = () => {
    if (isHovered) {
      if (config.textColor.includes('yellow')) {
        return '#facc15'
      }
      if (config.textColor.includes('emerald')) {
        return '#10b981'
      }
      return '#d1d5db'
    }
    return 'rgba(255, 255, 255, 0.9)'
  }

  return (
    <motion.div
      ref={chipRef}
      layoutId={`skill-chip-${skill.name}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative inline-flex ${
        hasContent ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      {/* Chip Container */}
      <div
        className='relative overflow-hidden rounded-full px-4 py-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border transition-all duration-300'
        style={{
          borderColor: getBorderColor(),
        }}
      >
        {/* Animated Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} transition-opacity duration-300`}
          style={{
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Content */}
        <div className='relative flex items-center gap-2'>
          {/* Star Indicator (small) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 0.3,
              delay: index * 0.05 + 0.2,
            }}
            className={`w-2.5 h-2.5 ${config.textColor}`}
          >
            <svg viewBox='0 0 24 24' fill='currentColor'>
              <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
            </svg>
          </motion.div>

          {/* Skill Name */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05 + 0.15,
            }}
            className='text-sm font-medium transition-colors duration-300'
            style={{
              color: getTextColor(),
            }}
          >
            {skill.name}
          </motion.span>
        </div>

        {/* Hover Content: Stars and Skill Level */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className='absolute top-full left-1/2 transform -translate-x-1/2 mt-2 flex flex-col items-center gap-1 w-full pointer-events-none'
        >
          {/* Full Star Rating */}
          <div className='flex items-center gap-0.5'>
            {Array.from({ length: config.stars }).map((_, starIndex) => (
              <motion.div
                key={starIndex}
                initial={{ opacity: 0, scale: 0, x: -10 }}
                animate={
                  isHovered
                    ? { opacity: 1, scale: 1, x: 0 }
                    : { opacity: 0, scale: 0, x: -10 }
                }
                transition={{
                  duration: 0.2,
                  delay: starIndex * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`w-3 h-3 ${config.textColor}`}
              >
                <svg viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Skill Level Label */}
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
            transition={{
              duration: 0.3,
              delay: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className='text-xs font-medium transition-colors duration-300'
            style={{
              color: getTextColor(),
            }}
          >
            {config.label}
          </motion.span>
        </motion.div>

        {/* Hover Border Glow */}
        <div className='absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
          <div
            className='absolute inset-0 rounded-full border border-transparent'
            style={{
              background: `linear-gradient(135deg, ${config.color}40, ${config.color}20, ${config.color}40)`,
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'exclude',
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default SkillChip
