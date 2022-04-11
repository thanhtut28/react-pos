import { useQuery, QueryKey } from 'react-query'
import { apiClient } from '..'
import { GET_RECEIPTS_QUERY, RECEIPTS_URL } from './queries'
import { GetReceiptsQuery, GetReceiptsQueryVariables } from './types'

async function getReceipts({ queryKey }: { queryKey: any }): Promise<GetReceiptsQuery> {
   const [{ options }] = queryKey
   const { data } = await apiClient.get(RECEIPTS_URL)
   return data
}

export default function useGetReceipts(options: GetReceiptsQueryVariables) {
   return useQuery<GetReceiptsQuery, Error>([GET_RECEIPTS_QUERY, options], getReceipts)
}
