import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_STOCKS_QUERY, STOCKS_URL } from './queries'
import { GetStocksQuery, Params } from './types'

async function getStocks(params: Params, userId?: string): Promise<GetStocksQuery> {
   const { data } = await apiClient.get(STOCKS_URL, {
      params: {
         from: params.from,
         to: params.to,
         ...(userId && { userId }),
      },
   })
   return data
}

export default function useGetStocks(params: Params, shouldRefetch: boolean, userId?: string) {
   return useQuery<GetStocksQuery, Error>([GET_STOCKS_QUERY, params], () => getStocks(params, userId), {
      enabled: shouldRefetch,
   })
}
