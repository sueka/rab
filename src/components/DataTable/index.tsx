import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { OrderedMap } from 'immutable'
import React from 'react'

interface Props {
  columns: Column[]
  rows: Row[]
}

export interface Column {
  field: Field
  label?: React.ReactNode
}

export type Row = {
  [key in Field]: React.ReactNode
}

type Field = string | number

const DataTable: React.FC<Props> = ({ columns, rows }) => (
  <TableContainer component={ Paper }>
    <Table>
      <TableHead>
        <TableRow>
          { columns.map((column) => (
            <TableCell variant="head" key={ column.field }>
              { column.label ?? column.field }
            </TableCell>
          )) }
        </TableRow>
      </TableHead>
      <TableBody>
        { rows.map((row, i) => (
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

export default DataTable
