'use client'

import { SKILLS } from '@/utils/copy'
import { motion, useInView } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import SkillsSection from './SkillsSection'
import SkillModal from './SkillModal'

interface Skill {
  name: string
  tier: number
  since?: string
  content?: string | React.ReactNode
}

export default function SkillsGrid() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })
  const router = useRouter()
  const searchParams = useSearchParams()

  // Modal state management
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Get all skills with content
  const getAllSkillsWithContent = (): Skill[] => {
    const allSkills: Skill[] = []
    Object.values(SKILLS.REC).forEach(skills => allSkills.push(...skills))
    return allSkills.filter(skill => skill.content)
  }

  // Read URL params on mount and when they change
  useEffect(() => {
    const skillParam = searchParams.get('skill')
    if (skillParam) {
      const allSkills = getAllSkillsWithContent()
      const skill = allSkills.find(
        s =>
          typeof s.content === 'string' &&
          s.content.toLowerCase() === skillParam.toLowerCase()
      )
      if (skill) {
        setSelectedSkill(skill)
        setIsModalOpen(true)
      }
    } else {
      setIsModalOpen(false)
      setTimeout(() => setSelectedSkill(null), 300)
    }
  }, [searchParams])

  const handleSkillClick = (skill: Skill) => {
    if (!skill.content) return

    setSelectedSkill(skill)
    setIsModalOpen(true)
    // Update URL without page refresh, clear project param if present
    const params = new URLSearchParams(searchParams.toString())
    params.delete('project')
    const contentKey =
      typeof skill.content === 'string' ? skill.content : skill.name
    params.set('skill', contentKey.toLowerCase())
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    // Update URL to remove skill param while preserving other params
    const params = new URLSearchParams(searchParams.toString())
    params.delete('skill')
    const newUrl = params.toString() ? `?${params.toString()}` : '?'
    router.push(newUrl, { scroll: false })
    // Delay clearing the selected skill to allow exit animation
    setTimeout(() => setSelectedSkill(null), 300)
  }

  return (
    <div ref={containerRef} className='w-full'>
      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='text-center mb-16'
      >
        <h2 className='text-5xl font-light mb-4 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent'>
          Skills
        </h2>
        <div className='w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-500 mx-auto rounded-full opacity-80' />
      </motion.div>

      <SkillsSection
        title='Hobbies'
        subTitle='Misc Hobbies & Activities'
        skills={SKILLS.REC.PHYSICAL}
        delay={0.1}
        onSkillClick={handleSkillClick}
      />
      <SkillsSection
        title='Hobby Tech'
        subTitle='Electronics, Manufacturing & Lighting'
        skills={SKILLS.REC.HOBBY_TECH}
        delay={0.1}
        onSkillClick={handleSkillClick}
      />
      <SkillsSection
        title='Music'
        subTitle='Skills & Instruments'
        skills={SKILLS.REC.MUSIC}
        delay={0.1}
        onSkillClick={handleSkillClick}
      />
      <SkillsSection
        title='Gaming'
        subTitle='What I ocassionally waste my time on'
        skills={SKILLS.REC.GAMES}
        delay={0.1}
        onSkillClick={handleSkillClick}
      />

      {/* Skill Modal */}
      <SkillModal
        skill={selectedSkill}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
