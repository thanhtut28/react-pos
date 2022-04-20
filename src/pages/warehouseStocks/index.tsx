import { useState } from 'react'
import useGetStocks from '../../api/queries/useGetWHStocks'
import { Typography, Box } from '@mui/material'
import { Container, Flex, PageTitle } from '../../components/toolbar/Elements'
import DatePicker from '../../components/datePicker'
import StocksTable from '../../components/stocksTable'
import { formatDate } from '../../helpers/formatDate'

export interface Column {
   id: string
   label: string
   minWidth?: number
   align?: 'left' | 'right' | 'center'
   isSubColumn?: boolean
   rowSpan?: number
   colSpan?: number
   format?: (value: number) => string
}

const columns: Column[] = [
   { id: 'No', label: 'No', minWidth: 80, rowSpan: 2, align: 'left' },
   { id: 'itemName', label: 'Item\u00a0Name', minWidth: 170, rowSpan: 2, align: 'center' },
   {
      id: 'openingBalance',
      label: 'Opening\u0020Balance',
      minWidth: 100,
      align: 'center',
      rowSpan: 2,
      format: (value: number) => value.toLocaleString('en-US'),
   },
   {
      id: 'transfer',
      label: 'Transfer',
      minWidth: 300,
      align: 'center',
      colSpan: 2,
   },
   {
      id: 'give',
      label: 'Give',
      isSubColumn: true,
      align: 'center',
      format: (value: number) => value.toLocaleString('en-US'),
   },
   {
      id: 'take',
      label: 'Take',
      isSubColumn: true,
      align: 'center',
      format: (value: number) => value.toLocaleString('en-US'),
   },
   {
      id: 'sales',
      label: 'Sales',
      minWidth: 300,
      align: 'center',
      colSpan: 2,
   },
   {
      id: 'supply',
      label: 'Supply',
      isSubColumn: true,
      align: 'center',
      format: (value: number) => value.toLocaleString('en-US'),
   },
   {
      id: 'return',
      label: 'Return',
      isSubColumn: true,
      align: 'center',
      format: (value: number) => value.toLocaleString('en-US'),
   },
   {
      id: 'closingBalance',
      label: 'Closing\u00a0Balance',
      align: 'right',
      minWidth: 200,
      rowSpan: 2,
      format: (value: number) => value.toLocaleString('en-US'),
   },
]

export default function WarehouseStocks() {
   const today = new Date()
   const [fromDate, setFromDate] = useState<Date | null>(today)
   const [toDate, setToDate] = useState<Date | null>(today)

   const { data: stocksData, isFetching: fetchingStocks } = useGetStocks({
      from: formatDate(fromDate!),
      to: formatDate(toDate!),
   })

   const stocks = stocksData?.data

   const handleChangeFromDate = (newDate: Date | null) => {
      if (newDate && newDate.getTime() <= new Date().getTime()) {
         setFromDate(newDate)
      }
   }

   return (
      <Container>
         <PageTitle>Stocks</PageTitle>
         <Flex sx={{ py: 3 }}>
            <Box sx={{ pr: 1 }}>
               <DatePicker value={fromDate} onChange={handleChangeFromDate} maxDate={toDate as Date} />
            </Box>
            <Typography variant="subtitle2">To</Typography>
            <Box sx={{ pl: 1 }}>
               <DatePicker value={toDate} onChange={(newValue) => setToDate(newValue)} maxDate={new Date()} />
            </Box>
         </Flex>

         <StocksTable rows={stocks!} columns={columns} loading={fetchingStocks} />
      </Container>
   )
}
