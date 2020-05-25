/**
 * 同値関係を持つ。
 *
 * NOTE: 「集合 Eq 上の関係 equals が同値関係である」とは、次の条件を満たすことを言う。 Eq に属する任意の値 a, b, c について、
 *
 *       - a.equals(a) であり、
 *       - a.equals(b) → b.equals(a) であり、かつ
 *       - a.equals(b) ∧ b.equals(c) → a.equals(c) である。
 *
 * NOTE: {equals} をオーバーライドする場合、 {canEqual} もオーバーライドしなければならない。
 *
 * NOTE: Eq に属する任意の値 a, b について、 a.equals(b) → a.canEqual(b) である。
 *
 * TODO: PartialEq, Congruence 等検討
 */
export default abstract class Eq implements Class.Eq {
  /**
   * {this} が {that} と同値でありうるかどうかを返す。
   *
   * NOTE: このメソッドをサブクラスでオーバーライドする場合、 {that} がそのクラスのインスタンスであるかどうかを返すように実装しなければならない。
   */
  protected abstract canEqual(that: Eq): boolean

  /**
   * {this} と {that} が同値かどうかを返す。
   *
   * NOTE: このメソッドをオーバーライドする場合、 `this.canEqual(that) && that.canEqual(this)` でなければ FALSE を返すように実装しなければならない。
   */
  public abstract equals(that: Eq): boolean

  /**
   * @final
   */
  public isNotEqualTo(that: Eq): boolean {
    return !this.equals(that)
  }
}
