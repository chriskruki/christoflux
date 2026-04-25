import InstagramEmbed from '@/components/InstagramEmbed'
import LazyVideo from '@/components/LazyVideo'
import Link from 'next/link'
import React from 'react'

export const PROJECT_CONTENT: Record<string, React.ReactNode> = {
  clockTotem: (
    <div className='space-y-6'>
      <div className='grid md:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-4 h-full'>
          <h4 className='text-lg font-semibold text-emerald-300'>Features</h4>
          <ul className='space-y-2 text-white/70'>
            <li>{`~ 9" Infinity mirror with a custom 3D printed housing`}</li>
            <li>~ 3D printed joystick and electronics enclosure</li>
            <li>~ WS2812B LED strips</li>
            <li>
              ~ ESP32 with custom firmware to map joystick movements to various
              effects
            </li>
            <li>
              ~ Speed, brightness, color, pattern and effect control interface
            </li>
          </ul>
          {/* Instagram post link */}
          <Link
            href='https://www.instagram.com/p/DR0kqpnDzMe/?img_index=1'
            target='_blank'
            className='mt-auto w-full'
          >
            <p className='text-white/70 italic border-2 border-emerald-400/20 rounded-lg p-2 hover:bg-emerald-400/20 transition-all duration-300 text-center w-full'>
              View more on Instagram
            </p>
          </Link>
        </div>

        <div className='space-y-4'>
          <LazyVideo
            src='/totem_1.mov'
            autoPlay
            loop
            muted
            className='video-border'
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  ),

  iris: (
    <div className='space-y-6'>
      <div className='grid md:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-4 h-full'>
          <h4 className='text-lg font-semibold text-emerald-300'>Features</h4>
          <ul className='space-y-2 text-white/70'>
            <li>{`~ 2' infinity mirror encased in custom 3D printed housing`}</li>
            <li>
              ~ PVC structure with 3D printed mounting and tripod features
            </li>
            <li>~ WLED and LedFX for music reactive lighting</li>
            <li>~ Custom React UI for live lighting control</li>
          </ul>
          {/* Instagram post link */}
          <Link
            href='https://www.instagram.com/p/DRxp85TEgC2/?img_index=1'
            target='_blank'
            className='mt-auto w-full'
          >
            <p className='text-white/70 italic border-2 border-emerald-400/20 rounded-lg p-2 hover:bg-emerald-400/20 transition-all duration-300 text-center w-full'>
              View more on Instagram
            </p>
          </Link>
        </div>

        <div className='space-y-4'>
          <LazyVideo
            src='/iris_hf_1.mov'
            autoPlay
            loop
            muted
            className='video-border'
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  ),
}
