'use client'

import { useState, useEffect, useRef } from 'react'

interface LazyVideoProps {
  src: string
  className?: string
  width?: number
  height?: number
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
}

/**
 * Lazy-loaded video component with loading placeholder
 * Shows a loader until the video is ready to play
 * Disables autoplay on mobile devices to prevent fullscreen behavior
 */
const LazyVideo = ({
  src,
  className = '',
  width,
  height,
  autoPlay = false,
  loop = false,
  muted = false,
  playsInline = false,
}: LazyVideoProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  /**
   * Detect if device is mobile
   */
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ||
        (typeof window !== 'undefined' && window.innerWidth < 768)
      setIsMobile(isMobileDevice)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  /**
   * Handle video play state changes
   */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  /**
   * Handle click to play on mobile
   */
  const handleVideoClick = () => {
    const video = videoRef.current
    if (!video || !isMobile) return

    if (video.paused) {
      video.play().catch(() => {
        // Handle play error silently
      })
    } else {
      video.pause()
    }
  }

  return (
    <div className='relative w-full'>
      {/* Loading Placeholder */}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-emerald-600/20 rounded-lg z-10 min-h-[200px]'>
          {/* Spinner */}
          <div
            className='w-12 h-12 border-4 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin'
            style={{ animationDuration: '1s' }}
          />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-emerald-600/20 rounded-lg z-10 min-h-[200px]'>
          <div className='text-center text-white/60'>
            <svg
              className='w-12 h-12 mx-auto mb-2 text-white/40'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
              />
            </svg>
            <p className='text-sm'>Failed to load video</p>
          </div>
        </div>
      )}

      {/* Video Element */}
      {!hasError && (
        <div className='relative'>
          <video
            ref={videoRef}
            src={src}
            autoPlay={isMobile ? false : autoPlay}
            loop={loop}
            muted={muted}
            playsInline={isMobile ? true : playsInline}
            className={`w-full h-auto ${className} ${
              isLoading ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-300 ${
              isMobile ? 'cursor-pointer' : ''
            }`}
            onLoadedData={handleLoad}
            onError={handleError}
            onClick={handleVideoClick}
          />

          {/* Play Button Overlay for Mobile */}
          {isMobile && !isLoading && !isPlaying && (
            <div
              className='absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer z-10'
              onClick={handleVideoClick}
            >
              <div className='w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-200'>
                <svg
                  className='w-8 h-8 text-white ml-1'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M8 5v14l11-7z' />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LazyVideo
