import { AxiosInstance } from 'axios'
import { useQuery } from 'react-query'
import { useAuth } from '../../contexts/AuthContext'
import { GET_SUPPLIERS_QUERY, SUPPLIERS_URL } from './queries'
import { GetSuppliersQuery } from './types'

async function getSuppliers(apiClient: AxiosInstance): Promise<GetSuppliersQuery> {
   const { data } = await apiClient.get(SUPPLIERS_URL)
   return data
}

export default function useGetSuppliers() {
   const { apiClient } = useAuth()

   return useQuery<GetSuppliersQuery, Error>({
      queryKey: GET_SUPPLIERS_QUERY,
      queryFn: () => getSuppliers(apiClient),
   })
}
