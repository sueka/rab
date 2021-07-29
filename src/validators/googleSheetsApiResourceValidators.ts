import { asObject, asString, asUnionOf, optional } from './commonValidators'
import { asListValue } from './protocolBuffersWellKnownTypesValidators'

const asDimension = asUnionOf('DIMENSION_UNSPECIFIED', 'COLUMNS', 'ROWS')

export const asValueRange = asObject<GoogleSheetsApi.ValueRange>((input) => ({
  range: optional(asString)(input.range),
  majorDimension: optional(asDimension)(input.majorDimension),
  values: optional(asListValue)(input.values),
}))
