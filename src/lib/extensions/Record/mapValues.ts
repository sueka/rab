export default function mapValues<T, U>(f: (x: T) => U, object: Record<string, T>): Record<string, U> {
  const result: Record<string, U> = {}

  // tslint:disable-next-line:no-loop-statement
  for (const [i, x] of Object.entries(object)) {
    // tslint:disable-next-line:no-object-mutation
    result[i] = f(x)
  }

  return result
}
