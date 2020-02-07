import hashCode from './hashCode'

export {}

declare global {
  interface Number {
    hashCode: Method<typeof hashCode>
  }
}

Object.defineProperty(Number.prototype, 'hashCode', {
  value(this: Parameters<typeof hashCode>[0]) {
    return hashCode(this)
  },
})
