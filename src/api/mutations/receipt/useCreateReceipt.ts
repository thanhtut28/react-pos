import { useMutation } from 'react-query'
import { apiClient } from '../..'
import { URL } from './url'
import { CreateReceiptMutation, CreateReceiptMutationVariables } from './types'

async function createReceipt(newReceipt: CreateReceiptMutationVariables): Promise<CreateReceiptMutation> {
   const { data } = await apiClient.post(URL, newReceipt)
   return data
}

export default function useCreateReceipt(refetch: any) {
   return useMutation((newReceipt: CreateReceiptMutationVariables) => createReceipt(newReceipt), {
      onSuccess: async () => await refetch(),
   })
}
