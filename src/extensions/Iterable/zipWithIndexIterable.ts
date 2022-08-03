import zipIterables from './zipIterables'

function* genIndex() {
  let index = 0

  while (true) {
    yield index++
  }
}

export default function zipWithIndexIterable<A>(xs: Iterable<A>) {
  return zipIterables(xs, genIndex())
}
