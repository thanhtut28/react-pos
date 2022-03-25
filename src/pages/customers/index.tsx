import React, { useState } from 'react'
import useGetCustomers from '../../api/queries/useGetCustomers'
import { useAddCustomer } from '../../api/mutations/customer/'
import StyledTable from '../../components/table'
import { Box, Typography, Button } from '@mui/material'
import { GridEditRowsModel, GridColumns } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem, MuiEvent, useGridApiRef } from '@mui/x-data-grid'

export default function CustomerPage() {
   const [customerCode, setCustomerCode] = useState<string>('')
   const [customerName, setCustomerName] = useState<string>('')
   const [editRowsModel, setEditRowsModel] = React.useState({})

   const apiRef = useGridApiRef()

   const { data, isFetching, error } = useGetCustomers()
   const { mutate, data: mutationData, error: mutationError } = useAddCustomer({ customerCode, customerName })

   const customers = data?.data
   const customer = customers?.[0]

   const columnFields = customer ? Object.entries(customer) : []

   const handleEditRowsModelChange = React.useCallback((model: GridEditRowsModel) => {
      setEditRowsModel(model)
   }, [])

   const handleAddCustomer = () => {
      if (customerCode.trim() === '' || customerName.trim() === '') return
      mutate()
      setCustomerCode('')
      setCustomerName('')
   }
   console.log(columnFields)

   if (isFetching) {
      return <h1>Loaidng...</h1>
   }

   return (
      <>
         {}
         {/* {error && <h1>{error}</h1>}
         {mutationError && <h1>{mutationError}</h1>}
         {isFetching && <h1>Loading...</h1>}
         {customers?.map((customer) => (
            <p key={customer._id}>name: {customer.name}</p>
         ))}
         <Box sx={{ py: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Input type="text" value={customerCode} onChange={(e) => setCustomerCode(e.target.value)} />
            <Input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            <Button onClick={handleAddCustomer}>Add Name</Button>
         </Box> */}
         <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 4, bgcolor: 'white', p: 3 }}>
            <Typography variant="h5"> Customers</Typography>
            <Button
               variant="contained"
               color="primary"
               size="small"
               disableElevation
               sx={{ borderRadius: 0 }}
            >
               Add Customer
            </Button>
         </Box>
         <StyledTable
            editRowsModel={editRowsModel}
            handleEditRowsModelChange={handleEditRowsModelChange}
            // columns={columns}
            rows={customers}
            columnFields={columnFields}
         />
      </>
   )
}
