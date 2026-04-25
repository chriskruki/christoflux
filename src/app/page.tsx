'use client'

import AnimatedHeader from '@/components/AnimatedHeader'
import Background from '@/components/Background'
import ContentCard from '@/components/ContentCard'
import PageLoader from '@/components/PageLoader'
import ProjectsGrid from '@/components/ProjectsGrid'
import ScreenSection from '@/components/ScreenSection'
import SkillsGrid from '@/components/SkillsGrid'
import SocialButton from '@/components/SocialButton'
import { useSectionDetection } from '@/hooks/useSectionDetection'
import { HEADER } from '@/utils/constants'
import { SOCIALS, THINGS_I_LIKE } from '@/utils/copy'
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

export default function Home() {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [loadedAssets, setLoadedAssets] = useState({
    backgroundVideo: false,
    chrisImage: false,
  })
  const [marqueeDuration, setMarqueeDuration] = useState(1)
  const [marqueeSlowed, setMarqueeSlowed] = useState(false)

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
          src='/chris.png'
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
                      src='/chris.png'
                      alt='Christoflux'
                      className='rounded-[50%] sm:w-[200px] md:w-[300px] relative'
                      priority
                    />
                  </motion.div>
                </div>
              </ScreenSection>

              <ScreenSection id='about' ref={sectionRefs.about}>
                {(() => {
                  const aboutCard = (
                    <ContentCard variant='green'>
                      <div className='text-white/70'>
                        <h2 className='text-4xl font-light mb-4 text-center'>
                          Low latency, high BPM
                        </h2>
                        <p className='text-lg mb-4 text-center'>
                          Hey, I&apos;m Chris Kruki. I am a full stack engineer
                          professionally and make 3D printed LED stuffs I like
                          way too many things so I&apos;ll quickly list a few:
                        </p>
                        <div
                          className='-mx-8 overflow-hidden border-y border-white/15 bg-black/15 py-2'
                          aria-hidden
                        >
                          <div
                            className='marquee-track flex gap-8 whitespace-nowrap text-white/85 text-base font-medium'
                            style={{
                              animationDuration: `${marqueeDuration}s`,
                            }}
                          >
                            {[...THINGS_I_LIKE, ...THINGS_I_LIKE].map(
                              (item, i) => (
                                <span
                                  key={i}
                                  className='flex items-center gap-8'
                                >
                                  <span>{item}</span>
                                  <span className='text-white/40'>✦</span>
                                </span>
                              )
                            )}
                          </div>
                        </div>
                        <div className='mt-4 flex justify-center'>
                          <button
                            type='button'
                            onClick={() => {
                              if (marqueeSlowed) {
                                setMarqueeDuration(1)
                                setMarqueeSlowed(false)
                              } else {
                                setMarqueeDuration(30)
                                setMarqueeSlowed(true)
                              }
                            }}
                            className='rounded-md border border-white/30 bg-black/20 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-black/40 hover:border-white/50 active:scale-95 cursor-pointer'
                          >
                            {marqueeSlowed ? 'gas pedal' : 'slow down'}
                          </button>
                        </div>
                      </div>
                    </ContentCard>
                  )
                  return (
                    <div className='relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen'>
                      {/* Desktop: full-width widescreen with overlay card */}
                      <div className='hidden md:block relative w-full'>
                        <Image
                          src='/chris_ssbd.jpg'
                          alt='Chris'
                          width={3106}
                          height={1670}
                          className='w-full h-auto block'
                          style={{
                            maskImage:
                              'linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%)',
                            WebkitMaskImage:
                              'linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%)',
                          }}
                        />
                        <div className='absolute top-0 right-0 w-1/2 h-full flex items-center justify-start px-8 lg:px-16'>
                          {aboutCard}
                        </div>
                      </div>

                      {/* Mobile: sticky photo backdrop, card scrolls up over it */}
                      <div className='md:hidden relative'>
                        <div className='sticky top-0 h-[65vh] w-full overflow-hidden'>
                          <Image
                            src='/chris_ssbd.jpg'
                            alt='Chris'
                            width={3106}
                            height={1670}
                            className='w-full h-full object-cover object-left'
                            style={{
                              maskImage:
                                'linear-gradient(to bottom, transparent 0%, black 18%, black 75%, transparent 100%)',
                              WebkitMaskImage:
                                'linear-gradient(to bottom, transparent 0%, black 18%, black 75%, transparent 100%)',
                            }}
                          />
                        </div>
                        <div className='relative z-10 px-4 pt-8 pb-16 flex justify-center'>
                          {aboutCard}
                        </div>
                      </div>
                    </div>
                  )
                })()}
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
                <div className='flex items-center justify-center min-h-screen px-4'>
                  <div className='w-full max-w-3xl text-center'>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      className='text-6xl md:text-7xl font-light mb-3 bg-gradient-to-r from-emerald-300 via-green-400 to-teal-300 bg-clip-text text-transparent'
                    >
                      HMU
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.15 }}
                      className='text-sm font-mono uppercase tracking-[0.3em] text-white/40 mb-12'
                    >
                      let&apos;s connect
                    </motion.p>

                    <motion.div
                      initial='hidden'
                      whileInView='show'
                      viewport={{ once: true, amount: 0.3 }}
                      variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.12 } },
                      }}
                      className='flex flex-wrap justify-center gap-6'
                    >
                      {[
                        {
                          href: 'https://chris.kruki.net',
                          label: 'Dev Portfolio',
                          sublabel: 'chris.kruki.net',
                          accent: '16, 185, 129',
                          icon: (
                            <svg
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='1.8'
                              className='h-6 w-6'
                            >
                              <path
                                d='M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          ),
                        },
                        {
                          href: SOCIALS.INSTAGRAM,
                          label: 'Instagram',
                          sublabel: '@christoflux',
                          accent: '232, 121, 249',
                          icon: (
                            <svg
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='1.8'
                              className='h-6 w-6'
                            >
                              <rect x='3' y='3' width='18' height='18' rx='5' />
                              <circle cx='12' cy='12' r='4' />
                              <circle
                                cx='17.5'
                                cy='6.5'
                                r='1'
                                fill='currentColor'
                              />
                            </svg>
                          ),
                        },
                        {
                          href: `mailto:${SOCIALS.EMAIL}`,
                          label: 'Email',
                          sublabel: SOCIALS.EMAIL,
                          accent: '250, 204, 21',
                          external: false,
                          icon: (
                            <svg
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='1.8'
                              className='h-6 w-6'
                            >
                              <rect x='3' y='5' width='18' height='14' rx='2' />
                              <path
                                d='M3 7l9 6 9-6'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          ),
                        },
                      ].map(item => (
                        <motion.div
                          key={item.label}
                          variants={{
                            hidden: { opacity: 0, y: 30 },
                            show: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.5 },
                            },
                          }}
                        >
                          <SocialButton {...item} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </ScreenSection>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
