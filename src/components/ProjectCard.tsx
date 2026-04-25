'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

interface Project {
  name: string
  description: string
  tags?: string[]
  content?: string | React.ReactNode
  image?: string
}

interface ProjectCardProps {
  project: Project
  index: number
  onClick?: (project: Project) => void
}

const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  const hasContent = project.content && project.content !== null

  const handleClick = () => {
    if (hasContent && onClick) {
      onClick(project)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      layoutId={`project-card-${project.name}`}
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
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-emerald-400/50 transition-all duration-300`}
      >
        {/* Animated Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className='relative flex flex-col'>
          {/* Clickable Indicator */}
          {hasContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
              }
              transition={{ delay: index * 0.04 + 0.3 }}
              className='absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/60 group-hover:text-white/80 group-hover:bg-white/20 transition-all duration-200'
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

          {/* Project Image - Horizontal Aspect Ratio */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.04 + 0.08,
            }}
            className='relative w-full aspect-video overflow-hidden bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-emerald-600/20'
          >
            {project.image ? (
              <>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
              </>
            ) : (
              <>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <svg
                    className='w-16 h-16 text-white/20'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
              </>
            )}
          </motion.div>

          {/* Project Name */}
          <div className='p-6 flex flex-col'>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.04 + 0.12,
              }}
              className='text-xl font-semibold text-white/90 text-left group-hover:text-emerald-400 transition-colors duration-300 mb-2'
            >
              {project.name}
            </motion.h3>

            {/* Project Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.04 + 0.16,
              }}
              className='text-sm text-white/70 mb-4 line-clamp-2'
            >
              {project.description}
            </motion.p>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04 + 0.2,
                }}
                className='flex flex-wrap gap-2'
              >
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className='px-2 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Animated Border Glow */}
        <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
          <div
            className='absolute inset-0 rounded-2xl border-2 border-transparent animate-pulse'
            style={{
              background: `linear-gradient(135deg, #10B98130, #10B98120, #10B98130)`,
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

export default ProjectCard
