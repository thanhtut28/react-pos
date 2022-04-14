import { useState } from 'react'
import ReceiptsTable from '../../components/table/ReceiptsTable'
import useGetReceipts from '../../api/queries/useGetReceipts'
import { Typography, Button, Box } from '@mui/material'
import { Container, ToolbarWrapper } from '../../components/toolbar/Elements'
import { useNavigate } from 'react-router-dom'
import DatePicker from '../../components/datePicker'

export default function ReceiptsPage() {
   const navigate = useNavigate()
   const today = new Date()
   const [fromDate, setFromDate] = useState<Date | null>(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
   )
   const [toDate, setToDate] = useState<Date | null>(today)

   const { data, isFetching, error, refetch } = useGetReceipts({
      from: fromDate!.toString(),
      to: toDate!.toString(),
   })

   const receipts = data?.data

   const dateIsValid = fromDate!.getTime() <= toDate!.getTime() && toDate!.getTime() < new Date().getTime()

   console.log(dateIsValid)

   const handleChangeFromDate = (newDate: Date | null) => {
      if (newDate && newDate.getTime() <= new Date().getTime()) {
         setFromDate(newDate)
      }
   }

   return (
      <Container>
         <Typography variant="h5">Receipts</Typography>
         <Box py={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
               <Box display="flex" alignItems="center">
                  <Box sx={{ pr: 2 }}>
                     <DatePicker value={fromDate} onChange={handleChangeFromDate} maxDate={toDate as Date} />
                  </Box>
                  <Typography variant="subtitle2">To</Typography>
                  <Box sx={{ px: 2 }}>
                     <DatePicker
                        value={toDate}
                        onChange={(newValue) => setToDate(newValue)}
                        maxDate={new Date()}
                     />
                  </Box>
                  <Box sx={{ px: 2 }}>
                     <Button
                        sx={{ height: 56 }}
                        variant="contained"
                        disabled={!dateIsValid}
                        onClick={() => {
                           refetch()
                        }}
                     >
                        Search
                     </Button>
                  </Box>
               </Box>

               <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disableElevation
                  onClick={() => navigate('/create/receipts', { replace: true })}
               >
                  Create Receipt
               </Button>
            </Box>
         </Box>
         <ReceiptsTable loading={isFetching} data={receipts} />
      </Container>
   )
}
