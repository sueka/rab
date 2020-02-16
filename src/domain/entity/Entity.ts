import Id from '~/domain/vo/Id'
import Eq from '~/lib/trait/Eq'
import Hashable from '~/lib/trait/Hashable'

// TODO: move?
interface Identifiable {
  id: Id
}

export default abstract class Entity extends Hashable implements Identifiable, Eq {
  constructor(
    public readonly id: Id
  ) {
    super()
  }
}
