import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { TextField, FormControl, MenuItem, InputLabel, Divider, Box } from '@mui/material'
import Select from '@mui/material/Select'
import useMessageModal from '../../hooks/useMessageModal'
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
   GridItemOne,
   GridItemTwo,
   Flex,
   SubmitActionsWrapper,
   TableWrapper,
} from '../../components/create/Elements'
import DatePicker from '../../components/datePicker'
import { receiptTypes } from '../../dummy'
import { isGreaterThanZero } from '../../helpers/isGreaterThanZero'
import { isPercentage } from '../../helpers/isPercentage'
import ReceiptItemsTable from '../../components/table/create/ReceiptItemsTable'
import { isValidQty } from '../../helpers/isValidQty'
import WarningModal from '../../components/warningModal'
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

export default function CreateReceipts() {
   const [rows, setRows] = useState<Row[]>([])
   const [total, setTotal] = useState<number>(0)
   const [netAmount, setNetAmount] = useState<number>(0)
   const [itemId, setItemId] = useState<string>('')
   const today = new Date()
   const [receiptType, setReceiptType] = useState<string>(receiptTypes[0])
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [editId, setEditId] = useState<number>(-1)
   const [openDiscardModal, setOpenDiscardModal] = useState<boolean>(false)

   useHotkeys(
      'alt+r',
      () => {
         if (rows.length > 0) setOpenDiscardModal(true)
      },
      [rows]
   )

   useHotkeys('alt+p', () => console.log('print'))

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
      value: customerCode,
      valueIsValid: customerCodeIsValid,
      inputChangeHandler: customerCodeChangeHandler,
      inputBlurHandler: customerCodeBlurHandler,
      inputError: customerCodeError,
      submitInputHandler: submitCustomerCodeInput,
   } = useInput(isNotEmpty)

   const {
      value: customerName,
      valueIsValid: customerNameIsValid,
      setValue: setCustomerName,
      inputChangeHandler: customerNameChangeHandler,
      inputBlurHandler: customerNameBlurHandler,
      inputError: customerNameError,
      submitInputHandler: submitCustomerNameInput,
   } = useInput(isNotEmpty)

   const { value: receiptNum, setValue: setReceiptNum } = useDisableInput(isGreaterThanZero)

   const {
      value: itemCode,
      valueIsValid: itemCodeIsValid,
      setValue: setItemCode,
      inputChangeHandler: itemCodeChangeHandler,
      inputBlurHandler: itemCodeBlurHandler,
      inputError: itemCodeError,
      reset: resetItemCode,
      submitInputHandler: submitItemCodeInput,
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
      setValue: setQty,
      inputChangeHandler: qtyChangeHandler,
      inputBlurHandler: qtyBlurHandler,
      inputError: qtyError,
      reset: resetQty,
      submitInputHandler: submitQtyInput,
   } = useInput(isValidQty)

   const {
      value: unitPrice,
      valueIsValid: unitPriceIsValid,
      setValue: setUnitPrice,
      inputChangeHandler: unitPriceChangeHandler,
      inputBlurHandler: unitPriceBlurHandler,
      inputError: unitPriceError,
      reset: resetUnitPrice,
      submitInputHandler: submitUnitPriceInput,
   } = useInput(isGreaterThanZero)

   const {
      value: unitPercent,
      valueIsValid: unitPercentIsValid,
      setValue: setUnitPercent,
      inputChangeHandler: unitPercentChangeHandler,
      inputBlurHandler: unitPercentBlurHandler,
      inputError: unitPercentError,
      reset: resetUnitPercent,
      submitInputHandler: submitUnitPercentInput,
   } = useInput(isPercentage)

   const {
      data: receiptNumData,
      isFetching: fetchingReceiptNum,
      refetch: refetchReceiptNum,
   } = useGetReceiptNum()

   const { data: customersData, isFetching: fetchingCustomers } = useGetCustomers()

   const { data: itemsData, isFetching: fetchingItems } = useGetItems()

   const {
      data: createReceiptData,
      mutate: createReceipt,
      isLoading: isCreatingReceipt,
      reset: resetCreateReceipt,
      isSuccess: isCreatedReceipt,
      isError: isFailToCreate,
      error: createReceiptError,
   } = useCreateReceipt(refetchReceiptNum)

   const customers = customersData?.data
   const receiptNumber = receiptNumData?.data
   const items = itemsData?.data

   const resetItemInputs = useCallback(() => {
      setEditId(-1)
      setItemId('')
      resetItemCode()
      resetItemName()
      resetQty()
      resetUnitPrice()
      resetUnitPercent()
      setNetAmount(0)
   }, [])

   const submitItemInputs = () => {
      submitItemCodeInput()
      submitQtyInput()
      submitUnitPercentInput()
      submitUnitPriceInput()
   }

   const loading = fetchingCustomers || fetchingReceiptNum || fetchingItems || isCreatingReceipt

   const isValidToCreate = customerCodeIsValid && customerNameIsValid && rows.length > 0
   useHotkeys('alt+s', () => handleCreateReceipt(), [isValidToCreate, rows, customerName, receiptType])

   const formIsValid =
      itemCodeIsValid && itemNameIsValid && qtyIsValid && unitPriceIsValid && unitPercentIsValid

   const checkItemValues = (value: string) => {
      const item = items?.find((item) => item.itemCode === value)
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
   }

   const handleDiscard = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setRows([])
      setOpenDiscardModal(false)
      resetItemInputs()
   }

   const handleItemCodeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      itemCodeChangeHandler(e)
      checkItemValues(e.target.value)
   }

   const handleEdit = useCallback(
      (data: any) => {
         const {
            row: {
               id: editId,
               itemCode: editItemCode,
               itemName: editItemName,
               itemId: editItemId,
               netAmount: editNetAmount,
               qty: editQty,
               unitPercent: editUnitPercent,
               unitPrice: editUnitPrice,
            },
         } = data
         setItemCode(editItemCode)
         setEditId(editId)
         setItemName(editItemName)
         setItemId(editItemId)
         setNetAmount(editNetAmount)
         setQty(editQty)
         setUnitPrice(editUnitPrice)
         setUnitPercent((editUnitPercent * 100).toString())
      },
      [setItemCode, setItemName, setQty, setUnitPercent, setUnitPrice]
   )

   const handleDateChange = (value: Date | null) => {}

   const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!formIsValid) {
         submitItemInputs()
         return
      }
      setRows((prev) => [
         ...prev,
         {
            id: prev.length + 1,
            itemId,
            itemCode,
            itemName,
            qty,
            unitPrice,
            unitPercent: +unitPercent / 100,
            netAmount,
         },
      ])
      resetItemInputs()
   }

   const handleUpdateItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!formIsValid) {
         submitItemInputs()
         return
      }
      setRows((prev) =>
         prev.map((row) =>
            row.id === editId
               ? {
                    id: editId,
                    itemId,
                    itemCode,
                    itemName,
                    qty,
                    unitPrice,
                    unitPercent: +unitPercent / 100,
                    netAmount,
                 }
               : row
         )
      )
      resetItemInputs()
      setIsEditing(false)
   }

   const handleCreateReceipt = () => {
      if (!isValidToCreate) {
         submitCustomerCodeInput()
         submitCustomerNameInput()

         return
      }
      const items = rows.map((row) => ({
         itemId: row.itemId,
         qty: +row.qty,
         unitPrice: +row.unitPrice,
         unitPercent: +row.unitPercent,
      }))
      createReceipt({ customerName, receiptType, items })
      resetItemInputs()
      setRows([])
   }

   useEffect(() => {
      const customer = customers?.find((customer) => customer.code === customerCode)
      if (customer) {
         setCustomerName(customer.name)
         return
      }
   }, [customers, customerCode, setCustomerName])

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
            .map((row) => +row.netAmount)
            .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)
         setTotal(total)
         return
      }
      setTotal(0)
   }, [rows])

   useEffect(() => {
      if (isCreatedReceipt) {
         handleSetSuccessMessage(createReceiptData.message)
         handleOpenSuccessMessageModal()
         resetCreateReceipt()
         return
      }

      if (isFailToCreate) {
         handleSetErrorMessage((createReceiptError as Error).message)
         handleOpenErrorMessageModal()
         resetCreateReceipt()
         return
      }
   }, [
      createReceiptData?.message,
      createReceiptError,
      handleOpenErrorMessageModal,
      handleOpenSuccessMessageModal,
      handleSetErrorMessage,
      handleSetSuccessMessage,
      isCreatedReceipt,
      isFailToCreate,
      resetCreateReceipt,
   ])

   console.log(isValidToCreate)

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
                  <DatePicker value={today} onChange={handleDateChange} disabled={true} />
               </TextFieldWrapper>
            </StyledRow>
         </InputsWrapper>

         <Divider />

         <ItemsWrapper onSubmit={isEditing ? handleUpdateItem : handleAddItem}>
            <Row>
               <GridItemOne>
                  <Flex display="flex">
                     <TextFieldWrapper sx={{ flex: 1 }}>
                        <TextField
                           variant="outlined"
                           label="Code"
                           size="small"
                           value={itemCode}
                           onChange={handleItemCodeChangeHandler}
                           onBlur={itemCodeBlurHandler}
                           error={itemCodeError}
                           helperText={itemCodeError && 'This field is required'}
                           fullWidth
                        />
                     </TextFieldWrapper>
                     <TextFieldWrapper sx={{ flex: 2 }}>
                        <TextField
                           variant="outlined"
                           label="Name"
                           size="small"
                           value={itemName}
                           error={itemNameError && itemCodeError}
                           helperText={itemNameError && itemCodeError && 'This field is required'}
                           fullWidth
                           disabled
                        />
                     </TextFieldWrapper>
                  </Flex>
               </GridItemOne>

               <GridItemTwo>
                  <Flex>
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
                           label="Price"
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
                           label="Percent"
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
                     <ActionsWrapper>
                        <StyledButton
                           variant="contained"
                           size="small"
                           color="primary"
                           fullWidth
                           type="submit"
                        >
                           {isEditing ? 'Update' : 'Add'}
                        </StyledButton>
                     </ActionsWrapper>
                  </Flex>
               </GridItemTwo>
            </Row>
         </ItemsWrapper>
         <TableWrapper>
            <ReceiptItemsTable
               onUpdate={handleEdit}
               rows={rows}
               setRows={setRows}
               total={total}
               loading={loading}
               setIsEditing={setIsEditing}
               editId={editId}
               resetItemInputs={resetItemInputs}
               isEditing={isEditing}
            />
         </TableWrapper>

         <Box sx={{ pt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <SubmitActionsWrapper>
               <TextFieldWrapper>
                  <StyledButton
                     variant="outlined"
                     size="small"
                     color="success"
                     onClick={handleCreateReceipt}
                     disabled={isCreatingReceipt}
                     fullWidth
                  >
                     Save
                  </StyledButton>
               </TextFieldWrapper>
               <TextFieldWrapper>
                  <StyledButton
                     variant="outlined"
                     size="small"
                     color="primary"
                     onClick={() => console.log('print')}
                     fullWidth
                  >
                     Print
                  </StyledButton>
               </TextFieldWrapper>
               <TextFieldWrapper sx={{ pr: 0 }}>
                  <StyledButton
                     variant="outlined"
                     size="small"
                     color="error"
                     onClick={() => setOpenDiscardModal(true)}
                     fullWidth
                     disabled={rows.length === 0}
                  >
                     Discard
                  </StyledButton>
               </TextFieldWrapper>
            </SubmitActionsWrapper>
         </Box>
         <WarningModal
            open={openDiscardModal}
            onClose={() => setOpenDiscardModal(false)}
            onSubmit={handleDiscard}
            action="discard"
            proceedTitle="Discard"
         />

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
