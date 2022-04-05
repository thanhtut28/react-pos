import { QueryClient } from 'react-query'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const token =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDc2Njk1NTV9.Y3kldq0z1BiVpE-9QsNpss0ZPIOPs7mVS3ky_DGKev0'

export const client = new QueryClient({
   defaultOptions: {
      queries: {
         //  refetchInterval: Infinity,
         staleTime: Infinity,
      },
   },
})

export const apiClient = axios.create({
   baseURL: 'https://umt-api-mgoum.ondigitalocean.app/api',
   headers: {
      Authorization: token ? `Bearer ${token}` : '',
   },
})
