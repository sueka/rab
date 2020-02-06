import hashCode from '~/lib/extensions/Coordinates/hashCode'
import ValueObject from './ValueObject'

export default class Coordinates extends ValueObject<Chess.Coordinates> {
  public hashCode() {
    // tslint:disable-next-line:no-let
    let result = 17

    result = 31 * result + hashCode(this.value)

    return result
  }
}
