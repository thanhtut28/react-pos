import { useQuery } from 'react-query'
import { GET_SUMMARY_QUERY, SUMMARY_URL } from './queries'
import { useAuth } from '../../contexts/AuthContext'
import { GetSummaryQuery, Params } from './types'
import { AxiosInstance } from 'axios'

async function getSummary(params: Params, apiClient: AxiosInstance): Promise<GetSummaryQuery> {
   const { data } = await apiClient.get(SUMMARY_URL, {
      params,
   })
   return data
}

export default function useGetSummary(params: Params) {
   const { apiClient } = useAuth()
   return useQuery<GetSummaryQuery, Error>([GET_SUMMARY_QUERY, params], () => getSummary(params, apiClient))
}
