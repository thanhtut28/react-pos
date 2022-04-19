import { useQuery } from 'react-query'
import { GET_CREDIT_BY_ID_QUERY, RECEIPT_BY_ID_URL, CREDIT_URL } from './queries'
import { GetCreditByIdQuery, ReceiptId } from './types'
import { useAuth } from '../../contexts/AuthContext'
import { AxiosInstance } from 'axios'

async function getCredit(receiptId: ReceiptId, apiClient: AxiosInstance): Promise<GetCreditByIdQuery> {
   const { data } = await apiClient.get(`${RECEIPT_BY_ID_URL}/${receiptId}${CREDIT_URL}`)
   return data
}

export default function useGetCreditById(receiptId: ReceiptId) {
   const { apiClient } = useAuth()
   return useQuery<GetCreditByIdQuery, Error>([GET_CREDIT_BY_ID_QUERY, receiptId], () =>
      getCredit(receiptId, apiClient)
   )
}
