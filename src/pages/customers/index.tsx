import { useState } from 'react'
import useGetCustomers from '../../api/queries/useGetCustomers'
import usePostCategory from '../../api/mutations/usePostCategory'
import { useLocation } from 'react-router-dom'
import { Box, Input, Button } from '@mui/material'

// eslint-disable-next-line react/display-name
export default function () {
   const { data, isFetching, error } = useGetCustomers()

   const customers = data?.data

   //    const { data, isFetching } = useGetCategory(2)

   return (
      <>
         {error && <h1>{error}</h1>}
         {isFetching && <h1>Loading...</h1>}
         {customers?.map((customer) => (
            <p key={customer._id}>name: {customer.name}</p>
         ))}
      </>
   )
}
