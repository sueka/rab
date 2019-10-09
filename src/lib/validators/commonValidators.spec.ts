import { ValidationError } from '~/lib/errors'
import { asUnionOf, asConstant, asBoolean, asNumber, asString } from './commonValidators'

describe('validators', () => {
  describe('asUnionOf', () => {
    it('should work with an OK argument', () => {
      expect(asUnionOf(0, '')(0)).toEqual(0)
      expect(asUnionOf(0, '')(-0)).toEqual(-0)
      expect(1 / asUnionOf(0, 1)(0)).toEqual(Infinity)
      expect(1 / asUnionOf(0, 1)(-0)).toEqual(-Infinity)
      expect(asUnionOf(0, '')('')).toEqual('')
    })

    it('should throw a ValidationError against a wrong argument', () => {
      expect(() => asUnionOf(0, '')(null)).toThrowError(ValidationError)
      expect(() => asUnionOf(0, '')(42)).toThrowError(ValidationError)
      expect(() => asUnionOf(0, '')('foo')).toThrowError(ValidationError)
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
    const asObject = asConstant({ answer: 42 })

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
      expect(asObject({ answer: 42 })).toEqual({ answer: 42 })
    })

    it('should throw a ValidationError against a wrong argument', () => {
      expect(() => asNull(false)).toThrowError(ValidationError)
      expect(() => asFalse(null)).toThrowError(ValidationError)
      expect(() => asZero(null)).toThrowError(ValidationError)
      expect(() => asZero('0')).toThrowError(ValidationError)
      expect(() => asEmptyString(null)).toThrowError(ValidationError)
      expect(() => asEmptyString([])).toThrowError(ValidationError)
      expect(() => asEmptyArray(null)).toThrowError(ValidationError)
      expect(() => asEmptyArray('')).toThrowError(ValidationError)
      expect(() => asCoins([6, 1, 2, 3])).toThrowError(ValidationError)
      expect(() => asEmptyObject({ answer: 42 })).toThrowError(ValidationError)
      expect(() => asObject({})).toThrowError(ValidationError)
      expect(() => asObject({ answer: 0 })).toThrowError(ValidationError)
      expect(() => asObject({ answer: 42, question: 'What do you get if you multiply six by nine?' })).toThrowError(ValidationError)
    })
  })
})

describe('validators', () => {
  describe('asBoolean', () => {
    it('should do nothing with a boolean', () => {
      expect(asBoolean(false)).toEqual(false)
      expect(asBoolean(true)).toEqual(true)
    })

    it('should throw a ValidationError against a non-boolean', () => {
      expect(() => asBoolean(null)).toThrowError(ValidationError)
      expect(() => asBoolean(0)).toThrowError(ValidationError)
      expect(() => asBoolean(NaN)).toThrowError(ValidationError)
      expect(() => asBoolean('')).toThrowError(ValidationError)
      expect(() => asBoolean([])).toThrowError(ValidationError)
      expect(() => asBoolean([false])).toThrowError(ValidationError)
      expect(() => asBoolean({})).toThrowError(ValidationError)
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

    it('should throw a ValidationError against a non-number', () => {
      expect(() => asNumber(null)).toThrowError(ValidationError)
      expect(() => asNumber(false)).toThrowError(ValidationError)
      expect(() => asNumber('')).toThrowError(ValidationError)
      expect(() => asNumber([])).toThrowError(ValidationError)
      expect(() => asNumber([0])).toThrowError(ValidationError)
      expect(() => asNumber({})).toThrowError(ValidationError)
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

    it('should throw a ValidationError against a non-string', () => {
      expect(() => asString(null)).toThrowError(ValidationError)
      expect(() => asString(false)).toThrowError(ValidationError)
      expect(() => asString(0)).toThrowError(ValidationError)
      expect(() => asString([])).toThrowError(ValidationError)
      expect(() => asString([''])).toThrowError(ValidationError)
      expect(() => asString({})).toThrowError(ValidationError)
    })
  })
})
