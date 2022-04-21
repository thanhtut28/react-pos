import { useState } from 'react'
import CreditsTable from '../../components/table/CreditsTable'
import useGetCredits from '../../api/queries/useGetCredits'
import { Typography, Box } from '@mui/material'
import { Container, Flex, PageTitle } from '../../components/toolbar/Elements'
import DatePicker from '../../components/datePicker'
import { formatDate } from '../../helpers/formatDate'

export default function CreditsPage() {
   const today = new Date()
   const [fromDate, setFromDate] = useState<Date | null>(today)
   const [toDate, setToDate] = useState<Date | null>(today)

   const { data, isFetching } = useGetCredits({
      from: formatDate(fromDate!),
      to: formatDate(toDate!),
   })

   const credits = data?.data

   const handleChangeFromDate = (newDate: Date | null) => {
      if (newDate && newDate.getTime() <= new Date().getTime()) {
         setFromDate(newDate)
      }
   }

   return (
      <Container>
         <PageTitle>Credits</PageTitle>

         <Flex sx={{ py: 3.5 }}>
            <Box sx={{ pr: 1 }}>
               <DatePicker value={fromDate} onChange={handleChangeFromDate} maxDate={toDate as Date} />
            </Box>
            <Typography variant="subtitle2">To</Typography>
            <Box sx={{ pl: 1 }}>
               <DatePicker value={toDate} onChange={(newValue) => setToDate(newValue)} maxDate={new Date()} />
            </Box>
         </Flex>

         <CreditsTable loading={isFetching} data={credits} />
      </Container>
   )
}
