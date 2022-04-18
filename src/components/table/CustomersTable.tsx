import { memo, useEffect, useState } from 'react'
import useGetCustomers from '../../api/queries/useGetCustomers'
import StyledTable from './index'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid'
import { Customer } from '../../api/queries/types'

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

type Row = Customer & { id: number }

const CustomersTable = memo(function CustomersTable({
   loading,
   setIsEditing,
   setOpenModal,
   setOpenDeleteModal,
   setCustomerCode,
   setCustomerName,
   setSelectedId,
}: Props) {
   const [rows, setRows] = useState<Row[]>([])
   const { data, isFetching } = useGetCustomers()

   const customers = data?.data

   const columns: GridColumns = [
      {
         field: 'id',
         headerName: 'No',
         width: 80,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
      {
         field: 'code',
         headerName: 'Customer Code',
         flex: 1,
         minWidth: 120,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
      {
         field: 'name',
         headerName: 'Customer Name',
         minWidth: 140,
         flex: 1,
         headerClassName: 'table--header',
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

   useEffect(() => {
      if (customers) {
         setRows([...customers.map((customer, index) => ({ ...customer, id: index + 1 }))])
      }
   }, [customers])

   return (
      <>
         <StyledTable
            rows={rows}
            columns={columns}
            loading={loading || isFetching}
            getRowId={(row) => row._id}
         />
      </>
   )
})

export default CustomersTable
