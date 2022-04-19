import { memo, useEffect, useState } from 'react'
import useGetItems from '../../api/queries/useGetItems'
import StyledTable from './index'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem, GridValueFormatterParams } from '@mui/x-data-grid'
import { Item } from '../../api/queries/types'
import { useAuth } from '../../contexts/AuthContext'

interface Props {
   loading: boolean
   onDelete?: (id: string) => void
   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
   setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
   setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
   setItemCode: React.Dispatch<React.SetStateAction<string>>
   setItemName: React.Dispatch<React.SetStateAction<string>>
   setQty: React.Dispatch<React.SetStateAction<string>>
   setUnitPrice: React.Dispatch<React.SetStateAction<string>>
   setUnitPercent: React.Dispatch<React.SetStateAction<string>>
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
   setQty,
   setUnitPrice,
   setUnitPercent,
   setSelectedId,
}: Props) {
   const [rows, setRows] = useState<Item[]>([])
   const { data, isFetching, error } = useGetItems()
   const { isAdmin } = useAuth()

   const items = data?.data

   const columns = [
      {
         field: 'id',
         headerName: 'No',
         width: 80,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         type: 'number',
         sortable: false,
      },
      {
         field: 'itemCode',
         headerName: 'Item Code',
         flex: 1,
         minWidth: 100,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
      {
         field: 'itemName',
         headerName: 'Item Name',
         flex: 1,
         minWidth: 120,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
      {
         field: 'lowestQty',
         headerName: 'Lowest Qty',
         flex: 1,
         minWidth: 100,
         type: 'number',
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
      {
         field: 'unitPrice',
         headerName: 'Unit Price',
         flex: 1,
         minWidth: 100,
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
         field: 'unitPercent',
         headerName: 'Unit Percent',
         flex: 1,
         minWidth: 100,
         headerClassName: 'table--header',
         hideSortIcons: true,
         type: 'number',
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
         valueFormatter: (params: GridValueFormatterParams) => {
            const valueFormatted = Number((params.value as number) * 100).toLocaleString()
            return `${valueFormatted} %`
         },
      },
      ...(isAdmin
         ? [
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
         : []),
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
      setQty(data.row.lowestQty.toString())
      setUnitPrice(data.row.unitPrice.toString())
      setUnitPercent((data.row.unitPercent * 100).toString())
   }

   useEffect(() => {
      if (items) {
         setRows([...items.map((item, index) => ({ ...item, id: index + 1 }))])
      }
   }, [items])

   console.log(rows)

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
