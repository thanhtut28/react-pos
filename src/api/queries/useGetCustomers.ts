import { useQuery } from 'react-query'
import { GET_CUSTOMERS_QUERY, CUSTOMERS_URL } from './queries'
import { GetCustomersQuery } from './types'
import { useAuth } from '../../contexts/AuthContext'
import { AxiosInstance } from 'axios'

async function getCustomers(apiClient: AxiosInstance): Promise<GetCustomersQuery> {
   const { data } = await apiClient.get(CUSTOMERS_URL)
   return data
}

export default function useGetCustomers() {
   const { apiClient } = useAuth()
   return useQuery<GetCustomersQuery, Error>({
      queryKey: GET_CUSTOMERS_QUERY,
      queryFn: () => getCustomers(apiClient),
   })
}
