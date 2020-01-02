export default function mapValues<K extends Index, T, U>(f: (x: T) => U, object: Record<K, T>): Record<K, U> {
  const result: Partial<Record<K, U>> = {}

  // tslint:disable-next-line:no-loop-statement
  for (const [i, x] of Object.entries(object)) {
    // tslint:disable-next-line:no-object-mutation
    result[i] = f(x)
  }

  return result as Record<K, U>
}
