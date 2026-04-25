'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SkillCard from './SkillCard'
import SkillChip from './SkillChip'

interface Skill {
  name: string
  tier: number
  since?: string
  content?: string | React.ReactNode
}

interface SkillsSectionProps {
  title: string
  subTitle: string
  skills: Skill[]
  delay?: number
  onSkillClick?: (skill: Skill) => void
  variant?: 'card' | 'chip'
}

const SkillsSection = ({
  title,
  subTitle,
  skills,
  delay = 0,
  onSkillClick,
  variant = 'card',
}: SkillsSectionProps) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const isChipVariant = variant === 'chip'

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className='mb-16'
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{
          duration: 0.6,
          delay: delay + 0.2,
        }}
        className='mb-8'
      >
        <h3 className='text-3xl font-light text-white/90 mb-2 relative inline-block'>
          {title}
          <div
            className='absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-green-500 transform scale-x-0 origin-left transition-transform duration-700 delay-300 group-hover:scale-x-100'
            style={{
              animation: isInView
                ? 'scaleX 0.7s ease-out 0.5s forwards'
                : 'none',
            }}
          />
        </h3>
        <p className='text-white/60 text-sm'>{subTitle}</p>
      </motion.div>

      {/* Skills Grid or Chip Container */}
      {isChipVariant ? (
        <div className='flex flex-wrap gap-3'>
          {skills
            .filter(skill => skill.name.trim() !== '')
            .map((skill, index) => (
              <SkillChip
                key={`${skill.name}-${index}`}
                skill={skill}
                index={index}
                onClick={onSkillClick}
              />
            ))}
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {skills
            .filter(skill => skill.name.trim() !== '')
            .map((skill, index) => (
              <SkillCard
                key={`${skill.name}-${index}`}
                skill={skill}
                index={index}
                onClick={onSkillClick}
              />
            ))}
        </div>
      )}
    </motion.div>
  )
}

export default SkillsSection
