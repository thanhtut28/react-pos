import { useState, useEffect } from 'react'
import useInput from '../../hooks/useInput'
import useMessageModal from '../../hooks/useMessageModal'
import ItemsTable from '../../components/table/ItemsTable'
import { Typography, Button, TextField, Dialog } from '@mui/material'
import useGetItems from '../../api/queries/useGetItems'
import { useAddItem, useUpdateItem, useDeleteItem } from '../../api/mutations/item'
import {
   Container,
   ActionsWrapper,
   DialogBody,
   TextFieldWrapper,
   ToolbarWrapper,
   StyledDialogTitle,
   StyledButton,
} from '../../components/toolbar/Elements'
import WarningModal from '../../components/warningModal'
import MessageModal from '../../components/messageModal'
import { isNotEmpty } from '../../helpers/isNotEmpty'
import { isGreaterThanZero } from '../../helpers/isGreaterThanZero'
import { isPercentage } from '../../helpers/isPercentage'
import { isValidQty } from '../../helpers/isValidQty'

export default function ItemPage() {
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [openModal, setOpenModal] = useState<boolean>(false)
   const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
   const [selectedId, setSelectedId] = useState<string>('')

   const { data: itemsData, isFetching: fetchingItems } = useGetItems()
   const items = itemsData?.data

   const codeIsNotCreated = (code: string) => !items?.find((item) => item.itemCode === code)

   const nameIsNotCreated = (name: string) => !items?.find((item) => item.itemName === name)

   const codeValidate = (codeIsNotCreated: (value: string) => boolean, value: string) => {
      return isNotEmpty(value) && (codeIsNotCreated(value) || isEditing)
   }

   const nameValidate = (nameIsNotCreated: (value: string) => boolean, value: string) => {
      return isNotEmpty(value) && (nameIsNotCreated(value) || isEditing)
   }

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
      value: itemCode,
      setValue: setItemCode,
      valueIsValid: itemCodeIsValid,
      inputError: itemCodeError,
      inputChangeHandler: codeChangeHandler,
      inputBlurHandler: codeBlurHandler,
      reset: resetCode,
      submitInputHandler: submitCodeInput,
   } = useInput(codeValidate.bind(null, codeIsNotCreated))

   const {
      value: itemName,
      setValue: setItemName,
      valueIsValid: itemNameIsValid,
      inputError: itemNameError,
      inputChangeHandler: nameChangeHandler,
      inputBlurHandler: nameBlurHandler,
      reset: resetName,
      submitInputHandler: submitNameInput,
   } = useInput(nameValidate.bind(null, nameIsNotCreated))

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
      mutate: addItem,
      data: addData,
      error: addError,
      isLoading: addingItem,
      isSuccess: isAdded,
      isError: isFailToAdd,
      reset: resetAddData,
   } = useAddItem()

   const {
      mutate: updateItem,
      data: updateData,
      isLoading: updatingItem,
      error: updateError,
      isSuccess: isUpdated,
      reset: resetUpdateData,
      isError: isFailToUpdate,
   } = useUpdateItem()

   const {
      mutate: deleteItem,
      data: deleteData,
      isLoading: deletingItem,
      error: deleteError,
      isSuccess: isDeleted,
      reset: resetDeleteData,
      isError: isFailToDelete,
   } = useDeleteItem()

   const isValid = itemCodeIsValid && itemNameIsValid && qtyIsValid && unitPriceIsValid && unitPercentIsValid

   const loading = addingItem || updatingItem || deletingItem || fetchingItems

   const resetAll = () => {
      setIsEditing(false)
      setSelectedId('')
      resetCode()
      resetName()
      resetQty()
      resetUnitPercent()
      resetUnitPrice()
   }

   const submitItemInputs = () => {
      submitCodeInput()
      submitNameInput()
      submitQtyInput()
      submitUnitPercentInput()
      submitUnitPriceInput()
   }

   const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!isValid) {
         submitItemInputs()
         return
      }
      addItem({ itemCode, itemName, lowestQty: +qty, unitPrice: +unitPrice, unitPercent: +unitPercent / 100 })
      setOpenModal(false)
      resetAll()
   }

   const handleUpdateItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!isValid) {
         submitItemInputs()
         return
      }
      updateItem({
         itemId: selectedId,
         itemCode,
         itemName,
         lowestQty: +qty,
         unitPrice: +unitPrice,
         unitPercent: +unitPercent / 100,
      })
      setOpenModal(false)
      resetAll()
   }

   const handleDeleteItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      deleteItem({ itemId: selectedId })
      setOpenDeleteModal(false)
      resetAll()
   }

   const handleOnCloseModal = () => {
      resetAll()
      setOpenModal(false)
   }

   const handleOnCloseDeleteModal = () => {
      resetAll()
      setOpenDeleteModal(false)
   }

   /***
    * @description
    * needs to fix
    */
   useEffect(() => {
      if (isAdded) {
         handleSetSuccessMessage(addData.message)
         handleOpenSuccessMessageModal()
         resetAddData()
         return
      }

      if (isUpdated) {
         handleSetSuccessMessage(updateData.message)
         handleOpenSuccessMessageModal()
         resetUpdateData()
         return
      }

      if (isDeleted) {
         handleSetSuccessMessage(deleteData.message)
         handleOpenSuccessMessageModal()
         resetDeleteData()
         return
      }

      if (isFailToAdd) {
         handleSetErrorMessage((addError as Error).message)
         handleOpenErrorMessageModal()
         resetAddData()
         return
      }

      if (isFailToUpdate) {
         handleSetErrorMessage((updateError as Error).message)
         handleOpenErrorMessageModal()
         resetUpdateData()
         return
      }

      if (isFailToDelete) {
         handleSetErrorMessage((deleteError as Error).message)
         handleOpenErrorMessageModal()
         resetDeleteData()
         return
      }
   }, [
      addData?.message,
      addError,
      deleteData?.message,
      deleteError,
      handleOpenErrorMessageModal,
      handleOpenSuccessMessageModal,
      handleSetErrorMessage,
      handleSetSuccessMessage,
      isAdded,
      isDeleted,
      isFailToAdd,
      isFailToDelete,
      isFailToUpdate,
      isUpdated,
      resetAddData,
      resetDeleteData,
      resetUpdateData,
      updateData?.message,
      updateError,
   ])

   useEffect(() => {
      if (isEditing) return
      if (openModal) {
         setUnitPrice('0')
         setUnitPercent('0')
         return
      }
   }, [openModal, setUnitPercent, setUnitPrice, isEditing])

   return (
      <Container>
         <Typography variant="h5">Items</Typography>
         <Dialog onClose={handleOnCloseModal} open={openModal}>
            <StyledDialogTitle>{isEditing ? 'Update Item' : 'Add Item'}</StyledDialogTitle>
            <DialogBody noValidate autoComplete="off" onSubmit={isEditing ? handleUpdateItem : handleAddItem}>
               <TextFieldWrapper>
                  <TextField
                     variant="outlined"
                     label="Item Code"
                     size="small"
                     value={itemCode}
                     onChange={codeChangeHandler}
                     onBlur={codeBlurHandler}
                     error={itemCodeError}
                     helperText={itemCodeError && 'Please fill correct value'}
                     fullWidth
                  />
               </TextFieldWrapper>
               <TextFieldWrapper>
                  <TextField
                     key="item-name"
                     variant="outlined"
                     label="Item name"
                     onChange={nameChangeHandler}
                     onBlur={nameBlurHandler}
                     value={itemName}
                     error={itemNameError}
                     helperText={itemNameError && 'Please fill correct value'}
                     size="small"
                     fullWidth
                  />
               </TextFieldWrapper>
               <TextFieldWrapper>
                  <TextField
                     variant="outlined"
                     label="Lowest Quantity"
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
               <TextFieldWrapper>
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
               <TextFieldWrapper>
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
                     variant="outlined"
                     color="primary"
                     size="small"
                     disableElevation
                     onClick={handleOnCloseModal}
                     sx={{ mr: 2 }}
                  >
                     Cancel
                  </StyledButton>
                  <StyledButton
                     variant="contained"
                     color="primary"
                     size="small"
                     disableElevation
                     type="submit"
                  >
                     {isEditing ? 'Update' : 'Add'}
                  </StyledButton>
               </ActionsWrapper>
            </DialogBody>
         </Dialog>
         <WarningModal
            onSubmit={handleDeleteItem}
            open={openDeleteModal}
            onClose={handleOnCloseDeleteModal}
            action="delete this entry"
            proceedTitle="Delete"
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

         <ToolbarWrapper>
            <Button
               variant="contained"
               color="primary"
               size="small"
               disabled={loading}
               disableElevation
               onClick={() => setOpenModal(true)}
            >
               Add Item
            </Button>
         </ToolbarWrapper>
         <ItemsTable
            setItemCode={setItemCode}
            setItemName={setItemName}
            setQty={setQty}
            setUnitPrice={setUnitPrice}
            setUnitPercent={setUnitPercent}
            setSelectedId={setSelectedId}
            setIsEditing={setIsEditing}
            setOpenModal={setOpenModal}
            setOpenDeleteModal={setOpenDeleteModal}
            loading={loading}
         />
      </Container>
   )
}
