import { useMutation, useQueryClient } from 'react-query'
import { RECEIPT_URL, CREDIT_URL } from './url'
import { useAuth } from '../../../contexts/AuthContext'
import { EditCreditMutation, EditCreditMutationVariables } from './type'
import { AxiosInstance } from 'axios'
import { GET_CREDIT_BY_ID_QUERY } from 'src/api/queries/queries'

async function editCredit(
   credit: EditCreditMutationVariables,
   receiptId: string,
   apiClient: AxiosInstance
): Promise<EditCreditMutation> {
   const { data } = await apiClient.put(`${RECEIPT_URL}/${receiptId}${CREDIT_URL}`, credit)
   return data
}

export default function useEditCredit(receiptId: string) {
   const { apiClient } = useAuth()
   const queryClient = useQueryClient()

   return useMutation((credit: EditCreditMutationVariables) => editCredit(credit, receiptId, apiClient), {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [GET_CREDIT_BY_ID_QUERY, receiptId] }),
   })
}
