import React, { useState, useCallback, useEffect } from 'react'
import SuppliersTable from '../../components/table/SuppliersTable'
import { Typography, Button, TextField, Dialog } from '@mui/material'
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
// import MessageModal from '../../components/messageModal'

export default function SupplierPage() {
   const [supplierCode, setSupplierCode] = useState<string>('')
   const [supplierName, setSupplierName] = useState<string>('')
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [openModal, setOpenModal] = useState<boolean>(false)
   const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
   // const [openMessageModal, setOpenMessageModal] = useState<boolean>(false)
   // const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false)
   // const [modalMessage, setModalMessage] = useState<string>('')
   const [codeIsTouched, setCodeIsTouched] = useState<boolean>(false)
   const [nameIsTouched, setNameIsTouched] = useState<boolean>(false)
   const [selectedId, setSelectedId] = useState<string>('')

   const {
      mutate: addSupplier,
      data: addData,
      error: addError,
      isLoading: addingSupplier,
      isSuccess: isAdded,
      isError: isFailToAdd,
   } = useAddSupplier()

   const {
      mutate: updateSupplier,
      data: updateData,
      isLoading: updatingSupplier,
      error: updateError,
      isSuccess: isUpdated,
      isError: isFailToUpdate,
   } = useUpdateSupplier()

   const {
      mutate: deleteSupplier,
      data: deleteData,
      isLoading: deletingSupplier,
      error: deleteError,
      isSuccess: isDeleted,
      isError: isFailToDelete,
   } = useDeleteSupplier()

   const supplierCodeIsEmpty = supplierCode.trim() === ''
   const supplierNameIsEmpty = supplierName.trim() === ''

   const inputCodeError = codeIsTouched && (supplierCodeIsEmpty || supplierCode === supplierName)

   const inputNameError = nameIsTouched && (supplierNameIsEmpty || supplierCode === supplierName)

   const loading = addingSupplier || updatingSupplier || deletingSupplier

   let timeout: NodeJS.Timeout

   const resetForm = useCallback(() => {
      setIsEditing(false)
      setSelectedId('')
      setSupplierCode('')
      setSupplierName('')
      setCodeIsTouched(false)
      setNameIsTouched(false)
   }, [])

   const handleAddSupplier = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (supplierCodeIsEmpty || supplierNameIsEmpty || inputCodeError || inputNameError) return
      addSupplier({ supplierCode, supplierName })
      setOpenModal(false)
      resetForm()
   }

   const handleUpdateSupplier = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (supplierCodeIsEmpty || supplierNameIsEmpty || inputCodeError || inputNameError) return
      updateSupplier({ supplierId: selectedId, supplierCode, supplierName })
      setOpenModal(false)
      resetForm()
   }

   const handleDeleteSupplier = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      deleteSupplier({ supplierId: selectedId })
      setOpenDeleteModal(false)
      resetForm()
   }

   const handleOnCloseModal = () => {
      timeout = setTimeout(() => resetForm(), 200)
      setOpenModal(false)
   }

   const handleOnCloseDeleteModal = () => {
      resetForm()
      setOpenDeleteModal(false)
   }

   // const handleOnCloseMessageModal = () => {
   //    setOpenMessageModal(false)
   //    setModalMessage('')
   //    setIsSuccessMessage(false)
   // }

   /***
    * @description
    * needs to fix
    */
   useEffect(() => {
      // if (isAdded) {
      //    setModalMessage(addData.message)
      //    setOpenMessageModal(true)
      //    setIsSuccessMessage(true)
      //    return
      // }

      // if (isUpdated) {
      //    setModalMessage(updateData.message)
      //    setOpenMessageModal(true)
      //    setIsSuccessMessage(true)
      // }

      // if (isDeleted) {
      //    setModalMessage(deleteData.message)
      //    setOpenMessageModal(true)
      //    setIsSuccessMessage(true)
      // }

      // if (isFailToUpdate) {
      //    setModalMessage((updateError as Error)?.message)
      //    setOpenMessageModal(true)
      //    setIsSuccessMessage(false)
      // }

      return () => clearTimeout(timeout)
      // }, [isAdded, isUpdated, isDeleted, isFailToUpdate])
   }, [])

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
                     onChange={(e) => setSupplierCode(e.target.value)}
                     onFocus={() => setCodeIsTouched(true)}
                     value={supplierCode}
                     error={inputCodeError}
                     helperText={inputCodeError && 'Please fill correct value'}
                     size="small"
                     required
                  />
               </TextFieldWrapper>
               <TextFieldWrapper>
                  <TextField
                     key="supplier-name"
                     variant="outlined"
                     label="supplier name"
                     onChange={(e) => setSupplierName(e.target.value)}
                     onFocus={() => setNameIsTouched(true)}
                     value={supplierName}
                     error={inputNameError}
                     helperText={inputNameError && 'Please fill correct value'}
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
         {/* <MessageModal
            onClose={handleOnCloseMessageModal}
            message={modalMessage}
            open={openMessageModal}
            isSuccessMessage={isSuccessMessage}
         /> */}

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
            resetForm={resetForm}
         />
      </Container>
   )
}
