import { useEffect, useState } from 'react'
import ReceiptsTable from '../../components/table/ReceiptsTable'
import useGetReceipts from '../../api/queries/useGetReceipts'
import { Typography, Button, Box } from '@mui/material'
import {
   Container,
   StyledAvatar,
   Flex,
   StyledButtonBase,
   PageTitle,
   SearchButtonWrapper,
} from '../../components/toolbar/Elements'
import { useNavigate } from 'react-router-dom'
import DatePicker from '../../components/datePicker'
import SearchIcon from '@mui/icons-material/Search'
import { formatDate } from '../../helpers/formatDate'

export default function ReceiptsPage() {
   const navigate = useNavigate()
   const today = new Date()
   const [shouldRefetch, setShouldRefetch] = useState<boolean>(true)
   const [fromDate, setFromDate] = useState<Date | null>(today)
   const [toDate, setToDate] = useState<Date | null>(today)

   const { data, isFetching, refetch } = useGetReceipts(
      {
         from: formatDate(fromDate!),
         to: formatDate(toDate!),
      },
      shouldRefetch
   )

   const receipts = data?.data

   const dateIsValid = fromDate!.getTime() <= toDate!.getTime() && toDate!.getTime() <= new Date().getTime()

   const handleChangeFromDate = (newDate: Date | null) => {
      if (newDate && newDate.getTime() <= new Date().getTime()) {
         setFromDate(newDate)
      }
   }

   useEffect(() => {
      if (receipts) {
         setShouldRefetch(false)
      }
   }, [receipts])

   return (
      <Container>
         <PageTitle>Receipts</PageTitle>
         <Flex sx={{ py: 3, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Flex>
               <Box sx={{ pr: 1 }}>
                  <DatePicker value={fromDate} onChange={handleChangeFromDate} maxDate={toDate as Date} />
               </Box>
               <Typography variant="subtitle2">To</Typography>
               <Box sx={{ px: 1 }}>
                  <DatePicker
                     value={toDate}
                     onChange={(newValue) => setToDate(newValue)}
                     maxDate={new Date()}
                  />
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
