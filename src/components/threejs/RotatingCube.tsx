'use client'

import { CUBE, CUBE_FACES, SECTIONS } from '@/utils/constants'
import { vlog } from '@/utils/helpers'
import { useFrame } from '@react-three/fiber'
import { useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

export const RotatingCube = () => {
  const cubeRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  const { scrollY } = useScroll()

  // Calculate fade in and slide in from right after first section
  const opacityRaw = useTransform(scrollY, CUBE.ANIMATION.FADE_RANGE, [0, 1])
  const translateXRaw = useTransform(
    scrollY,
    CUBE.ANIMATION.TRANSLATE_RANGE,
    CUBE.ANIMATION.TRANSLATE_VALUES
  )

  // Apply spring physics to smooth out the animations
  const opacity = useSpring(opacityRaw, CUBE.SPRING)
  const translateX = useSpring(translateXRaw, CUBE.SPRING)

  // Calculate rotation with pauses at each section
  const degrees = (degrees: number) => {
    return degrees * (Math.PI / 180)
  }

  // Create rotation keyframes based on section bounds
  const rotationKeyframes = [
    0,
    SECTIONS.HOME.END + 100, // Rotate to section 1
    SECTIONS.HOME.END + 300, // Fade in
    SECTIONS.PROJECTS.START + 200, // Reach section 1 (Projects)
    SECTIONS.PROJECTS.END - 300, // Hold at section 1
    SECTIONS.SKILLS.START + 200, // Rotate to section 2 (Skills)
    SECTIONS.SKILLS.END - 300, // Hold at section 2
    SECTIONS.CONTACT.START + 200, // Rotate to section 3 (Contact)
    SECTIONS.CONTACT.END - 300, // Hold at section 3
    SECTIONS.CONTACT.END, // Final position
  ]

  const rotationValues = [
    degrees(
      CUBE.ANIMATION.ROTATION.ANGLES.START +
        CUBE.ANIMATION.ROTATION.HOLD_ANGLE_ADJUST
    ), // Start position
    degrees(
      CUBE.ANIMATION.ROTATION.ANGLES.SECTION_1 +
        CUBE.ANIMATION.ROTATION.HOLD_ANGLE_ADJUST -
        CUBE.ANIMATION.ROTATION.HOLD_ANGLE_PAN
    ), // 90° - section 1
    degrees(
      CUBE.ANIMATION.ROTATION.ANGLES.SECTION_1 +
        CUBE.ANIMATION.ROTATION.HOLD_ANGLE_ADJUST
    ), // 90° - section 1
    degrees(
      CUBE.ANIMATION.ROTATION.ANGLES.SECTION_1 +
        CUBE.ANIMATION.ROTATION.HOLD_ANGLE_ADJUST
    ), // 90° - section 1
    degrees(
      CUBE.ANIMATION.ROTATION.ANGLES.SECTION_1 +
        CUBE.ANIMATION.ROTATION.HOLD_ANGLE_ADJUST +
        CUBE.ANIMATION.ROTATION.HOLD_ANGLE_PAN
    ), // Hold at 90°
    degrees(
      CUBE.ANIMATION.ROTATION.ANGLES.SECTION_2 +
        CUBE.ANIMATION.ROTATION.HOLD_ANGLE_ADJUST
    ), // 180° - section 2
    degrees(
      CUBE.ANIMATION.ROTATION.ANGLES.SECTION_2 +
        CUBE.ANIMATION.ROTATION.HOLD_ANGLE_ADJUST
    ), // Hold at 180°
    degrees(
      CUBE.ANIMATION.ROTATION.ANGLES.SECTION_3 +
        CUBE.ANIMATION.ROTATION.HOLD_ANGLE_ADJUST
    ), // 270° - section 3
    degrees(
      CUBE.ANIMATION.ROTATION.ANGLES.SECTION_3 +
        CUBE.ANIMATION.ROTATION.HOLD_ANGLE_ADJUST
    ), // Hold at 270°
    degrees(
      CUBE.ANIMATION.ROTATION.ANGLES.END +
        CUBE.ANIMATION.ROTATION.HOLD_ANGLE_ADJUST
    ), // 360° - back to start
  ]

  const rotationYRaw = useTransform(scrollY, rotationKeyframes, rotationValues)

  // Apply spring physics to rotation for smooth movement
  const rotationY = useSpring(rotationYRaw, CUBE.SPRING)

  // Create individual materials for each face
  const materials = useMemo(() => {
    try {
      vlog('🔄 Creating materials for cube faces...')
      const textureLoader = new THREE.TextureLoader()

      // Create materials for each face
      const faceMaterials = CUBE_FACES.map((face, index) => {
        try {
          vlog(`📦 Processing face ${index}: ${face.title}`)

          if (face.image) {
            vlog(`🖼️ Loading image: ${face.image}`)
            const texture = textureLoader.load(
              face.image,
              // Success callback
              loadedTexture => {
                vlog(
                  `✅ Successfully loaded texture for ${face.title}: ${face.image}`
                )
                loadedTexture.wrapS = THREE.ClampToEdgeWrapping
                loadedTexture.wrapT = THREE.ClampToEdgeWrapping
                loadedTexture.minFilter = THREE.LinearFilter
                loadedTexture.magFilter = THREE.LinearFilter
              },
              // Progress callback
              progress => {
                vlog(
                  `📊 Loading progress for ${face.title}: ${(
                    (progress.loaded / progress.total) *
                    100
                  ).toFixed(1)}%`
                )
              },
              // Error callback
              error => {
                console.error(
                  `❌ Failed to load texture for ${face.title}: ${face.image}`,
                  error
                )
              }
            )

            return new THREE.MeshStandardMaterial({
              map: texture,
              transparent: true,
              opacity: 0.9,
              metalness: 0.1,
              roughness: 0.8,
            })
          } else {
            vlog(`⚠️ No image provided for ${face.title}, creating fallback`)
          }

          // Fallback material if no image
          vlog(`🎨 Creating fallback material for ${face.title}`)
          const canvas = document.createElement('canvas')
          canvas.width = 512
          canvas.height = 512
          const ctx = canvas.getContext('2d')

          if (!ctx) {
            console.error(
              '❌ Failed to get canvas context for fallback material'
            )
            throw new Error('Canvas context not available')
          }

          ctx.fillStyle = CUBE.COLOR
          ctx.fillRect(0, 0, 512, 512)
          ctx.fillStyle = 'white'
          ctx.font = '48px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(face.title, 256, 256)

          const fallbackTexture = new THREE.CanvasTexture(canvas)
          fallbackTexture.wrapS = THREE.ClampToEdgeWrapping
          fallbackTexture.wrapT = THREE.ClampToEdgeWrapping

          const fallbackMaterial = new THREE.MeshStandardMaterial({
            map: fallbackTexture,
            transparent: true,
            opacity: 0.9,
            metalness: 0.1,
            roughness: 0.8,
          })

          vlog(`✅ Created fallback material for ${face.title}`)
          return fallbackMaterial
        } catch (error) {
          console.error(
            `❌ Error processing face ${index} (${face.title}):`,
            error
          )
          // Return a basic fallback material
          const canvas = document.createElement('canvas')
          canvas.width = 512
          canvas.height = 512
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.fillStyle = '#ff0000'
            ctx.fillRect(0, 0, 512, 512)
            ctx.fillStyle = 'white'
            ctx.font = '24px Arial'
            ctx.textAlign = 'center'
            ctx.fillText('ERROR', 256, 256)
          }
          const errorTexture = new THREE.CanvasTexture(canvas)
          return new THREE.MeshStandardMaterial({
            map: errorTexture,
            transparent: true,
            opacity: 0.9,
            metalness: 0.1,
            roughness: 0.8,
          })
        }
      })

      vlog(`📊 Created ${faceMaterials.length} face materials`)
      vlog('✅ Materials created successfully')
      return faceMaterials
    } catch (error) {
      console.error('❌ Error creating materials:', error)
      // Return basic materials as fallback
      return Array(6).fill(
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(CUBE.COLOR),
          transparent: true,
          opacity: 0.9,
          metalness: 0.1,
          roughness: 0.8,
        })
      )
    }
  }, [])

  useFrame(() => {
    try {
      if (!groupRef.current) {
        console.warn('⚠️ Group ref not available')
        return
      }

      // Apply smooth rotation based on scroll
      const currentRotation = rotationY.get()
      groupRef.current.rotation.y = currentRotation

      // Apply translation (slide in from right)
      const currentTranslateX = translateX.get()
      groupRef.current.position.x = CUBE.POSITION.X + currentTranslateX

      // Apply opacity
      const currentOpacity = opacity.get()
      groupRef.current.traverse(child => {
        if (child instanceof THREE.Mesh && child.material) {
          try {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat: THREE.Material) => {
                if ('opacity' in mat) {
                  mat.opacity = currentOpacity
                  mat.transparent = true
                }
              })
            } else {
              if ('opacity' in child.material) {
                child.material.opacity = currentOpacity
                child.material.transparent = true
              }
            }
          } catch (error) {
            console.error('❌ Error applying opacity to material:', error)
          }
        }
      })
    } catch (error) {
      console.error('❌ Error in main useFrame:', error)
    }
  })

  // Assign materials to the cube mesh (only when materials change)
  useEffect(() => {
    try {
      if (!cubeRef.current) {
        console.warn('⚠️ Cube ref not available')
        return
      }

      if (!materials || materials.length === 0) {
        console.warn('⚠️ Materials not available')
        return
      }

      cubeRef.current.material = materials
      vlog('✅ Materials assigned to cube mesh')
    } catch (error) {
      console.error('❌ Error assigning materials to cube mesh:', error)
    }
  }, [materials])

  // Create cube faces content
  const cubeSize = 500

  return (
    <group
      ref={groupRef}
      position={[CUBE.POSITION.X + 1000, CUBE.POSITION.Y, CUBE.POSITION.Z]}
    >
      {/* Cube geometry with proper texture mapping */}
      <mesh ref={cubeRef}>
        <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
        {materials.map((material, index) => (
          <primitive
            key={index}
            object={material}
            attach={`material-${index}`}
          />
        ))}
      </mesh>
    </group>
  )
}
