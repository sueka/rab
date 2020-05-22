import HashableEq from '~/lib/trait/HashableEq'

/**
 * A primitive ValueObject
 */
export default abstract class ValueObject<T> extends HashableEq implements Class.ValueObject<{ value: T }> {
  constructor(
    public readonly value: T
  ) {
    super()

    if (!this.checkInvariant()) {
      throw new Error('Invariant Violation: ValueObject#checkInvariant() must be a tautology.') // TODO
    }
  }

  protected checkInvariant() {
    return true
  }
}
