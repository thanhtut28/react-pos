import { memo } from 'react'
import useGetItems from '../../api/queries/useGetItems'
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
   setItemCode: React.Dispatch<React.SetStateAction<string>>
   setItemName: React.Dispatch<React.SetStateAction<string>>
   setCategoryName: React.Dispatch<React.SetStateAction<string>>
   setSelectedId: React.Dispatch<React.SetStateAction<string>>
}

const ItemsTable = memo(function ItemsTable({
   loading,
   setIsEditing,
   setOpenModal,
   setOpenDeleteModal,
   setItemCode,
   setItemName,
   setCategoryName,
   setSelectedId,
}: Props) {
   const { data, isFetching, error } = useGetItems()

   const items = data?.data
   //    const customer = customers?.[0]

   //    const columnFields = customer ? Object.entries(customer) : []
   const columns = [
      //   ...(columnFields as [string, any][]).map(([key, value]) => ({
      //      field: key,
      //      headerName: key,
      //      flex: 1,
      //      type: typeof value === 'object' ? 'string' : typeof value,
      //      headerClassName: 'table--header',
      //      editable: true,
      //   })),
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
         field: 'itemCode',
         headerName: 'Item Code',
         flex: 1,
         headerClassName: 'table--header',
         // editable: true
      },
      {
         field: 'itemName',
         headerName: 'Item Name',
         flex: 1,
         headerClassName: 'table--header',
         // editable: true
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

   const handleDelete = (itemId: string) => {
      setOpenDeleteModal(true)
      setSelectedId(itemId)
   }

   const handleUpdate = (data: any) => {
      setIsEditing(true)
      setOpenModal(true)
      setSelectedId(data.id)
      setItemCode(data.row.code)
      setItemName(data.row.name)
      setCategoryName(data.row.category ? data.row.category : 'Others')
   }

   return (
      <>
         {items ? (
            <StyledTable
               rows={items}
               columns={columns}
               loading={loading || isFetching}
               getRowId={(row) => row.itemId}
            />
         ) : (
            <h1>Loading...</h1>
         )}
      </>
   )
})

export default ItemsTable
