import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StyledTable from './index'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import {
   GridActionsCellItem,
   GridColumns,
   GridRenderCellParams,
   GridValueFormatterParams,
} from '@mui/x-data-grid'
import { Supply } from '../../api/queries/types'
import { formatDate } from '../../helpers/formatDate'
import { Chip } from '@mui/material'

interface Props {
   loading?: boolean
   data: Supply[] | undefined
}

type Row = Supply & { id: number }

const SuppliesTable = memo(function SuppliesTable({ loading, data }: Props) {
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
         sortable: false,
         type: 'number',
      },
      {
         field: 'supplyDate',
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
         field: 'supplyNum',
         headerName: 'Supply Num',
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
         field: 'supplyType',
         headerName: 'Supply Type',
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
      {
         field: 'supplierName',
         headerName: 'Supplier Name',
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
         type: 'number',
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
            ...(new Date().toLocaleDateString() === new Date(data.row.supplyDate).toLocaleDateString()
               ? [
                    <GridActionsCellItem
                       key="edit"
                       icon={<EditIcon />}
                       label="Edit"
                       onClick={() => navigate(`/supply/edit/${data.id}`, { replace: true })}
                       disabled={loading}
                    />,
                 ]
               : []),
            <GridActionsCellItem
               key="view"
               icon={<RemoveRedEyeIcon />}
               label="View"
               onClick={() => navigate(`/supply/view/${data.id}`, { replace: true })}
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
         <StyledTable rows={rows} columns={columns} loading={loading} getRowId={(row) => row.supplyId} />
      </>
   )
})

export default SuppliesTable
