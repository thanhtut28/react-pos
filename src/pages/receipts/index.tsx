import { useState } from 'react'
import ReceiptsTable from '../../components/table/ReceiptsTable'
import useGetReceipts from '../../api/queries/useGetReceipts'
import { Typography, Button, Box } from '@mui/material'
import { Container, Flex, PageTitle } from '../../components/toolbar/Elements'
import { useNavigate } from 'react-router-dom'
import DatePicker from '../../components/datePicker'
import { formatDate } from '../../helpers/formatDate'

export default function ReceiptsPage() {
   const navigate = useNavigate()
   const today = new Date()
   const [fromDate, setFromDate] = useState<Date | null>(today)
   const [toDate, setToDate] = useState<Date | null>(today)

   const { data, isFetching, refetch } = useGetReceipts({
      from: formatDate(fromDate!),
      to: formatDate(toDate!),
   })

   const receipts = data?.data

   const handleChangeFromDate = (newDate: Date | null) => {
      if (newDate && newDate.getTime() <= new Date().getTime()) {
         setFromDate(newDate)
      }
   }

   return (
      <Container>
         <PageTitle>Receipts</PageTitle>
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

            <Box sx={{ pr: 2, py: 2 }}>
               <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disableElevation
                  onClick={() => {
                     navigate(`/create/receipts`, { replace: true })
                  }}
               >
                  Create Receipt
               </Button>
            </Box>
         </Flex>
         <ReceiptsTable loading={isFetching} data={receipts} />
      </Container>
   )
}
