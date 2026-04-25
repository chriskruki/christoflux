'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { RotatingCube } from './RotatingCube'
import { Stars } from './Stars'

const LoadingFallback = () => {
  return (
    <div className='absolute inset-0 w-full h-full bg-black z-0'>
      <div className='flex items-center justify-center h-full'>
        <div className='animate-pulse text-white/30 text-sm'>Loading...</div>
      </div>
    </div>
  )
}

const ThreeScene = () => {
  const [isCanvasReady, setIsCanvasReady] = useState(false)

  return (
    <>
      {/* Three.js Canvas with Suspense */}
      <Suspense fallback={<LoadingFallback />}>
        <div className='absolute inset-0 w-full h-full pointer-events-none z-0'>
          <Canvas
            camera={{ position: [0, 0, 1000], fov: 75 }}
            gl={{ alpha: true }}
            style={{ background: 'transparent' }}
            onCreated={() => setIsCanvasReady(true)}
          >
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight
              position={[0, 0, 1000]}
              intensity={1.0}
              color='#ffffff'
            />
            <pointLight
              position={[0, 0, 1000]}
              intensity={0.8}
              color='#ffffff'
            />

            <Stars />
            <RotatingCube />
          </Canvas>
        </div>
      </Suspense>
    </>
  )
}

export default ThreeScene
