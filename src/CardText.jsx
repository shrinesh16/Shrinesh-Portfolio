import { Text } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CardText() {
  const textRef = useRef()

  // subtle floating animation
  useFrame(({ clock }) => {
    if (!textRef.current) return
    textRef.current.position.y =
      -1.8 + Math.sin(clock.getElapsedTime()) * 0.03
  })

  return (
    <Text
      ref={textRef}
      position={[0, -1.8, 0]} // BELOW the card
      fontSize={0.18}
      color="#00ff33"
      anchorX="center"
      anchorY="middle"
      font="/fonts/JetBrainsMono-Regular.ttf" // optional (see note)
    >
      FULL STACK DEVELOPER
    </Text>
  )
}
