/**
 * 同値関係を持つ。
 *
 * NOTE: 「集合 Eq 上の関係 equals が同値関係である」とは、次の条件を満たすことを言う。 Eq に属する任意の値 a, b, c について、
 *
 *       - a.equals(a) であり、
 *       - a.equals(b) → b.equals(a) であり、かつ
 *       - a.equals(b) && b.equals(c) → a.equals(c) である
 *
 * TODO: PartialEq, Congruence 等検討
 */
export default abstract class Eq implements Class.Eq {
  public abstract equals(that: this): boolean

  public isNotEqualTo(that: this): boolean {
    return !this.equals(that)
  }
}
