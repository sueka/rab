import { asNumber, asObject, asString, asUnionOf, listOf, optional } from './commonValidators'
import { asListValue } from './protocolBuffersWellKnownTypesValidators'

const asDimension = asUnionOf('DIMENSION_UNSPECIFIED', 'COLUMNS', 'ROWS')

export const asValueRange = asObject<GoogleSheetsApi.ValueRange>((input) => ({
  range: optional(asString)(input.range),
  majorDimension: optional(asDimension)(input.majorDimension),
  values: optional(asListValue)(input.values),
}))

export const asSpreadsheet = asObject<GoogleSheetsApi.Spreadsheet>((input) => ({
  sheets: optional(listOf(asSheet))(input.sheets),
}))

export const asSheet = asObject<GoogleSheetsApi.Sheet>((input) => ({
  data: optional(listOf(asGridData))(input.data),
}))

export const asGridData = asObject<GoogleSheetsApi.GridData>((input) => ({
  columnMetadata: optional(listOf(asDimensionProperties))(input.columnMetadata),
}))

export const asDimensionProperties = asObject<GoogleSheetsApi.DimensionProperties>((input) => ({
  pixelSize: optional(asNumber)(input.pixelSize),
}))
