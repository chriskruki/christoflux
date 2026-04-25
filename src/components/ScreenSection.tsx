'use client'

import { SECTIONS } from '@/utils/constants'
import { ReactNode, forwardRef } from 'react'

interface ScreenSectionProps {
  children?: ReactNode
  className?: string
  id?: string
}

const ScreenSection = forwardRef<HTMLDivElement, ScreenSectionProps>(
  ({ children, className = '', id }, ref) => {
    return (
      <div ref={ref} id={id} className={`min-h-[100vh] ${className}`}>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>{children}</div>
      </div>
    )
  }
)

ScreenSection.displayName = 'ScreenSection'

export default ScreenSection
