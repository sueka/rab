import { Formats } from 'intl-messageformat'

import { asBoolean, asObject, asString, asUnionOf, optional, recordOf, unionOf } from './commonValidators'

export const asFormats = asObject<Partial<Formats>>((input) => ({ // TODO
  number: optional(recordOf(asIntlNumberFormatOptions))(input.number),
  date: optional(recordOf(asIntlDateTimeFormatOptions))(input.date),
  time: optional(recordOf(asIntlDateTimeFormatOptions))(input.time),
}))

const asIntlNumberFormatOptions = asObject<Intl.NumberFormatOptions>((input) => ({
  localeMatcher: optional(asUnionOf('lookup', 'best fit'))(input.localeMatcher),
  style: optional(asUnionOf('decimal', 'currency', 'percent'))(input.style),
  currency: optional(asString)(input.currency), // ISO 4217 currency code
  currencyDisplay: optional(asUnionOf('symbol', 'code', 'name'))(input.currencyDisplay),
  useGrouping: optional(asBoolean)(input.useGrouping),
  minimumIntegerDigits: optional(asUnionOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21))(input.minimumIntegerDigits),
  minimumFractionDigits: optional(asUnionOf(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20))(input.minimumFractionDigits),
  maximumFractionDigits: optional(asUnionOf(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20))(input.maximumFractionDigits),
  minimumSignificantDigits: optional(asUnionOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21))(input.minimumSignificantDigits),
  maximumSignificantDigits: optional(asUnionOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21))(input.maximumSignificantDigits),
}))

const asIntlDateTimeFormatOptions = asObject<Intl.DateTimeFormatOptions>((input) => ({
  localeMatcher: optional(asUnionOf('lookup', 'best fit'))(input.localeMatcher),
  weekday: optional(asUnionOf('narrow', 'short', 'long'))(input.weekday),
  era: optional(asUnionOf('narrow', 'short', 'long'))(input.era),
  year: optional(asUnionOf('numeric', '2-digit'))(input.year),
  month: optional(asUnionOf('numeric', '2-digit', 'narrow', 'short', 'long'))(input.month),
  day: optional(asUnionOf('numeric', '2-digit'))(input.day),
  hour: optional(asUnionOf('numeric', '2-digit'))(input.hour),
  minute: optional(asUnionOf('numeric', '2-digit'))(input.minute),
  second: optional(asUnionOf('numeric', '2-digit'))(input.second),
  timeZoneName: optional(asUnionOf('short', 'long'))(input.timeZoneName),
  formatMatcher: optional(asUnionOf('basic', 'best fit'))(input.formatMatcher),
  hour12: optional(asBoolean)(input.hour12),
  timeZone: optional(unionOf(asUnionOf('UTC'), asString))(input.localeMatcher), // tz timezone
}))
