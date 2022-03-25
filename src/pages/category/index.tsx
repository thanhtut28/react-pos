import { useState } from 'react'
import useGetCategories from '../../api/queries/useGetCategories'
import { useAddCategory } from '../../api/mutations/category'
import { Box, Typography, Button } from '@mui/material'
import StyledTable from '../../components/table'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem } from '@mui/x-data-grid'

export default function CategoriesPage() {
   const [text, setText] = useState<string>('')
   const { data, isFetching, error } = useGetCategories()
   const { mutate, data: mutationData } = useAddCategory({ categoryName: text })

   const categories = data?.data

   const category = categories?.[0]

   const columnFields = category ? Object.entries(category) : []
   const columns = [
      ...columnFields.map(([key, value]) => ({
         field: key,
         headerName: key,
         flex: 1,
         type: typeof value,
         headerClassName: 'table--header',
      })),
      {
         field: 'actions',
         type: 'actions',
         width: 200,
         getActions: () => [
            <GridActionsCellItem key="edit" icon={<EditIcon />} label="Edit" />,
            <GridActionsCellItem key="delete" icon={<DeleteIcon />} label="Delete" />,
         ],
         headerClassName: 'table--header-actions',
      },
   ]

   const handleAddCustomer = () => {
      if (text.trim() === '') return
      mutate()
      setText('')
   }

   //    const { data, isFetching } = useGetCategory(2)
   console.log(mutationData?.message)

   if (isFetching) {
      return <h1>Loaidng...</h1>
   }

   return (
      <>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 4, bgcolor: 'white', p: 3 }}>
            <Typography variant="h5"> Categories</Typography>
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
         <StyledTable columns={columns} rows={categories} />
      </>

      /* {error && <h1>{error}</h1>}
         {isFetching && <h1>Loading...</h1>}
         {categories?.map((category) => (
            <p key={category._id}>name: {category.name}</p>
         ))}
         <Box sx={{ py: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <Button onClick={handleAddCustomer}>Add</Button>
         </Box> */
   )
}
