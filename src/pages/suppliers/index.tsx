import React, { useState, useEffect } from 'react'
import useInput from '../../hooks/useInput'
import useMessageModal from '../../hooks/useMessageModal'
import SuppliersTable from '../../components/table/SuppliersTable'
import { Typography, Button, TextField, Dialog } from '@mui/material'
import useGetSuppliers from '../../api/queries/useGetSuppliers'
import { useAddSupplier, useUpdateSupplier, useDeleteSupplier } from '../../api/mutations/supplier'
import {
   Container,
   ActionsWrapper,
   DialogBody,
   TextFieldWrapper,
   ToolbarWrapper,
   StyledDialogTitle,
   StyledButton,
} from '../../components/toolbar/Elements'
import DeleteModal from '../../components/deleteModal'
import MessageModal from '../../components/messageModal'
import { isNotEmpty, codeValidation } from '../../helpers/isNotEmpty'

export default function SupplierPage() {
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [openModal, setOpenModal] = useState<boolean>(false)
   const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
   const [selectedId, setSelectedId] = useState<string>('')

   const {
      data: suppliersData,
      isFetching: fetchingSuppliers,
      error: errorFetchingSuppliers,
   } = useGetSuppliers()

   const suppliers = suppliersData?.data
   const codeIsNotCreated = (supplierCode: string) =>
      !suppliers?.find((supplier) => supplier.supplierCode === supplierCode)

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
      value: supplierCode,
      setValue: setSupplierCode,
      valueIsValid: supplierCodeIsValid,
      inputError: supplierCodeError,
      inputChangeHandler: codeChangeHandler,
      inputBlurHandler: codeBlurHandler,
      reset: resetCode,
   } = useInput(codeValidation.bind(null, codeIsNotCreated))

   //codeValidation.bind(null, codeIsNotCreated)

   const {
      value: supplierName,
      setValue: setSupplierName,
      valueIsValid: supplierNameIsValid,
      inputError: supplierNameError,
      inputChangeHandler: nameChangeHandler,
      inputBlurHandler: nameBlurHandler,
      reset: resetName,
   } = useInput(isNotEmpty)

   const {
      mutate: addSupplier,
      data: addData,
      error: addError,
      isLoading: addingSupplier,
      isSuccess: isAdded,
      reset: resetAddData,
      isError: isFailToAdd,
   } = useAddSupplier()

   const {
      mutate: updateSupplier,
      data: updateData,
      isLoading: updatingSupplier,
      error: updateError,
      isSuccess: isUpdated,
      reset: resetUpdateData,
      isError: isFailToUpdate,
   } = useUpdateSupplier()

   const {
      mutate: deleteSupplier,
      data: deleteData,
      isLoading: deletingSupplier,
      error: deleteError,
      isSuccess: isDeleted,
      reset: resetDeleteData,
      isError: isFailToDelete,
   } = useDeleteSupplier()

   // const sameValues = supplierCode === supplierName
   const isValid = supplierCodeIsValid && supplierNameIsValid

   const loading = addingSupplier || updatingSupplier || deletingSupplier || fetchingSuppliers

   let timeout: NodeJS.Timeout

   const resetAll = () => {
      setIsEditing(false)
      setSelectedId('')
      resetCode()
      resetName()
   }

   const handleAddSupplier = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!isValid) return

      addSupplier({ supplierCode, supplierName })
      setOpenModal(false)
      resetAll()
   }

   const handleUpdateSupplier = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!isValid) return
      updateSupplier({ supplierId: selectedId, supplierCode, supplierName })
      setOpenModal(false)
      resetAll()
   }

   const handleDeleteSupplier = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      deleteSupplier({ supplierId: selectedId })
      setOpenDeleteModal(false)
      resetAll()
   }

   const handleOnCloseModal = () => {
      timeout = setTimeout(() => resetAll(), 200)
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

      return () => clearTimeout(timeout)
   }, [isAdded, isDeleted, isFailToUpdate])

   console.log(supplierCodeIsValid)

   return (
      <Container>
         <Typography variant="h5">Suppliers</Typography>
         <Dialog onClose={handleOnCloseModal} open={openModal}>
            <StyledDialogTitle>{isEditing ? 'Update Supplier' : 'Add Supplier'}</StyledDialogTitle>
            <DialogBody
               noValidate
               autoComplete="off"
               onSubmit={isEditing ? handleUpdateSupplier : handleAddSupplier}
            >
               <TextFieldWrapper>
                  <TextField
                     key="supplier-code"
                     variant="outlined"
                     label="supplier code"
                     onChange={codeChangeHandler}
                     onBlur={codeBlurHandler}
                     value={supplierCode}
                     error={supplierCodeError}
                     helperText={supplierCodeError && 'Please fill correct value'}
                     size="small"
                     required
                  />
               </TextFieldWrapper>
               <TextFieldWrapper>
                  <TextField
                     key="supplier-name"
                     variant="outlined"
                     label="supplier name"
                     onChange={nameChangeHandler}
                     onBlur={nameBlurHandler}
                     value={supplierName}
                     error={supplierNameError}
                     helperText={supplierNameError && 'Please fill correct value'}
                     size="small"
                     required
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
         <DeleteModal
            onSubmit={handleDeleteSupplier}
            open={openDeleteModal}
            onClose={handleOnCloseDeleteModal}
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
               // sx={{ borderRadius: 0 }}
               onClick={() => setOpenModal(true)}
            >
               Add Supplier
            </Button>
         </ToolbarWrapper>
         <SuppliersTable
            setSupplierCode={setSupplierCode}
            setSupplierName={setSupplierName}
            setSelectedId={setSelectedId}
            setIsEditing={setIsEditing}
            setOpenModal={setOpenModal}
            setOpenDeleteModal={setOpenDeleteModal}
            loading={loading}
         />
      </Container>
   )
}
