import React, { useEffect, useState } from 'react'
import { TextField, FormControl, MenuItem, InputLabel, Divider, Button } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import useInput from '../../hooks/useInput'
import { isNotEmpty } from '../../helpers/isNotEmpty'
import useGetCustomers from '../../api/queries/useGetCustomers'
import useGetReceiptNum from '../../api/queries/useGetReceiptNum'
import useGetItems from '../../api/queries/useGetItems'
import {
   Container,
   InputsWrapper,
   ItemsWrapper,
   StyledRow,
   TextFieldWrapper,
   StyledButton,
   ActionsWrapper,
   Row,
} from '../../components/create/Elements'
import DatePicker from '../../components/datePicker'
import { receiptTypes } from '../../dummy'
import { ConstructionOutlined } from '@mui/icons-material'
import { isGreaterThanOne } from 'src/helpers/isGreaterThanOne'
import { isBetweenZeroAndOne } from 'src/helpers/isBetweenZeroAndOne'

export default function CreateReceipts() {
   const {
      value: customerCode,
      valueIsValid: customerCodeIsValid,
      inputChangeHandler: customerCodeChangeHandler,
   } = useInput(isNotEmpty)

   const [receiptNum, setReceiptNum] = useState<string>('')
   const today = new Date()
   const [type, setType] = useState<string>(receiptTypes[0])
   const [customerName, setCustomerName] = useState<string>('')

   const {
      value: itemCode,
      valueIsValid: itemCodeIsValid,
      inputChangeHandler: itemCodeChangeHandler,
   } = useInput(isNotEmpty)

   const { value: qty, valueIsValid: qtyIsValid, setValue: setQty } = useInput(isGreaterThanOne)

   const {
      value: unitPrice,
      valueIsValid: unitPriceIsValid,
      setValue: setUnitPrice,
   } = useInput(isGreaterThanOne)

   const {
      value: unitPercent,
      valueIsValid: unitPercentIsValid,
      setValue: setUnitPercent,
   } = useInput(isBetweenZeroAndOne)

   const [itemName, setItemName] = useState<string>('')

   const { data: customersData } = useGetCustomers()
   const { data: receiptNumData } = useGetReceiptNum()
   const { data: itemsData } = useGetItems()
   const customers = customersData?.data
   const receiptNumber = receiptNumData?.data
   const items = itemsData?.data

   const formIsValid =
      customerCodeIsValid && itemCodeIsValid && qtyIsValid && unitPriceIsValid && unitPercentIsValid

   const handleDateChange = (value: string | null) => {}

   const handleUnitPercentChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (isBetweenZeroAndOne(e.target.value)) {
         setUnitPercent(e.target.value)
      }
   }

   const handleQtyChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (isGreaterThanOne(e.target.value)) {
         setQty(e.target.value)
      }
   }

   const handleUnitPriceChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (isGreaterThanOne(e.target.value)) {
         setUnitPrice(e.target.value)
      }
   }

   const handleAddItem = () => {
      if (formIsValid) {
         console.log('form is submitting')
         return
      }
      console.log('invalid submit')
   }

   useEffect(() => {
      const customer = customers?.find((customer) => customer.code === customerCode)
      if (customer) {
         setCustomerName(customer.name)
         return
      }
      setCustomerName('')
      return
   }, [customers, customerCode])

   useEffect(() => {
      const item = items?.find((item) => item.itemCode === itemCode)
      if (item) {
         setItemName(item.itemName)
         setUnitPrice(item.unitPrice.toString())
         setUnitPercent(item.unitPercent.toString())
         return
      }
      setItemName('')
      setUnitPrice('')
      setUnitPercent('')
      return
   }, [items, itemCode, setUnitPrice, setUnitPercent])

   useEffect(() => {
      if (receiptNumber) {
         setReceiptNum(receiptNumber.toString())
      }
   }, [receiptNumber])

   return (
      <Container>
         <InputsWrapper>
            <StyledRow>
               <Row width={1} maxWidth={400}>
                  <TextFieldWrapper flex={1}>
                     <TextField
                        variant="outlined"
                        label="Customer code"
                        size="small"
                        required
                        value={customerCode}
                        onChange={customerCodeChangeHandler}
                        fullWidth
                     />
                  </TextFieldWrapper>
                  <TextFieldWrapper flex={1.5}>
                     <TextField
                        variant="outlined"
                        label="Customer name"
                        size="small"
                        required
                        value={customerName}
                        disabled
                        fullWidth
                     />
                  </TextFieldWrapper>
               </Row>

               <TextFieldWrapper
                  width={1}
                  sx={{
                     maxWidth: {
                        xs: 120,
                        sm: 200,
                     },
                  }}
               >
                  <TextField
                     variant="outlined"
                     label="Receipt Num"
                     size="small"
                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                     value={receiptNum}
                     onChange={(e) => setReceiptNum(e.target.value)}
                     disabled
                     fullWidth
                  />
               </TextFieldWrapper>
            </StyledRow>
            {/* 2nd row */}
            <StyledRow>
               <TextFieldWrapper width={1} maxWidth={400}>
                  <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label">Receipt Type</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Receipt Type"
                        onChange={(e) => setType(e.target.value as string)}
                     >
                        {receiptTypes.map((type) => (
                           <MenuItem key={type} value={type}>
                              {type}
                           </MenuItem>
                        ))}
                        {/* <MenuItem key="none" value="">
                           <em>None</em>
                        </MenuItem> */}
                     </Select>
                  </FormControl>
               </TextFieldWrapper>
               <TextFieldWrapper
                  width={1}
                  sx={{
                     maxWidth: {
                        xs: 120,
                        sm: 200,
                     },
                  }}
               >
                  <DatePicker value={today.toString()} onChange={handleDateChange} />
               </TextFieldWrapper>
            </StyledRow>
         </InputsWrapper>

         <Divider />

         <ItemsWrapper>
            <Row>
               <TextFieldWrapper sx={{ flex: 1 }}>
                  <TextField
                     variant="outlined"
                     label="Item Code"
                     size="small"
                     required
                     value={itemCode}
                     onChange={itemCodeChangeHandler}
                     fullWidth
                  />
               </TextFieldWrapper>
               <TextFieldWrapper sx={{ flex: 2 }}>
                  <TextField
                     variant="outlined"
                     label="Item Name"
                     size="small"
                     required
                     value={itemName}
                     fullWidth
                     disabled
                  />
               </TextFieldWrapper>
            </Row>
            <Row>
               <TextFieldWrapper sx={{ flex: 1 }}>
                  <TextField
                     variant="outlined"
                     label="Quantity"
                     size="small"
                     required
                     value={qty}
                     type="number"
                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                     onChange={handleQtyChangeHandler}
                     fullWidth
                  />
               </TextFieldWrapper>
               <TextFieldWrapper sx={{ flex: 1 }}>
                  <TextField
                     variant="outlined"
                     label="Unit Price"
                     size="small"
                     required
                     type="number"
                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                     value={unitPrice}
                     onChange={handleUnitPriceChangeHandler}
                     fullWidth
                  />
               </TextFieldWrapper>
               <TextFieldWrapper sx={{ flex: 1 }}>
                  <TextField
                     variant="outlined"
                     label="Unit Percent"
                     size="small"
                     required
                     type="number"
                     inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        step: '0.01',
                        min: '0',
                        max: '1',
                     }}
                     value={unitPercent}
                     onChange={handleUnitPercentChangeHandler}
                     fullWidth
                  />
               </TextFieldWrapper>
            </Row>

            <ActionsWrapper sx={{ flex: 1 }}>
               <StyledButton
                  variant="contained"
                  size="small"
                  color="primary"
                  fullWidth
                  onClick={handleAddItem}
               >
                  Add
               </StyledButton>
            </ActionsWrapper>
         </ItemsWrapper>
      </Container>
   )
}
