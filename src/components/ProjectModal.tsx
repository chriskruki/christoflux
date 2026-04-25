'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { PROJECT_CONTENT } from '@/utils/projectContent'

interface Project {
  name: string
  description: string
  tags?: string[]
  content?: string | React.ReactNode
  image?: string
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
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

  if (!project) return null

  const config = {
    color: '#10B981', // Emerald-500
    bgGradient: 'from-emerald-500/20 via-green-500/10 to-emerald-600/20',
    borderColor: 'border-emerald-400/50',
    textColor: 'text-emerald-400',
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
              layoutId={`project-card-${project.name}`}
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
                    className='mb-8'
                  >
                    {/* Project Name */}
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className={`text-3xl font-semibold text-white/90 ${config.textColor} mb-2`}
                    >
                      {project.name}
                    </motion.h2>

                    {/* Project Description */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className='text-lg text-white/70 mb-4'
                    >
                      {project.description}
                    </motion.p>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className='flex flex-wrap gap-2'
                      >
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className='px-3 py-1 text-sm rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Rich Content */}
                  {project.content && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      {typeof project.content === 'string'
                        ? PROJECT_CONTENT[project.content] || project.content
                        : project.content}
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

export default ProjectModal
