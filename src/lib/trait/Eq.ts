/**
 * 同値関係を持つ。
 *
 * TODO: PartialEq, Congruence 等検討
 */
export default abstract class Eq implements Class.Eq {
  public abstract equals(that: this): boolean

  public isNotEqualTo(that: this): boolean {
    return !this.equals(that)
  }
}
