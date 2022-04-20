import { useState } from 'react'
import useGetSummary from '../../api/queries/useGetSummary'
import { Typography, Box, CircularProgress } from '@mui/material'
import { Container, Flex, PageTitle } from '../../components/toolbar/Elements'
import DatePicker from '../../components/datePicker'
import { formatDate } from '../../helpers/formatDate'
import SummaryCard from '../../components/summary/card'

export default function TransfersPage() {
   const today = new Date()
   const [fromDate, setFromDate] = useState<Date | null>(today)
   const [toDate, setToDate] = useState<Date | null>(today)

   const { data, isFetching, refetch } = useGetSummary({
      from: formatDate(fromDate!),
      to: formatDate(toDate!),
   })

   const summary = data?.data

   const handleChangeFromDate = (newDate: Date | null) => {
      if (newDate && newDate.getTime() <= new Date().getTime()) {
         setFromDate(newDate)
      }
   }

   const card1 = [
      { title: 'Total Sale', value: summary?.totalSale as number },
      { title: 'Total Received', value: summary?.totalReceived as number },
   ]

   const card2 = [
      { title: 'Opening Balance', value: summary?.openingBalance as number },
      { title: 'Total Supplies', value: summary?.totalSupplies as number },
      { title: 'Closing Balance', value: summary?.closingBalance as number },
      { title: 'Total Capital', value: summary?.totalCapital as number },
   ]

   const card3 = [
      { title: 'Total Sale', value: summary?.totalSale as number },
      { title: 'Total Capital', value: summary?.totalCapital as number },
      { title: 'Total Profit', value: summary?.totalProfit as number },
   ]

   return (
      <>
         <Container>
            <PageTitle>Summary</PageTitle>
            <Flex sx={{ py: 3, justifyContent: 'space-between', flexWrap: 'wrap' }}>
               <Flex>
                  <Box sx={{ pr: 1 }}>
                     <DatePicker value={fromDate} onChange={handleChangeFromDate} maxDate={toDate as Date} />
                  </Box>
                  <Typography variant="subtitle2">To</Typography>
                  <Box sx={{ pl: 1 }}>
                     <DatePicker
                        value={toDate}
                        onChange={(newValue) => setToDate(newValue)}
                        maxDate={new Date()}
                     />
                  </Box>
               </Flex>
            </Flex>
            {summary ? (
               <Flex sx={{ flexWrap: 'wrap', flexDirection: 'column' }}>
                  <SummaryCard balances={card1} />
                  <SummaryCard balances={card2} />
                  <SummaryCard balances={card3} />
               </Flex>
            ) : (
               <Box display="flex" justifyContent="center" alignItems="center" width={1} py={10}>
                  <CircularProgress />
               </Box>
            )}
         </Container>
      </>
   )
}
