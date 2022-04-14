import React from 'react'
import { LinearProgress } from '@mui/material'
import { DataGrid, GridRowsProp, GridColumns, GridRowIdGetter } from '@mui/x-data-grid'
import { StyledContainer, StyledTableWrapper } from './Elements'
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
   loading?: boolean
   getRowId?: GridRowIdGetter
}

const StyledTable = ({ rows, columns, loading, getRowId }: Props) => {
   const [pageSize, setPageSize] = React.useState<number>(10)

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
               }}
               pageSize={pageSize}
               onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
               rowsPerPageOptions={[10, 20, 25]}
               pagination
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
