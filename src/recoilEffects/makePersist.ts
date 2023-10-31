import assert from 'assert'
import { AtomEffect } from 'recoil'

interface Options<K extends string, V> {
  serialize?(value: Record<K, V>): string
  deserialize?(text: string): Partial<Record<K, V>>
}

export const key = 'recoil-atoms'

export default function makePersist<K extends string, V>(atomKey: K, options?: Options<K, V>): {
  persist: AtomEffect<V>
  restore: AtomEffect<V>
} {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: Options<K, V> = options ?? {}

  return {
    persist({ onSet, node }) {
      assert.equal(node.key, atomKey)

      onSet((newValue) => {
        const store = localStorage.getItem(key)

        const deserialized: Partial<Record<K, V>> = store !== null ? deserialize(store) : {}

        const newEntry = {
          [atomKey]: newValue,
        } as Record<K, V>

        const serialized = serialize({
          ...deserialized,
          ...newEntry,
        })

        localStorage.setItem(key, serialized)
      })
    },

    restore({ trigger, setSelf, node }) {
      assert.equal(node.key, atomKey)

      if (trigger === 'get') {
        const store = localStorage.getItem(key)

        if (store === null) {
          return
        }

        const deserialized = deserialize(store)
        const persisted = deserialized[atomKey]

        if (persisted === undefined) {
          return
        }

        setSelf(persisted)
      }
    }
  }
}
