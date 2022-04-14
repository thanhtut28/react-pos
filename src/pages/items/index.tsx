import { useState, useEffect } from 'react'
import useInput from '../../hooks/useInput'
import useMessageModal from '../../hooks/useMessageModal'
import ItemsTable from '../../components/table/ItemsTable'
import { Typography, Button, TextField, Dialog } from '@mui/material'
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

export default function ItemPage() {
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [openModal, setOpenModal] = useState<boolean>(false)
   const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
   const [selectedId, setSelectedId] = useState<string>('')

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
   } = useInput(isNotEmpty)

   const {
      value: itemName,
      setValue: setItemName,
      valueIsValid: itemNameIsValid,
      inputError: itemNameError,
      inputChangeHandler: nameChangeHandler,
      inputBlurHandler: nameBlurHandler,
      reset: resetName,
   } = useInput(isNotEmpty)

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

   const isValid = itemCodeIsValid && itemNameIsValid

   const loading = addingItem || updatingItem || deletingItem

   const resetAll = () => {
      setIsEditing(false)
      setSelectedId('')
      resetCode()
      resetName()
   }

   const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!isValid) return
      addItem({ itemCode, itemName })
      setOpenModal(false)
      resetAll()
   }

   const handleUpdateItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!isValid) return
      updateItem({ itemId: selectedId, itemCode, itemName })
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
      setTimeout(() => resetAll(), 200)
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

   return (
      <Container>
         <Typography variant="h5">Items</Typography>
         <Dialog onClose={handleOnCloseModal} open={openModal}>
            <StyledDialogTitle>{isEditing ? 'Update Item' : 'Add Item'}</StyledDialogTitle>
            <DialogBody noValidate autoComplete="off" onSubmit={isEditing ? handleUpdateItem : handleAddItem}>
               <TextFieldWrapper>
                  <TextField
                     key="item-code"
                     variant="outlined"
                     label="item code"
                     onChange={codeChangeHandler}
                     onBlur={codeBlurHandler}
                     value={itemCode}
                     error={itemCodeError}
                     helperText={itemCodeError && 'Please fill correct value'}
                     size="small"
                  />
               </TextFieldWrapper>
               <TextFieldWrapper>
                  <TextField
                     key="item-name"
                     variant="outlined"
                     label="item name"
                     onChange={nameChangeHandler}
                     onBlur={nameBlurHandler}
                     value={itemName}
                     error={itemNameError}
                     helperText={itemNameError && 'Please fill correct value'}
                     size="small"
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
                     disabled={!isValid}
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
            setSelectedId={setSelectedId}
            setIsEditing={setIsEditing}
            setOpenModal={setOpenModal}
            setOpenDeleteModal={setOpenDeleteModal}
            loading={loading}
         />
      </Container>
   )
}
