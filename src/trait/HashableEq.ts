import Eq from './Eq'

/**
 * [[Eq]] であり、さらにハッシュ関数 [[hashCode]] を持つ。
 */
export default abstract class HashableEq extends Eq implements Class.Hashable {
  protected canEqual(that: Eq): that is HashableEq {
    return that instanceof HashableEq
  }

  /**
   * `this` と `that` が同値かどうかを返す。
   *
   * @implNote このメソッドをオーバーライドする場合、 `this.hashCode() === that.hashCode()` でなければ FALSE を返すように実装しなければならない。
   */
  public equals(that: Eq): boolean {
    return this.canEqual(that) && that.canEqual(this) && this.hashCode() === that.hashCode()
  }

  public abstract hashCode(): number // int
}
