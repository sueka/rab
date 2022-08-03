export default function compactIterator<T>(xs: Iterator<T | null | undefined>): Iterator<T> {
  function* genIt() {
    while (true) {
      const x = xs.next()

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
