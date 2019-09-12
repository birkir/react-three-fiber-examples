import { useRef, useEffect } from 'react'
import { extend, useThree } from '../lib/react-three-fiber'

const OrbitControls = require('../resources/controls');
extend({ OrbitControls })

export const useControls = () => {
  const controls = useRef()
  const { pointer } = useThree();
  useEffect(() => {
    const onPointerMove = (e) => controls.current.onTouchMove(e.nativeEvent);
    const onPointerDown = (e) => controls.current.onTouchStart(e.nativeEvent);
    const onPointerUp = (e) => controls.current.onTouchEnd(e.nativeEvent);
    pointer.on('pointerMove', onPointerMove);
    pointer.on('pointerDown', onPointerDown);
    pointer.on('pointerUp', onPointerUp);
    return () => {
      pointer.off('pointerMove', onPointerMove);
      pointer.off('pointerDown', onPointerDown);
      pointer.off('pointerUp', onPointerUp);
    }
  }, []);
  return controls;
}
