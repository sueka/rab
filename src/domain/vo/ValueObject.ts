import { ValidationError } from '~/lib/errors'
import Hashable from '~/lib/trait/Hashable'

/**
 * A primitive ValueObject
 */
export default abstract class ValueObject<T> extends Hashable implements Class.ValueObject<{ value: T }> {
  constructor(
    public readonly value: T
  ) {
    super()

    if (!this.checkInvariant()) {
      throw new ValidationError('Invariant Violation: ValueObject#checkInvariant() must be a tautology.') // TODO
    }
  }

  protected checkInvariant() {
    return true
  }
}
