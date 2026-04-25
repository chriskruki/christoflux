'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface PageLoaderProps {
  onLoadComplete: () => void
}

/**
 * Global page loader that hides the site until critical media is loaded
 * Shows a loading spinner and fades in the site once loading is complete
 * Note: Loading state is managed by parent component
 */
const PageLoader = ({ onLoadComplete }: PageLoaderProps) => {
  // This component is controlled by parent, so we just show the loader UI
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='fixed inset-0 z-[9999] flex items-center justify-center bg-black'
    >
      {/* Loading Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        className='w-16 h-16 border-4 border-emerald-400/30 border-t-emerald-400 rounded-full'
      />
    </motion.div>
  )
}

export default PageLoader
