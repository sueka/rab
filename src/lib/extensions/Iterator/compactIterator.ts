export default function compactIterator<T>(xs: Iterator<T | null | undefined>): Iterator<T> {
  function* genIt() {
    // tslint:disable-next-line:no-loop-statement
    while (true) {
      const x = xs.next()

      // tslint:disable-next-line:strict-boolean-expressions
      if (x.done) {
        break
      }

      if (x.value != null) {
        yield x.value
      }
    }
  }

  return genIt()
}
