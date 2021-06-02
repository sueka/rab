import hashCode from './hashCode'

describe('String#hashCode', () => {
  it('should work like that of java.lang.String', () => {
    expect(hashCode('')).toBe(0)
    expect(hashCode('a')).toBe(97)
    expect(hashCode('aa')).toBe(3104)
    expect(hashCode('日本語')).toBe(25921943)
    expect(hashCode('🌊')).toBe(1773134)
  })
})
