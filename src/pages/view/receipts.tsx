import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { TextField, FormControl, MenuItem, InputLabel, Divider, Box } from '@mui/material'
import Select from '@mui/material/Select'

import useInput from '../../hooks/useInput'
import useDisableInput from '../../hooks/useDisableInput'
import { isNotEmpty } from '../../helpers/isNotEmpty'
import useGetCustomers from '../../api/queries/useGetCustomers'
import useMessageModal from '../../hooks/useMessageModal'
import useGetReceiptById from '../../api/queries/useGetReceiptById'
import useGetItems from '../../api/queries/useGetItems'
import { usePrintMutation } from '../../api/mutations/print'
import {
   Container,
   InputsWrapper,
   StyledRow,
   TextFieldWrapper,
   Row,
   TableWrapper,
   SubmitActionsWrapper,
   StyledButton,
} from '../../components/create/Elements'
import DateTimePicker from '../../components/dateTimePicker'
import { receiptTypes } from '../../dummy'
import { isGreaterThanZero } from '../../helpers/isGreaterThanZero'
import ReceiptItemsTable from '../../components/table/view/ReceiptItemsTable'
import { useHotkeys } from 'react-hotkeys-hook'
import MessageModal from '../../components/messageModal'

const calcNetAmount = (qty: number, price: number, percent = 0): number => {
   const total = qty * price
   const discount = qty * price * percent
   return total - discount
}

export interface Row {
   id: number
   itemId: string
   itemName: string
   itemCode?: string
   qty: string
   unitPrice: string
   unitPercent: number
   netAmount: number
}

export default function ViewReceipt() {
   const [rows, setRows] = useState<Row[]>([])
   const [total, setTotal] = useState<number>(0)
   const [date, setDate] = useState<Date | null>(null)
   const [receiptType, setReceiptType] = useState<string>(receiptTypes[0])

   const {
      message: successMessage,
      openMessageModal: openSuccessMessageModal,
      handleOpenMessageModal: handleOpenSuccessMessageModal,
      handleCloseMessageModal: handleCloseSuccessMessageModal,
      handleSetMessage: handleSetSuccessMessage,
   } = useMessageModal()

   const {
      message: errorMessage,
      openMessageModal: openErrorMessageModal,
      handleOpenMessageModal: handleOpenErrorMessageModal,
      handleSetMessage: handleSetErrorMessage,
      handleCloseMessageModal: handleCloseErrorMessageModal,
   } = useMessageModal()

   const {
      data: printReceiptData,
      mutate: printReceipt,
      reset: resetPrintReceipt,
      isLoading: printingReceipt,
      isSuccess: isPrintedReceipt,
      isError: isFailToPrint,
      error: printReceiptError,
   } = usePrintMutation()

   const { receiptId } = useParams()

   const {
      value: customerCode,

      setValue: setCustomerCode,
      inputChangeHandler: customerCodeChangeHandler,
      inputBlurHandler: customerCodeBlurHandler,
      inputError: customerCodeError,
   } = useInput(isNotEmpty)

   const {
      value: customerName,

      setValue: setCustomerName,
      inputChangeHandler: customerNameChangeHandler,
      inputBlurHandler: customerNameBlurHandler,
      inputError: customerNameError,
   } = useInput(isNotEmpty)

   const { value: receiptNum, setValue: setReceiptNum } = useDisableInput(isGreaterThanZero)

   const { data: customersData, isFetching: fetchingCustomers } = useGetCustomers()

   const { data: receiptData, isFetching: fetchingReceipt } = useGetReceiptById(receiptId!)

   const { data: itemsData, isFetching: fetchingItems } = useGetItems()

   const customers = customersData?.data
   const items = itemsData?.data

   const loading = fetchingCustomers || fetchingItems || fetchingReceipt || printingReceipt

   const handleDateChange = (value: Date | null) => {}

   const handlePrintReceipt = () => {
      const items = rows.map((row) => ({
         itemId: row.itemId,
         qty: +row.qty,
         unitPrice: +row.unitPrice,
         unitPercent: +row.unitPercent,
      }))
      printReceipt({ customerName, receiptType, items })
   }

   useHotkeys('alt+p', handlePrintReceipt)

   useEffect(() => {
      const customer = customers?.find((customer) => customer.code === customerCode)
      if (customer) {
         setCustomerName(customer.name)
         return
      }
   }, [customers, customerCode, setCustomerName])

   useEffect(() => {
      if (rows.length > 0) {
         const total = rows
            .map((row) => +row.netAmount)
            .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)
         setTotal(total)
         return
      }
      setTotal(0)
   }, [rows])

   useEffect(() => {
      if (receiptData) {
         const {
            data: { items: editItems, receiptDate, receiptNum, receiptType, customerName },
         } = receiptData

         setReceiptNum(receiptNum.toString())

         const newItems = editItems.map((item, index) => ({
            id: index + 1,
            itemId: item.itemId,
            itemName: item.itemName,
            itemCode: items ? items.find((it) => it.itemName === item.itemName)?.itemCode : '',
            qty: item.qty.toString(),
            unitPrice: item.unitPrice.toString(),
            unitPercent: item.unitPercent,
            netAmount: calcNetAmount(item.qty, item.unitPrice, item.unitPercent),
         }))
         setRows(newItems)
         setReceiptType(receiptType)
         setDate(receiptDate)
         const customer = customers?.find((customer) => customer.name === customerName)
         if (customer) {
            setCustomerCode(customer.code)
         }
      }
   }, [customers, items, receiptData, setCustomerCode, setCustomerName, setReceiptNum])

   useEffect(() => {
      if (isPrintedReceipt) {
         handleSetSuccessMessage(printReceiptData.message)
         handleOpenSuccessMessageModal()
         resetPrintReceipt()
         return
      }

      if (isFailToPrint) {
         handleSetErrorMessage((printReceiptError as Error).message)
         handleOpenErrorMessageModal()
         resetPrintReceipt()
         return
      }
   }, [isFailToPrint, isPrintedReceipt, printReceiptData?.message, printReceiptError, resetPrintReceipt])

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
                        disabled
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
                        disabled
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
                        disabled
                     >
                        {receiptTypes.map((type) => (
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
            <ReceiptItemsTable rows={rows} total={total} loading={loading} />
         </TableWrapper>
         <Box sx={{ pt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <SubmitActionsWrapper sx={{ maxWidth: 200 }}>
               <TextFieldWrapper>
                  <StyledButton
                     variant="outlined"
                     size="small"
                     color="primary"
                     onClick={handlePrintReceipt}
                     fullWidth
                  >
                     Print
                  </StyledButton>
               </TextFieldWrapper>
            </SubmitActionsWrapper>
         </Box>
         <MessageModal
            variant="success"
            onClose={handleCloseSuccessMessageModal}
            message={successMessage}
            open={openSuccessMessageModal}
         />

         <MessageModal
            variant="error"
            onClose={handleCloseErrorMessageModal}
            message={errorMessage}
            open={openErrorMessageModal}
         />
      </Container>
   )
}
