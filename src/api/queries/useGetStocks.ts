import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_STOCKS_QUERY, STOCKS_URL } from './queries'
import { GetStocksQuery, Params } from './types'

async function getStocks(params: Params): Promise<GetStocksQuery> {
   const { data } = await apiClient.get(STOCKS_URL, {
      params,
   })
   return data
}

export default function useGetStocks(params: Params, shouldRefetch: boolean) {
   return useQuery<GetStocksQuery, Error>([GET_STOCKS_QUERY, params], () => getStocks(params), {
      enabled: shouldRefetch,
   })
}
