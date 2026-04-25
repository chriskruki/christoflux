'use client'

import { useEffect, useRef } from 'react'

interface BackgroundProps {
  onLoadComplete?: () => void
}

/**
 * Background video component with lazy loading
 * Notifies parent when video is ready to play
 */
export default function Background({ onLoadComplete }: BackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const callbackRef = useRef(onLoadComplete)

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = onLoadComplete
  }, [onLoadComplete])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hasCalledCallback = false

    const callCallback = () => {
      if (!hasCalledCallback && callbackRef.current) {
        hasCalledCallback = true
        callbackRef.current()
      }
    }

    const handleCanPlay = () => {
      callCallback()
    }

    const handleCanPlayThrough = () => {
      callCallback()
    }

    const handleLoadedData = () => {
      // If we have enough data to start playing, consider it loaded
      if (video.readyState >= 2) {
        callCallback()
      }
    }

    const handleError = () => {
      callCallback()
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('canplaythrough', handleCanPlayThrough)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)

    // If video is already loaded (readyState >= 2 means HAVE_CURRENT_DATA)
    if (video.readyState >= 2) {
      callCallback()
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('canplaythrough', handleCanPlayThrough)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
    }
  }, [])

  return (
    <div className='absolute inset-0 w-full h-full z-0 overflow-hidden'>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className='absolute inset-0 w-full h-full object-cover object-center'
        style={{
          filter: 'blur(30px)',
        }}
      >
        <source src='/green.mp4' type='video/mp4' />
      </video>
    </div>
  )
}
