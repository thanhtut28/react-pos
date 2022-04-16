import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_TRANSFERS_QUERY, TRANSFERS_URL } from './queries'
import { GetTransfersQuery, Params } from './types'

async function getTransfers(params: Params): Promise<GetTransfersQuery> {
   const { data } = await apiClient.get(TRANSFERS_URL, {
      params,
   })
   return data
}

export default function useGetTransfers(params: Params, shouldRefetch: boolean) {
   return useQuery<GetTransfersQuery, Error>([GET_TRANSFERS_QUERY, params], () => getTransfers(params), {
      enabled: shouldRefetch,
   })
}
