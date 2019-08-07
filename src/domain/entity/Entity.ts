import { v4 } from 'uuid'

import Id from 'src/domain/vo/Id'

// TODO: move?
interface Identifiable {
  id: Id
}

export default abstract class Entity implements Identifiable {
  constructor(
    public readonly id = new Id(v4())
  ) {}
}
