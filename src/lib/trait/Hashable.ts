import Eq from './Eq'

/**
 * Eq であり、さらに a.hashCode === b.hashCode ⇔ a.equals(b) な hashCode を持つ。
 */
export default abstract class Hashable extends Eq implements Eq {
  public equals(that: this) {
    return this.hashCode === that.hashCode
  }

  abstract get hashCode(): string
  // abstract readonly hashCode: string
}
