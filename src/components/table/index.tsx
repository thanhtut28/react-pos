import { DataGrid } from '@mui/x-data-grid'
import { StyledContainer, StyledTableWrapper } from './Elements'

export default function StyledTable({ rows, columns, id }: any) {
   return (
      <StyledContainer>
         <StyledTableWrapper>
            <DataGrid
               getRowId={(row) => row._id}
               autoHeight
               //    pageSize={15}
               rows={rows}
               columns={columns}
               getRowClassName={(params) => `row super-app-theme--${params.row.status}`}
            />
         </StyledTableWrapper>
      </StyledContainer>
   )
}
