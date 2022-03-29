import { useState, useCallback } from 'react'
import CustomersTable from '../../components/table/CustomersTable'
import { Box, Typography, Button, TextField, Dialog, DialogTitle } from '@mui/material'
import { useAddCustomer, useUpdateCustomer } from '../../api/mutations/customer'

export default function CustomerPage() {
   const [customerCode, setCustomerCode] = useState<string>('')
   const [customerName, setCustomerName] = useState<string>('')
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [openModal, setOpenModal] = useState<boolean>(false)
   const [selectedId, setSelectedId] = useState<string>('')

   const { mutate: addCustomer, data: mutationData, isLoading: addingCustomer } = useAddCustomer()
   const { mutate: updateCustomer, data: updateData, isLoading: updatingCustomer } = useUpdateCustomer()

   const customerCodeIsEmpty = customerCode.trim() === ''
   const customerNameIsEmpty = customerName.trim() === ''

   const resetForm = useCallback(() => {
      setIsEditing(false)
      setSelectedId('')
      setCustomerCode('')
      setCustomerName('')
   }, [])

   const handleAddCustomer = () => {
      if (customerCodeIsEmpty || customerNameIsEmpty) return
      addCustomer({ customerCode, customerName })
      setOpenModal(false)
      resetForm()
   }

   const handleUpdateCustomer = () => {
      if (customerCodeIsEmpty || customerNameIsEmpty) return
      updateCustomer({ customerId: selectedId, customerCode, customerName })
      setOpenModal(false)
      resetForm()
   }

   const handleOnCloseModal = () => {
      setOpenModal(false)
      resetForm()
   }

   return (
      <Box sx={{ p: 5, bgcolor: 'white' }}>
         <Typography variant="h5">Customers</Typography>
         <Dialog onClose={() => setOpenModal(false)} open={openModal}>
            <DialogTitle>{isEditing ? 'Update Customer' : 'Add Customer'}</DialogTitle>
            <Box
               sx={{
                  display: 'flex',
                  // justifyContent: 'space-between',
                  flexDirection: 'column',
                  pb: 4,
                  p: 5,
                  alignCustomers: 'center',
               }}
            >
               <Box py={2}>
                  <TextField
                     key="customer-code"
                     variant="outlined"
                     label="customer code"
                     onChange={(e) => setCustomerCode(e.target.value)}
                     value={customerCode}
                     size="small"
                     required
                  />
               </Box>
               <Box py={2}>
                  <TextField
                     key="customer-name"
                     variant="outlined"
                     label="customer name"
                     onChange={(e) => setCustomerName(e.target.value)}
                     value={customerName}
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
                     onClick={isEditing ? handleUpdateCustomer : handleAddCustomer}
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
               // sx={{ borderRadius: 0 }}
               onClick={() => setOpenModal(true)}
            >
               Add Customer
            </Button>
         </Box>
         <CustomersTable
            setCustomerCode={setCustomerCode}
            setCustomerName={setCustomerName}
            setSelectedId={setSelectedId}
            setIsEditing={setIsEditing}
            setOpenModal={setOpenModal}
            loading={addingCustomer || updatingCustomer}
            resetForm={resetForm}
         />
      </Box>
   )
}
