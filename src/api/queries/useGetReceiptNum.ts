import { useQuery } from 'react-query'
import { GET_RECEIPT_NUM, RECEIPT_NUM_URL } from './queries'
import { GetReceiptNumQuery } from './types'
import { useAuth } from '../../contexts/AuthContext'
import { AxiosInstance } from 'axios'

async function getReceiptNum(apiClient: AxiosInstance): Promise<GetReceiptNumQuery> {
   const { data } = await apiClient.get(RECEIPT_NUM_URL)
   return data
}

export default function useGetReceiptNum() {
   const { apiClient } = useAuth()
   return useQuery<GetReceiptNumQuery, Error>({
      queryKey: GET_RECEIPT_NUM,
      queryFn: () => getReceiptNum(apiClient),
   })
}
