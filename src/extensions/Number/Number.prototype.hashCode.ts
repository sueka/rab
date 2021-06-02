import hashCode from './hashCode'

export {}

declare global {
  interface Number {
    hashCode(): number
  }
}

Object.defineProperty(Number.prototype, 'hashCode', {
  value(this: number) {
    return hashCode(this)
  },
})
