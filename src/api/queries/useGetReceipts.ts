import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_RECEIPTS_QUERY, RECEIPTS_URL } from './queries'
import { GetReceiptsQuery, Params } from './types'

async function getReceipts(params: Params): Promise<GetReceiptsQuery> {
   const { data } = await apiClient.get(RECEIPTS_URL, {
      params,
   })
   return data
}

export default function useGetReceipts(params: Params) {
   return useQuery<GetReceiptsQuery, Error>(GET_RECEIPTS_QUERY, () => getReceipts(params))
}
