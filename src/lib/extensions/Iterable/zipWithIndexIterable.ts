import zipIterables from './zipIterables'

function* genIndex() {
  let index = 0 // tslint:disable-line:no-let

  // tslint:disable-next-line:no-loop-statement
  while (true) {
    yield index++
  }
}

export default function zipWithIndexIterable<A>(xs: Iterable<A>) {
  return zipIterables(xs, genIndex())
}
