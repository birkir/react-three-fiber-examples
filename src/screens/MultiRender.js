import React, { useState, useRef, useEffect } from 'react'
import { View } from 'react-native';
import { Canvas, useFrame } from '../lib/react-three-fiber'

const CanvasStyle = {
  width: '100%',
  height: '50%',
}

const Obj = () => {
  const meshRef = useRef()
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.03
    }
  })
  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}
const SpinningScene = () => (
  <View style={CanvasStyle}>
    <Canvas>
      <Obj />
    </Canvas>
  </View>
)

const StaticScene = () => (
  <View style={CanvasStyle}>
    <Canvas>
      <mesh>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshNormalMaterial attach="material" />
      </mesh>
    </Canvas>
  </View>
)

export function MultiRender() {
  const [secondScene, setSecondScene] = useState(false)

  useEffect(() => {
    setTimeout(() => setSecondScene(true), 5000)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <SpinningScene />
      {secondScene && <StaticScene />}
    </View>
  )
}

MultiRender.navigationOptions = {
  title: 'Multi Render',
};