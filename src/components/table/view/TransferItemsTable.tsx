import { memo } from 'react'
import StyledTable from '../../create/transferTable'
import { GridColumns } from '@mui/x-data-grid'
import { Row } from '../../../pages/create/transfers'

interface Props {
   rows: Row[]
   loading: boolean
}

const TransferItemsTable = memo(function TransferItemsTable({ rows, loading }: Props) {
   const columns: GridColumns = [
      {
         field: 'id',
         headerName: 'No',
         minWidth: 80,
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
         sortable: false,
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
         sortable: false,
      },
   ]

   return (
      <>
         <StyledTable rows={rows} columns={columns} loading={loading} />
      </>
   )
})

export default TransferItemsTable
