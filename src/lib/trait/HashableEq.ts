import Eq from './Eq'

/**
 * Eq であり、さらに a.equals(b) → a.hashCode() === b.hashCode() な hashCode を持つ。
 */
export default abstract class HashableEq extends Eq implements Class.Hashable {
  /**
   * @final
   */
  protected canEqual(that: Eq): boolean {
    return that instanceof HashableEq
  }

  public equals(that: Eq): boolean {
    if (that instanceof HashableEq) {
      const thatAsThis = that as this // TODO

      return thatAsThis.canEqual(this) && this.hashCode() === thatAsThis.hashCode()
    } else {
      return false
    }
  }

  public abstract hashCode(): number // int
}
