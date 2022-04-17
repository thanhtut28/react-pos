import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_STOCKS_WH_QUERY, STOCKS_WH_URL } from './queries'
import { GetWHStocksQuery, Params } from './types'

async function getStocks(params: Params): Promise<GetWHStocksQuery> {
   const { data } = await apiClient.get(STOCKS_WH_URL, {
      params,
   })
   return data
}

export default function useWHGetStocks(params: Params, shouldRefetch: boolean) {
   return useQuery<GetWHStocksQuery, Error>([GET_STOCKS_WH_QUERY, params], () => getStocks(params), {
      enabled: shouldRefetch,
   })
}
