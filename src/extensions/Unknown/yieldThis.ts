export default function yieldThis<T extends unknown, U>(that: T, decorate: (that: T) => U): U {
  return decorate(that)
}
