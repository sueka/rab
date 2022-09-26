import zipAllIterators from '~/extensions/Iterator/zipAllIterators'

export default function zipAllIterables<A, B>(xs: Iterable<A>, ys: Iterable<B>): Iterable<[A | undefined, B | undefined]> {
  return {
    [Symbol.iterator]() {
      return zipAllIterators(xs[Symbol.iterator](), ys[Symbol.iterator]())
    },
  }
}
