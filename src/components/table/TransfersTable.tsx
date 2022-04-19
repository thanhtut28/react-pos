import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StyledTable from './index'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { GridActionsCellItem, GridColumns, GridValueFormatterParams } from '@mui/x-data-grid'
import { Transfer } from '../../api/queries/types'
import { formatDate } from '../../helpers/formatDate'
import { useAuth } from '../../contexts/AuthContext'

interface Props {
   loading?: boolean
   data: Transfer[] | undefined
}

type Row = Transfer & { id: number }

const TransfersTable = memo(function TransfersTable({ loading, data }: Props) {
   const [rows, setRows] = useState<Row[]>([])
   const navigate = useNavigate()
   const { isAdmin } = useAuth()

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
         field: 'transferDate',
         headerName: 'Date',
         flex: 1,
         minWidth: 150,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         type: 'date',
         sortable: false,
         valueFormatter: (params: GridValueFormatterParams) => {
            const dateString = params.value ? params.value.toString() : ''
            const formattedValue = formatDate(new Date(dateString.split('T')[0]))

            return formattedValue
         },
      },
      {
         field: 'transferNum',
         headerName: 'Transfer Num',
         flex: 1,
         minWidth: 80,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
         type: 'number',
      },
      {
         field: 'transferType',
         headerName: 'Transfer Type',
         flex: 1,
         minWidth: 150,
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
                 headerName: 'Transfer To',
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
         field: 'actions',
         type: 'actions',
         headerName: 'Actions',
         width: 200,
         getActions: (data: any) => [
            ...(isAdmin &&
            new Date().toLocaleDateString() === new Date(data.row.transferDate).toLocaleDateString()
               ? [
                    <GridActionsCellItem
                       key="edit"
                       icon={<EditIcon />}
                       label="Edit"
                       onClick={() => navigate(`/transfer/edit/${data.id}`, { replace: true })}
                       disabled={loading}
                    />,
                 ]
               : []),
            <GridActionsCellItem
               key="view"
               icon={<RemoveRedEyeIcon />}
               label="View"
               onClick={() => navigate(`/transfer/view/${data.id}`, { replace: true })}
               disabled={loading}
            />,
         ],
         headerClassName: 'table--header-actions table--header',
      },
   ]

   useEffect(() => {
      if (data) {
         setRows([...data.map((transfer, index) => ({ ...transfer, id: index + 1 }))])
      }
   }, [data])

   console.log(data)

   return (
      <>
         <StyledTable rows={rows} columns={columns} loading={loading} getRowId={(row) => row.transferId} />
      </>
   )
})

export default TransfersTable
