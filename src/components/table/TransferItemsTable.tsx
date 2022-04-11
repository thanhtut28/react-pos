import { memo, useCallback } from 'react'
import StyledTable from '../create/transferTable'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid'
import { Row } from '../../pages/create/transfers'

interface Props {
   rows: Row[]
   loading: boolean
   isEditing: boolean
   editId: number
   setRows: React.Dispatch<React.SetStateAction<Row[]>>
   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
   onUpdate: (data: any) => void
   resetItemInputs: () => void
}

const TransferItemsTable = memo(function TransferItemsTable({
   rows,
   editId,
   setRows,
   loading,
   isEditing,
   setIsEditing,
   onUpdate,
   resetItemInputs,
}: Props) {
   const columns: GridColumns = [
      {
         field: 'id',
         headerName: 'id',
         minWidth: 80,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
      {
         field: 'itemName',
         headerName: 'Item Name',
         flex: 1,
         minWidth: 100,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
      {
         field: 'qty',
         headerName: 'Quantity',
         flex: 1,
         minWidth: 80,
         headerClassName: 'table--header',
         type: 'number',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
      {
         field: 'actions',
         type: 'actions',
         headerName: 'Actions',
         width: 200,
         getActions: (data: any) => [
            <GridActionsCellItem
               key="edit"
               icon={<EditIcon color={isEditing && data.id === editId ? 'primary' : 'action'} />}
               label="Edit"
               onClick={() => (isEditing && data.id === editId ? handleCancelUpdate() : handleUpdate(data))}
               disabled={loading}
            />,
            <GridActionsCellItem
               key="delete"
               icon={<DeleteIcon />}
               label="Delete"
               onClick={() => handleDelete(data.id)}
               disabled={loading}
            />,
         ],
         headerClassName: 'table--header-actions table--header',
      },
   ]

   const handleDelete = useCallback(
      (id: number) => {
         if (editId === id) {
            setIsEditing(false)
            resetItemInputs()
         }
         setTimeout(() => setRows((prev) => prev.filter((row) => row.id !== id)))
      },
      [editId, resetItemInputs, setIsEditing, setRows]
   )

   const handleUpdate = (data: any) => {
      setIsEditing(true)
      onUpdate(data)
   }

   const handleCancelUpdate = () => {
      setIsEditing(false)
      resetItemInputs()
   }

   return (
      <>
         <StyledTable rows={rows} columns={columns} loading={loading} />
      </>
   )
})

export default TransferItemsTable
