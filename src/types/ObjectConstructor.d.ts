// TODO: Delete

interface ObjectConstructor {
  keys<K extends Index>(o: Record<K, unknown>): K[]
  entries<K extends Index, V>(o: Record<K, V> | ArrayLike<V>): Array<[K, V]>
}
