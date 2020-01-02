export default function fromEntries<K extends Index, V>(entries: Iterable<[K, V]>): Record<K, V> {
  const result: Partial<Record<K, V>> = {}

  // tslint:disable-next-line:no-loop-statement
  for (const [key, value] of entries) {

    // tslint:disable-next-line:no-object-mutation
    result[key] = value
  }

  return result as Record<K, V>
}
