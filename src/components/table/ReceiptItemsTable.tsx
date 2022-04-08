import { memo } from 'react'
import StyledTable from '../create/table'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem, GridValueFormatterParams } from '@mui/x-data-grid'

interface Props {
   rows: any
   loading: boolean
   setRows: React.Dispatch<React.SetStateAction<any>>
   setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
   onUpdate: (data: any) => void
   total: number
}

const ReceiptItemsTable = memo(function ReceiptItemsTable({
   rows,
   setRows,
   loading,
   setOpenModal,
   onUpdate,
   total,
}: Props) {
   const columns = [
      {
         field: 'id',
         headerName: 'id',
         flex: 1,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
      },
      {
         field: 'itemName',
         headerName: 'Item Name',
         flex: 1,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
      },
      {
         field: 'qty',
         headerName: 'Quantity',
         flex: 1,
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
         headerClassName: 'table--header',
         type: 'number',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
      },
      {
         field: 'unitPercent',
         headerName: 'Unit Percent',
         flex: 1,
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
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
      },
      // {
      //    field: '__v',
      //    headerName: 'Item Value',
      //    flex: 1,
      //    headerClassName: 'table--header',
      //    // editable: true
      // },
      {
         field: 'actions',
         type: 'actions',
         headerName: 'Actions',
         width: 200,
         getActions: (data: any) => [
            <GridActionsCellItem
               key="edit"
               icon={<EditIcon />}
               label="Edit"
               onClick={() => handleUpdate(data)}
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

   const handleDelete = (id: number) => {
      setRows((prev: any) => prev.filter((row: any) => row.id === id))
   }

   const handleUpdate = (data: any) => {
      setOpenModal(true)
      onUpdate(data)
   }

   return (
      <>
         <StyledTable rows={rows} columns={columns} loading={loading} total={total} />
      </>
   )
})

export default ReceiptItemsTable
