import { useEffect, useState, useCallback } from 'react'
import { TextField, FormControl, MenuItem, InputLabel, Divider, Button, Box } from '@mui/material'
import Select from '@mui/material/Select'
import useInput from '../../hooks/useInput'
import useDisableInput from '../../hooks/useDisableInput'
import { isNotEmpty } from '../../helpers/isNotEmpty'
import useGetCustomers from '../../api/queries/useGetCustomers'
import useGetReceiptNum from '../../api/queries/useGetReceiptNum'
import useGetItems from '../../api/queries/useGetItems'
import { useCreateReceipt } from '../../api/mutations/receipt'
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
import { isGreaterThanZero } from '../../helpers/isGreaterThanZero'
import { isPercentage } from '../../helpers/isPercentage'
import ReceiptItemsTable from '../../components/table/ReceiptItemsTable'
import { GridColumns, GridActionsCellItem, GridValueFormatterParams } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { isValidQty } from '../../helpers/isValidQty'

const calcNetAmount = (qty: number, price: number, percent = 0): number => {
   const total = qty * price
   const discount = qty * price * percent
   return total - discount
}

export default function CreateReceipts() {
   const [rows, setRows] = useState<any>([])

   const [total, setTotal] = useState<number>(0)
   const [netAmount, setNetAmount] = useState<number>(0)
   const [itemId, setItemId] = useState<string>('')
   const today = new Date()
   const [receiptType, setReceiptType] = useState<string>(receiptTypes[0])
   const [openModal, setOpenModal] = useState<boolean>(false)

   const {
      value: customerCode,
      valueIsValid: customerCodeIsValid,
      inputChangeHandler: customerCodeChangeHandler,
      inputBlurHandler: customerCodeBlurHandler,
      inputError: customerCodeError,
   } = useInput(isNotEmpty)

   const {
      value: customerName,
      valueIsValid: customerNameIsValid,
      setValue: setCustomerName,
      inputChangeHandler: customerNameChangeHandler,
      inputBlurHandler: customerNameBlurHandler,
      inputError: customerNameError,
   } = useInput(isNotEmpty)

   const {
      value: receiptNum,
      setValue: setReceiptNum,
      valueIsValid: receiptNumIsValid,
   } = useDisableInput(isGreaterThanZero)

   const {
      value: itemCode,
      valueIsValid: itemCodeIsValid,
      inputChangeHandler: itemCodeChangeHandler,
      inputBlurHandler: itemCodeBlurHandler,
      inputError: itemCodeError,
      reset: resetItemCode,
   } = useInput(isNotEmpty)

   const {
      value: itemName,
      valueIsValid: itemNameIsValid,
      setValue: setItemName,
      inputError: itemNameError,
      reset: resetItemName,
   } = useDisableInput(isNotEmpty)

   const {
      value: qty,
      valueIsValid: qtyIsValid,
      inputChangeHandler: qtyChangeHandler,
      inputBlurHandler: qtyBlurHandler,
      inputError: qtyError,
      reset: resetQty,
   } = useInput(isValidQty)

   const {
      value: unitPrice,
      valueIsValid: unitPriceIsValid,
      setValue: setUnitPrice,
      inputChangeHandler: unitPriceChangeHandler,
      inputBlurHandler: unitPriceBlurHandler,
      inputError: unitPriceError,
      reset: resetUnitPrice,
   } = useInput(isGreaterThanZero)

   const {
      value: unitPercent,
      valueIsValid: unitPercentIsValid,
      setValue: setUnitPercent,
      inputChangeHandler: unitPercentChangeHandler,
      inputBlurHandler: unitPercentBlurHandler,
      inputError: unitPercentError,
      reset: resetUnitPercent,
   } = useInput(isPercentage)

   const { data: customersData } = useGetCustomers()
   const { data: receiptNumData, refetch: refetchReceiptNum } = useGetReceiptNum()
   const { data: itemsData } = useGetItems()
   const { mutate: createReceipt, isLoading: isCreatingReceipt } = useCreateReceipt(refetchReceiptNum)
   const customers = customersData?.data
   const receiptNumber = receiptNumData?.data
   const items = itemsData?.data

   const resetItemInputs = () => {
      resetItemCode()
      resetItemName()
      resetQty()
      resetUnitPrice()
      resetUnitPercent()
      setNetAmount(0)
   }

   const formIsValid =
      itemCodeIsValid && itemNameIsValid && qtyIsValid && unitPriceIsValid && unitPercentIsValid

   const handleUpdate = useCallback((data) => {
      console.log(data.row)
   }, [])

   const handleDateChange = (value: string | null) => {}

   const handleAddItem = () => {
      if (formIsValid) {
         setRows((prev: any) => [
            ...prev,
            {
               id: prev.length + 1,
               itemId,
               itemName,
               qty,
               unitPrice,
               unitPercent: +unitPercent / 100,
               netAmount,
            },
         ])
         resetItemInputs()
      }
   }

   const handleCreateReceipt = () => {
      if (customerCodeIsValid && customerNameIsValid && rows.length > 0) {
         const items = rows.map((row: any) => ({
            itemId: row.itemId,
            qty: +row.qty,
            unitPrice: +row.unitPrice,
            unitPercent: +row.unitPercent,
         }))
         createReceipt({ customerName, receiptType, items })
      }
   }

   useEffect(() => {
      const customer = customers?.find((customer) => customer.code === customerCode)
      if (customer) {
         setCustomerName(customer.name)
         return
      }
   }, [customers, customerCode, setCustomerName])

   useEffect(() => {
      const item = items?.find((item) => item.itemCode === itemCode)
      if (item) {
         setItemName(item.itemName)
         setUnitPrice(item.unitPrice.toString())
         setUnitPercent((item.unitPercent * 100).toString())
         setItemId(item.itemId)
         return
      }
      setItemName('')
      setUnitPrice('')
      setUnitPercent('')
      setItemId('')
      return
   }, [items, itemCode, setUnitPrice, setUnitPercent, setItemId, setItemName])

   useEffect(() => {
      if (qty && unitPrice) {
         setNetAmount(calcNetAmount(+qty, +unitPrice, +unitPercent / 100))
      }
   }, [qty, unitPrice, unitPercent, setNetAmount])

   useEffect(() => {
      if (receiptNumber) {
         setReceiptNum(receiptNumber.toString())
      }
   }, [receiptNumber, setReceiptNum])

   useEffect(() => {
      if (rows.length > 0) {
         const total = rows
            .map((row: any) => +row.netAmount)
            .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)
         setTotal(total)
      }
   }, [rows])

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
                        value={customerCode}
                        onChange={customerCodeChangeHandler}
                        onBlur={customerCodeBlurHandler}
                        error={customerCodeError}
                        helperText={customerCodeError && `This field is required`}
                        fullWidth
                     />
                  </TextFieldWrapper>
                  <TextFieldWrapper flex={1.5}>
                     <TextField
                        variant="outlined"
                        label="Customer name"
                        size="small"
                        value={customerName}
                        onChange={customerNameChangeHandler}
                        onBlur={customerNameBlurHandler}
                        error={customerNameError}
                        helperText={customerNameError && `This field is required`}
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
                        value={receiptType}
                        label="Receipt Type"
                        onChange={(e) => setReceiptType(e.target.value as string)}
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
                     value={itemCode}
                     onChange={itemCodeChangeHandler}
                     onBlur={itemCodeBlurHandler}
                     error={itemCodeError}
                     helperText={itemCodeError && 'This field is required'}
                     fullWidth
                  />
               </TextFieldWrapper>
               <TextFieldWrapper sx={{ flex: 2 }}>
                  <TextField
                     variant="outlined"
                     label="Item Name"
                     size="small"
                     value={itemName}
                     error={itemNameError && itemCodeError}
                     helperText={itemNameError && itemCodeError && 'This field is required'}
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
                     value={qty}
                     type="number"
                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                     onChange={qtyChangeHandler}
                     onBlur={qtyBlurHandler}
                     error={qtyError}
                     helperText={qtyError && 'This field is required'}
                     fullWidth
                  />
               </TextFieldWrapper>
               <TextFieldWrapper sx={{ flex: 1 }}>
                  <TextField
                     variant="outlined"
                     label="Unit Price"
                     size="small"
                     type="number"
                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                     value={unitPrice}
                     onChange={unitPriceChangeHandler}
                     onBlur={unitPriceBlurHandler}
                     error={unitPriceError}
                     helperText={unitPriceError && 'Please Fill a valid price'}
                     fullWidth
                  />
               </TextFieldWrapper>
               <TextFieldWrapper sx={{ flex: 1 }}>
                  <TextField
                     variant="outlined"
                     label="Unit Percent"
                     size="small"
                     type="number"
                     inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        min: '0',
                        max: '100',
                     }}
                     value={unitPercent}
                     onChange={unitPercentChangeHandler}
                     onBlur={unitPercentBlurHandler}
                     error={unitPercentError}
                     helperText={unitPercentError && 'Must be between 0 and 100'}
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
         <Divider />
         <ReceiptItemsTable
            onUpdate={handleUpdate}
            rows={rows}
            setRows={setRows}
            total={total}
            loading={false}
            setOpenModal={setOpenModal}
         />
         <Box sx={{ pt: 3, display: 'flex', justifyContent: 'flex-end', pr: 4 }}>
            <Button variant="contained" size="small" color="primary" onClick={handleCreateReceipt}>
               Save
            </Button>
         </Box>
      </Container>
   )
}
