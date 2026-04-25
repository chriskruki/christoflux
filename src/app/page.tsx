'use client'

import AnimatedHeader from '@/components/AnimatedHeader'
import Background from '@/components/Background'
import ContentCard from '@/components/ContentCard'
import PageLoader from '@/components/PageLoader'
import ProjectsGrid from '@/components/ProjectsGrid'
import ScreenSection from '@/components/ScreenSection'
import SkillsGrid from '@/components/SkillsGrid'
import { useSectionDetection } from '@/hooks/useSectionDetection'
import { HEADER } from '@/utils/constants'
import { SOCIALS } from '@/utils/copy'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

export default function Home() {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [loadedAssets, setLoadedAssets] = useState({
    backgroundVideo: false,
    chrisImage: false,
  })

  const { sectionRefs, currentSection } = useSectionDetection()
  const { scrollY } = useScroll()

  // Media query
  const isMobile = useMemo(() => screenWidth < 768, [screenWidth])

  // Image animation - similar to name animation
  const imageScale = useTransform(scrollY, [0, 1000], [1, 0.6])
  const imageY = useTransform(scrollY, [0, 1000], [isMobile ? -60 : 0, -100])
  const imageOpacity = useTransform(scrollY, [0, 800], [1, 0])

  // Add spring physics
  const imageScaleSpring = useSpring(imageScale, HEADER.SPRING)
  const imageYSpring = useSpring(imageY, HEADER.SPRING)
  const imageOpacitySpring = useSpring(imageOpacity, HEADER.SPRING)

  // Update viewport dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)
    }

    updateDimensions() // Initial call
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Handle asset loading
  const handleBackgroundLoad = () => {
    setLoadedAssets(prev => ({ ...prev, backgroundVideo: true }))
  }

  const handleChrisImageLoad = () => {
    setLoadedAssets(prev => ({ ...prev, chrisImage: true }))
  }

  // Check if all critical assets are loaded
  useEffect(() => {
    const allLoaded = loadedAssets.backgroundVideo && loadedAssets.chrisImage

    if (allLoaded) {
      // Small delay for smooth transition
      setTimeout(() => {
        setIsPageLoaded(true)
      }, 300)
    }
  }, [loadedAssets])

  // Fallback timeout - show page after 5 seconds even if assets haven't loaded
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isPageLoaded) {
        setIsPageLoaded(true)
      }
    }, 5000)

    return () => clearTimeout(timeout)
  }, [isPageLoaded])

  return (
    <div className='relative'>
      {/* Page Loader */}
      <AnimatePresence>
        {!isPageLoaded && <PageLoader onLoadComplete={() => {}} />}
      </AnimatePresence>

      {/* Background - Always render so it can load */}
      <Background onLoadComplete={handleBackgroundLoad} />

      {/* Hidden Image - Preload the chris image */}
      <div className='fixed opacity-0 pointer-events-none -z-50'>
        <Image
          width={200}
          height={200}
          src='/chris.jpg'
          alt=''
          priority
          onLoad={handleChrisImageLoad}
        />
      </div>

      {/* Main Content */}
      <AnimatePresence>
        {isPageLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='relative w-full'
          >
            <AnimatedHeader
              currentSection={currentSection}
              screenWidth={screenWidth}
              screenHeight={screenHeight}
            />

            <div className='relative w-full'>
              <ScreenSection id='home' ref={sectionRefs.home}>
                <div className='flex items-center justify-center min-h-screen'>
                  <motion.div
                    id='image'
                    className='relative '
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: isMobile ? -50 : 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{
                      scale: imageScaleSpring,
                      y: imageYSpring,
                      opacity: imageOpacitySpring,
                    }}
                  >
                    <div
                      className='absolute inset-0 rounded-[50%] animate-spin'
                      style={{
                        background:
                          'conic-gradient(from 0deg, #10b981, #34d399, #6ee7b7, #10b981)',
                        padding: '4px',
                        animationDuration: '1s',
                        boxShadow:
                          '0 0 20px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.2)',
                        animation:
                          'spin 1s linear infinite, pulse-glow 2s ease-in-out infinite',
                      }}
                    >
                      <div className='w-full h-full rounded-[50%] bg-black/20' />
                    </div>
                    <Image
                      width={200}
                      height={200}
                      src='/chris.jpg'
                      alt='Chris Kruki'
                      className='rounded-[50%] sm:w-[200px] md:w-[300px] relative'
                      priority
                    />
                  </motion.div>
                </div>
              </ScreenSection>

              <ScreenSection id='about' ref={sectionRefs.about}>
                <div className='flex items-center justify-center min-h-screen'>
                  <ContentCard>
                    <div className='text-center text-white/70'>
                      <h2 className='text-4xl font-light mb-4'>Who dis</h2>
                      <p className='text-lg mb-6'>
                        Wook engineer by night, software engineer by day
                      </p>
                      <div className='max-w-2xl mx-auto text-left space-y-4'>
                        <p className='text-base leading-relaxed'>
                          {`I rave, flow, mix and make music, and hyperfixate on
                          random LED + electronics projects. This site is the playground
                          for that side.`}
                        </p>
                        <p className='text-base leading-relaxed'>
                          For the dev side, see{' '}
                          <Link
                            href='https://chris.kruki.net'
                            style={{ color: 'lightgreen' }}
                            target='_blank'
                          >
                            chris.kruki.net
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  </ContentCard>
                </div>
              </ScreenSection>

              <ScreenSection id='projects' ref={sectionRefs.projects}>
                <div className='flex items-center justify-center min-h-screen py-20'>
                  <div className='w-full'>
                    <motion.div
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className='text-center mb-16'
                    >
                      <h2 className='text-5xl font-light mb-4 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent'>
                        Projects
                      </h2>
                      <p className='text-lg text-white/70 mb-4'>
                        The few finished of the many started
                      </p>
                      <div className='w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-500 mx-auto rounded-full opacity-80' />
                    </motion.div>
                    <ProjectsGrid />
                  </div>
                </div>
              </ScreenSection>

              <ScreenSection id='skills' ref={sectionRefs.skills}>
                <div className='flex items-center justify-center min-h-screen py-20'>
                  <SkillsGrid />
                </div>
              </ScreenSection>

              <ScreenSection id='contact' ref={sectionRefs.contact}>
                <div className='flex items-center justify-center min-h-screen'>
                  <ContentCard>
                    <div className='text-center text-white/70 space-y-4'>
                      <h2 className='text-4xl font-light mb-4'>HMU</h2>
                      <div>
                        <Link href={'mailto:' + SOCIALS.EMAIL} target='_blank'>
                          {SOCIALS.EMAIL}
                        </Link>
                      </div>
                      <div>
                        <Link href={SOCIALS.INSTAGRAM} target='_blank' style={{ color: 'lightgreen' }}>
                          @christoflux
                        </Link>
                      </div>
                    </div>
                  </ContentCard>
                </div>
              </ScreenSection>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
