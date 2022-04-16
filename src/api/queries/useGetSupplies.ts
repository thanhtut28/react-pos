import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_SUPPLIES_QUERY, SUPPLIES_URL } from './queries'
import { GetSuppliesQuery, Params } from './types'

async function getSupplies(params: Params): Promise<GetSuppliesQuery> {
   const { data } = await apiClient.get(SUPPLIES_URL, {
      params,
   })
   return data
}

export default function useGetSupplies(params: Params, shouldRefetch: boolean) {
   return useQuery<GetSuppliesQuery, Error>([GET_SUPPLIES_QUERY, params], () => getSupplies(params), {
      enabled: shouldRefetch,
   })
}
