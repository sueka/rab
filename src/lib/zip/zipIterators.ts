export default function zipIterators<A, B>(xs: Iterator<A>, ys: Iterator<B>, onDone?: () => void): Iterator<[A, B]> {
  function* genIt() {
    while (true) {
      const x = xs.next()
      const y = ys.next()

      if (x.done || y.done) {
        if (onDone !== undefined) {
          onDone()
        }

        break
      }

      const values: [A, B] = [x.value, y.value]

      yield values
    }
  }

  return genIt()
}
