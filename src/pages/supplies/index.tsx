import { useEffect, useState } from 'react'
import SuppliesTable from '../../components/table/SuppliesTable'
import useGetSupplies from '../../api/queries/useGetSupplies'
import { Typography, Button, Box, ButtonBase } from '@mui/material'
import { Container, StyledAvatar, Flex, StyledButtonBase, PageTitle } from '../../components/toolbar/Elements'
import { useNavigate } from 'react-router-dom'
import DatePicker from '../../components/datePicker'
import SearchIcon from '@mui/icons-material/Search'

export default function SuppliesPage() {
   const navigate = useNavigate()
   const today = new Date()
   const [shouldRefetch, setShouldRefetch] = useState<boolean>(true)
   const [fromDate, setFromDate] = useState<Date | null>(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
   )
   const [toDate, setToDate] = useState<Date | null>(today)

   const { data, isFetching, refetch } = useGetSupplies(
      {
         from: fromDate!.toString(),
         to: toDate!.toString(),
      },
      shouldRefetch
   )

   const supplies = data?.data

   const dateIsValid = fromDate!.getTime() <= toDate!.getTime() && toDate!.getTime() <= new Date().getTime()

   const handleChangeFromDate = (newDate: Date | null) => {
      if (newDate && newDate.getTime() <= new Date().getTime()) {
         setFromDate(newDate)
      }
   }

   useEffect(() => {
      if (supplies) {
         setShouldRefetch(false)
      }
   }, [supplies])

   return (
      <Container>
         <PageTitle>Supplies</PageTitle>
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

               <Box sx={{ px: 1 }}>
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
               </Box>
            </Flex>

            <Box sx={{ pr: 2, py: 2 }}>
               <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disableElevation
                  onClick={() => {
                     navigate(`/create/supplies`, { replace: true })
                  }}
               >
                  Create Supply
               </Button>
            </Box>
         </Flex>
         <SuppliesTable loading={isFetching} data={supplies} />
      </Container>
   )
}
