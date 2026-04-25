import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import MousePositionProvider from '@/contexts/MousePositionContext'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Christoflux',
  description: 'Raving, flowing, music, LED, electronics — the persona side.',
  icons: {
    icon: [
      { url: '/fav/favicon.ico' },
      { url: '/fav/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/fav/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/fav/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/fav/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/fav/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${nunito.variable} antialiased bg-black text-white font-nunito`}
      >
        {children}
      </body>
    </html>
  )
}
