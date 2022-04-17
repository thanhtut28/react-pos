import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StyledTable from './index'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { GridActionsCellItem, GridColumns, GridValueFormatterParams } from '@mui/x-data-grid'
import { Receipt } from '../../api/queries/types'

interface Props {
   loading?: boolean
   data: Receipt[] | undefined
}

type Row = Receipt & { id: number }

const ReceiptsTable = memo(function ReceiptsTable({ loading, data }: Props) {
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
            const formattedValue = dateString.split('T')[0].split('-').reverse().join('-')
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
         sortable: false,
      },
      {
         field: 'receiptType',
         headerName: 'Receipt Type',
         flex: 1,
         minWidth: 150,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
      },
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
