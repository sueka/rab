import { v4 } from 'uuid'

import Eq from '~/lib/trait/Eq'
import Hashable from '~/lib/trait/Hashable'
import Id from '~/domain/vo/Id'

// TODO: move?
interface Identifiable {
  id: Id
}

export default abstract class Entity extends Hashable implements Identifiable, Eq {
  constructor(
    public readonly id = new Id(v4())
  ) {
    super()
  }
}
