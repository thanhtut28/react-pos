import { memo } from 'react'
import useGetCustomers from '../../api/queries/useGetCustomers'
import StyledTable from './index'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem } from '@mui/x-data-grid'

interface Props {
   loading: boolean
   onDelete?: (id: string) => void
   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
   setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
   setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
   setCustomerCode: React.Dispatch<React.SetStateAction<string>>
   setCustomerName: React.Dispatch<React.SetStateAction<string>>
   setSelectedId: React.Dispatch<React.SetStateAction<string>>
}

const CustomersTable = memo(function CustomersTable({
   loading,
   setIsEditing,
   setOpenModal,
   setOpenDeleteModal,
   setCustomerCode,
   setCustomerName,
   setSelectedId,
}: Props) {
   const { data, isFetching, error } = useGetCustomers()

   const customers = data?.data
   // const customer = customers?.[0]

   // const columnFields = customer ? Object.entries(customer) : []
   const columns = [
      {
         field: 'code',
         headerName: 'Customer Code',
         flex: 1,
         headerClassName: 'table--header',
         // editable: true
      },
      {
         field: 'name',
         headerName: 'Customer Name',
         flex: 1,
         headerClassName: 'table--header',
         // editable: true
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

   const handleDelete = (customerId: string) => {
      setOpenDeleteModal(true)
      setSelectedId(customerId)
   }

   const handleUpdate = (data: any) => {
      setIsEditing(true)
      setOpenModal(true)
      setSelectedId(data.id)
      setCustomerCode(data.row.code)
      setCustomerName(data.row.name)
   }

   return (
      <>
         {customers ? (
            <StyledTable
               rows={customers}
               columns={columns}
               loading={loading || isFetching}
               getRowId={(row) => row._id}
            />
         ) : (
            <h1>Loading...</h1>
         )}
      </>
   )
})

export default CustomersTable
