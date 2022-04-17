import { useState } from 'react'
import {
   Paper,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TablePagination,
   TableRow,
} from '@mui/material'

import { StyledTableRow, StyledTableCell, StyledTable } from './Elements'
import { Column } from '../../pages/stocks'
import { Stock } from '../../api/queries/types'

interface Props {
   rows: Stock[]
   columns: Column[]
}

export default function StocksTable({ columns, rows }: Props) {
   const [page, setPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)

   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
   }

   console.log(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
   return (
      <Paper elevation={0} sx={{ width: '100%', border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
         <TableContainer sx={{ maxHeight: 440 }}>
            <StyledTable stickyHeader aria-label="sticky table">
               <TableHead>
                  <TableRow>
                     {columns.map(
                        (column) =>
                           !column.isSubColumn && (
                              <StyledTableCell
                                 key={column.id}
                                 align={column.align}
                                 {...(column.rowSpan ? { rowSpan: column.rowSpan } : {})}
                                 {...(column.colSpan ? { colSpan: column.colSpan } : {})}
                                 style={{ minWidth: column.minWidth }}
                              >
                                 {column.label}
                              </StyledTableCell>
                           )
                     )}
                  </TableRow>
                  <TableRow>
                     {columns.map(
                        (column) =>
                           column.isSubColumn && (
                              <StyledTableCell
                                 key={column.id}
                                 align={column.align}
                                 style={{ top: 56, minWidth: column.minWidth }}
                              >
                                 {column.label}
                              </StyledTableCell>
                           )
                     )}
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                     return (
                        <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.itemName}>
                           <StyledTableCell key={`No${index}`} align="left">
                              {index + 1}
                           </StyledTableCell>
                           {columns.map((column) => {
                              const value = row[column.id as Partial<keyof Stock>]
                              return (
                                 value !== undefined && (
                                    <StyledTableCell key={column.id} align={column.align}>
                                       {column.format && typeof value === 'number'
                                          ? column.format(value)
                                          : value}
                                    </StyledTableCell>
                                 )
                              )
                           })}
                        </StyledTableRow>
                     )
                  })}
               </TableBody>
            </StyledTable>
         </TableContainer>
         <TablePagination
            rowsPerPageOptions={[10, 20, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
         />
      </Paper>
   )
}
