import { memo } from 'react'
import useGetSuppliers from '../../api/queries/useGetSuppliers'
import useDeleteSupplier from '../../api/mutations/supplier/useDeleteSupplier'
import StyledTable from './index'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem } from '@mui/x-data-grid'

interface Props {
   loading: boolean
   onDelete?: (id: string) => void
   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
   setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
   setSupplierCode: React.Dispatch<React.SetStateAction<string>>
   setSupplierName: React.Dispatch<React.SetStateAction<string>>
   setSelectedId: React.Dispatch<React.SetStateAction<string>>
   resetForm: () => void
}

const SuppliersTable = memo(function SuppliersTable({
   loading,
   setIsEditing,
   setOpenModal,
   setSupplierCode,
   setSupplierName,
   setSelectedId,
   resetForm,
}: Props) {
   const { data, isFetching, error } = useGetSuppliers()
   const { mutate: deleteSupplier, data: mutationDelete, isLoading: deletingSupplier } = useDeleteSupplier()

   const customers = data?.data
   // const customer = customers?.[0]

   // const columnFields = customer ? Object.entries(customer) : []
   const columns = [
      {
         field: 'supplierCode',
         headerName: 'Supplier Code',
         flex: 1,
         headerClassName: 'table--header',
         // editable: true
      },
      {
         field: 'supplierName',
         headerName: 'Supplier Name',
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
            />,
            <GridActionsCellItem
               key="delete"
               icon={<DeleteIcon />}
               label="Delete"
               onClick={() => handleDelete(data.id)}
            />,
         ],
         headerClassName: 'table--header-actions table--header',
      },
   ]

   const handleDelete = (supplierId: string) => {
      console.log(supplierId)
      deleteSupplier({ supplierId })
      resetForm()
   }

   const handleUpdate = (data: any) => {
      setIsEditing(true)
      setOpenModal(true)
      setSelectedId(data.id)
      setSupplierCode(data.row.supplierCode)
      setSupplierName(data.row.supplierName)
   }

   return (
      <>
         {customers ? (
            <StyledTable
               rows={customers}
               columns={columns}
               loading={loading || deletingSupplier || isFetching}
               getRowId={(row) => row.supplierId}
            />
         ) : (
            <h1>Loading...</h1>
         )}
      </>
   )
})

export default SuppliersTable
