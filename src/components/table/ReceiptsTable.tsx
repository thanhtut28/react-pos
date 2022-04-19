import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chip } from '@mui/material'
import StyledTable from './index'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import {
   GridActionsCellItem,
   GridColumns,
   GridValueFormatterParams,
   GridRenderCellParams,
} from '@mui/x-data-grid'
import { Receipt } from '../../api/queries/types'
import { useAuth } from '../../contexts/AuthContext'
import { formatDate } from '../../helpers/formatDate'

interface Props {
   loading?: boolean
   data: Receipt[] | undefined
}

type Row = Receipt & { id: number }

const ReceiptsTable = memo(function ReceiptsTable({ loading, data }: Props) {
   const { isAdmin } = useAuth()
   const [rows, setRows] = useState<Row[]>([])
   const navigate = useNavigate()

   const getChipColor = (
      type: string
   ): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined => {
      switch (type) {
         case 'cash':
            return 'success'
         case 'credit':
            return 'error'
         case 'return':
            return 'warning'
         case 'cancel':
            return 'default'
      }
   }

   const columns: GridColumns = [
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
         field: 'receiptDate',
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
         field: 'receiptNum',
         headerName: 'Receipt Num',
         flex: 1,
         minWidth: 80,
         type: 'number',
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
      {
         field: 'receiptType',
         headerName: 'Receipt Type',
         width: 150,
         align: 'center',
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
         renderCell: (params: GridRenderCellParams<string>) => (
            <Chip label={params.value} variant="outlined" color={getChipColor(params.value!)} />
         ),
      },
      ...(isAdmin
         ? [
              {
                 field: 'username',
                 headerName: 'Username',
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
         field: 'customerName',
         headerName: 'Customer Name',
         flex: 1,
         minWidth: 150,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
      {
         field: 'totalAmount',
         headerName: 'Total Amount',
         flex: 1,
         minWidth: 150,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
         valueFormatter: (params: GridValueFormatterParams) => {
            const valueFormatted = Number(params.value as number).toLocaleString()
            return `${valueFormatted} Ks`
         },
      },
      {
         field: 'actions',
         type: 'actions',
         headerName: 'Actions',
         width: 200,
         getActions: (data: any) => [
            ...(new Date().toLocaleDateString() === new Date(data.row.receiptDate).toLocaleDateString()
               ? [
                    <GridActionsCellItem
                       key="edit"
                       icon={<EditIcon />}
                       label="Edit"
                       onClick={() => navigate(`/receipt/edit/${data.id}`, { replace: true })}
                       disabled={loading}
                    />,
                 ]
               : []),

            <GridActionsCellItem
               key="view"
               icon={<RemoveRedEyeIcon />}
               label="View"
               onClick={() => navigate(`/receipt/view/${data.id}`, { replace: true })}
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
         <StyledTable rows={rows} columns={columns} loading={loading} getRowId={(row) => row.receiptId} />
      </>
   )
})

export default ReceiptsTable
