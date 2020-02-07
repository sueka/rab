declare namespace Class {
  interface Eq<T = unknown> {
    equals(this: T, that: T): boolean
  }

  interface Hashable extends Eq {
    hashCode(): number // int
  }

  type ValueObject<T> = T & Class.Eq & Class.Hashable
}
