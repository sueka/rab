import hashCode from './hashCode'

export {}

declare global {
  interface String {
    hashCode(): number
  }
}

Object.defineProperty(String.prototype, 'hashCode', {
  value(this: string) {
    return hashCode(this)
  },
})
