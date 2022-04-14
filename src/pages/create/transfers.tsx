import React, { useEffect, useState, useCallback } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { TextField, FormControl, MenuItem, InputLabel, Divider, Box, Autocomplete } from '@mui/material'
import Select from '@mui/material/Select'
import useMessageModal from '../../hooks/useMessageModal'
import useInput from '../../hooks/useInput'
import useDisableInput from '../../hooks/useDisableInput'
import { isNotEmpty } from '../../helpers/isNotEmpty'
import useGetUsers from '../../api/queries/useGetUsers'
import useGetTransferNum from '../../api/queries/useGetTransferNum'
import useGetItems from '../../api/queries/useGetItems'
import { useCreateTransfer } from '../../api/mutations/transfer'
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
import { transferTypes } from '../../dummy'
import { isGreaterThanZero } from '../../helpers/isGreaterThanZero'
import TransferItemsTable from '../../components/table/TransferItemsTable'
import { isValidQty } from '../../helpers/isValidQty'
import WarningModal from '../../components/warningModal'
import MessageModal from '../../components/messageModal'

export interface Row {
   id: number
   itemCode: string
   itemName: string
   itemId: string
   qty: string
}

export default function CreateTransfers() {
   const [rows, setRows] = useState<Row[]>([])
   const [username, setUsername] = useState<string | null>(null)
   const [itemId, setItemId] = useState<string>('')
   const [userId, setUserId] = useState<string>('')
   const today = new Date()
   const [transferType, setTransferType] = useState<string>(transferTypes[0])
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

   const { value: transferNum, setValue: setTransferNum } = useDisableInput(isGreaterThanZero)

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
      data: transferNumData,
      isFetching: fetchingTransferNum,
      refetch: refetchTransferNum,
   } = useGetTransferNum()

   const { data: itemsData, isFetching: fetchingItems } = useGetItems()
   const { data: usersData, isFetching: fetchingUsers } = useGetUsers()

   const {
      data: createTransferData,
      mutate: createTransfer,
      isLoading: isCreatingTransfer,
      reset: resetCreateTransfer,
      isSuccess: isCreatedTransfer,
      isError: isFailToCreate,
      error: createTransferError,
   } = useCreateTransfer(refetchTransferNum)

   const users = usersData?.data
   const transferNumber = transferNumData?.data
   const items = itemsData?.data

   const resetItemInputs = useCallback(() => {
      setEditId(-1)
      setItemId('')
      resetItemCode()
      resetItemName()
      resetQty()
   }, [])

   const submitItemInputs = () => {
      submitItemCodeInput()
      submitQtyInput()
   }

   const loading = fetchingUsers || fetchingTransferNum || fetchingItems || isCreatingTransfer

   const usernameIsValid = username && username.trim() !== ''
   const userIdIsValid = userId.trim() !== ''

   const isValidToCreate = usernameIsValid && userIdIsValid && rows.length > 0
   useHotkeys('alt+s', () => handleCreateTransfer(), [isValidToCreate, rows, userId, username, transferType])
   const formIsValid = itemCodeIsValid && itemNameIsValid && qtyIsValid

   const checkItemValues = (value: string) => {
      const item = items?.find((item) => item.itemCode === value)
      if (item) {
         setItemName(item.itemName)
         setItemId(item.itemId)
         return
      }
      setItemName('')
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
               qty: editQty,
            },
         } = data
         setEditId(editId)
         setItemCode(editItemCode)
         setItemName(editItemName)
         setItemId(editItemId)
         setQty(editQty)
      },
      [setItemCode, setItemName, setQty]
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
                 }
               : row
         )
      )
      resetItemInputs()
      setIsEditing(false)
   }

   const handleCreateTransfer = () => {
      if (username && isValidToCreate) {
         const items = rows.map((row) => ({
            itemId: row.itemId,
            qty: +row.qty,
         }))
         createTransfer({ userId, username, transferType, items })
         resetItemInputs()
         setRows([])
      }
   }

   useEffect(() => {
      const user = users?.find((user) => user.username === username)
      if (user) {
         setUserId(user.userId)
         return
      }
      setUserId('')
   }, [username, users])

   useEffect(() => {
      if (transferNumber) {
         setTransferNum(transferNumber.toString())
      }
   }, [transferNumber, setTransferNum])

   useEffect(() => {
      if (isCreatedTransfer) {
         handleSetSuccessMessage(createTransferData.message)
         handleOpenSuccessMessageModal()
         resetCreateTransfer()
         return
      }

      if (isFailToCreate) {
         handleSetErrorMessage((createTransferError as Error).message)
         handleOpenErrorMessageModal()
         resetCreateTransfer()
         return
      }
   }, [
      createTransferData?.message,
      createTransferError,
      handleOpenErrorMessageModal,
      handleOpenSuccessMessageModal,
      handleSetErrorMessage,
      handleSetSuccessMessage,
      isCreatedTransfer,
      isFailToCreate,
      resetCreateTransfer,
   ])

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
                        options={users ? users.map((user) => user.username) : [null]}
                        renderInput={(params: any) => <TextField {...params} label="Username" />}
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
            <TransferItemsTable
               onUpdate={handleEdit}
               rows={rows}
               setRows={setRows}
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
                     onClick={handleCreateTransfer}
                     fullWidth
                     disabled={!isValidToCreate || isCreatingTransfer}
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
