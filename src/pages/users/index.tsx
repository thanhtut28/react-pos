import React, { useState, useEffect } from 'react'
import useInput from '../../hooks/useInput'
import useMessageModal from '../../hooks/useMessageModal'
import UsersTable from '../../components/table/UsersTable'
import { Typography, Button, TextField, Dialog, Box } from '@mui/material'
import useGetUsers from '../../api/queries/useGetUsers'
import { useAddUser, useUpdateUser, useDeleteUser } from '../../api/mutations/user'
import {
   Container,
   ActionsWrapper,
   DialogBody,
   TextFieldWrapper,
   ToolbarWrapper,
   StyledDialogTitle,
   StyledButton,
   PageTitle,
} from '../../components/toolbar/Elements'
import WarningModal from '../../components/warningModal'
import MessageModal from '../../components/messageModal'
import { isNotEmpty } from '../../helpers/isNotEmpty'

export default function UserPage() {
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [openModal, setOpenModal] = useState<boolean>(false)
   const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
   const [selectedId, setSelectedId] = useState<string>('')
   const [error, setError] = useState<string>('')
   const { data: usersData, isFetching: fetchingUsers, error: errorFetchingUsers } = useGetUsers()

   const users = usersData?.data

   const nameIsNotCreated = (username: string) => !users?.find((user) => user.username === username)

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
      value: username,
      setValue: setUsername,
      valueIsValid: usernameIsValid,
      inputError: usernameError,
      inputChangeHandler: usernameChangeHandler,
      inputBlurHandler: usernameBlurHandler,
      reset: resetUsername,
   } = useInput(nameValidate.bind(null, nameIsNotCreated))

   const {
      value: password,
      valueIsValid: passwordIsValid,
      inputError: passwordError,
      inputChangeHandler: passwordChangeHandler,
      inputBlurHandler: passwordBlurHandler,
      reset: resetPassword,
   } = useInput(isNotEmpty)

   const {
      mutate: addUser,
      data: addData,
      error: addError,
      isLoading: addingUser,
      isSuccess: isAdded,
      reset: resetAddData,
      isError: isFailToAdd,
   } = useAddUser()

   const {
      mutate: updateUser,
      data: updateData,
      isLoading: updatingUser,
      error: updateError,
      isSuccess: isUpdated,
      reset: resetUpdateData,
      isError: isFailToUpdate,
   } = useUpdateUser()

   const {
      mutate: deleteUser,
      data: deleteData,
      isLoading: deletingUser,
      error: deleteError,
      isSuccess: isDeleted,
      reset: resetDeleteData,
      isError: isFailToDelete,
   } = useDeleteUser()

   const isValidToAdd = usernameIsValid && passwordIsValid && nameIsNotCreated(username)
   const isValidToUpdate = usernameIsValid && passwordIsValid

   const loading = addingUser || updatingUser || deletingUser || fetchingUsers

   const resetAll = () => {
      setIsEditing(false)
      setSelectedId('')
      resetUsername()
      resetPassword()
      setError('')
   }

   const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!isValidToAdd) {
         setError('Username is already taken')
         return
      }
      addUser({ username, password })
      setOpenModal(false)
      resetAll()
   }

   const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!isValidToUpdate) return
      updateUser({ userId: selectedId, username, password })
      setOpenModal(false)
      resetAll()
   }

   const handleDeleteUser = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      deleteUser({ userId: selectedId })
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
         handleSetSuccessMessage(addData.data)
         handleOpenSuccessMessageModal()
         resetAddData()
         return
      }

      if (isUpdated) {
         handleSetSuccessMessage(updateData.data)
         handleOpenSuccessMessageModal()
         resetUpdateData()
         return
      }

      if (isDeleted) {
         handleSetSuccessMessage(deleteData.data)
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
      addData?.data,
      addError,
      deleteData?.data,
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
      updateData?.data,
      updateError,
   ])

   return (
      <Container>
         <PageTitle>Users</PageTitle>
         <Dialog onClose={handleOnCloseModal} open={openModal}>
            <StyledDialogTitle>{isEditing ? 'Update User' : 'Add User'}</StyledDialogTitle>
            <DialogBody noValidate autoComplete="off" onSubmit={isEditing ? handleUpdateUser : handleAddUser}>
               <TextFieldWrapper>
                  <TextField
                     key="username"
                     variant="outlined"
                     label="Username"
                     onChange={usernameChangeHandler}
                     onBlur={usernameBlurHandler}
                     value={username}
                     error={usernameError}
                     helperText={usernameError && 'Please fill correct value'}
                     size="small"
                  />
               </TextFieldWrapper>
               <TextFieldWrapper>
                  <TextField
                     key="password"
                     variant="outlined"
                     label="Password"
                     onChange={passwordChangeHandler}
                     onBlur={passwordBlurHandler}
                     value={password}
                     error={passwordError}
                     helperText={passwordError && 'Please fill correct value'}
                     type="password"
                     size="small"
                  />
               </TextFieldWrapper>
               {error && (
                  <Typography variant="caption" color="error">
                     {error}
                  </Typography>
               )}
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
            onSubmit={handleDeleteUser}
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
               Add User
            </Button>
         </ToolbarWrapper>
         <UsersTable
            setUsername={setUsername}
            setSelectedId={setSelectedId}
            setIsEditing={setIsEditing}
            setOpenModal={setOpenModal}
            setOpenDeleteModal={setOpenDeleteModal}
            loading={loading}
         />
      </Container>
   )
}
