import React, { useRef } from 'react'
import { AR } from 'expo'
import { findNodeHandle } from 'react-native'
import { BackgroundTexture, Camera } from 'expo-three-ar'
import { useFrame, Canvas } from '../lib/react-three-fiber'

function Box() {
  const box = useRef()
  useFrame(() => box.current && void (box.current.rotation.x += 0.01, box.current.rotation.y += 0.01))
  return (
    <mesh ref={box}>
      <boxGeometry attach="geometry" args={[0.01, 0.01, 0.01]} />
      <meshStandardMaterial attach="material" color={0x0ff000} />
    </mesh>
  )
}

export function ARKit() {
  const nativeRef = useRef()
  const onCreated = ({ gl, scene, size, setDefaultCamera }) => {
    AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);
    gl.gammaInput = true;
    gl.gammaOutput = true;
    scene.background = new BackgroundTexture(gl);
    const camera = new Camera(size.width, size.height, 0.01, 1000)
    setDefaultCamera(camera)
  }

  const onContextCreated = async () => {
    const { TrackingConfiguration, TrackingConfigurations } = AR;
    const finalConfig = TrackingConfiguration || TrackingConfigurations;
    const trackingConfiguration = finalConfig.World;
    await AR.startAsync(findNodeHandle(nativeRef.current), trackingConfiguration);
  }

  return (
    <Canvas
      onCreated={onCreated}
      onContextCreated={onContextCreated}
      nativeRef_EXPERIMENTAL={nativeRef}
    >
      <ambientLight intensity={0.5} />
      <pointLight color="white" intensity={1} position={[10, 10, 10]} />
      <Box />
    </Canvas>
  )
}


ARKit.navigationOptions = {
  title: 'ARKit'
}