declare namespace GoogleSheetsApi {
  // NOTE: fields: FieldMask があるので、どのメンバーも省略されることがある。

  interface ValueRange {
    range?: string
    majorDimension?: Dimension
    values?: JsonArray
  }

  type Dimension =
    | 'DIMENSION_UNSPECIFIED'
    | 'ROWS'
    | 'COLUMNS'
}
