// TODO: PartialEq, Congruence 等検討

/**
 * 同値風関係 [[equals]] と、異なる [[Eq]] のサブクラス間の同値風関係を表現するための補助メソッド [[canEqual]] を持つ。
 *
 * @implNote [[equals]] をオーバーライドする場合、 [[canEqual]] もオーバーライドしなければならない。
 */
export default abstract class Eq implements Class.Eq {
  /**
   * {this} と {that} が同値でありうるかどうかを返す。
   *
   * @implNote このメソッドをサブクラスでオーバーライドする場合、 {that} がそのクラスのインスタンスであるかどうかを返すように実装しなければならない。
   */
  protected abstract canEqual(that: Eq): boolean

  /**
   * {this} と {that} が同値かどうかを返す。
   *
   * @implNote このメソッドをオーバーライドする場合、 `this.canEqual(that) && that.canEqual(this)` でなければ FALSE を返すように実装しなければならない。
   */
  public abstract equals(that: Eq): boolean

  /**
   * @final
   */
  public isNotEqualTo(that: Eq): boolean {
    return !this.equals(that)
  }
}
