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
  protected canEqual(that: Eq): that is HashableEq {
    return that instanceof HashableEq
  }

  /**
   * NOTE: このメソッドをサブクラスでオーバーライドする場合、 `this.canEqual(that) && that.canEqual(this) && this.hashCode() === that.hashCode()` でなければ FALSE を返すように実装しなければならない。
   */
  public equals(that: Eq): boolean {
    return this.canEqual(that) && that.canEqual(this) && this.hashCode() === that.hashCode()
  }

  public abstract hashCode(): number // int
}
