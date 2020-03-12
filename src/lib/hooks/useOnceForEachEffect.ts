import { DependencyList, useEffect, useState } from 'react'

import identity from '~/lib/identity'

type OnceForEachEffectCallback<T> = (x: T) => (void | ((x: T) => void | undefined))

export default function useOnceForEachEffect<T extends U, U>(xs: T[], identify: (x: T) => U = identity, effect: OnceForEachEffectCallback<T>, deps?: DependencyList) {
  const [doneIds, setDoneIds] = useState<U[]>([])

  useEffect(() => {
    const cleanups: Array<{
      x: T,
      cleanup: ReturnType<typeof effect>
    }> = []

    // tslint:disable-next-line:no-loop-statement
    for (const x of xs) {
      if (!doneIds.includes(identify(x))) {
        // tslint:disable-next-line:no-array-mutation
        cleanups.push({
          x,
          cleanup: effect(x),
        })
      }
    }

    setDoneIds(xs.map(identify))

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
