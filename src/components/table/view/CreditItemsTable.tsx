import { memo } from 'react'
import StyledTable from '../../create/creditTable'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem, GridColumns, GridValueFormatterParams } from '@mui/x-data-grid'
import { Row } from '../../../pages/view/credit'
import { useAuth } from '../../../contexts/AuthContext'

interface Props {
   rows: Row[]
   loading: boolean
   isEditing: boolean
   editId: number
   setRows: React.Dispatch<React.SetStateAction<Row[]>>
   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
   onUpdate: (data: any) => void
   resetItemInputs: () => void
   totalAmount: number
   paidAmount: number
}

const TransferItemsTable = memo(function TransferItemsTable({
   rows,
   editId,
   totalAmount,
   paidAmount,
   loading,
   isEditing,
   setIsEditing,
   onUpdate,
   resetItemInputs,
}: Props) {
   const { isAdmin } = useAuth()
   const remainingAmount = totalAmount - paidAmount

   const columns: GridColumns = [
      {
         field: 'id',
         headerName: 'No',
         minWidth: 80,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
         type: 'number',
      },
      {
         field: 'creditDate',
         headerName: 'Date',
         flex: 1,
         minWidth: 100,
         type: 'date',
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
      ...(isAdmin
         ? [
              {
                 field: 'username',
                 headerName: 'Username',
                 flex: 1,
                 minWidth: 150,
                 headerClassName: 'table--header',
                 hideSortIcons: true,
                 disableColumnMenu: true,
                 filterable: false,
                 sortable: false,
              },
           ]
         : []),
      {
         field: 'creditAmount',
         headerName: 'Amount',
         flex: 1,
         minWidth: 150,
         headerClassName: 'table--header',
         hideSortIcons: true,
         type: 'number',
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
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
         ],
         headerClassName: 'table--header-actions table--header',
      },
   ]

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
         <StyledTable
            rows={rows}
            columns={columns}
            loading={loading}
            totalAmount={totalAmount}
            paidAmount={paidAmount}
            remainingAmount={remainingAmount}
         />
      </>
   )
})

export default TransferItemsTable
