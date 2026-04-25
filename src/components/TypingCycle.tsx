'use client'

import { useEffect, useState } from 'react'

const WORDS = [
  { text: 'er', className: 'text-white' },
  { text: 'lux', className: 'text-emerald-400' },
] as const

const TYPE_MS = 140
const ERASE_MS = 80
const HOLD_MS = 1200
const SWAP_MS = 300

export default function TypingCycle() {
  const [wordIdx, setWordIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = WORDS[wordIdx].text

    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), HOLD_MS)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      const t = setTimeout(() => {
        setDeleting(false)
        setWordIdx(i => (i + 1) % WORDS.length)
      }, SWAP_MS)
      return () => clearTimeout(t)
    }

    const t = setTimeout(
      () =>
        setText(
          deleting
            ? word.slice(0, text.length - 1)
            : word.slice(0, text.length + 1)
        ),
      deleting ? ERASE_MS : TYPE_MS
    )
    return () => clearTimeout(t)
  }, [text, deleting, wordIdx])

  return (
    <span aria-hidden>
      <span className={WORDS[wordIdx].className}>{text}</span>
      <span className='text-emerald-400/70 animate-pulse'>|</span>
    </span>
  )
}
