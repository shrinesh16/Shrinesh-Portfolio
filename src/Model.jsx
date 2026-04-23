import { useRef, useState, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export default function Model() {
  const pivotRef = useRef()
  const cardRef = useRef()

  // Load model
  const gltf = useLoader(GLTFLoader, '/models/vcard.glb')

  // Ensure back side is visible
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.side = THREE.DoubleSide
      child.material.needsUpdate = true
    }
  })

  // Target rotation (no physics)
 // Rest (hanging) rotation
const restRot = useRef({ x: -0.5, y: 3.55
 })

// Current target rotation
const targetRot = useRef({ ...restRot.current })


  // Mouse tracking
  const lastX = useRef(0)
  const lastY = useRef(0)

  const [dragging, setDragging] = useState(false)

  // Global mouse tracking (THIS makes it seamless)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return

      const dx = e.clientX - lastX.current
      const dy = e.clientY - lastY.current

      // Fast, responsive rotation
      targetRot.current.y += dx * 0.006   // twist
      targetRot.current.x += dy * 0.006   // tilt

      // Limit tilt so it still feels "hung"
      targetRot.current.x = THREE.MathUtils.clamp(
        targetRot.current.x,
        -Math.PI / 3,
        Math.PI / 3
      )

      lastX.current = e.clientX
      lastY.current = e.clientY
    }

    const handleMouseUp = () => {
      setDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging])

  // Smoothly apply rotation every frame
useFrame((state, delta) => {
  if (!pivotRef.current) return

  // Auto spin (adds to target Y when not dragging)
  if (!dragging) {
    targetRot.current.y += delta * 0.5 // spin speed
  }

  // Return tilt (X) to rest when not dragging
  if (!dragging) {
    targetRot.current.x = THREE.MathUtils.lerp(
      targetRot.current.x,
      restRot.current.x,
      0.06
    )
  }

  // Apply BOTH rotations smoothly
  pivotRef.current.rotation.x = THREE.MathUtils.lerp(
    pivotRef.current.rotation.x,
    targetRot.current.x,
    0.25
  )

  pivotRef.current.rotation.y = THREE.MathUtils.lerp(
    pivotRef.current.rotation.y,
    targetRot.current.y,
    0.25
  )
})


return (
  <group>
    <group ref={pivotRef}>
      <group
        onPointerDown={(e) => {
          e.stopPropagation()
          setDragging(true)
          lastX.current = e.clientX
          lastY.current = e.clientY
        }}
      >
        <primitive
          ref={cardRef}
          object={gltf.scene}
          position={[0, -0.8, 0]} // ONLY vertical offset
          scale={1.9}
        />
      </group>
    </group>
  </group>
)



}
