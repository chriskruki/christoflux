'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

interface MousePosition {
  x: number
  y: number
}

interface MousePositionContextType {
  mousePosition: MousePosition
}

const MousePositionContext = createContext<
  MousePositionContextType | undefined
>(undefined)

interface MousePositionProviderProps {
  children: ReactNode
}

export const MousePositionProvider = ({
  children,
}: MousePositionProviderProps) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)

      // Update CSS custom properties for CSS-based usage
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    // Use passive listener for better performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <MousePositionContext.Provider value={{ mousePosition }}>
      {children}
    </MousePositionContext.Provider>
  )
}

export const useMousePosition = () => {
  const context = useContext(MousePositionContext)
  if (context === undefined) {
    throw new Error(
      'useMousePosition must be used within a MousePositionProvider'
    )
  }
  return context.mousePosition
}

export default MousePositionProvider
