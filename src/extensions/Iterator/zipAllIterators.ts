export default function zipAllIterators<A, B>(xs: Iterator<A, undefined>, ys: Iterator<B, undefined>): Iterator<[A | undefined, B | undefined]> {
  function* genIt() {
    while (true) {
      const x = xs.next()
      const y = ys.next()

      if (x.done && y.done) {
        break
      }

      const values: [A | undefined, B | undefined] = [x.value, y.value]

      yield values
    }
  }

  return genIt()
}
