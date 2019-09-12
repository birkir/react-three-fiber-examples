import * as THREE from 'three'
import React, { useState, useMemo } from 'react'
import { Canvas, useThree, useResource } from '../lib/react-three-fiber'
import { useControls } from '../hooks/useControls'
import fontFile from '../resources/fonts/unknown'

/** This renders text via canvas and projects it as a sprite */
function Text({ children, size = 1, letterSpacing = 0.01, color = '#000000' }) {
  const [font] = useState(() => new THREE.FontLoader().parse(fontFile))
  const [shapes, [x, y]] = useMemo(() => {
    let x = 0,
      y = 0
    let letters = [...children]
    let mat = new THREE.MeshBasicMaterial({ color, opacity: 1, transparent: true })
    return [
      letters.map(letter => {
        const geom = new THREE.ShapeGeometry(font.generateShapes(letter, size, 1))
        geom.computeBoundingBox()
        const mesh = new THREE.Mesh(geom, mat)
        mesh.position.x = x
        x += geom.boundingBox.max.x + letterSpacing
        y = Math.max(y, geom.boundingBox.max.y)
        return mesh
      }),
      [x, y],
    ]
  }, [children])
  return (
    <group position={[-x / 2, -y / 2, 0]}>
      {shapes.map((shape, index) => (
        <primitive key={index} object={shape} />
      ))}
    </group>
  )
}

function Content() {
  const { size, camera } = useThree()
  const controls = useControls()
  return (
    <group>
      <orbitControls ref={controls} args={[camera, size.width, size.height]} enableDamping dampingFactor={0.1} rotateSpeed={0.1} />
      <Text>lorem</Text>
    </group>
  )
}

function TestCamHelper() {
  const [ref, camera] = useResource()
  return (
    <>
      <perspectiveCamera
        ref={ref}
        aspect={1200 / 600}
        radius={(1200 + 600) / 4}
        fov={45}
        position={[0, 0, 2]}
        onUpdate={self => self.updateProjectionMatrix()}
      />
      {camera && <cameraHelper args={camera} />}
    </>
  )
}

export function Font() {
  return (
    <Canvas style={{ backgroundColor: '#dfdfdf' }}>
      <Content />
      <TestCamHelper />
    </Canvas>
  )
}

Font.navigationOptions = {
  title: 'Font'
}