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

  interface Spreadsheet {
    sheets?: Sheet[]
    // TODO: more
  }

  interface Sheet {
    data?: GridData[]
    // TODO: more
  }

  interface GridData {
    columnMetadata?: DimensionProperties[]
    // TODO: more
  }

  interface DimensionProperties {
    pixelSize?: number // integer
    // TODO: more
  }
}
