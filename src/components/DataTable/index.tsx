import { makeStyles, useTheme } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Bowser from 'bowser'
import classnames from 'classnames'
import { List, OrderedMap } from 'immutable'
import React, { useCallback, useMemo, useState } from 'react'

import classes from './classes.css'

interface Props {
  columns: Column[]
  rows: Row[]
  defaultSortOrder?: SortOrder
  locale?: string // BCP 47 Language Tag
}

export interface Column {
  field: Field
  label?: React.ReactNode
  width?: number // in pixels
}

export type Row = {
  [key in Field]: React.ReactNode
}

type Field = string | number

interface StyleProps {
  direction: Direction | undefined
}

// TODO: remove
function compareStrings(a: string, b: string): number {
  if (a < b) return -1
  else if (a > b) return 1
  else return 0
}

// TODO: remove
function isNumberLikeString(it: string) {
  return !Number.isNaN(Number(it)) && !Number.isNaN(parseFloat(it))
}

// TODO: Remove
// TODO: Detect UA changes?
const browser = Bowser.getParser(navigator.userAgent)

const isMobile = browser.is('Mobile')

const useStyles = makeStyles({
  LocalizedCell: {
    textAlign: ({ direction }: StyleProps) => {
      if (direction === undefined) return undefined

      switch (direction) {
        case 'ltr': return 'left'
        case 'rtl': return 'right'
      }
    },
  },
}, {
  flip: false,
})

const SquarePaper: React.FC = (props) => <Paper { ...props } square />

const DataTable: React.FC<Props> = ({ columns, rows, defaultSortOrder = 'asc', locale }) => {
  const [sorts, setSorts] = useState<Sort<Row>[]>([])

  const primarySort = useMemo(() => sorts[0], [sorts])

  const createSortLabelClickHandler = useCallback((field: Field) => () => {
    if (field === primarySort?.by) {
      // oldPrimarySort === primarySort なので primarySort が存在するならば oldPrimarySort も存在する。
      setSorts(([oldPrimarySort, ...oldRestSorts]) => [
        {
          by: oldPrimarySort!.by,
          in: oldPrimarySort!.in === 'asc' ? 'desc' : 'asc',
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
            oldSorts[fieldSortIndex]!, // oldSorts === sorts かつ fieldSortIndex !== -1 なので、存在する。
            ...oldSorts.slice(0, fieldSortIndex),
            ...oldSorts.slice(fieldSortIndex + 1),
          ]
        })
      }
    }
  }, [defaultSortOrder, sorts, primarySort])

  const sortedRows = useMemo(() => sorts.reduceRight((result, sort) => {
    switch (sort.in) {
      case 'asc': return result.sortBy((row) => String(row[sort.by]), compareStrings)
      case 'desc': return result.sortBy((row) => String(row[sort.by]), (a, b) => -compareStrings(a, b))
    }
  }, List(rows)).toArray(), [sorts, rows])

  const theme = useTheme()

  const direction = useMemo(() => {
    if (locale === undefined) return undefined

    return /^(?:he|iw)\b/.test(locale) ? 'rtl' : 'ltr' // TODO: RtL の判定方法を修正する
  }, [locale])

  const jssClasses = useStyles({ direction })
  const numericCellClassName = useMemo(() => classnames(jssClasses.LocalizedCell, classes.NumericCell), [jssClasses.LocalizedCell])

  return (
    <TableContainer component={ SquarePaper }>
      <Table size={ isMobile ? 'small' : 'medium' } lang={ locale }>
        <TableHead>
          <TableRow>
            { columns.map((column) => (
              <TableCell
                variant="head"
                sortDirection={ primarySort?.by === column.field ? primarySort.in : undefined }
                className={ jssClasses.LocalizedCell }
                style={ { minWidth: column.width !== undefined ? column.width + 2 * theme.spacing(2) : undefined } }
                key={ column.field }
              >
                <bdi>
                  <TableSortLabel
                    active={ primarySort?.by === column.field }
                    direction={ sorts.find((sort) => sort.by === column.field)?.in ?? defaultSortOrder }
                    onClick={ createSortLabelClickHandler(column.field) }
                  >
                    { column.label ?? column.field }
                  </TableSortLabel>
                </bdi>
              </TableCell>
            )) }
          </TableRow>
        </TableHead>
        <TableBody>
          { sortedRows.map((row, i) => (
            <TableRow hover key={ i }>
              { OrderedMap(Object.entries(row)).sortBy((_value, field) => columns.findIndex((column) => column.field === field), (a, b) => a - b).map((value, field) => (
                <TableCell
                  className={ isNumberLikeString(String(value)) ? numericCellClassName : jssClasses.LocalizedCell }
                  key={ field }
                >
                  <bdi>
                    { value }
                  </bdi>
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
