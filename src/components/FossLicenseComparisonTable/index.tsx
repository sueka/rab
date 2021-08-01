import { List } from 'immutable'
import { useInjection } from 'inversify-react'
import React, { useEffect, useState } from 'react'
import { generatePath } from 'react-router'

import DataTable, { Column, Row } from '~/components/DataTable'
import ConfigRegistry from '~/config/ConfigRegistry'
import zipIterables from '~/extensions/Iterable/zipIterables'
import useFetch from '~/hooks/useFetch'
import typed from '~/typed'
import { asSpreadsheet, asValueRange } from '~/validators/googleSheetsApiResourceValidators'

// TODO: remove
type CellValue = string | number

// TODO: remove
function isCellValue(input: unknown): input is CellValue {
  switch (typeof input) {
    case 'string':
    case 'number': return true
    default: return false
  }
}

const FossLicenseComparisonTable: React.FC = () => {
  const config = useInjection<ConfigRegistry>('EnvVarConfig')

  const getSpreadsheetResponse = useFetch(generatePath(typed<[string]>`${ config.get('SHEETS_API_URL') }/spreadsheets/:spreadsheetId\\?ranges=:sheetName&includeGridData=:includeGridData&fields=:fields&key=:apiKey`, {
    spreadsheetId: config.get('GOOGLE_SHEETS_FOSS_COMPARISON_TABLE_SHEET_ID'),
    sheetName: config.get('GOOGLE_SHEETS_FOSS_COMPARISON_TABLE_SHEET_SHEET_NAME'),
    includeGridData: true,
    fields: 'sheets.data.columnMetadata',
    apiKey: config.get('GOOGLE_CLOUD_APIS_GOOGLE_SHEETS_API_KEY'),
  }))

  const getSpreadsheetValuesResponse = useFetch(generatePath(typed<[string]>`${ config.get('SHEETS_API_URL') }/spreadsheets/:spreadsheetId/values/:sheetName\\?key=:apiKey`, {
    spreadsheetId: config.get('GOOGLE_SHEETS_FOSS_COMPARISON_TABLE_SHEET_ID'),
    sheetName: config.get('GOOGLE_SHEETS_FOSS_COMPARISON_TABLE_SHEET_SHEET_NAME'),
    apiKey: config.get('GOOGLE_CLOUD_APIS_GOOGLE_SHEETS_API_KEY'),
  }))

  const [columns, setColumns] = useState<Column[] | null>(null)
  const [rows, setRows] = useState<Row[] | null>(null)

  useEffect(() => {
    // tslint:disable-next-line:semicolon
    ;(async () => {
      if (getSpreadsheetResponse === null || getSpreadsheetValuesResponse === null) {
        return
      }

      const columnMetadata = asSpreadsheet(await getSpreadsheetResponse.json()).sheets?.[0].data?.[0].columnMetadata
      const sheets = asValueRange(await getSpreadsheetValuesResponse.json())

      if (columnMetadata === undefined) {
        throw new Error('No columnMetadata found.')
      }

      if (sheets?.majorDimension !== 'ROWS') {
        throw new Error('Dimension unsupported.')
      }

      if (sheets.values === undefined || !sheets.values.every<JsonArray>(Array.isArray)) {
        throw new Error('Less than 2 dimensions found.')
      }

      if (!sheets.values.every((row): row is CellValue[] => row.every(isCellValue))) {
        throw new Error('Neither string nor number value found.')
      }

      const [firstRowValues, ...restRowsValues] = sheets.values

      const fields = firstRowValues.map((cellValue, i) => typed<[CellValue, number]>`${ cellValue }_${ i }`)

      setColumns(Array.from(zipIterables(fields, zipIterables(firstRowValues, columnMetadata))).map(([field, [cellValue, { pixelSize }]]) => ({
        field,
        label: cellValue,
        width: pixelSize,
      })))

      setRows(restRowsValues.map((rowValues) => Object.fromEntries(zipIterables(fields, rowValues))))
    })()
  }, [getSpreadsheetResponse, getSpreadsheetValuesResponse])

  if (columns === null || rows === null) {
    return null
  }

  return (
    <DataTable
      columns={ List(columns).sortBy((column) => column.field, (a, b) => {
        if (a < b) return -1
        else if (a > b) return 1
        else return 0
      }).toArray() }
      rows={ rows }
    />
  )
}

export default FossLicenseComparisonTable
