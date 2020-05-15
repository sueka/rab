import { DependencyList, useEffect, useState } from 'react'

import identity from '~/lib/identity'

type OnceForEachEffectCallback<T> = (x: T) => (void | ((x: T) => void | undefined))

/**
 * @param hashCode that meets `a` is `b` in SameValueZero → `hashCode(a) === hashCode(b)`
 */
export default function useOnceForEachEffect<T extends U, U>(xs: T[], hashCode: (x: T) => U = identity, effect: OnceForEachEffectCallback<T>, deps?: DependencyList) {
  const [doneIds, setDoneIds] = useState<U[]>([])

  useEffect(() => {
    const cleanups: Array<{
      x: T,
      cleanup: ReturnType<typeof effect>
    }> = []

    // tslint:disable-next-line:no-loop-statement
    for (const x of xs) {
      if (!doneIds.includes(hashCode(x))) {
        // tslint:disable-next-line:no-array-mutation
        cleanups.push({
          x,
          cleanup: effect(x),
        })
      }
    }

    setDoneIds(xs.map(hashCode))

    return () => {
      // tslint:disable-next-line:no-loop-statement
      for (const { x, cleanup } of cleanups) {
        // cleanup?.(x)

        if (typeof cleanup !== 'undefined') {
          cleanup(x)
        }
      }
    }
  }, [
    xs,
    hashCode,
    effect,
    doneIds, // TODO
    ...deps ?? [], // eslint-disable-line react-hooks/exhaustive-deps
  ])
}
