import zipIterators from './zipIterators'

export default function zipIterables<A, B>(xs: Iterable<A>, ys: Iterable<B>): Iterable<[A, B]> {
  return {
    [Symbol.iterator]() {
      return zipIterators(xs[Symbol.iterator](), ys[Symbol.iterator]())
    }
  }
}
