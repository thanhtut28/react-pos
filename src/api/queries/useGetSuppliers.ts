import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_SUPPLIERS_QUERY, SUPPLIERS_URL } from './queries'
import { GetSuppliersQuery } from './types'

async function getSuppliers(): Promise<GetSuppliersQuery> {
   const { data } = await apiClient.get(SUPPLIERS_URL)
   return data
}

export default function useGetSuppliers() {
   return useQuery<GetSuppliersQuery, Error>({
      queryKey: GET_SUPPLIERS_QUERY,
      queryFn: getSuppliers,
   })
}
