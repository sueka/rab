import hashCode from './hashCode'

export {}

declare global {
  interface Boolean {
    hashCode(): number
  }
}

Object.defineProperty(Boolean.prototype, 'hashCode', {
  value(this: boolean) {
    return hashCode(this)
  },
})
