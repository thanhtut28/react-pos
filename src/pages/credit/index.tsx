import { useEffect, useState } from 'react'
import CreditsTable from '../../components/table/CreditsTable'
import useGetCredits from '../../api/queries/useGetCredits'
import { Typography, Box } from '@mui/material'
import {
   Container,
   StyledAvatar,
   Flex,
   StyledButtonBase,
   PageTitle,
   SearchButtonWrapper,
} from '../../components/toolbar/Elements'
import DatePicker from '../../components/datePicker'
import SearchIcon from '@mui/icons-material/Search'
import { formatDate } from '../../helpers/formatDate'

export default function CreditsPage() {
   const today = new Date()
   const [shouldRefetch, setShouldRefetch] = useState<boolean>(true)
   const [fromDate, setFromDate] = useState<Date | null>(today)
   const [toDate, setToDate] = useState<Date | null>(today)

   const { data, isFetching, refetch } = useGetCredits(
      {
         from: formatDate(fromDate!),
         to: formatDate(toDate!),
      },
      shouldRefetch
   )

   const credits = data?.data

   const dateIsValid = fromDate!.getTime() <= toDate!.getTime() && toDate!.getTime() <= new Date().getTime()

   const handleChangeFromDate = (newDate: Date | null) => {
      if (newDate && newDate.getTime() <= new Date().getTime()) {
         setFromDate(newDate)
      }
   }

   useEffect(() => {
      if (credits) {
         setShouldRefetch(false)
      }
   }, [credits])

   return (
      <Container>
         <PageTitle>Credits</PageTitle>

         <Flex sx={{ py: 3.5 }}>
            <Box sx={{ pr: 1 }}>
               <DatePicker value={fromDate} onChange={handleChangeFromDate} maxDate={toDate as Date} />
            </Box>
            <Typography variant="subtitle2">To</Typography>
            <Box sx={{ px: 1 }}>
               <DatePicker value={toDate} onChange={(newValue) => setToDate(newValue)} maxDate={new Date()} />
            </Box>

            <SearchButtonWrapper>
               <StyledButtonBase
                  aria-label="menu-toggler"
                  onClick={() => {
                     refetch()
                  }}
                  disabled={!dateIsValid}
               >
                  <StyledAvatar>
                     <SearchIcon fontSize="large" />
                  </StyledAvatar>
               </StyledButtonBase>
            </SearchButtonWrapper>
         </Flex>

         <CreditsTable loading={isFetching} data={credits} />
      </Container>
   )
}
