import { DependencyList, useEffect } from 'react'

import identity from '~/identity'

type OnceForEachEffectCallback<T> = (x: T) => (void | ((x: T) => void | undefined))

/**
 * @param identify that meets `a` is `b` in SameValueZero → `identify(a) === identify(b)`
 */
export default function useOnceForEachEffect<T, U = T>(xs: readonly T[], identify: (x: T) => U = identity as (x: T) => U, effect: OnceForEachEffectCallback<T>, deps?: DependencyList) { // TODO: delete `as (x: T) => U`; 引数の型は反変なので、デフォルト引数の型は、引数の型と同じかそれより狭い型に安全に変換できるが、 TypeScript の実装はそうなっていない。
  useEffect(() => {
    const cleanups: {
      x: T,
      cleanup: ReturnType<typeof effect>
    }[] = []

    const doneIds: U[] = []

    for (const x of xs) {
      const id = identify(x)

      if (!doneIds.includes(id)) {
        cleanups.push({
          x,
          cleanup: effect(x),
        })

        doneIds.push(id)
      }
    }

    return () => {
      for (const { x, cleanup } of cleanups) {
        // cleanup?.(x)

        if (typeof cleanup !== 'undefined') {
          cleanup(x)
        }
      }
    }
  }, deps ?? []) // eslint-disable-line react-hooks/exhaustive-deps
}
