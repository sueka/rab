import HashableEq from '~/trait/HashableEq'

export default interface Coordinates extends Chess.Coordinates {} // tslint:disable-line:no-empty-interface

export default class Coordinates extends HashableEq implements Class.ValueObject<Chess.Coordinates> {
  constructor({ file, rank }: Chess.Coordinates) {
    super()

    this.file = file
    this.rank = rank
  }

  public hashCode() {
    // tslint:disable-next-line:no-let
    let result = 0

    result = 31 * result + this.file.hashCode()
    result = 31 * result + this.rank.hashCode()

    return result
  }
}
