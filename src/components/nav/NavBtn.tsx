import { HEADER } from '@/utils/constants'
import { motion, MotionStyle } from 'framer-motion'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

export default function NavBtn({
  children,
  target,
  width = HEADER.NAV.BTN_WIDTH,
  isActive = false,
  style = {},
}: {
  children: React.ReactNode
  target: string
  width?: number
  isActive?: boolean
  style?: MotionStyle
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetElement = document.getElementById(target)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      })
    }
  }
  return (
    <motion.a
      href={`#${target}`}
      onClick={e => handleClick(e)}
      style={{
        width: width,
        ...style,
      }}
      className={clsx(
        'text-lg px-4 py-2 rounded-lg cursor-pointer text-center transition-all duration-200 border border-transparent hover:border-white/100',
        isActive
          ? 'text-white bg-white/20 shadow-lg shadow-white/30 hover:bg-white/30 border-white/100'
          : 'text-white hover:text-white bg-white/20 hover:bg-white/20'
      )}
    >
      {children}
    </motion.a>
  )
}
