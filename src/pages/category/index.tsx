import { useState } from 'react'
import useGetCategories from '../../api/queries/useGetCategories'
import { useAddCategory } from '../../api/mutations/category'
import { Box, Input, Button } from '@mui/material'

// eslint-disable-next-line react/display-name
export default function () {
   const [text, setText] = useState<string>('')
   const { data, isFetching, error } = useGetCategories()
   const { mutate, data: mutationData, error: mutationError } = useAddCategory({ categoryName: text })

   const categories = data?.data

   const handleAddCustomer = () => {
      if (text.trim() === '') return
      mutate()
      setText('')
   }

   //    const { data, isFetching } = useGetCategory(2)
   console.log(mutationData?.message)

   return (
      <>
         {error && <h1>{error}</h1>}
         {isFetching && <h1>Loading...</h1>}
         {categories?.map((customer) => (
            <p key={customer._id}>name: {customer.name}</p>
         ))}
         <Box sx={{ py: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <Button onClick={handleAddCustomer}>Add</Button>
         </Box>
      </>
   )
}
