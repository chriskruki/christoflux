import React from 'react'
import LazyVideo from '@/components/LazyVideo'

export const SKILL_CONTENT: Record<string, React.ReactNode> = {
  ripsticking: (
    <div className='space-y-6'>
      <div className='grid md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <h4 className='text-lg font-semibold text-yellow-300'>Experience</h4>
          <ul className='space-y-2 text-white/70'>
            <li>~ 13+ years of riding experience</li>
            <li>{`~ The smoothest ripping of sticks you've ever seen`}</li>
            <li>~ Implanting flow into the earth</li>
            <li>~ Making ur moms jaw drop</li>
          </ul>
        </div>

        <div>
          <LazyVideo
            src='/ripstick.mp4'
            autoPlay
            loop
            muted
            playsInline
            className='video-border'
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  ),

  flowstar: (
    <div className='space-y-6'>
      <div className='grid md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <h4 className='text-lg font-semibold text-emerald-300'>Journey</h4>
          <ul className='space-y-2 text-white/70'>
            <li>~ Started in March 2025</li>
            <li>~ Learned from flowmies throughout festivals</li>
            <li>~ Progression through ADHD hyperfixation</li>
          </ul>
        </div>

        <div>
          <LazyVideo
            src='/flowstar.mov'
            autoPlay
            loop
            muted
            playsInline
            className='video-border'
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  ),

  sandball: (
    <div className='space-y-6'>
      <div className='grid md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <h4 className='text-lg font-semibold text-yellow-300'>Experience</h4>
          <ul className='space-y-2 text-white/70'>
            <li>~ Mentored by the almighty Kai Hamilton</li>
            <li>~ Cradled the testicles of the beach for years</li>
            <li>{`~ Achieved 6" diameter balls`}</li>
          </ul>
        </div>

        <div>
          <LazyVideo
            src='/sandball.mov'
            autoPlay
            loop
            muted
            playsInline
            className='video-border'
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  ),
}
