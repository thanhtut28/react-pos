import { useQuery } from 'react-query'
import { axiosInstance } from '../../api'
import { GET_CUSTOMERS_QUERY } from '../../constants/queries'
import { GetCustomersQuery } from './types'

async function getCustomers(): Promise<GetCustomersQuery> {
   const { data } = await axiosInstance.get('/customers')
   return data
}

export default function useGetCategories() {
   return useQuery<GetCustomersQuery, Error>(GET_CUSTOMERS_QUERY, getCustomers)
}
