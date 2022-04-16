import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TextField, FormControl, MenuItem, InputLabel, Divider, Autocomplete } from '@mui/material'
import Select from '@mui/material/Select'
import useDisableInput from '../../hooks/useDisableInput'
import useGetUsers from '../../api/queries/useGetUsers'
import useGetTransferById from '../../api/queries/useGetTransferById'
import useGetItems from '../../api/queries/useGetItems'
import {
   Container,
   InputsWrapper,
   StyledRow,
   TextFieldWrapper,
   Row,
   TableWrapper,
} from '../../components/create/Elements'
import DateTimePicker from '../../components/dateTimePicker'
import { transferTypes } from '../../dummy'
import { isGreaterThanZero } from '../../helpers/isGreaterThanZero'
import TransferItemsTable from '../../components/table/view/TransferItemsTable'

export interface Row {
   id: number
   itemId: string
   itemName: string
   itemCode?: string
   qty: string
}

export default function ViewTransfer() {
   const [rows, setRows] = useState<Row[]>([])
   const [date, setDate] = useState<Date | null>(null)
   const [transferType, setTransferType] = useState<string>(transferTypes[0])
   const [username, setUsername] = useState<string | null>(null)
   const { transferId } = useParams()

   const { value: transferNum, setValue: setTransferNum } = useDisableInput(isGreaterThanZero)

   const { data: usersData, isFetching: fetchingUsers } = useGetUsers()

   const { data: transferData, isFetching: fetchingTransfer } = useGetTransferById(transferId!)

   const { data: itemsData, isFetching: fetchingItems } = useGetItems()

   const users = usersData?.data
   const items = itemsData?.data

   const loading = fetchingUsers || fetchingItems || fetchingTransfer

   const handleDateChange = (value: Date | null) => {}

   useEffect(() => {
      if (transferData) {
         const {
            data: { items: editItems, transferDate, transferNum, transferType, username },
         } = transferData

         setTransferNum(transferNum.toString())

         const newItems = editItems.map((item, index) => ({
            id: index + 1,
            itemId: item.itemId,
            itemName: item.itemName,
            itemCode: items ? items.find((it) => it.itemName === item.itemName)?.itemCode : '',
            qty: item.qty.toString(),
         }))
         setRows(newItems)
         setTransferType(transferType)
         setDate(transferDate)
         setUsername(username)
      }
   }, [items, setTransferNum, transferData])

   return (
      <Container>
         <InputsWrapper>
            <StyledRow>
               <Row width={1} maxWidth={400}>
                  <TextFieldWrapper flex={1}>
                     <Autocomplete
                        key="username"
                        value={username}
                        onChange={(event: any, newValue: any) => {
                           setUsername(newValue as string)
                        }}
                        disabled
                        options={users ? users.map((user) => user.username) : [null]}
                        renderInput={(params: any) => <TextField {...params} label="Username" />}
                     />
                  </TextFieldWrapper>
               </Row>

               <TextFieldWrapper
                  width={1}
                  sx={{
                     maxWidth: {
                        xs: 250,
                        sm: 250,
                     },
                  }}
               >
                  <TextField
                     variant="outlined"
                     label="Transfer Num"
                     size="small"
                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                     value={transferNum}
                     onChange={(e) => setTransferNum(e.target.value)}
                     disabled
                     fullWidth
                  />
               </TextFieldWrapper>
            </StyledRow>
            {/* 2nd row */}
            <StyledRow>
               <TextFieldWrapper width={1} maxWidth={400}>
                  <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label">Transfer Type</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={transferType}
                        label="Transfer Type"
                        onChange={(e) => setTransferType(e.target.value as string)}
                        disabled
                     >
                        {transferTypes.map((type) => (
                           <MenuItem key={type} value={type}>
                              {type}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </TextFieldWrapper>
               <TextFieldWrapper
                  width={1}
                  sx={{
                     maxWidth: {
                        xs: 250,
                        sm: 250,
                     },
                  }}
               >
                  <DateTimePicker value={date} onChange={handleDateChange} />
               </TextFieldWrapper>
            </StyledRow>
         </InputsWrapper>

         <Divider />

         <TableWrapper>
            <TransferItemsTable rows={rows} loading={loading} />
         </TableWrapper>
      </Container>
   )
}
