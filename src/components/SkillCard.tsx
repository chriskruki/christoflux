'use client'

import { TIER_CONFIG } from '@/utils/copy'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Skill {
  name: string
  tier: number
  since?: string
  content?: string | React.ReactNode
}

interface SkillCardProps {
  skill: Skill
  index: number
  onClick?: (skill: Skill) => void
}

const SkillCard = ({ skill, index, onClick }: SkillCardProps) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  const config = TIER_CONFIG[skill.tier as keyof typeof TIER_CONFIG]
  const hasContent = skill.content && skill.content !== null

  const handleClick = () => {
    if (hasContent && onClick) {
      onClick(skill)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      layoutId={`skill-card-${skill.name}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 },
      }}
      onClick={handleClick}
      className={`group relative ${
        hasContent ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      {/* Glassmorphism Card */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:${config.borderColor} transition-all duration-300`}
      >
        {/* Animated Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className='relative p-6 flex flex-col items-center'>
          {/* Clickable Indicator */}
          {hasContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
              }
              transition={{ delay: index * 0.04 + 0.3 }}
              className='absolute top-2 right-2 w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/60 group-hover:text-white/80 group-hover:bg-white/20 transition-all duration-200'
            >
              <svg
                width='12'
                height='12'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M9 18l6-6-6-6' />
              </svg>
            </motion.div>
          )}
          {/* Star Rating */}
          <div className='relative w-20 h-16 mb-4 flex items-center justify-center'>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
              }
              transition={{
                duration: 0.4,
                delay: index * 0.04 + 0.2,
              }}
              className='flex gap-1'
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: i < config.stars ? 1 : 0.2,
                          scale: 1,
                        }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{
                    duration: 0.3,
                    delay: index * 0.04 + 0.3 + i * 0.04,
                  }}
                  className={`w-3 h-3 ${config.textColor}`}
                >
                  <svg viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                  </svg>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Skill Name */}
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.04 + 0.1,
            }}
            className={`text-lg font-semibold text-white/90 text-center group-hover:${config.textColor} transition-colors duration-300`}
          >
            {skill.name}
          </motion.h3>

          {/* Tier Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.04 + 0.15,
            }}
            className={`text-sm ${config.textColor} mt-2 opacity-80 font-medium`}
          >
            {config.label}
          </motion.p>
        </div>

        {/* Animated Border Glow */}
        <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
          <div
            className='absolute inset-0 rounded-2xl border-2 border-transparent animate-pulse'
            style={{
              background: `linear-gradient(135deg, ${config.color}30, ${config.color}20, ${config.color}30)`,
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

export default SkillCard
