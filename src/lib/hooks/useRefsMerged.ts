import React, { useCallback } from 'react'

export default function useRefsMerged<T>(...refs: React.Ref<T>[]): React.RefCallback<T> {
  return useCallback((node) => {
    for (const ref of refs) { // tslint:disable-line:no-loop-statement
      if (ref === null) {
        continue
      }

      // NOTE: 関数に `current` が設定されたものは React では callback ref と見なされるので、関数かどうかを先に調べる。
      if (typeof ref === 'function') {
        ref(node)
      } else {
        const mutableRef: React.MutableRefObject<T | null> = ref // FIXME

        mutableRef.current = node // tslint:disable-line:no-object-mutation
      }
    }
  }, refs)
}
