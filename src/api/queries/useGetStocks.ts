import { useQuery } from 'react-query'
import { GET_STOCKS_QUERY, STOCKS_URL } from './queries'
import { useAuth } from '../../contexts/AuthContext'
import { GetStocksQuery, Params } from './types'
import { AxiosInstance } from 'axios'

async function getStocks(apiClient: AxiosInstance, params: Params, userId?: string): Promise<GetStocksQuery> {
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
   const { apiClient } = useAuth()
   return useQuery<GetStocksQuery, Error>(
      [GET_STOCKS_QUERY, params],
      () => getStocks(apiClient, params, userId),
      {
         enabled: shouldRefetch,
      }
   )
}
