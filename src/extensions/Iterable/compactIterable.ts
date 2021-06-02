import compactIterator from '~/extensions/Iterator/compactIterator'

export default function compactIterable<T>(xs: Iterable<T | null | undefined>): Iterable<T> {
  return {
    [Symbol.iterator]() {
      return compactIterator(xs[Symbol.iterator]())
    },
  }
}
