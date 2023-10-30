import { AtomEffect } from 'recoil'

export const key = 'recoil-atoms'

export default function persist<T extends Serializable>(...[{ onSet, node }]: Parameters<AtomEffect<T>>): ReturnType<AtomEffect<T>> {
  onSet((newValue) => {
    const store = localStorage.getItem(key)
    const deserialized: SerializableObject = store !== null ? JSON.parse(store) : {}

    deserialized[node.key] = newValue

    const serialized = JSON.stringify(deserialized)

    localStorage.setItem(key, serialized)
  })
}
