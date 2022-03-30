import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import ItemsTable from '../../components/table/ItemsTable'
import {
   Typography,
   Button,
   TextField,
   Dialog,
   AutocompleteChangeReason,
   AutocompleteChangeDetails,
} from '@mui/material'
import { useAddItem, useUpdateItem, useDeleteItem } from '../../api/mutations/item'
import useGetCategories from '../../api/queries/useGetCategories'
import {
   Container,
   ActionsWrapper,
   DialogBody,
   TextFieldWrapper,
   ToolbarWrapper,
   StyledDialogTitle,
   StyledButton,
   StyledAutocomplete,
} from '../../components/toolbar/Elements'
import DeleteModal from '../../components/deleteModal'

export default function ItemPage() {
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [openModal, setOpenModal] = useState<boolean>(false)
   const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
   const [categoryName, setCategoryName] = useState<string | null>(null)
   // const [openMessageModal, setOpenMessageModal] = useState<boolean>(false)
   // const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false)
   // const [modalMessage, setModalMessage] = useState<string>('')

   const [selectedId, setSelectedId] = useState<string>('')
   const navigate = useNavigate()

   const {
      value: itemCode,
      setValue: setItemCode,
      valueIsValid: itemCodeIsValid,
      inputError: itemCodeError,
      inputChangeHandler: codeChangeHandler,
      inputBlurHandler: codeBlurHandler,
      reset: resetCode,
   } = useInput()

   const {
      value: itemName,
      setValue: setItemName,
      valueIsValid: itemNameIsValid,
      inputError: itemNameError,
      inputChangeHandler: nameChangeHandler,
      inputBlurHandler: nameBlurHandler,
      reset: resetName,
   } = useInput()

   // const { data: categoriesData, isFetching: fetchingCategories } = useGetCategories()

   // const categories = categoriesData?.data
   const categories = [{ name: 'Water' }, { name: 'Snacks' }, { name: 'Waffle' }]

   const {
      mutate: addItem,
      data: addData,
      error: addError,
      isLoading: addingItem,
      isSuccess: isAdded,
      isError: isFailToAdd,
   } = useAddItem()

   const {
      mutate: updateItem,
      data: updateData,
      isLoading: updatingItem,
      error: updateError,
      isSuccess: isUpdated,
      isError: isFailToUpdate,
   } = useUpdateItem()

   const {
      mutate: deleteItem,
      data: deleteData,
      isLoading: deletingItem,
      error: deleteError,
      isSuccess: isDeleted,
      isError: isFailToDelete,
   } = useDeleteItem()

   const sameValues = itemCode === itemName
   const isValid = itemCodeIsValid && itemNameIsValid && !sameValues

   const loading = addingItem || updatingItem || deletingItem

   let timeout: NodeJS.Timeout

   const resetAll = () => {
      setIsEditing(false)
      setSelectedId('')
      resetCode()
      resetName()
      setCategoryName(null)
   }

   const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!isValid) return
      categoryName ? addItem({ itemCode, itemName, category: categoryName }) : addItem({ itemCode, itemName })
      setOpenModal(false)
      resetAll()
   }

   const handleUpdateItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!isValid) return
      categoryName
         ? updateItem({ itemId: selectedId, itemCode, itemName, category: categoryName })
         : updateItem({ itemId: selectedId, itemCode, itemName })
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
                     required
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
                     required
                  />
               </TextFieldWrapper>
               <TextFieldWrapper>
                  <StyledAutocomplete
                     key="category-name"
                     value={categoryName}
                     onChange={(event: any, newValue: any) => {
                        setCategoryName(newValue as string)
                     }}
                     options={categories ? categories.map((category) => category.name) : []}
                     renderInput={(params: any) => <TextField {...params} label="category" />}
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
         <DeleteModal onSubmit={handleDeleteItem} open={openDeleteModal} onClose={handleOnCloseDeleteModal} />
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
               Add Item
            </Button>
         </ToolbarWrapper>
         <ItemsTable
            setItemCode={setItemCode}
            setItemName={setItemName}
            setCategoryName={setCategoryName}
            setSelectedId={setSelectedId}
            setIsEditing={setIsEditing}
            setOpenModal={setOpenModal}
            setOpenDeleteModal={setOpenDeleteModal}
            loading={loading}
         />
      </Container>
   )
}
