import { useState } from 'react'
import TransfersTable from '../../components/table/TransfersTable'
import useGetTransfers from '../../api/queries/useGetTransfers'
import { Typography, Button, Box } from '@mui/material'
import { Container, Flex, PageTitle } from '../../components/toolbar/Elements'
import { useNavigate } from 'react-router-dom'
import DatePicker from '../../components/datePicker'
import { formatDate } from '../../helpers/formatDate'
import { useAuth } from '../../contexts/AuthContext'

export default function TransfersPage() {
   const navigate = useNavigate()
   const today = new Date()
   const [fromDate, setFromDate] = useState<Date | null>(today)
   const [toDate, setToDate] = useState<Date | null>(today)
   const { isAdmin } = useAuth()

   const { data, isFetching, refetch } = useGetTransfers({
      from: formatDate(fromDate!),
      to: formatDate(toDate!),
   })

   const transfers = data?.data

   const handleChangeFromDate = (newDate: Date | null) => {
      if (newDate && newDate.getTime() <= new Date().getTime()) {
         setFromDate(newDate)
      }
   }

   return (
      <Container>
         <PageTitle>Transfers</PageTitle>
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

            {isAdmin && (
               <Box sx={{ pr: 2, py: 2 }}>
                  <Button
                     variant="contained"
                     color="primary"
                     size="small"
                     disableElevation
                     onClick={() => {
                        navigate(`/create/transfers`, { replace: true })
                     }}
                  >
                     Create Transfer
                  </Button>
               </Box>
            )}
         </Flex>
         <TransfersTable loading={isFetching} data={transfers} />
      </Container>
   )
}
