import hashCodeNumber from '~/lib/extensions/Number/hashCode'

export default function hashCode(coord: Chess.Coordinates) {
  // tslint:disable-next-line:no-let
  let result = hashCodeNumber(coord.file)

  result = 31 * result + hashCodeNumber(coord.rank)

  return result
}
