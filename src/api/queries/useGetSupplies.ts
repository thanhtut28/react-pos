import { useQuery } from 'react-query'
import { GET_SUPPLIES_QUERY, SUPPLIES_URL } from './queries'
import { GetSuppliesQuery, Params } from './types'
import { useAuth } from '../../contexts/AuthContext'
import { AxiosInstance } from 'axios'

async function getSupplies(params: Params, apiClient: AxiosInstance): Promise<GetSuppliesQuery> {
   const { data } = await apiClient.get(SUPPLIES_URL, {
      params,
   })
   return data
}

export default function useGetSupplies(params: Params, shouldRefetch: boolean) {
   const { apiClient } = useAuth()

   return useQuery<GetSuppliesQuery, Error>(
      [GET_SUPPLIES_QUERY, params],
      () => getSupplies(params, apiClient),
      {
         enabled: shouldRefetch,
      }
   )
}
