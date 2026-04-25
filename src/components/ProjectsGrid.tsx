'use client'

import { motion, useInView } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

interface Project {
  name: string
  description: string
  tags?: string[]
  content?: string | React.ReactNode
  image?: string
}

const PROJECTS: Project[] = [
  {
    name: 'Totem',
    description:
      'Infinity mirror rave totem controlled by a joystick driven by custom ESP32 firmware',
    tags: ['3D Printing', 'Soldering', 'ESP32', 'C++'],
    content: 'clockTotem',
    image: '/totem.jpeg',
  },
  {
    name: 'Iris',
    description: `A DIY music reactive stage lighting rig featuring a 2' infinity mirror and light bar array`,
    tags: ['3D Printing', 'ESP32', 'WLED', 'LedFX', 'React', 'TypeScript'],
    content: 'iris',
    image: '/iris.jpeg',
  },
]

export default function ProjectsGrid() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })
  const router = useRouter()
  const searchParams = useSearchParams()

  // Modal state management
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Read URL params on mount and when they change
  useEffect(() => {
    const projectParam = searchParams.get('project')
    if (projectParam) {
      const project = PROJECTS.find(
        p => p.name.toLowerCase() === projectParam.toLowerCase()
      )
      if (project) {
        setSelectedProject(project)
        setIsModalOpen(true)
      }
    } else {
      setIsModalOpen(false)
      setTimeout(() => setSelectedProject(null), 300)
    }
  }, [searchParams])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    // Update URL without page refresh, clear skill param if present
    const params = new URLSearchParams(searchParams.toString())
    params.delete('skill')
    params.set('project', project.name.toLowerCase())
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    // Update URL to remove project param while preserving other params
    const params = new URLSearchParams(searchParams.toString())
    params.delete('project')
    const newUrl = params.toString() ? `?${params.toString()}` : '?'
    router.push(newUrl, { scroll: false })
    // Delay clearing the selected project to allow exit animation
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <div ref={containerRef} className='w-full'>
      {/* Project Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch'>
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            onClick={handleProjectClick}
          />
        ))}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
