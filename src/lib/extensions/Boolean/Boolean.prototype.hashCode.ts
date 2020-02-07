import hashCode from './hashCode'

export {}

declare global {
  interface Boolean {
    hashCode: Method<typeof hashCode>
  }
}

Object.defineProperty(Boolean.prototype, 'hashCode', {
  value(this: Parameters<typeof hashCode>[0]) {
    return hashCode(this)
  }
})
