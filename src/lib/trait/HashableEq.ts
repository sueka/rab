import Eq from './Eq'

/**
 * Eq であり、さらに a.equals(b) → a.hashCode() === b.hashCode() な hashCode を持つ。
 *
 * NOTE: {canEqual} と {equals} のいずれか一方だけをオーバーライドすると、対称律が破られることがある。
 */
export default abstract class HashableEq extends Eq implements Class.Hashable {
  /**
   * NOTE: このメソッドをサブクラスでオーバーライドする場合、 {that} がそのクラスのインスタンスであるかどうかを返すように実装しなければならない。
   */
  protected canEqual(that: Eq): boolean {
    return that instanceof HashableEq
  }

  /**
   * NOTE: このメソッドをサブクラスでオーバーライドする場合、 {that} がそのクラスのインスタンスでない場合は FALSE を返すように実装しなければならない。
   */
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
