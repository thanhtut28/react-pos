import { useState } from 'react'
import useGetCustomers from '../../api/queries/useGetCustomers'
import { useAddCustomer } from '../../api/mutations/customer/'
import { Box, Input, Button } from '@mui/material'

// eslint-disable-next-line react/display-name
export default function () {
   const [customerCode, setCustomerCode] = useState<string>('')
   const [customerName, setCustomerName] = useState<string>('')
   const { data, isFetching, error } = useGetCustomers()
   const { mutate, data: mutationData, error: mutationError } = useAddCustomer({ customerCode, customerName })

   const customers = data?.data

   const handleAddCustomer = () => {
      if (customerCode.trim() === '' || customerName.trim() === '') return
      mutate()
      setCustomerCode('')
      setCustomerName('')
   }

   //    const { data, isFetching } = useGetCategory(2)
   console.log(mutationData?.message)
   return (
      <>
         {error && <h1>{error}</h1>}
         {mutationError && <h1>{mutationError}</h1>}
         {isFetching && <h1>Loading...</h1>}
         {customers?.map((customer) => (
            <p key={customer._id}>name: {customer.name}</p>
         ))}
         <Box sx={{ py: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Input type="text" value={customerCode} onChange={(e) => setCustomerCode(e.target.value)} />
            <Input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            <Button onClick={handleAddCustomer}>Add Name</Button>
         </Box>
      </>
   )
}
