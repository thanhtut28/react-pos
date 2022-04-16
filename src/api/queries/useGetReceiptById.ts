import { useQuery } from 'react-query'
import { apiClient } from '..'
import { GET_RECEIPT_BY_ID_QUERY, RECEIPT_BY_ID_URL } from './queries'
import { GetReceiptByIdQuery, ReceiptId } from './types'

async function getReceipt(receiptId: ReceiptId): Promise<GetReceiptByIdQuery> {
   const { data } = await apiClient.get(`${RECEIPT_BY_ID_URL}/${receiptId}`)
   return data
}

export default function useGetReceiptById(receiptId: ReceiptId) {
   return useQuery<GetReceiptByIdQuery, Error>([GET_RECEIPT_BY_ID_QUERY, receiptId], () =>
      getReceipt(receiptId)
   )
}
