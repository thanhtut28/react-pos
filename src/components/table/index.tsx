import React from 'react'
import { LinearProgress } from '@mui/material'
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'
import { StyledContainer, StyledTableWrapper } from './Elements'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem, MuiEvent } from '@mui/x-data-grid'

export function SortedDescendingIcon() {
   return <ExpandMoreIcon className="icon" />
}

export function SortedAscendingIcon() {
   return <ExpandLessIcon className="icon" />
}

export default function StyledTable({ rows, editRowsModel, handleEditRowsModelChange, columnFields }: any) {
   const apiRef = useGridApiRef()

   const columns = [
      ...(columnFields as [string, any][]).map(([key, value]) => ({
         field: key,
         headerName: key,
         flex: 1,
         type: typeof value,
         headerClassName: 'table--header',
         editable: true,
      })),
      {
         field: 'actions',
         type: 'actions',
         width: 200,
         getActions: ({ id }: any) => [
            <GridActionsCellItem key="edit" icon={<EditIcon />} label="Edit" onClick={handleEdit(id)} />,
            <GridActionsCellItem
               key="delete"
               icon={<DeleteIcon />}
               label="Delete"
               onClick={handleDelete(id)}
            />,
         ],
         headerClassName: 'table--header-actions',
      },
   ]

   const handleEdit = (id: number) => (event: MuiEvent<React.MouseEvent>) => {
      event.stopPropagation()
      apiRef.current.setRowMode(id, 'edit')
   }

   const handleDelete = (id: number) => (event: any) => {}

   return (
      <StyledContainer>
         <StyledTableWrapper>
            <DataGrid
               getRowId={(row) => row._id}
               autoHeight
               //    pageSize={15}
               components={{
                  LoadingOverlay: LinearProgress,
                  ColumnSortedDescendingIcon: SortedDescendingIcon,
                  ColumnSortedAscendingIcon: SortedAscendingIcon,
               }}
               editRowsModel={editRowsModel}
               editMode="row"
               onEditRowsModelChange={handleEditRowsModelChange}
               // disableSelectionOnClick
               rows={rows}
               columns={columns}
               getRowClassName={(params) => `row super-app-theme--${params.row.status}`}
            />
         </StyledTableWrapper>
      </StyledContainer>
   )
}
