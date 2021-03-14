import { useCallback, useEffect, useState } from 'react'

export default function useScreen() {
  const [width, setWidth] = useState<number | null>(null)
  const [height, setHeight] = useState<number | null>(null)
  const [dpr, setDpr] = useState<number | null>(null)

  const updateScreenSize = useCallback(() => {
    setWidth(globalThis.innerWidth)
    setHeight(globalThis.innerHeight)
  }, [])

  const updateScreenDpr = useCallback(() => {
    setDpr(globalThis.devicePixelRatio)
  }, [])

  useEffect(() => {
    updateScreenSize()
    updateScreenDpr()

    globalThis.addEventListener('resize', updateScreenSize)
    globalThis.addEventListener('change', updateScreenDpr)

    return () => {
      globalThis.removeEventListener('resize', updateScreenSize)
      globalThis.removeEventListener('change', updateScreenDpr)
    }
  }, [updateScreenSize, updateScreenDpr])

  return { width, height, dpr }
}
