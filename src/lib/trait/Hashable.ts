import Eq from './Eq'

/**
 * Eq であり、さらに a.equals(b) → a.hashCode === b.hashCode な hashCode を持つ。
 */
export default abstract class Hashable extends Eq implements Eq {
  public equals(that: this) {
    return this.hashCode === that.hashCode
  }

  abstract get hashCode(): number // int
  // abstract readonly hashCode: number // runtime error
}
