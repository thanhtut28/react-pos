import { useMutation } from 'react-query'
import { URL } from './url'
import { useAuth } from '../../../contexts/AuthContext'
import { CreateReceiptMutation, CreateReceiptMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function createReceipt(
   newReceipt: CreateReceiptMutationVariables,
   apiClient: AxiosInstance
): Promise<CreateReceiptMutation> {
   const { data } = await apiClient.post(URL, newReceipt)
   return data
}

export default function useCreateReceipt(refetch: any) {
   const { apiClient } = useAuth()
   return useMutation((newReceipt: CreateReceiptMutationVariables) => createReceipt(newReceipt, apiClient), {
      onSuccess: async () => await refetch(),
   })
}
