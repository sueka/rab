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

    return () => {
      globalThis.removeEventListener('resize', updateScreenSize)
    }
  }, [updateScreenSize])

  return { width, height }
}
