import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_RECEIPT_NUM, RECEIPT_NUM_URL } from './queries'
import { GetReceiptNumQuery } from './types'

async function getReceiptNum(): Promise<GetReceiptNumQuery> {
   const { data } = await apiClient.get(RECEIPT_NUM_URL)
   return data
}

export default function useGetReceiptNum() {
   return useQuery<GetReceiptNumQuery, Error>({
      queryKey: GET_RECEIPT_NUM,
      queryFn: getReceiptNum,
   })
}
