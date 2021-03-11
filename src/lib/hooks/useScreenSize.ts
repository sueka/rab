import { useCallback, useEffect, useState } from 'react'

export default function useScreenSize() {
  const [width, setWidth] = useState<number | null>(null)
  const [height, setHeight] = useState<number | null>(null)

  const updateScreenSize = useCallback(() => {
    setWidth(globalThis.innerWidth)
    setHeight(globalThis.innerHeight)
  }, [])

  useEffect(() => {
    updateScreenSize()

    globalThis.addEventListener('resize', updateScreenSize)
    globalThis.addEventListener('deviceorientation', updateScreenSize)

    return () => {
      globalThis.removeEventListener('resize', updateScreenSize)
      globalThis.removeEventListener('deviceorientation', updateScreenSize)
    }
  }, [updateScreenSize])

  const requestPermission = useCallback(async () => {
    const state = await DeviceOrientationEvent.requestPermission()

    if (state === 'granted') {
      globalThis.addEventListener('deviceorientation', updateScreenSize)
    }
  }, [])

  return { width, height, requestPermission }
}
