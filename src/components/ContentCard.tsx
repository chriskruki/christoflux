'use client'

import { ReactNode } from 'react'

interface ContentCardProps {
  children: ReactNode
  className?: string
}

const ContentCard = ({ children, className = '' }: ContentCardProps) => {
  return (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 w-full max-w-2xl ${className}`}
    >
      {children}
    </div>
  )
}

export default ContentCard
