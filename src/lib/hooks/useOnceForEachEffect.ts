import { DependencyList, useEffect } from 'react'

import identity from '~/lib/identity'

type OnceForEachEffectCallback<T> = (x: T) => (void | ((x: T) => void | undefined))

/**
 * @param identify that meets `a` is `b` in SameValueZero → `identify(a) === identify(b)`
 */
export default function useOnceForEachEffect<T, U = T>(xs: T[], identify: (x: T) => U = identity as (x: T) => U, effect: OnceForEachEffectCallback<T>, deps?: DependencyList) { // TODO: delete `as (x: T) => U`; 引数の型は反変なので、デフォルト引数の型は、引数の型と同じかそれより狭い型に安全に変換できるが、 TypeScript の実装はそうなっていない。
  useEffect(() => {
    const cleanups: Array<{
      x: T,
      cleanup: ReturnType<typeof effect>
    }> = []

    const doneIds: U[] = []

    // tslint:disable-next-line:no-loop-statement
    for (const x of xs) {
      const id = identify(x)

      if (!doneIds.includes(id)) {
        // tslint:disable-next-line:no-array-mutation
        cleanups.push({
          x,
          cleanup: effect(x),
        })

        // tslint:disable-next-line:no-array-mutation
        doneIds.push(id)
      }
    }

    return () => {
      // tslint:disable-next-line:no-loop-statement
      for (const { x, cleanup } of cleanups) {
        // cleanup?.(x)

        if (typeof cleanup !== 'undefined') {
          cleanup(x)
        }
      }
    }
  }, deps ?? []) // eslint-disable-line react-hooks/exhaustive-deps
}
