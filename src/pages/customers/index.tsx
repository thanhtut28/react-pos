import { useState, useEffect } from 'react'
import useInput from '../../hooks/useInput'
import CustomersTable from '../../components/table/CustomersTable'
import { useAddCustomer, useUpdateCustomer, useDeleteCustomer } from '../../api/mutations/customer'
import { Typography, Button, TextField, Dialog } from '@mui/material'
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

export default function CustomerPage() {
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [openModal, setOpenModal] = useState<boolean>(false)
   const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
   // const [openMessageModal, setOpenMessageModal] = useState<boolean>(false)
   // const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false)
   // const [modalMessage, setModalMessage] = useState<string>('')

   const [selectedId, setSelectedId] = useState<string>('')

   const {
      value: customerCode,
      setValue: setCustomerCode,
      valueIsValid: customerCodeIsValid,
      inputError: customerCodeError,
      inputChangeHandler: codeChangeHandler,
      inputBlurHandler: codeBlurHandler,
      reset: resetCode,
   } = useInput()

   const {
      value: customerName,
      setValue: setCustomerName,
      valueIsValid: customerNameIsValid,
      inputError: customerNameError,
      inputChangeHandler: nameChangeHandler,
      inputBlurHandler: nameBlurHandler,
      reset: resetName,
   } = useInput()

   const {
      mutate: addCustomer,
      data: addData,
      error: addError,
      isLoading: addingCustomer,
      isSuccess: isAdded,
      isError: isFailToAdd,
   } = useAddCustomer()

   const {
      mutate: updateCustomer,
      data: updateData,
      isLoading: updatingCustomer,
      error: updateError,
      isSuccess: isUpdated,
      isError: isFailToUpdate,
   } = useUpdateCustomer()

   const {
      mutate: deleteCustomer,
      data: deleteData,
      isLoading: deletingCustomer,
      error: deleteError,
      isSuccess: isDeleted,
      isError: isFailToDelete,
   } = useDeleteCustomer()

   const sameValues = customerCode === customerName
   const isValid = customerCodeIsValid && customerNameIsValid && !sameValues

   const loading = addingCustomer || updatingCustomer || deletingCustomer

   let timeout: NodeJS.Timeout

   const resetAll = () => {
      setIsEditing(false)
      setSelectedId('')
      resetCode()
      resetName()
   }

   const handleAddCustomer = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!isValid) return
      addCustomer({ customerCode, customerName })
      setOpenModal(false)
      resetAll()
   }

   const handleUpdateCustomer = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!isValid) return
      updateCustomer({ customerId: selectedId, customerCode, customerName })
      setOpenModal(false)
      resetAll()
   }

   const handleDeleteCustomer = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      deleteCustomer({ customerId: selectedId })
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
         <Typography variant="h5">Customers</Typography>
         <Dialog onClose={handleOnCloseModal} open={openModal}>
            <StyledDialogTitle>{isEditing ? 'Update Customer' : 'Add Customer'}</StyledDialogTitle>
            <DialogBody
               noValidate
               autoComplete="off"
               onSubmit={isEditing ? handleUpdateCustomer : handleAddCustomer}
            >
               <TextFieldWrapper>
                  <TextField
                     key="customer-code"
                     variant="outlined"
                     label="customer code"
                     onChange={codeChangeHandler}
                     onBlur={codeBlurHandler}
                     value={customerCode}
                     error={customerCodeError}
                     helperText={customerCodeError && 'Please fill correct value'}
                     size="small"
                     required
                  />
               </TextFieldWrapper>
               <TextFieldWrapper>
                  <TextField
                     key="customer-name"
                     variant="outlined"
                     label="customer name"
                     onChange={nameChangeHandler}
                     onBlur={nameBlurHandler}
                     value={customerName}
                     error={customerNameError}
                     helperText={customerNameError && 'Please fill correct value'}
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
                     disabled={!isValid}
                  >
                     {isEditing ? 'Update' : 'Add'}
                  </StyledButton>
               </ActionsWrapper>
            </DialogBody>
         </Dialog>
         <DeleteModal
            onSubmit={handleDeleteCustomer}
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
               Add Customer
            </Button>
         </ToolbarWrapper>
         <CustomersTable
            setCustomerCode={setCustomerCode}
            setCustomerName={setCustomerName}
            setSelectedId={setSelectedId}
            setIsEditing={setIsEditing}
            setOpenModal={setOpenModal}
            setOpenDeleteModal={setOpenDeleteModal}
            loading={loading}
         />
      </Container>
   )
}
