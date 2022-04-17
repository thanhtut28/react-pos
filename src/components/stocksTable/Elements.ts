import { styled, alpha } from '@mui/material/styles'
import { TableRow } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import Table, { tableClasses } from '@mui/material/Table'

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(even)': {
      backgroundColor: theme.palette.secondary.accent,
   },
   // hide last border
   '&:last-child td, &:last-child th': {
      border: 0,
   },
   '&.MuiTableRow-hover': {
      '&:hover': {
         backgroundColor: alpha(theme.palette.secondary.main as string, 0.2),
      },
   },
}))

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      border: 0,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontWeight: theme.typography.fontWeightMedium,
   },
}))

export const StyledTable = styled(Table)(() => ({
   [`&.${tableClasses.root}`]: {
      borderSpacing: 0,
   },
}))
