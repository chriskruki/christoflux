import { useEffect, useRef, useState } from 'react'

interface MousePosition {
  x: number
  y: number
}

// Global state to track if the listener is already attached
let isListenerAttached = false
let mousePosition: MousePosition = { x: 0, y: 0 }

export const useMousePosition = () => {
  const [position, setPosition] = useState<MousePosition>(mousePosition)

  useEffect(() => {
    // Only attach the listener once globally
    if (isListenerAttached) {
      // Update position immediately for new components
      setPosition(mousePosition)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition = { x: e.clientX, y: e.clientY }

      // Update CSS custom properties
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    // Use passive listener for better performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    isListenerAttached = true

    // Cleanup function (though this will only run when the last component unmounts)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      isListenerAttached = false
    }
  }, [])

  // Update local state when global position changes
  useEffect(() => {
    const updatePosition = () => {
      setPosition(mousePosition)
    }

    // Update immediately
    updatePosition()

    // Set up interval to sync with global state
    const interval = setInterval(updatePosition, 16) // ~60fps

    return () => clearInterval(interval)
  }, [])

  // Return current position
  return position
}

// Alternative hook that returns CSS custom property values
export const useMousePositionCSS = () => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = () => {
      const x = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--mouse-x'
        ) || '0'
      )
      const y = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--mouse-y'
        ) || '0'
      )
      setPosition({ x, y })
    }

    // Update position when CSS custom properties change
    const observer = new MutationObserver(updatePosition)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })

    // Initial position
    updatePosition()

    return () => observer.disconnect()
  }, [])

  return position
}
