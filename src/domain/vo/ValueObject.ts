import { ValidationError } from '~/lib/errors'
import Eq from '~/lib/trait/Eq'
import Hashable from '~/lib/trait/Hashable'

/**
 * A primitive ValueObject
 */
export default abstract class ValueObject<T> extends Hashable implements Eq {
  constructor(
    public readonly value: T
  ) {
    super()

    if (!this.checkInvariant()) {
      throw new ValidationError('Invariant Violation: ValueObject#checkInvariant() must be a tautology.')
    }
  }

  protected checkInvariant() {
    return true
  }
}
