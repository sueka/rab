export default function zipIterators<A, B>(xs: Iterator<A>, ys: Iterator<B>): Iterator<[A, B]> {
  function* genIt() {
    while (true) {
      const x = xs.next()
      const y = ys.next()

      if (x.done || y.done) {
        break
      }

      const values: [A, B] = [x.value, y.value]

      yield values
    }
  }

  return genIt()
}
