import Id from '~/domain/vo/Id'
import Eq from '~/lib/trait/Eq'
import HashableEq from '~/lib/trait/HashableEq'

// TODO: move?
interface Identifiable {
  id: Id
}

export default abstract class Entity extends HashableEq implements Identifiable, Eq {
  constructor(
    public readonly id: Id
  ) {
    super()
  }

  public isIdenticalTo(that: this): boolean {
    return this.id.equals(that.id)
  }
}
