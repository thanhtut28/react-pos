import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { TextField, FormControl, MenuItem, InputLabel, Divider, Box, Autocomplete } from '@mui/material'
import Select from '@mui/material/Select'
import useMessageModal from '../../hooks/useMessageModal'
import useInput from '../../hooks/useInput'
import useDisableInput from '../../hooks/useDisableInput'
import useGetCustomers from '../../api/queries/useGetCustomers'
import useGetCreditById from '../../api/queries/useGetCreditById'
import { usePayCredit, useEditCredit } from '../../api/mutations/credit'
import {
   Container,
   InputsWrapper,
   ItemsWrapper,
   StyledRow,
   TextFieldWrapper,
   StyledButton,
   ActionsWrapper,
   Row,
   Flex,
   TableWrapper,
} from '../../components/create/Elements'
import DateTimePicker from '../../components/dateTimePicker'
import { isGreaterThanZero } from '../../helpers/isGreaterThanZero'
import CreditItemsTable from '../../components/table/view/CreditItemsTable'
import MessageModal from '../../components/messageModal'
import { Credit } from '../../api/queries/types'
import { statusTypes } from '../../dummy'

export type Row = Credit & { id: number }

export default function ViewCredit() {
   const [credits, setCredits] = useState<Row[]>([])
   const [customerName, setCustomerName] = useState<string>('')
   const [creditId, setCreditId] = useState<string>('')
   const [date, setDate] = useState<Date | null>(null)
   const [status, setStatus] = useState<string>('')
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [editId, setEditId] = useState<number>(-1)
   const { receiptId } = useParams()
   const [totalAmount, setTotalAmount] = useState<number>(0)
   const [paidAmount, setPaidAmount] = useState<number>(0)

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

   const { value: receiptNum, setValue: setReceiptNum } = useDisableInput(isGreaterThanZero)

   const {
      value: amount,
      valueIsValid: amountIsValid,
      setValue: setAmount,
      inputChangeHandler: amountChangeHandler,
      inputBlurHandler: amountBlurHandler,
      inputError: amountError,
      reset: resetAmount,
      submitInputHandler: submitAmountInput,
   } = useInput(isGreaterThanZero)

   const { data: customersData, isFetching: fetchingCustomers } = useGetCustomers()

   const { data: creditData, isFetching: fetchingCredit } = useGetCreditById(receiptId!)

   const {
      data: payCreditData,
      mutateAsync: payCredit,
      isLoading: payingCredit,
      reset: resetPayCredit,
      isSuccess: isPaidCreditSuccess,
      isError: isFailToPayCredit,
      error: payCreditError,
   } = usePayCredit(receiptId!)

   const {
      data: updateCreditData,
      mutateAsync: updateCredit,
      isLoading: updatingCredit,
      reset: resetUpdateCredit,
      isSuccess: isSuccessToUpdate,
      isError: isFailToUpdate,
      error: updateCreditError,
   } = useEditCredit(receiptId!)

   const customers = customersData?.data

   const resetItemInputs = useCallback(() => {
      setEditId(-1)
      setCreditId('')
      resetAmount()
   }, [])

   const submitItemInputs = () => {
      submitAmountInput()
   }

   const loading = fetchingCustomers || fetchingCredit

   const formIsValid = amountIsValid

   console.log(creditData)

   const handleEdit = useCallback(
      (data: any) => {
         const {
            row: { id, creditId, creditAmount },
         } = data
         setEditId(id)
         setCreditId(creditId)
         setAmount(creditAmount.toString())
      },
      [setAmount]
   )

   const handleDateChange = (value: Date | null) => {}

   const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!formIsValid) {
         submitItemInputs()
         return
      }
      payCredit({ creditAmount: +amount })
      resetItemInputs()
   }

   const handleUpdateItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!formIsValid) {
         submitItemInputs()
         return
      }
      updateCredit({ creditAmount: +amount, creditId })
      resetItemInputs()
      setIsEditing(false)
   }

   //    const handleUpdateTransfer = () => {
   //       if (username && isValidToUpdate) {
   //          const items = rows.map((row) => ({
   //             itemId: row.itemId,
   //             qty: +row.qty,
   //          }))
   //          updateTransfer({ transferId: transferId as string, username, userId, transferType, items }).then(
   //             () => {
   //                setRows([])
   //                resetItemInputs()
   //                navigate('/transfers', { replace: true })
   //             }
   //          )
   //       }
   //    }

   useEffect(() => {
      if (creditData) {
         const {
            data: { customerName, credits, receiptDate, status, totalAmount, paidAmount, receiptNum },
         } = creditData

         setReceiptNum(receiptNum.toString())

         const newItems = credits.map((item, index) => ({
            id: index + 1,
            creditId: item.creditId,
            creditDate: item.creditDate,
            creditAmount: item.creditAmount,
            username: item.username,
         }))
         setCredits(newItems)
         setStatus(status)
         setDate(receiptDate)
         setTotalAmount(totalAmount)
         setPaidAmount(paidAmount ? paidAmount : 0)
         setCustomerName(customerName)
      }
   }, [creditData, setReceiptNum])

   useEffect(() => {
      if (isPaidCreditSuccess) {
         handleSetSuccessMessage(payCreditData.data)
         handleOpenSuccessMessageModal()
         resetPayCredit()
         return
      }

      if (isSuccessToUpdate) {
         handleSetSuccessMessage(updateCreditData.data)
         handleOpenSuccessMessageModal()
         resetUpdateCredit()
         return
      }

      if (isFailToPayCredit) {
         handleSetErrorMessage((payCreditError as Error).message)
         handleOpenErrorMessageModal()
         resetPayCredit()
         return
      }

      if (isFailToUpdate) {
         handleSetErrorMessage((updateCreditError as Error).message)
         handleOpenErrorMessageModal()
         resetUpdateCredit()
         return
      }
   }, [
      handleOpenErrorMessageModal,
      handleOpenSuccessMessageModal,
      handleSetErrorMessage,
      handleSetSuccessMessage,
      isFailToPayCredit,
      isFailToUpdate,
      isPaidCreditSuccess,
      isSuccessToUpdate,
      payCreditData?.data,
      payCreditError,
      resetPayCredit,
      resetUpdateCredit,
      updateCreditData?.data,
      updateCreditError,
   ])

   return (
      <Container>
         <InputsWrapper>
            <StyledRow>
               <Row width={1} maxWidth={400}>
                  <TextFieldWrapper flex={1}>
                     <TextField
                        variant="outlined"
                        label="Customer name"
                        size="small"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
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
                     <InputLabel id="demo-simple-select-label">Transfer Type</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value as string)}
                        // disabled
                     >
                        {statusTypes.map((type) => (
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

         <ItemsWrapper sx={{ maxWidth: 400 }} onSubmit={isEditing ? handleUpdateItem : handleAddItem}>
            <Flex display="flex">
               <TextFieldWrapper sx={{ flex: 1 }}>
                  <TextField
                     variant="outlined"
                     label="Amount"
                     size="small"
                     value={amount}
                     type="number"
                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                     onChange={amountChangeHandler}
                     onBlur={amountBlurHandler}
                     error={amountError}
                     helperText={amountError && 'Please fill valid amount'}
                     fullWidth
                  />
               </TextFieldWrapper>
               <ActionsWrapper>
                  <StyledButton variant="contained" size="small" color="primary" fullWidth type="submit">
                     {isEditing ? 'Update' : 'Add'}
                  </StyledButton>
               </ActionsWrapper>
            </Flex>
         </ItemsWrapper>
         <TableWrapper>
            <CreditItemsTable
               onUpdate={handleEdit}
               rows={credits}
               setRows={setCredits}
               loading={loading}
               setIsEditing={setIsEditing}
               editId={editId}
               resetItemInputs={resetItemInputs}
               isEditing={isEditing}
               totalAmount={totalAmount}
               paidAmount={paidAmount}
            />
         </TableWrapper>

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
