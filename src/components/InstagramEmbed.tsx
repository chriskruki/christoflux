'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

interface InstagramEmbedProps {
  url: string
  className?: string
}

const SCRIPT_SRC = 'https://www.instagram.com/embed.js'

export default function InstagramEmbed({ url, className }: InstagramEmbedProps) {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    )
    if (existing) {
      window.instgrm?.Embeds.process()
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    document.body.appendChild(script)
  }, [url])

  return (
    <blockquote
      className={`instagram-media ${className ?? ''}`.trim()}
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{ maxWidth: 540, width: '100%', margin: '1px auto' }}
    />
  )
}
