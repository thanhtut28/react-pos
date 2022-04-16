import { QueryClient } from 'react-query'
import axios from 'axios'
import { getAccessToken } from '../helpers/accessToken'

const token = getAccessToken()

export const client = new QueryClient({
   defaultOptions: {
      queries: {
         //  refetchInterval: Infinity,
         staleTime: Infinity,
         cacheTime: 0,
      },
   },
})

export const apiClient = axios.create({
   baseURL: 'https://umt-api-mgoum.ondigitalocean.app/api',
   headers: {
      Authorization: token ? `Bearer ${token}` : '',
   },
})
