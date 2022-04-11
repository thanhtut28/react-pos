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
         headerName: 'Id',
         width: 80,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
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
   ]

   useEffect(() => {
      if (suppliers) {
         setRows([...suppliers.map((supplier, index) => ({ ...supplier, id: index + 1 }))])
      }
   }, [suppliers])

   console.log()

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
