import { asObject, asString, asUnionOf, optional } from './commonValidators'
import { asListValue } from './protocolBuffersWellKnownTypesValidators'

const asDimension = asUnionOf('DIMENSION_UNSPECIFIED', 'COLUMNS', 'ROWS')

export const asValueRange = optional(asObject<GoogleSheetsApi.ValueRange>((input) => ({
  range: asString(input.range),
  majorDimension: asDimension(input.majorDimension),
  values: asListValue(input.values),
})))
