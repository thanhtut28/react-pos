import { useQuery } from 'react-query'
import { GET_RECEIPT_BY_ID_QUERY, RECEIPT_BY_ID_URL } from './queries'
import { GetReceiptByIdQuery, ReceiptId } from './types'
import { useAuth } from '../../contexts/AuthContext'
import { AxiosInstance } from 'axios'

async function getReceipt(receiptId: ReceiptId, apiClient: AxiosInstance): Promise<GetReceiptByIdQuery> {
   const { data } = await apiClient.get(`${RECEIPT_BY_ID_URL}/${receiptId}`)
   return data
}

export default function useGetReceiptById(receiptId: ReceiptId) {
   const { apiClient } = useAuth()
   return useQuery<GetReceiptByIdQuery, Error>([GET_RECEIPT_BY_ID_QUERY, receiptId], () =>
      getReceipt(receiptId, apiClient)
   )
}
