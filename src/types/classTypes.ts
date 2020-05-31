declare namespace Class {
  interface Eq {
    equals(that: unknown): boolean
  }

  interface Hashable {
    hashCode(): number // int
  }

  type ValueObject<T> = T & Class.Eq & Class.Hashable
}
