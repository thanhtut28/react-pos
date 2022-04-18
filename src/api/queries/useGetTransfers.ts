import { useQuery } from 'react-query'
import { GET_TRANSFERS_QUERY, TRANSFERS_URL } from './queries'
import { useAuth } from '../../contexts/AuthContext'
import { GetTransfersQuery, Params } from './types'
import { AxiosInstance } from 'axios'

async function getTransfers(params: Params, apiClient: AxiosInstance): Promise<GetTransfersQuery> {
   const { data } = await apiClient.get(TRANSFERS_URL, {
      params,
   })
   return data
}

export default function useGetTransfers(params: Params, shouldRefetch: boolean) {
   const { apiClient } = useAuth()
   return useQuery<GetTransfersQuery, Error>(
      [GET_TRANSFERS_QUERY, params],
      () => getTransfers(params, apiClient),
      {
         enabled: shouldRefetch,
      }
   )
}
