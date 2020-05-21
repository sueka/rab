import Eq from './Eq'

/**
 * Eq であり、さらに a.equals(b) → a.hashCode() === b.hashCode() な hashCode を持つ。
 */
export default abstract class Hashable extends Eq implements Class.Hashable {
  public equals(that: Eq): boolean {
    if (that instanceof this.constructor) {
      const thatAsThis = that as this // TODO

      return this.hashCode() === thatAsThis.hashCode()
    } else {
      return false
    }
  }

  public abstract hashCode(): number // int
}
