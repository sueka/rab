import hashCode from './hashCode'

describe('Boolean#hashCode', () => {
  it('should work like that of java.lang.Boolean', () => {
    expect(hashCode(false)).toBe(1237)
    expect(hashCode(true)).toBe(1231)
  })
})
