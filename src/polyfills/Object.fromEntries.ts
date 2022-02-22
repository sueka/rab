export default function fromEntries<V = any>(entries: Iterable<readonly [Index, V]>): Record<string, V> // tslint:disable-line:no-any
export default function fromEntries(entries: Iterable<readonly any[]>): any // tslint:disable-line:no-any
export default function fromEntries<V = any>(entries: Iterable<readonly [Index, V] | readonly any[]>) { // tslint:disable-line:no-any
  const result: Partial<Record<string, V>> = {}

  // tslint:disable-next-line:no-loop-statement
  for (const [key, value] of entries) {
    const member = key != null ? key.toString() : key // null/undefined を保存する

    // tslint:disable-next-line:no-object-mutation
    result[member] = value
  }

  return result as Record<string, V>
}
