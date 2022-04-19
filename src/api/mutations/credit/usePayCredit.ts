import { useMutation, useQueryClient } from 'react-query'
import { RECEIPT_URL, CREDIT_URL } from './url'
import { useAuth } from '../../../contexts/AuthContext'
import { PayCreditMutation, PayCreditMutationVariables } from './type'
import { AxiosInstance } from 'axios'
import { GET_CREDIT_BY_ID_QUERY } from 'src/api/queries/queries'

async function payCredit(
   credit: PayCreditMutationVariables,
   receiptId: string,
   apiClient: AxiosInstance
): Promise<PayCreditMutation> {
   const { data } = await apiClient.post(`${RECEIPT_URL}/${receiptId}${CREDIT_URL}`, credit)
   return data
}

export default function usePayCredit(receiptId: string) {
   const { apiClient } = useAuth()
   const queryClient = useQueryClient()

   return useMutation((credit: PayCreditMutationVariables) => payCredit(credit, receiptId, apiClient), {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [GET_CREDIT_BY_ID_QUERY, receiptId] }),
   })
}
