import hashCode from './hashCode'

describe('Number#hashCode', () => {
  it('should work like that of java.lang.Double', () => {
    expect(hashCode(-2)).toBe(-1073741824)
    expect(hashCode(-1)).toBe(-1074790400)
    expect(hashCode(0)).toBe(0)
    expect(hashCode(1)).toBe(1072693248)
    expect(hashCode(2)).toBe(1073741824)
    expect(hashCode(3.14)).toBe(300063655)
    expect(hashCode(Infinity)).toBe(2146435072)
    expect(hashCode(-Infinity)).toBe(-1048576)
    expect(hashCode(Number.MAX_VALUE)).toBe(-2146435072)
    expect(hashCode(Number.MIN_VALUE)).toBe(1) // 4.9E-324
    expect(hashCode(NaN)).toBe(2146959360)
  })
})
