export default function mapValues<K extends Index, T, U>(object: Record<K, T>, f: (x: T) => U): Record<K, U> {
  const result: Partial<Record<K, U>> = {}

  for (const [i, x] of Object.entries(object)) {
    result[i] = f(x)
  }

  return result as Record<K, U>
}
