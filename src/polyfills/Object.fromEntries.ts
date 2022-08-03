export default function fromEntries<V = any>(entries: Iterable<readonly [Index, V]>): Record<string, V>
export default function fromEntries(entries: Iterable<readonly any[]>): any
export default function fromEntries<V = any>(entries: Iterable<readonly [Index, V] | readonly any[]>) {
  const result: Partial<Record<string, V>> = {}

  for (const [key, value] of entries) {
    const member = key != null ? key.toString() : key // null/undefined を保存する

    result[member] = value
  }

  return result as Record<string, V>
}
