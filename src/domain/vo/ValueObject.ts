import assert from 'assert'

import Eq from 'src/lib/trait/Eq'
import Hashable from 'src/lib/trait/Hashable'

export default abstract class ValueObject<T> extends Hashable implements Eq {
  constructor(
    public readonly value: T
  ) {
    super()

    assert(this.checkInvariant())
  }

  protected checkInvariant() {
    return true
  }
}