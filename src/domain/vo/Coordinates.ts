import hashCode from '~/lib/extensions/Coordinates/hashCode'
import Eq from '~/lib/trait/Eq'
import Hashable from '~/lib/trait/Hashable'

export default class Coordinates extends Hashable implements Eq, Chess.Coordinates {
  public readonly file: Chess.File
  public readonly rank: Chess.Rank

  constructor({ file, rank }: Chess.Coordinates) {
    super()

    this.file = file
    this.rank = rank
  }

  public hashCode() {
    return hashCode(this)
  }
}
