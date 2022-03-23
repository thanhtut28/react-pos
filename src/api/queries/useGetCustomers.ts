import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_CUSTOMERS_QUERY, CUSTOMERS_URL } from './queries'
import { GetCustomersQuery } from './types'

async function getCustomers(): Promise<GetCustomersQuery> {
   const { data } = await apiClient.get(CUSTOMERS_URL)
   return data
}

export default function useGetCustomers() {
   return useQuery<GetCustomersQuery, Error>({
      queryKey: GET_CUSTOMERS_QUERY,
      queryFn: getCustomers,
   })
}
