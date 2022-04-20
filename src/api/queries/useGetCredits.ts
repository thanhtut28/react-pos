import { useQuery } from 'react-query'
import { GET_CREDITS_QUERY, CREDITS_URL } from './queries'
import { useAuth } from '../../contexts/AuthContext'
import { GetCreditsQuery, Params } from './types'
import { AxiosInstance } from 'axios'

async function getCredits(params: Params, apiClient: AxiosInstance): Promise<GetCreditsQuery> {
   const { data } = await apiClient.get(CREDITS_URL, {
      params,
   })
   return data
}

export default function useGetCredits(params: Params) {
   const { apiClient } = useAuth()
   return useQuery<GetCreditsQuery, Error>([GET_CREDITS_QUERY, params], () => getCredits(params, apiClient))
}
