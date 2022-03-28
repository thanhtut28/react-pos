import { useState, useCallback } from 'react'
import ItemsTable from '../../components/table/ItemsTable'
import { Box, Typography, Button, TextField, Dialog, DialogTitle, Autocomplete } from '@mui/material'
import { useAddItem, useUpdateItem } from '../../api/mutations/item'
import useGetCategories from '../../api/queries/useGetCategories'

export default function ItemPage() {
   const [itemCode, setItemCode] = useState<string>('')
   const [itemName, setItemName] = useState<string>('')
   const [categoryName, setCategoryName] = useState<string>('')
   const [search, setSearch] = useState<string>('')
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [openModal, setOpenModal] = useState<boolean>(false)
   const [selectedId, setSelectedId] = useState<string>('')

   const { data: categoriesData, isFetching: gettingCategories } = useGetCategories()
   const { mutate: addItem, data: mutationData, isLoading: addingItem } = useAddItem()
   const { mutate: updateItem, data: updateData, isLoading: updatingItem } = useUpdateItem()

   const categories = categoriesData?.data

   const itemCodeIsEmpty = itemCode.trim() === ''
   const itemNameIsEmpty = itemName.trim() === ''
   const categoryNameIsEmpty = categoryName.trim() === ''

   const resetForm = useCallback(() => {
      setIsEditing(false)
      setSelectedId('')
      setItemCode('')
      setItemName('')
      setCategoryName('')
   }, [])

   const handleAddItem = () => {
      if (itemCodeIsEmpty || itemNameIsEmpty) return
      categoryNameIsEmpty ? addItem({ itemCode, itemName }) : addItem({ itemCode, itemName, categoryName })
      setOpenModal(false)
      resetForm()
   }

   const handleUpdateItem = () => {
      if (itemCodeIsEmpty || itemNameIsEmpty) return
      categoryNameIsEmpty
         ? updateItem({ itemId: selectedId, itemCode, itemName })
         : updateItem({ itemId: selectedId, itemCode, itemName, categoryName })
      setOpenModal(false)
      resetForm()
   }

   const handleOnCloseModal = () => {
      setOpenModal(false)
      resetForm()
   }

   return (
      <Box sx={{ p: 5, bgcolor: 'white' }}>
         <Typography variant="h5">Items</Typography>
         <Dialog onClose={() => setOpenModal(false)} open={openModal}>
            <DialogTitle>{isEditing ? 'Update Item' : 'Add Item'}</DialogTitle>
            <Box
               sx={{
                  display: 'flex',
                  // justifyContent: 'space-between',
                  flexDirection: 'column',
                  pb: 4,
                  p: 5,
                  alignItems: 'center',
               }}
            >
               <Box py={2}>
                  <TextField
                     key="item-code"
                     variant="outlined"
                     label="item code"
                     onChange={(e) => setItemCode(e.target.value)}
                     value={itemCode}
                     size="small"
                     required
                  />
               </Box>
               <Box py={2}>
                  <TextField
                     key="item-name"
                     variant="outlined"
                     label="item name"
                     onChange={(e) => setItemName(e.target.value)}
                     value={itemName}
                     size="small"
                     required
                  />
               </Box>
               <Box py={2} sx={{ width: 1 }}>
                  <Autocomplete
                     key="categor-name"
                     inputValue={categoryName}
                     onInputChange={(event, newValue) => {
                        setCategoryName(newValue)
                     }}
                     options={categories ? categories.map((category) => category.name) : []}
                     renderInput={(params: any) => <TextField {...params} label="category" />}
                  />
               </Box>
               <Box py={2}>
                  <Button
                     variant="outlined"
                     color="primary"
                     size="small"
                     disableElevation
                     onClick={handleOnCloseModal}
                     sx={{ mr: 2 }}
                  >
                     Cancel
                  </Button>
                  <Button
                     variant="contained"
                     color="primary"
                     size="small"
                     disableElevation
                     onClick={isEditing ? handleUpdateItem : handleAddItem}
                  >
                     {isEditing ? 'Update' : 'Add'}
                  </Button>
               </Box>
            </Box>
         </Dialog>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 3 }}>
            <TextField
               key="search by name"
               variant="standard"
               placeholder="Search By Name"
               onChange={(e) => setSearch(e.target.value)}
               value={search}
               size="small"
               // required
            />
            <Button
               variant="contained"
               color="primary"
               size="small"
               disableElevation
               sx={{ borderRadius: 0 }}
               onClick={() => setOpenModal(true)}
            >
               Add Item
            </Button>
         </Box>
         <ItemsTable
            setItemCode={setItemCode}
            setItemName={setItemName}
            setCategoryName={setCategoryName}
            setSelectedId={setSelectedId}
            setIsEditing={setIsEditing}
            setOpenModal={setOpenModal}
            loading={addingItem || updatingItem}
            resetForm={resetForm}
         />
      </Box>
   )
}
