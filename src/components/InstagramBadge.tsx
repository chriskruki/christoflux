'use client'

import { SOCIALS } from '@/utils/copy'
import { motion } from 'framer-motion'

const InstagramBadge = () => {
  return (
    <motion.a
      href={SOCIALS.INSTAGRAM}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Instagram — @christoflux'
      className='group relative flex h-14 w-14 items-center justify-center rounded-full text-white'
      style={{
        background:
          'linear-gradient(135deg, #feda75 0%, #fa7e1e 25%, #d62976 55%, #962fbf 80%, #4f5bd5 100%)',
        boxShadow: '0 0 18px rgba(214, 41, 118, 0.45)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotate: 360 }}
      transition={{
        opacity: { duration: 0.5, delay: 0.3, ease: 'easeInOut' },
        rotate: { repeat: Infinity, duration: 8, ease: 'linear' },
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        className='h-7 w-7'
      >
        <rect x='3' y='3' width='18' height='18' rx='5' />
        <circle cx='12' cy='12' r='4' />
        <circle cx='17.5' cy='6.5' r='1' fill='currentColor' stroke='none' />
      </svg>
    </motion.a>
  )
}

export default InstagramBadge
