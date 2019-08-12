import hashCode from 'src/lib/extensions/String/hashCode'
import ValueObject from './ValueObject'

export default class Id extends ValueObject<string> {
  public static deserialize(serialized: string): Id {
    return new Id(serialized)
  }

  public serialize(): string {
    return this.value
  }

  protected checkInvariant() {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(this.value)
  }

  get hashCode() {
    // tslint:disable-next-line:no-let
    let result = 17

    result = 31 * result + hashCode(this.value)

    return result
  }
}
