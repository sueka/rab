import { useInjection } from 'inversify-react'
import React, { useEffect, useState } from 'react'
import { generatePath } from 'react-router'

import DataTable, { Column, Row } from '~/components/DataTable'
import ConfigRegistry from '~/config/ConfigRegistry'
import zipIterables from '~/extensions/Iterable/zipIterables'
import useFetch from '~/hooks/useFetch'
import typed from '~/typed'
import { asValueRange } from '~/validators/googleSheetsApiResourceValidators'

// TODO: remove
function isStringOrNumber(input: unknown): input is string | number {
  switch (typeof input) {
    case 'string':
    case 'number': return true
    default: return false
  }
}

const FossLicenseComparisonTable: React.FC = () => {
  const config = useInjection<ConfigRegistry>('EnvVarConfig')

  const response = useFetch(generatePath(typed<[string]>`${ config.get('SHEETS_API_URL') }/spreadsheets/:spreadsheetId/values/:sheetName\\?key=:apiKey`, {
    spreadsheetId: config.get('GOOGLE_SHEETS_FOSS_COMPARISON_TABLE_SHEET_ID'),
    sheetName: config.get('GOOGLE_SHEETS_FOSS_COMPARISON_TABLE_SHEET_SHEET_NAME'),
    apiKey: config.get('GOOGLE_CLOUD_APIS_GOOGLE_SHEETS_API_KEY'),
  }))

  const [columns, setColumns] = useState<Column[] | null>(null)
  const [rows, setRows] = useState<Row[] | null>(null)

  useEffect(() => {
    // tslint:disable-next-line:semicolon
    ;(async () => {
      const sheets = asValueRange(await response?.json())

      if (sheets === undefined) {
        return
      }

      if (sheets?.majorDimension !== 'ROWS') {
        throw new Error('Dimension unsupported.')
      }

      if (!sheets.values.every<JsonArray>(Array.isArray)) {
        throw new Error('Less than 2 dimensions found.')
      }

      if (!sheets.values.every((row): row is (string | number)[] => row.every(isStringOrNumber))) {
        throw new Error('Neither string nor number value found.')
      }

      const [firstRowValues, ...rowValues] = sheets.values

      const columnValues = firstRowValues.map((cell) => ({
        field: cell, // TODO: unique
      }))

      setColumns(columnValues)
      setRows(rowValues.map((row) => Object.fromEntries(zipIterables(firstRowValues, row))))
    })()
  }, [response])

  if (columns === null || rows === null) {
    return null
  }

  return (
    <DataTable
      columns={ columns }
      rows={ rows }
    />
  )
}

export default FossLicenseComparisonTable
