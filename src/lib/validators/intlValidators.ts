import { Formats as FormatsType } from 'src/types/intlTypes'
import { ValidationError } from 'src/lib/errors'
import { typed } from 'src/lib/commonFunctions'
import { optional, unionOf, recordOf, asUnionOf, asBoolean, asString } from './commonValidators'

export function asFormats(input: Json): FormatsType {
  if (input === null || typeof input === 'boolean' || typeof input === 'number' || typeof input === 'string' || Array.isArray(input)) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an object.`)
  }

  try {
    return {
      number: optional(recordOf(asIntlNumberFormatOptions))(input.number),
      date: optional(recordOf(asIntlDateTimeFormatOptions))(input.date),
      time: optional(recordOf(asIntlDateTimeFormatOptions))(input.time),
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a Formats.`)
    }

    throw error
  }
}

function asIntlNumberFormatOptions(input: Json): Intl.NumberFormatOptions {
  if (input === null || typeof input === 'boolean' || typeof input === 'number' || typeof input === 'string' || Array.isArray(input)) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an object.`)
  }

  try {
    return {
      localeMatcher: optional(asUnionOf(['lookup', 'best fit'] as const))(input.localeMatcher),
      style: optional(asUnionOf(['decimal', 'currency', 'percent'] as const))(input.style),
      currency: optional(asString)(input.currency), // ISO 4217 currency code
      currencyDisplay: optional(asUnionOf(['symbol', 'code', 'name'] as const))(input.currencyDisplay),
      useGrouping: optional(asBoolean)(input.useGrouping),
      minimumIntegerDigits: optional(asUnionOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] as const))(input.minimumIntegerDigits),
      minimumFractionDigits: optional(asUnionOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as const))(input.minimumFractionDigits),
      maximumFractionDigits: optional(asUnionOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as const))(input.maximumFractionDigits),
      minimumSignificantDigits: optional(asUnionOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] as const))(input.minimumSignificantDigits),
      maximumSignificantDigits: optional(asUnionOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] as const))(input.maximumSignificantDigits),
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an Intl.NumberFormatOptions.`)
    }

    throw error
  }
}

function asIntlDateTimeFormatOptions(input: Json): Intl.DateTimeFormatOptions {
  if (input === null || typeof input === 'boolean' || typeof input === 'number' || typeof input === 'string' || Array.isArray(input)) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an object.`)
  }

  try {
    return {
      localeMatcher: optional(asUnionOf(['lookup', 'best fit'] as const))(input.localeMatcher),
      weekday: optional(asUnionOf(['narrow', 'short', 'long'] as const))(input.weekday),
      era: optional(asUnionOf(['narrow', 'short', 'long'] as const))(input.era),
      year: optional(asUnionOf(['numeric', '2-digit'] as const))(input.year),
      month: optional(asUnionOf(['numeric', '2-digit', 'narrow', 'short', 'long'] as const))(input.month),
      day: optional(asUnionOf(['numeric', '2-digit'] as const))(input.day),
      hour: optional(asUnionOf(['numeric', '2-digit'] as const))(input.hour),
      minute: optional(asUnionOf(['numeric', '2-digit'] as const))(input.minute),
      second: optional(asUnionOf(['numeric', '2-digit'] as const))(input.second),
      timeZoneName: optional(asUnionOf(['short', 'long'] as const))(input.timeZoneName),
      formatMatcher: optional(asUnionOf(['basic', 'best fit'] as const))(input.formatMatcher),
      hour12: optional(asBoolean)(input.hour12),
      timeZone: optional(unionOf(asUnionOf(['UTC'] as const), asString))(input.localeMatcher), // tz timezone
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an Intl.DateTimeFormatOptions.`)
    }

    throw error
  }
}
