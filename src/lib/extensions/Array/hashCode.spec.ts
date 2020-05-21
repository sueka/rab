import hashCode from './hashCode'

describe('Array#hashCode', () => {
  it('should work like java.util.Arrays.hashCode', () => {
    expect(hashCode([])).toBe(1)
    expect(hashCode([false])).toBe(1268)
    expect(hashCode([false, false])).toBe(40545)
    expect(hashCode([true])).toBe(1262)
    expect(hashCode([0])).toBe(31)
    expect(hashCode([0, 0])).toBe(961)
    expect(hashCode([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])).toBe(129082719) // 31 ** 10 ≤ 2 ** 53 - 1 < 31 ** 11
    expect(hashCode([6.02214076])).toBe(1364752828)
    expect(hashCode([''])).toBe(31)
    expect(hashCode(['', ''])).toBe(961)
    expect(hashCode(['🍻'])).toBe(1773278)
    expect(hashCode([false, 0, ''])).toBe(1218548)
    expect(hashCode([true, 6.02214076, '🍻'])).toBe(-639350224)
  })
})
