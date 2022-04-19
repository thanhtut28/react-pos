import { memo, useCallback } from 'react'
import StyledTable from '../../create/table'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem, GridValueFormatterParams } from '@mui/x-data-grid'
import { Row } from '../../../pages/create/receipts'

interface Props {
   rows: Row[]
   loading: boolean
   isEditing: boolean
   editId: number
   setRows: React.Dispatch<React.SetStateAction<Row[]>>
   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
   onUpdate: (data: any) => void
   total: number
   resetItemInputs: () => void
}

const ReceiptItemsTable = memo(function ReceiptItemsTable({
   rows,
   editId,
   setRows,
   loading,
   isEditing,
   setIsEditing,
   onUpdate,
   total,
   resetItemInputs,
}: Props) {
   const columns = [
      {
         field: 'id',
         headerName: 'No',
         width: 80,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
         type: 'number',
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
      },
      {
         field: 'unitPrice',
         headerName: 'Unit Price',
         flex: 1,
         minWidth: 150,
         headerClassName: 'table--header',
         type: 'number',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         valueFormatter: (params: GridValueFormatterParams) => {
            const valueFormatted = Number(params.value as number).toLocaleString()
            return `${valueFormatted} Ks`
         },
      },
      {
         field: 'unitPercent',
         headerName: 'Unit Percent',
         flex: 1,
         minWidth: 100,
         headerClassName: 'table--header',
         type: 'number',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         valueFormatter: (params: GridValueFormatterParams) => {
            const valueFormatted = Number((params.value as number) * 100).toLocaleString()
            return `${valueFormatted} %`
         },
      },
      {
         field: 'netAmount',
         headerName: 'Net Amount',
         flex: 1,
         headerClassName: 'table--header',
         type: 'number',
         minWidth: 150,
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         valueFormatter: (params: GridValueFormatterParams) => {
            const valueFormatted = Number(params.value as number).toLocaleString()
            return `${valueFormatted} Ks`
         },
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
         <StyledTable rows={rows} columns={columns} loading={loading} total={total} />
      </>
   )
})

export default ReceiptItemsTable
