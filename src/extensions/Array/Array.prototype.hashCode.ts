import hashCode from './hashCode'

export {}

declare global {
  interface Array<T> {
    hashCode(): number
  }
}

Object.defineProperty(Array.prototype, 'hashCode', {
  value<T extends boolean | number | string>(this: T[]) {
    return hashCode(this)
  },
})
