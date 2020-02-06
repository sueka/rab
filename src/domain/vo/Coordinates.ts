import hashCode from '~/lib/extensions/Coordinates/hashCode'
import Eq from '~/lib/trait/Eq'
import Hashable from '~/lib/trait/Hashable'

export default interface Coordinates extends Chess.Coordinates {} // tslint:disable-line:no-empty-interface

export default class Coordinates extends Hashable implements Eq, Chess.Coordinates {
  constructor({ file, rank }: Chess.Coordinates) {
    super()

    this.file = file
    this.rank = rank
  }

  public hashCode() {
    return hashCode(this)
  }
}
