declare namespace GoogleSheetsApi {
  interface ValueRange {
    range: string
    majorDimension: Dimension
    values: JsonArray
  }

  type Dimension =
    | 'DIMENSION_UNSPECIFIED'
    | 'ROWS'
    | 'COLUMNS'
}
