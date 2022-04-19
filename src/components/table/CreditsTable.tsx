import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chip } from '@mui/material'
import StyledTable from './index'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {
   GridActionsCellItem,
   GridColumns,
   GridValueFormatterParams,
   GridRenderCellParams,
} from '@mui/x-data-grid'
import { CreditReceipt } from '../../api/queries/types'
import { useAuth } from '../../contexts/AuthContext'
import { formatDate } from '../../helpers/formatDate'

interface Props {
   loading?: boolean
   data: CreditReceipt[] | undefined
}

type Row = CreditReceipt & { id: number }

const getStatusColor = (
   status: string
): 'default' | 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | undefined => {
   switch (status) {
      case 'paid':
         return 'success'
      case 'paying':
         return 'secondary'
      case 'unpaid':
         return 'error'
   }
}

const CreditsTable = memo(function CreditsTable({ loading, data }: Props) {
   const { isAdmin } = useAuth()
   const [rows, setRows] = useState<Row[]>([])
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
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         type: 'number',
         sortable: false,
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
         field: 'status',
         headerName: 'Status',
         width: 90,
         align: 'center',
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
         renderCell: (params: GridRenderCellParams<string>) => (
            <Chip label={params.value} variant="outlined" color={getStatusColor(params.value!)} />
         ),
      },
      {
         field: 'paidAmount',
         headerName: 'Paid Amount',
         flex: 1,
         minWidth: 150,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         type: 'number',
         filterable: false,
         sortable: false,
         valueFormatter: (params: GridValueFormatterParams) => {
            const valueFormatted = params.value ? Number(params.value as number).toLocaleString() : 0
            return `${valueFormatted} Ks`
         },
      },

      {
         field: 'totalAmount',
         headerName: 'Total Amount',
         flex: 1,
         minWidth: 150,
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
         field: 'actions',
         type: 'actions',
         headerName: 'Actions',
         width: 200,
         getActions: (data: any) => [
            <GridActionsCellItem
               key="view"
               icon={<AddCircleOutlineIcon />}
               label="add"
               onClick={() => navigate(`/credit/view/${data.id}`, { replace: true })}
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

export default CreditsTable
