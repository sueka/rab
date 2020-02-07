import hashCode from './hashCode'

export {}

declare global {
  interface String {
    hashCode: Method<typeof hashCode>
  }
}

Object.defineProperty(String.prototype, 'hashCode', {
  value(this: Parameters<typeof hashCode>[0]) {
    return hashCode(this)
  },
})
