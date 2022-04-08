import React from 'react'
import { Box, LinearProgress } from '@mui/material'
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
   total: number
}

export function CustomFooter(props: { total: number }) {
   return (
      <Box
         sx={{
            padding: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            p: 5,
            mt: 2,
            pr: { lg: 10 },
            borderTop: (theme) => `1px solid ${theme.palette.grey[300]}`,
         }}
      >
         Total Amount: {props.total}
      </Box>
   )
}

const StyledTable = ({ rows, columns, loading, getRowId, total }: Props) => {
   console.log('table rendering')

   return (
      <StyledContainer>
         <StyledTableWrapper>
            <DataGrid
               getRowId={getRowId}
               autoHeight
               //    pageSize={15}
               // loading={loading}
               components={{
                  LoadingOverlay: LinearProgress,
                  ColumnSortedDescendingIcon: SortedDescendingIcon,
                  ColumnSortedAscendingIcon: SortedAscendingIcon,
                  Footer: CustomFooter,
               }}
               componentsProps={{
                  footer: { total },
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
