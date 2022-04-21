import { memo, useEffect, useState } from 'react'
import useGetUsers from '../../api/queries/useGetUsers'
import StyledTable from './index'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid'
import { User } from '../../api/queries/types'

interface Props {
   loading: boolean
   onDelete?: (id: string) => void
   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
   setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
   setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
   setUsername: React.Dispatch<React.SetStateAction<string>>
   setSelectedId: React.Dispatch<React.SetStateAction<string>>
}

type Row = User & { id: number }

const UsersTable = memo(function UsersTable({
   loading,
   setIsEditing,
   setOpenModal,
   setOpenDeleteModal,
   setUsername,
   setSelectedId,
}: Props) {
   const [rows, setRows] = useState<Row[]>([])
   const { data, isFetching, error } = useGetUsers()

   const users = data?.data

   const columns: GridColumns = [
      {
         field: 'id',
         headerName: 'No',
         width: 70,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
         type: 'number',
      },
      {
         field: 'userId',
         headerName: 'User Id',
         flex: 1,
         minWidth: 150,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
      {
         field: 'username',
         headerName: 'Username',
         flex: 1,
         minWidth: 180,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
      {
         field: 'role',
         headerName: 'Role',
         flex: 1,
         minWidth: 70,
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
         width: 100,
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

   const handleDelete = (userId: string) => {
      setOpenDeleteModal(true)
      setSelectedId(userId)
   }

   const handleUpdate = (data: any) => {
      setIsEditing(true)
      setOpenModal(true)
      setSelectedId(data.id)
      setUsername(data.row.username)
   }

   useEffect(() => {
      if (users) {
         setRows([...users.map((user, index) => ({ ...user, id: index + 1 }))])
      }
   }, [users])

   console.log()

   return (
      <>
         <StyledTable
            rows={rows}
            columns={columns}
            loading={loading || isFetching}
            getRowId={(row) => row.userId}
         />
      </>
   )
})

export default UsersTable
