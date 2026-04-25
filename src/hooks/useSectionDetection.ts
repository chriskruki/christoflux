import { useEffect, useRef, useState } from 'react'

export interface SectionInfo {
  name: string
  progress: number
  bounds: { start: number; end: number }
}

export const useSectionDetection = () => {
  const [currentSection, setCurrentSection] = useState<SectionInfo>({
    name: 'home',
    progress: 0,
    bounds: { start: 0, end: 1000 },
  })

  // Initialize section refs once for optimization
  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Determine current section based on scroll position
  useEffect(() => {
    const updateSection = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2

      const sections = [
        { name: 'home', ref: homeRef },
        { name: 'about', ref: aboutRef },
        { name: 'projects', ref: projectsRef },
        { name: 'skills', ref: skillsRef },
        { name: 'contact', ref: contactRef },
      ]

      // Find which section contains the viewport center
      let activeSection = sections[0]
      let minDistance = Infinity

      for (const section of sections) {
        const element = section.ref.current

        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height
          const elementCenter = elementTop + rect.height / 2

          // Check if viewport center is within this section
          if (viewportCenter >= elementTop && viewportCenter <= elementBottom) {
            activeSection = section
            break
          }

          // Track the closest section if none are directly in view
          const distance = Math.abs(viewportCenter - elementCenter)
          if (distance < minDistance) {
            minDistance = distance
            activeSection = section
          }
        }
      }

      // Calculate progress within the section
      const activeElement = activeSection.ref.current
      let progress = 0

      if (activeElement) {
        const rect = activeElement.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementHeight = rect.height
        const relativePosition = viewportCenter - elementTop
        progress = Math.max(0, Math.min(1, relativePosition / elementHeight))
      }

      setCurrentSection({
        name: activeSection.name,
        progress,
        bounds: { start: 0, end: 1 },
      })
    }

    // Initial update with a small delay to ensure refs are set
    const timeoutId = setTimeout(updateSection, 100)

    // Listen to scroll events
    window.addEventListener('scroll', updateSection, { passive: true })
    window.addEventListener('resize', updateSection, { passive: true })

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', updateSection)
      window.removeEventListener('resize', updateSection)
    }
  }, [])

  return {
    currentSection,
    sectionRefs: {
      home: homeRef,
      about: aboutRef,
      skills: skillsRef,
      projects: projectsRef,
      contact: contactRef,
    },
    // Keep sections for backward compatibility if needed elsewhere
    sections: {
      HOME: { START: 0, END: 1000, NAME: 'home' },
      ABOUT: { START: 1000, END: 2000, NAME: 'about' },
      PROJECTS: { START: 2000, END: 3000, NAME: 'projects' },
      SKILLS: { START: 3000, END: 4000, NAME: 'skills' },
      CONTACT: { START: 4000, END: 5000, NAME: 'contact' },
    },
  }
}
