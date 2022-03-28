import { useState, useCallback } from 'react'
import SuppliersTable from '../../components/table/SuppliersTable'
import { Box, Typography, Button, TextField, Dialog, DialogTitle } from '@mui/material'
import { useAddSupplier, useUpdateSupplier } from '../../api/mutations/supplier'

export default function SupplierPage() {
   const [supplierCode, setSupplierCode] = useState<string>('')
   const [supplierName, setSupplierName] = useState<string>('')
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [openModal, setOpenModal] = useState<boolean>(false)
   const [selectedId, setSelectedId] = useState<string>('')

   const { mutate: addSupplier, data: mutationData, isLoading: addingSupplier } = useAddSupplier()
   const { mutate: updateSupplier, data: updateData, isLoading: updatingSupplier } = useUpdateSupplier()

   const supplierCodeIsEmpty = supplierCode.trim() === ''
   const supplierNameIsEmpty = supplierName.trim() === ''

   const resetForm = useCallback(() => {
      setIsEditing(false)
      setSelectedId('')
      setSupplierCode('')
      setSupplierName('')
   }, [])

   const handleAddSupplier = () => {
      if (supplierCodeIsEmpty || supplierNameIsEmpty) return
      addSupplier({ supplierCode, supplierName })
      setOpenModal(false)
      resetForm()
   }

   const handleUpdateSupplier = () => {
      if (supplierCode.trim() === '' || supplierName.trim() === '') return
      updateSupplier({ supplierId: selectedId, supplierCode, supplierName })
      setOpenModal(false)
      resetForm()
   }

   const handleOnCloseModal = () => {
      setOpenModal(false)
      resetForm()
   }

   return (
      <Box sx={{ p: 5, bgcolor: 'white' }}>
         <Typography variant="h5">Suppliers</Typography>
         <Dialog onClose={() => setOpenModal(false)} open={openModal}>
            <DialogTitle>{isEditing ? 'Update Supplier' : 'Add Supplier'}</DialogTitle>
            <Box
               sx={{
                  display: 'flex',
                  // justifyContent: 'space-between',
                  flexDirection: 'column',
                  pb: 4,
                  p: 5,
                  alignSuppliers: 'center',
               }}
            >
               <Box py={2}>
                  <TextField
                     key="supplier-code"
                     variant="outlined"
                     label="supplier code"
                     onChange={(e) => setSupplierCode(e.target.value)}
                     value={supplierCode}
                     size="small"
                     required
                  />
               </Box>
               <Box py={2}>
                  <TextField
                     key="supplier-name"
                     variant="outlined"
                     label="supplier name"
                     onChange={(e) => setSupplierName(e.target.value)}
                     value={supplierName}
                     size="small"
                     required
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
                     onClick={isEditing ? handleUpdateSupplier : handleAddSupplier}
                  >
                     {isEditing ? 'Update' : 'Add'}
                  </Button>
               </Box>
            </Box>
         </Dialog>
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 3 }}>
            <Button
               variant="contained"
               color="primary"
               size="small"
               disableElevation
               sx={{ borderRadius: 0 }}
               onClick={() => setOpenModal(true)}
            >
               Add Supplier
            </Button>
         </Box>
         <SuppliersTable
            setSupplierCode={setSupplierCode}
            setSupplierName={setSupplierName}
            setSelectedId={setSelectedId}
            setIsEditing={setIsEditing}
            setOpenModal={setOpenModal}
            loading={addingSupplier || updatingSupplier}
            resetForm={resetForm}
         />
      </Box>
   )
}
