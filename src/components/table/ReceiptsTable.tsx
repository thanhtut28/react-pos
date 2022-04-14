import { memo, useEffect, useState } from 'react'
import StyledTable from './index'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid'
import { Receipt } from '../../api/queries/types'

interface Props {
   loading?: boolean
   data: Receipt[] | undefined
}

type Row = Receipt & { id: number }

const SuppliersTable = memo(function SuppliersTable({ loading, data }: Props) {
   const [rows, setRows] = useState<Row[]>([])

   const columns: GridColumns = [
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
         field: 'receiptDate',
         headerName: 'Date',
         flex: 1,
         minWidth: 150,
         headerClassName: 'table--header',
         hideSortIcons: true,
         disableColumnMenu: true,
         filterable: false,
         sortable: false,
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
         field: 'totalAmount',
         headerName: 'Total Amount',
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
            <GridActionsCellItem
               key="edit"
               icon={<EditIcon />}
               label="Edit"
               onClick={() => console.log(data)}
               disabled={loading}
            />,
            <GridActionsCellItem
               key="view"
               icon={<RemoveRedEyeIcon />}
               label="View"
               onClick={() => console.log(data)}
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

export default SuppliersTable
