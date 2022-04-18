import { AxiosInstance } from 'axios'
import { useQuery } from 'react-query'
import { useAuth } from '../../contexts/AuthContext'
import { GET_STOCKS_WH_QUERY, STOCKS_WH_URL } from './queries'
import { GetWHStocksQuery, Params } from './types'

async function getStocks(params: Params, apiClient: AxiosInstance): Promise<GetWHStocksQuery> {
   const { data } = await apiClient.get(STOCKS_WH_URL, {
      params,
   })
   return data
}

export default function useWHGetStocks(params: Params, shouldRefetch: boolean) {
   const { apiClient } = useAuth()
   return useQuery<GetWHStocksQuery, Error>(
      [GET_STOCKS_WH_QUERY, params],
      () => getStocks(params, apiClient),
      {
         enabled: shouldRefetch,
      }
   )
}
