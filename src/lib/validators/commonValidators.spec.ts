import { ValidationError } from 'src/lib/errors'
import { asBoolean, asNumber, asString } from './commonValidators'

describe('validators', () => {
  describe('asBoolean', () => {
    it('should do nothing with a boolean', () => {
      expect(asBoolean(false)).toBe(false)
      expect(asBoolean(true)).toBe(true)
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
      expect(asNumber(0)).toBe(0)
      expect(asNumber(NaN)).toBe(NaN)
      expect(asNumber(42)).toBe(42)
      expect(asNumber(Infinity)).toBe(Infinity)
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
      expect(asString('')).toBe('')
      expect(asString('A')).toBe('A')
      expect(asString('foobar')).toBe('foobar')
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
