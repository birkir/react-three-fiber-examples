import React, { useRef } from 'react'
import { useFrame, Canvas } from '../lib/react-three-fiber'

function Box() {
  const box = useRef()
  useFrame(() => box.current && void (box.current.rotation.x += 0.01, box.current.rotation.y += 0.01))
  return (
    <mesh ref={box}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={0x0ff000} />
    </mesh>
  )
}

export function HelloWorld() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight color="white" intensity={1} position={[10, 10, 10]} />
      <Box />
    </Canvas>
  )
}


HelloWorld.navigationOptions = {
  title: 'Hello world'
}