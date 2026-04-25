'use client'

import { SectionInfo } from '@/hooks/useSectionDetection'
import { HEADER } from '@/utils/constants'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import NavBtn from './nav/NavBtn'

interface AnimatedHeaderProps {
  currentSection: SectionInfo
  screenWidth: number
  screenHeight: number
}

const AnimatedHeader = ({
  currentSection,
  screenWidth,
  screenHeight,
}: AnimatedHeaderProps) => {
  const { scrollY } = useScroll()

  // Media query
  const isMobile = useMemo(() => screenWidth < 768, [screenWidth])

  // Memoize transform ranges to prevent recalculation
  const nameTransformValues = useMemo(
    () => ({
      xRange: [
        isMobile ? HEADER.NAME.SM_START.X : HEADER.NAME.START.X,
        isMobile
          ? HEADER.NAME.SM_END(screenWidth, screenHeight).X
          : HEADER.NAME.END(screenWidth, screenHeight).X,
      ] as [number, number],
      yRange: [
        isMobile ? HEADER.NAME.SM_START.Y : HEADER.NAME.START.Y,
        isMobile
          ? HEADER.NAME.SM_END(screenWidth, screenHeight).Y
          : HEADER.NAME.END(screenWidth, screenHeight).Y,
      ] as [number, number],
      scaleRange: [
        isMobile ? HEADER.NAME.SM_SCALE.START : HEADER.NAME.SCALE.START,
        isMobile ? HEADER.NAME.SM_SCALE.END : HEADER.NAME.SCALE.END,
      ] as [number, number],
    }),
    [isMobile, screenWidth, screenHeight]
  )

  // Name animations
  const nameXRaw = useTransform(
    scrollY,
    HEADER.NAME.SCROLL_RANGE,
    nameTransformValues.xRange
  )
  const nameYRaw = useTransform(
    scrollY,
    HEADER.NAME.SCROLL_RANGE,
    nameTransformValues.yRange
  )
  const nameScaleRaw = useTransform(
    scrollY,
    HEADER.NAME.SCROLL_RANGE,
    nameTransformValues.scaleRange
  )

  // Memoize nav transform ranges
  const navTransformValues = useMemo(
    () => ({
      xRange: [
        isMobile ? HEADER.NAV.SM_START.X : HEADER.NAV.START.X,
        isMobile
          ? HEADER.NAV.SM_END(screenWidth, screenHeight).X
          : HEADER.NAV.END(screenWidth, screenHeight).X,
      ] as [number, number],
      yRange: [
        isMobile ? HEADER.NAV.SM_START.Y : HEADER.NAV.START.Y,
        isMobile
          ? HEADER.NAV.SM_END(screenWidth, screenHeight).Y
          : HEADER.NAV.END(screenWidth, screenHeight).Y,
      ] as [number, number],
      scaleRange: [
        isMobile ? HEADER.NAV.SM_SCALE.START : HEADER.NAV.SCALE.START,
        isMobile ? HEADER.NAV.SM_SCALE.END : HEADER.NAV.SCALE.END,
      ] as [number, number],
      opacityRange: isMobile ? [1, 0] : [1, 1],
    }),
    [isMobile, screenWidth, screenHeight]
  )

  // Navigation animations
  const navXRaw = useTransform(
    scrollY,
    HEADER.NAV.SCROLL_RANGE,
    navTransformValues.xRange
  )
  const navYRaw = useTransform(
    scrollY,
    HEADER.NAV.SCROLL_RANGE,
    navTransformValues.yRange
  )
  const navScaleRaw = useTransform(
    scrollY,
    HEADER.NAV.SCROLL_RANGE,
    navTransformValues.scaleRange
  )

  // Add smooth spring easing to all transforms
  const nameX = useSpring(nameXRaw, HEADER.SPRING)
  const nameY = useSpring(nameYRaw, HEADER.SPRING)
  const nameScale = useSpring(nameScaleRaw, HEADER.SPRING)
  const navX = useSpring(navXRaw, HEADER.SPRING)
  const navY = useSpring(navYRaw, HEADER.SPRING)

  const navScale = useSpring(navScaleRaw, HEADER.SPRING)
  const navOpacity = useTransform(scrollY, HEADER.NAV.OPACITY_RANGE, [0, 1])
  const navMobileBtnsOpacity = useTransform(
    scrollY,
    [0, 200],
    navTransformValues.opacityRange
  )
  const navHeight = isMobile ? HEADER.NAV.SM_HEIGHT : HEADER.NAV.HEIGHT

  // Home button opacity - smooth fade based on scroll position instead of section
  const homeButtonOpacity = currentSection.name === 'home' ? 0 : 1
  const homePointerEvents = currentSection.name === 'home' ? 'none' : 'auto'
  return (
    <>
      {/* Combined Animated Header */}
      <motion.div
        className='fixed'
        style={{
          width: screenWidth,
          height: screenHeight,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        {/* Nav background */}
        <motion.div
          className='xs:h-[60px] md:h-[80px]'
          style={{
            height: navHeight,
            opacity: navOpacity,
            inset: 0,
            position: 'absolute',
            zIndex: 10,
            backgroundColor: HEADER.NAV.BG_COLOR,
            backdropFilter: HEADER.NAV.BG_BLUR,
            pointerEvents: 'none',
            flexShrink: 0,
          }}
        ></motion.div>
        {/* Name */}
        <motion.div
          className='flex items-center justify-center'
          style={{
            x: nameX,
            y: nameY,
            scale: nameScale,
            transformOrigin: 'center',
            position: 'absolute',
            left: '50%',
            top: '50%',
            zIndex: 15,
            pointerEvents: 'auto',
          }}
        >
          <motion.div
            className='relative'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={HEADER.NAME.TRANSITION}
            style={{
              transformOrigin: 'center',
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            {/* Background with animated GIF */}
            <div
              className='absolute inset-0 w-full h-full'
              style={{
                backgroundImage: 'url(/white.gif)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            />

            {/* Text overlay for masking */}
            <div
              className='relative z-10 text-8xl font-extrabold text-center text-nowrap'
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundImage: 'url(/white.gif)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              Christoflux
            </div>
          </motion.div>
        </motion.div>

        {/* Nav Buttons */}
        <motion.div
          className='flex items-center justify-center'
          style={{
            x: navX,
            y: navY,
            scale: navScale,
            transformOrigin: 'center',
            position: 'absolute',
            right: '50%',
            top: '50%',
            pointerEvents: 'auto',
            zIndex: 15,
          }}
        >
          <motion.nav
            className='grid grid-cols-2 mt-5 gap-3 md:mt-0 md:flex md:flex-row md:items-center md:flex-nowrap md:justify-center md:gap-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={HEADER.NAV.TRANSITION}
            style={{
              pointerEvents: 'auto',
              opacity: navMobileBtnsOpacity,
              translateX: `calc(50% - ${HEADER.NAV.BTN_WIDTH / 2}px)`,
              translateY: '-50%',
            }}
          >
            {!isMobile && (
              <NavBtn
                target='home'
                width={120}
                isActive={currentSection.name === 'home'}
                style={{
                  opacity: homeButtonOpacity,
                  transition: 'opacity 0.3s ease-in-out',
                  pointerEvents: homePointerEvents,
                }}
              >
                Home
              </NavBtn>
            )}
            <NavBtn
              target='about'
              width={120}
              isActive={currentSection.name === 'about'}
            >
              Who
            </NavBtn>
            <NavBtn
              target='projects'
              width={120}
              isActive={currentSection.name === 'projects'}
            >
              Projects
            </NavBtn>
            <NavBtn
              target='skills'
              width={120}
              isActive={currentSection.name === 'skills'}
            >
              Stats
            </NavBtn>
            <NavBtn
              target='contact'
              width={120}
              isActive={currentSection.name === 'contact'}
            >
              Contact
            </NavBtn>
          </motion.nav>
        </motion.div>
      </motion.div>
    </>
  )
}

export default AnimatedHeader
