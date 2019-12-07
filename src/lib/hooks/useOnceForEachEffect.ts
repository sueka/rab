import { DependencyList, useEffect, useState } from 'react'

type OnceForEachEffectCallback<T> = (element: T) => (void | ((element: T) => void | undefined))

export default function useOnceForEachEffect<T>(xs: T[], effect: OnceForEachEffectCallback<T>, deps?: DependencyList) {
  const [doneXs, setDoneXs] = useState<T[]>([])

  useEffect(() => {
    const cleanups: Array<{
      element: T,
      cleanup: ReturnType<typeof effect>
    }> = []

    // tslint:disable-next-line:no-loop-statement
    for (const x of xs) {
      if (!doneXs.includes(x)) {
        // tslint:disable-next-line:no-array-mutation
        cleanups.push({
          element: x,
          cleanup: effect(x),
        })
      }
    }

    setDoneXs(xs)

    return () => {
      // tslint:disable-next-line:no-loop-statement
      for (const { element, cleanup } of cleanups) {
        // cleanup?.(element)

        if (typeof cleanup !== 'undefined') {
          cleanup(element)
        }
      }
    }
  }, deps)
}
