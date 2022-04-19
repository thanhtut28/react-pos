import React from 'react'
import { Box, LinearProgress, Typography, Divider } from '@mui/material'
import { DataGrid, GridRowsProp, GridColumns, GridRowIdGetter } from '@mui/x-data-grid'
import { StyledContainer, StyledTableWrapper } from '../table/Elements'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export function SortedDescendingIcon() {
   return <ExpandMoreIcon className="icon" />
}

export function SortedAscendingIcon() {
   return <ExpandLessIcon className="icon" />
}

interface Props {
   rows: GridRowsProp
   columns: GridColumns
   loading: boolean
   getRowId?: GridRowIdGetter
   totalAmount: number
   paidAmount: number
   remainingAmount: number
}

interface FooterProps {
   totalAmount: number
   paidAmount: number
   remainingAmount: number
}

export function CustomFooter({ paidAmount, totalAmount, remainingAmount }: FooterProps) {
   return (
      <Box
         sx={{
            padding: (theme) => theme.spacing(2),
            display: 'flex',
            justifyContent: 'flex-end',

            p: 5,
            mt: 2,
            pr: { lg: 10 },
            borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
         }}
      >
         <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Box py={1}>
               <Typography variant="subtitle2">
                  Total Amount:&nbsp;<strong> {Number(totalAmount as number).toLocaleString()} Ks</strong>
               </Typography>
            </Box>

            {paidAmount > 0 && (
               <>
                  <Box py={1}>
                     <Typography variant="subtitle2">
                        Paid Amount:&nbsp;<strong> {Number(paidAmount as number).toLocaleString()} Ks</strong>
                     </Typography>
                  </Box>

                  <Box py={1} width={1}>
                     <Divider />
                  </Box>
               </>
            )}
            <Box py={1}>
               <Typography variant="subtitle2">
                  Remaining Amount:&nbsp;
                  <strong> {Number(remainingAmount as number).toLocaleString()} Ks</strong>
               </Typography>
            </Box>
         </Box>
      </Box>
   )
}

const StyledTable = ({
   rows,
   columns,
   loading,
   getRowId,
   totalAmount,
   paidAmount,
   remainingAmount,
}: Props) => {
   console.log('table is rendering')
   return (
      <StyledContainer>
         <StyledTableWrapper>
            <DataGrid
               getRowId={getRowId}
               autoHeight
               components={{
                  LoadingOverlay: LinearProgress,
                  ColumnSortedDescendingIcon: SortedDescendingIcon,
                  ColumnSortedAscendingIcon: SortedAscendingIcon,
                  Footer: CustomFooter,
               }}
               componentsProps={{
                  footer: { totalAmount, paidAmount, remainingAmount },
               }}
               rows={rows}
               columns={columns}
               loading={loading}
               getRowClassName={(params) => `row super-app-theme--${params.row.status}`}
               disableSelectionOnClick
               hideFooterSelectedRowCount
            />
         </StyledTableWrapper>
      </StyledContainer>
   )
}

export default StyledTable
