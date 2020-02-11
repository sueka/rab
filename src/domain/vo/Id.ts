import ValueObject from './ValueObject'

// TODO: remove
function seemsLikeUuid(s: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(s)
}

export default class Id extends ValueObject<string> {
  public static deserialize(serialized: string): Id {
    return new Id(serialized)
  }

  public serialize(): string {
    return this.value
  }

  protected checkInvariant() {
    return seemsLikeUuid(this.value)
  }

  public hashCode() {
    // tslint:disable-next-line:no-let
    let result = 17

    result = 31 * result + this.value.hashCode()

    return result
  }
}
