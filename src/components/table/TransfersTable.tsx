import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StyledTable from './index'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { GridActionsCellItem, GridColumns, GridValueFormatterParams } from '@mui/x-data-grid'
import { Transfer } from '../../api/queries/types'

interface Props {
   loading?: boolean
   data: Transfer[] | undefined
}

type Row = Transfer & { id: number }

const TransfersTable = memo(function TransfersTable({ loading, data }: Props) {
   const [rows, setRows] = useState<Row[]>([])
   const oneDay = 1000 * 60 * 60 * 24
   const navigate = useNavigate()

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
            const dateString = (params.value) ? (params.value.toString()) : '';
            const formattedValue = dateString.split('T')[0].split('-').reverse().join('-')
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
      {
         field: 'toUsername',
         headerName: 'Transfer To',
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
            ...(new Date().getTime() - new Date(data.row.transferDate).getTime() <= oneDay
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
         setRows([...data.map((receipt, index) => ({ ...receipt, id: index + 1 }))])
      }
   }, [data])

   return (
      <>
         <StyledTable rows={rows} columns={columns} loading={loading} getRowId={(row) => row.transferId} />
      </>
   )
})

export default TransfersTable
