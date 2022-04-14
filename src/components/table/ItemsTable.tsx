import { memo, useEffect, useState } from 'react'
import useGetItems from '../../api/queries/useGetItems'
import StyledTable from './index'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem } from '@mui/x-data-grid'
import { Item } from '../../api/queries/types'

interface Props {
   loading: boolean
   onDelete?: (id: string) => void
   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
   setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
   setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
   setItemCode: React.Dispatch<React.SetStateAction<string>>
   setItemName: React.Dispatch<React.SetStateAction<string>>
   setSelectedId: React.Dispatch<React.SetStateAction<string>>
}

type Row = Item & { id: number }

const ItemsTable = memo(function ItemsTable({
   loading,
   setIsEditing,
   setOpenModal,
   setOpenDeleteModal,
   setItemCode,
   setItemName,
   setSelectedId,
}: Props) {
   const [rows, setRows] = useState<Item[]>([])
   const { data, isFetching, error } = useGetItems()

   const items = data?.data

   const columns = [
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
      setItemCode(data.row.itemCode)
      setItemName(data.row.itemName)
   }

   useEffect(() => {
      if (items) {
         setRows([...items.map((item, index) => ({ ...item, id: index + 1 }))])
      }
   }, [items])

   return (
      <>
         <StyledTable
            rows={rows}
            columns={columns}
            loading={loading || isFetching}
            getRowId={(row) => row.itemId}
         />
      </>
   )
})

export default ItemsTable
