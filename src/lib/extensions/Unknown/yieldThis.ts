export default function yieldThis<T extends unknown, U>(decorate: (that: T) => U, that: T): U {
  return decorate(that)
}
