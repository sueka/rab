import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { List, OrderedMap } from 'immutable'
import React, { useCallback, useMemo, useState } from 'react'

interface Props {
  columns: Column[]
  rows: Row[]
  defaultSortOrder?: SortOrder
}

export interface Column {
  field: Field
  label?: React.ReactNode
}

export type Row = {
  [key in Field]: React.ReactNode
}

type Field = string | number

// TODO: remove
function compareStrings(a: string, b: string): number {
  if (a < b) return -1
  else if (a > b) return 1
  else return 0
}

const DataTable: React.FC<Props> = ({ columns, rows, defaultSortOrder = 'asc' }) => {
  const [sorts, setSorts] = useState<Sort<Row>[]>([])

  // NOTE: TypeScript のメンバーアクセス演算は部分関数ではない (cf. https://github.com/microsoft/TypeScript/issues/13778)
  const primarySort = useMemo<Sort<Row> | undefined>(() => sorts[0], [sorts])

  const createSortLabelClickHandler = useCallback((field: Field) => () => {
    if (field === primarySort?.by) {
      setSorts(([oldPrimarySort, ...oldRestSorts]) => [
        {
          by: oldPrimarySort.by,
          in: oldPrimarySort.in === 'asc' ? 'desc' : 'asc',
        },
        ...oldRestSorts,
      ])
    } else {
      const fieldSortIndex = sorts.findIndex((sort) => sort.by === field)

      if (fieldSortIndex === -1) {
        setSorts((oldSorts) => [
          {
            by: field,
            in: defaultSortOrder,
          },
          ...oldSorts,
        ])
      } else {
        setSorts((oldSorts) => {
          // const oldFieldSortIndex = oldSorts.findIndex((oldSort) => oldSort.by === field)

          return [
            oldSorts[fieldSortIndex],
            ...oldSorts.slice(0, fieldSortIndex),
            ...oldSorts.slice(fieldSortIndex + 1),
          ]
        })
      }
    }
  }, [defaultSortOrder, sorts, primarySort])

  const sortedRows = useMemo(() => sorts.reduceRight((result, sort) => result.sortBy(
    (row) => String(row[sort.by]),
    (a, b) => {
      switch (sort.in) {
        case 'asc': return compareStrings(a, b)
        case 'desc': return -compareStrings(a, b)
      }
    }
  ), List(rows)).toArray(), [sorts, rows])

  return (
    <TableContainer component={ Paper }>
      <Table>
        <TableHead>
          <TableRow>
            { columns.map((column) => (
              <TableCell variant="head" key={ column.field }>
                <TableSortLabel
                  active={ primarySort?.by === column.field }
                  direction={ sorts.find((sort) => sort.by === column.field)?.in ?? defaultSortOrder }
                  onClick={ createSortLabelClickHandler(column.field) }
                >
                  { column.label ?? column.field }
                </TableSortLabel>
              </TableCell>
            )) }
          </TableRow>
        </TableHead>
        <TableBody>
          { sortedRows.map((row, i) => (
            <TableRow hover key={ i }>
              { OrderedMap(Object.entries(row)).sortBy((_value, field) => columns.findIndex((column) => column.field === field), (a, b) => a - b).map((value, field) => (
                <TableCell key={ field }>
                  { value }
                </TableCell>
              )).valueSeq().toArray() }
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DataTable
