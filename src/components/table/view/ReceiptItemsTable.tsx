import { memo } from 'react'
import StyledTable from '../../create/table'

import { GridValueFormatterParams } from '@mui/x-data-grid'
import { Row } from '../../../pages/create/receipts'

interface Props {
   rows: Row[]
   loading: boolean
   total: number
}

const ReceiptItemsTable = memo(function ReceiptItemsTable({ rows, loading, total }: Props) {
   const columns = [
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
         field: 'itemName',
         headerName: 'Item Name',
         flex: 1,
         minWidth: 100,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
      },
      {
         field: 'qty',
         headerName: 'Quantity',
         flex: 1,
         minWidth: 80,
         headerClassName: 'table--header',
         type: 'number',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
      },
      {
         field: 'unitPrice',
         headerName: 'Unit Price',
         flex: 1,
         minWidth: 150,
         headerClassName: 'table--header',
         type: 'number',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
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
         type: 'number',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         valueFormatter: (params: GridValueFormatterParams) => {
            const valueFormatted = Number((params.value as number) * 100).toLocaleString()
            return `${valueFormatted} %`
         },
      },
      {
         field: 'netAmount',
         headerName: 'Net Amount',
         flex: 1,
         headerClassName: 'table--header',
         type: 'number',
         minWidth: 150,
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         valueFormatter: (params: GridValueFormatterParams) => {
            const valueFormatted = Number(params.value as number).toLocaleString()
            return `${valueFormatted} Ks`
         },
      },
   ]

   return (
      <>
         <StyledTable rows={rows} columns={columns} loading={loading} total={total} />
      </>
   )
})

export default ReceiptItemsTable
