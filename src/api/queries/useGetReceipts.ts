import { useQuery } from 'react-query'
import { GET_RECEIPTS_QUERY, RECEIPTS_URL } from './queries'
import { useAuth } from '../../contexts/AuthContext'
import { GetReceiptsQuery, Params } from './types'
import { AxiosInstance } from 'axios'

async function getReceipts(params: Params, apiClient: AxiosInstance): Promise<GetReceiptsQuery> {
   const { data } = await apiClient.get(RECEIPTS_URL, {
      params,
   })
   return data
}

export default function useGetReceipts(params: Params) {
   const { apiClient } = useAuth()
   return useQuery<GetReceiptsQuery, Error>([GET_RECEIPTS_QUERY, params], () =>
      getReceipts(params, apiClient)
   )
}
