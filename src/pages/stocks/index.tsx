import { useState, useEffect } from 'react'
import useGetStocks from '../../api/queries/useGetStocks'
import useGetUsers from '../../api/queries/useGetUsers'
import { Stock } from '../../api/queries/types'
import { Typography, Box, Autocomplete, TextField } from '@mui/material'
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
import StocksTable from '../../components/stocksTable'
import { formatDate } from '../../helpers/formatDate'
import { useAuth } from '../../contexts/AuthContext'

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
   { id: 'itemName', label: 'Item\u00a0Name', minWidth: 150, rowSpan: 2, align: 'center' },
   {
      id: 'openingBalance',
      label: 'Opening\nBalance',
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
      id: 'sale',
      label: 'Sale',
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
      minWidth: 150,
      rowSpan: 2,
      format: (value: number) => value.toLocaleString('en-US'),
   },
]

export default function Stocks() {
   const [rows, setRows] = useState<Stock[]>([])
   const today = new Date()
   const [shouldRefetch, setShouldRefetch] = useState<boolean>(true)
   const [fromDate, setFromDate] = useState<Date | null>(today)
   const [toDate, setToDate] = useState<Date | null>(today)
   const [username, setUsername] = useState<string | null>(null)
   const [userId, setUserId] = useState<string>('')
   const { isAdmin, user } = useAuth()

   const {
      data: stocksData,
      refetch,
      isFetching: fetchingStocks,
   } = useGetStocks(
      {
         from: formatDate(fromDate!),
         to: formatDate(toDate!),
      },
      shouldRefetch,
      userId
   )

   const { data: usersData, isFetching: fetchingUsers } = useGetUsers(isAdmin)

   const stocks = stocksData?.data
   const users = usersData?.data

   const dateIsValid = fromDate!.getTime() <= toDate!.getTime() && toDate!.getTime() <= new Date().getTime()

   const handleChangeFromDate = (newDate: Date | null) => {
      if (newDate && newDate.getTime() <= new Date().getTime()) {
         setFromDate(newDate)
      }
   }

   useEffect(() => {
      if (stocks) {
         setShouldRefetch(false)
         setRows(stocks)
      }
   }, [stocks])

   useEffect(() => {
      const user = users?.find((user) => user.username === username)
      if (user && isAdmin) {
         setUserId(user.userId)
         return
      }
      setUserId('')
   }, [username, users, isAdmin])

   useEffect(() => {
      if (user && users) {
         setUsername(user.username)
      }
   }, [user, users])

   return (
      <Container>
         <PageTitle>Stocks</PageTitle>
         <Flex sx={{ py: 3, flexWrap: 'wrap' }}>
            <Flex sx={{ py: 3 }}>
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
            </Flex>
            <Flex flex={1}>
               {isAdmin && (
                  <Box width={1} maxWidth={300} minWidth={100} pl={0}>
                     <Autocomplete
                        key="username"
                        value={username}
                        onChange={(event: any, newValue: any) => {
                           setUsername(newValue as string)
                        }}
                        options={users ? users.map((user) => user.username) : [null]}
                        renderInput={(params: any) => <TextField {...params} label="Username" />}
                     />
                  </Box>
               )}
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
         </Flex>
         <StocksTable rows={rows} columns={columns} loading={(isAdmin && fetchingUsers) || fetchingStocks} />
      </Container>
   )
}
