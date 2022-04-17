import { useEffect, useState } from 'react'
import TransfersTable from '../../components/table/TransfersTable'
import useGetTransfers from '../../api/queries/useGetTransfers'
import { Typography, Button, Box, ButtonBase } from '@mui/material'
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
import { useAuth } from '../../contexts/AuthContext'

export default function TransfersPage() {
   const navigate = useNavigate()
   const today = new Date()
   const [shouldRefetch, setShouldRefetch] = useState<boolean>(true)
   const [fromDate, setFromDate] = useState<Date | null>(today)
   const [toDate, setToDate] = useState<Date | null>(today)
   const { isAdmin } = useAuth()

   const { data, isFetching, refetch } = useGetTransfers(
      {
         from: formatDate(fromDate!),
         to: formatDate(toDate!),
      },
      shouldRefetch
   )

   const transfers = data?.data

   const dateIsValid = fromDate!.getTime() <= toDate!.getTime() && toDate!.getTime() <= new Date().getTime()

   const handleChangeFromDate = (newDate: Date | null) => {
      if (newDate && newDate.getTime() <= new Date().getTime()) {
         setFromDate(newDate)
      }
   }

   useEffect(() => {
      if (transfers) {
         setShouldRefetch(false)
      }
   }, [transfers])

   return (
      <Container>
         <PageTitle>Transfers</PageTitle>
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
