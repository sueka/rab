import { DependencyList, useEffect, useState } from 'react'

type OnceForEachEffectCallback<T> = (x: T) => (void | ((x: T) => void | undefined))

export default function useOnceForEachEffect<T>(xs: T[], effect: OnceForEachEffectCallback<T>, deps?: DependencyList) {
  const [doneXs, setDoneXs] = useState<T[]>([])

  useEffect(() => {
    const cleanups: Array<{
      x: T,
      cleanup: ReturnType<typeof effect>
    }> = []

    // tslint:disable-next-line:no-loop-statement
    for (const x of xs) {
      if (!doneXs.includes(x)) {
        // tslint:disable-next-line:no-array-mutation
        cleanups.push({
          x,
          cleanup: effect(x),
        })
      }
    }

    setDoneXs(xs)

    return () => {
      // tslint:disable-next-line:no-loop-statement
      for (const { x, cleanup } of cleanups) {
        // cleanup?.(x)

        if (typeof cleanup !== 'undefined') {
          cleanup(x)
        }
      }
    }
  }, deps)
}
