import { useQuery } from 'react-query'
import { GET_TRANSFER_NUM, TRANSFER_NUM_URL } from './queries'
import { useAuth } from '../../contexts/AuthContext'
import { GetTransferNumQuery } from './types'
import { AxiosInstance } from 'axios'

async function getTransferNum(apiClient: AxiosInstance): Promise<GetTransferNumQuery> {
   const { data } = await apiClient.get(TRANSFER_NUM_URL)
   return data
}

export default function useGetTransferNum() {
   const { apiClient } = useAuth()
   return useQuery<GetTransferNumQuery, Error>({
      queryKey: GET_TRANSFER_NUM,
      queryFn: () => getTransferNum(apiClient),
   })
}
