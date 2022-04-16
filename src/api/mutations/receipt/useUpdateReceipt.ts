import { useMutation } from 'react-query'
import { apiClient } from '../..'
import { URL } from './url'
import { UpdateReceiptMutation, UpdateReceiptMutationVariables } from './types'

async function updateReceipt(newReceipt: UpdateReceiptMutationVariables): Promise<UpdateReceiptMutation> {
   const { data } = await apiClient.put(URL, newReceipt)
   return data
}

export default function useUpdateReceipt() {
   return useMutation((newReceipt: UpdateReceiptMutationVariables) => updateReceipt(newReceipt))
}
