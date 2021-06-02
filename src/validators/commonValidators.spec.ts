import { asBoolean, asConstant, asNumber, asString, asUnionOf } from './commonValidators'

describe('validators', () => {
  describe('asUnionOf', () => {
    it('should work with an OK argument', () => {
      expect(asUnionOf(0, '')(0)).toEqual(0)
      expect(asUnionOf(0, '')(-0)).toEqual(-0)
      expect(1 / asUnionOf(0, 1)(0)).toEqual(Infinity)
      expect(1 / asUnionOf(0, 1)(-0)).toEqual(-Infinity)
      expect(asUnionOf(0, '')('')).toEqual('')
    })

    it('should throw an Error against a wrong argument', () => {
      expect(() => asUnionOf(0, '')(null)).toThrowError()
      expect(() => asUnionOf(0, '')(42)).toThrowError()
      expect(() => asUnionOf(0, '')('foo')).toThrowError()
    })
  })
})

describe('validators', () => {
  describe('asConstant', () => {
    const asNull = asConstant(null)
    const asFalse = asConstant(false)
    const asZero = asConstant(0)
    const asEmptyString = asConstant('')
    const asEmptyArray = asConstant([])
    const asCoins = asConstant([1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000] as const)
    const asEmptyObject = asConstant({})
    const asSimpleObject = asConstant({ answer: 42 } as const)

    it('should do nothing with an OK argument', () => {
      expect(asNull(null)).toEqual(null)
      expect(asFalse(false)).toEqual(false)
      expect(asZero(0)).toEqual(0)
      expect(asZero(-0)).toEqual(-0)
      expect(1 / asZero(0)).toEqual(Infinity)
      expect(1 / asZero(-0)).toEqual(-Infinity)
      expect(asEmptyString('')).toEqual('')
      expect(asEmptyArray([])).toEqual([])
      expect(asCoins([1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000])).toEqual([1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000])
      expect(asEmptyObject({})).toEqual({})
      expect(asSimpleObject({ answer: 42 })).toEqual({ answer: 42 })
    })

    it('should throw an Error against a wrong argument', () => {
      expect(() => asNull(false)).toThrowError()
      expect(() => asFalse(null)).toThrowError()
      expect(() => asZero(null)).toThrowError()
      expect(() => asZero('0')).toThrowError()
      expect(() => asEmptyString(null)).toThrowError()
      expect(() => asEmptyString([])).toThrowError()
      expect(() => asEmptyArray(null)).toThrowError()
      expect(() => asEmptyArray('')).toThrowError()
      expect(() => asCoins([6, 1, 2, 3])).toThrowError()
      expect(() => asEmptyObject({ answer: 42 })).toThrowError()
      expect(() => asSimpleObject({})).toThrowError()
      expect(() => asSimpleObject({ answer: 0 })).toThrowError()
      expect(() => asSimpleObject({ answerr: 42 })).toThrowError() // typo
      expect(() => asSimpleObject({ answer: 42, question: 'What do you get if you multiply six by nine?' })).toThrowError()
    })
  })
})

describe('validators', () => {
  describe('asBoolean', () => {
    it('should do nothing with a boolean', () => {
      expect(asBoolean(false)).toEqual(false)
      expect(asBoolean(true)).toEqual(true)
    })

    it('should throw an Error against a non-boolean', () => {
      expect(() => asBoolean(null)).toThrowError()
      expect(() => asBoolean(0)).toThrowError()
      expect(() => asBoolean(NaN)).toThrowError()
      expect(() => asBoolean('')).toThrowError()
      expect(() => asBoolean([])).toThrowError()
      expect(() => asBoolean([false])).toThrowError()
      expect(() => asBoolean({})).toThrowError()
    })
  })
})

describe('validators', () => {
  describe('asNumber', () => {
    it('should do nothing with a number', () => {
      expect(asNumber(0)).toEqual(0)
      expect(1 / asNumber(0)).toEqual(Infinity)
      expect(1 / asNumber(-0)).toEqual(-Infinity)
      expect(asNumber(NaN)).toEqual(NaN)
      expect(asNumber(42)).toEqual(42)
      expect(asNumber(Infinity)).toEqual(Infinity)
    })

    it('should throw an Error against a non-number', () => {
      expect(() => asNumber(null)).toThrowError()
      expect(() => asNumber(false)).toThrowError()
      expect(() => asNumber('')).toThrowError()
      expect(() => asNumber([])).toThrowError()
      expect(() => asNumber([0])).toThrowError()
      expect(() => asNumber({})).toThrowError()
    })
  })
})

describe('validators', () => {
  describe('asString', () => {
    it('should do nothing with a string', () => {
      expect(asString('')).toEqual('')
      expect(asString('A')).toEqual('A')
      expect(asString('foobar')).toEqual('foobar')
    })

    it('should throw an Error against a non-string', () => {
      expect(() => asString(null)).toThrowError()
      expect(() => asString(false)).toThrowError()
      expect(() => asString(0)).toThrowError()
      expect(() => asString([])).toThrowError()
      expect(() => asString([''])).toThrowError()
      expect(() => asString({})).toThrowError()
    })
  })
})
