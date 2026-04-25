'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { TIER_CONFIG } from '@/utils/copy'
import { SKILL_CONTENT } from '@/utils/skillContent'

interface Skill {
  name: string
  tier: number
  since?: string
  content?: string | React.ReactNode
}

interface SkillModalProps {
  skill: Skill | null
  isOpen: boolean
  onClose: () => void
}

const SkillModal = ({ skill, isOpen, onClose }: SkillModalProps) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!skill) return null

  // Force emerald theme for all modals
  const tierConfig = TIER_CONFIG[skill.tier as keyof typeof TIER_CONFIG]
  const config = {
    label: tierConfig.label,
    color: '#10B981', // Emerald-500
    bgGradient: 'from-emerald-500/20 via-green-500/10 to-emerald-600/20',
    borderColor: 'border-emerald-400/50',
    textColor: tierConfig.textColor,
    stars: 6 - skill.tier,
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40'
            onClick={onClose}
          />

          {/* Modal Container */}
          <div
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            onClick={onClose}
          >
            <motion.div
              layoutId={`skill-card-${skill.name}`}
              className='relative w-full max-w-2xl max-h-[90vh] overflow-hidden'
              style={{
                borderRadius: '1rem',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Glassmorphism Modal Background */}
              <div
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 ${config.borderColor}`}
              >
                {/* Animated Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-100`}
                />

                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className='absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200 cursor-pointer'
                  aria-label='Close modal'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='18' y1='6' x2='6' y2='18'></line>
                    <line x1='6' y1='6' x2='18' y2='18'></line>
                  </svg>
                </motion.button>

                {/* Modal Content */}
                <div className='relative p-8 max-h-[90vh] overflow-y-auto'>
                  {/* Header Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className='flex flex-col items-center mb-8'
                  >
                    {/* Star Rating */}
                    <div className='flex gap-1 mb-4'>
                      {[...Array(config.stars)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: i < config.stars ? 1 : 0.2,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.4,
                            delay: 0.2 + i * 0.1,
                          }}
                          className={`w-4 h-4 ${config.textColor}`}
                        >
                          <svg viewBox='0 0 24 24' fill='currentColor'>
                            <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                          </svg>
                        </motion.div>
                      ))}
                    </div>

                    {/* Skill Name */}
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className={`text-3xl font-semibold text-white/90  text-center mb-2`}
                    >
                      {skill.name}
                    </motion.h2>

                    {/* Tier Label and Since */}
                    <div className='flex items-center gap-4 text-center'>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`text-lg ${config.textColor} font-medium`}
                      >
                        {config.label}
                      </motion.p>
                      {skill.since && (
                        <>
                          <span className='text-white/40'>•</span>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            className='text-white/60'
                          >
                            Since {skill.since}
                          </motion.p>
                        </>
                      )}
                    </div>
                  </motion.div>

                  {/* Rich Content */}
                  {skill.content && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      {typeof skill.content === 'string'
                        ? SKILL_CONTENT[skill.content] || skill.content
                        : skill.content}
                    </motion.div>
                  )}
                </div>

                {/* Animated Border Glow */}
                <div className='absolute inset-0 rounded-2xl opacity-100 pointer-events-none'>
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
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SkillModal
