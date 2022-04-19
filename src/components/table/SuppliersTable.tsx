import { memo, useEffect, useState } from 'react'
import useGetSuppliers from '../../api/queries/useGetSuppliers'
import StyledTable from './index'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid'
import { Supplier } from '../../api/queries/types'

interface Props {
   loading: boolean
   onDelete?: (id: string) => void
   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
   setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
   setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
   setSupplierCode: React.Dispatch<React.SetStateAction<string>>
   setSupplierName: React.Dispatch<React.SetStateAction<string>>
   setSelectedId: React.Dispatch<React.SetStateAction<string>>
}

type Row = Supplier & { id: number }

const SuppliersTable = memo(function SuppliersTable({
   loading,
   setIsEditing,
   setOpenModal,
   setOpenDeleteModal,
   setSupplierCode,
   setSupplierName,
   setSelectedId,
}: Props) {
   const [rows, setRows] = useState<Row[]>([])
   const { data, isFetching, error } = useGetSuppliers()

   const suppliers = data?.data

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
         type: 'number',
      },
      {
         field: 'supplierCode',
         headerName: 'Supplier Code',
         flex: 1,
         minWidth: 150,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
      {
         field: 'supplierName',
         headerName: 'Supplier Name',
         flex: 1,
         minWidth: 150,
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

   const handleDelete = (supplierId: string) => {
      setOpenDeleteModal(true)
      setSelectedId(supplierId)
   }

   const handleUpdate = (data: any) => {
      setIsEditing(true)
      setOpenModal(true)
      setSelectedId(data.id)
      setSupplierCode(data.row.supplierCode)
      setSupplierName(data.row.supplierName)
   }

   useEffect(() => {
      if (suppliers) {
         setRows([...suppliers.map((supplier, index) => ({ ...supplier, id: index + 1 }))])
      }
   }, [suppliers])

   return (
      <>
         <StyledTable
            rows={rows}
            columns={columns}
            loading={loading || isFetching}
            getRowId={(row) => row.supplierId}
         />
      </>
   )
})

export default SuppliersTable
