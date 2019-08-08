/**
 * 同値関係 equals を持つ。
 *
 * TODO: PartialEq, Congruence 等検討
 */
export default abstract class Eq {
  public abstract equals(that: this): boolean

  public isNotEqualTo(that: this): boolean {
    return !this.equals(that)
  }
}
