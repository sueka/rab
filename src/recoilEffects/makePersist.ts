import assert from 'assert'
import { AtomEffect } from 'recoil'

interface Options<K extends string, V> {
  serialize?(value: Partial<Record<K, V>>): string
  deserialize?(text: string): Partial<Record<K, V>>
}

export const key = 'recoil-atoms'

export default function makePersist<K extends string, V>(atomKey: K, options?: Options<K, V>): AtomEffect<V> {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: Options<K, V> = options ?? {}

  return function persist({ onSet, node }) {
    assert.equal(node.key, atomKey)

    onSet((newValue) => {
      const store = localStorage.getItem(key)
      const deserialized: Partial<Record<K, V>> = store !== null ? deserialize(store) : {}

      deserialized[atomKey] = newValue

      const serialized = serialize(deserialized)

      localStorage.setItem(key, serialized)
    })
  }
}
