'use client'

import { ReactNode } from 'react'

interface ContentCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'green'
}

const VARIANTS = {
  default: 'bg-white/10 backdrop-blur-sm border-white/20',
  green:
    'bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 border-emerald-300/40 shadow-[0_8px_40px_rgba(16,185,129,0.35)]',
}

const ContentCard = ({
  children,
  className = '',
  variant = 'default',
}: ContentCardProps) => {
  return (
    <div
      className={`rounded-lg p-8 border w-full max-w-2xl ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </div>
  )
}

export default ContentCard
