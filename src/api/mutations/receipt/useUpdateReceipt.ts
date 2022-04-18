import { useMutation } from 'react-query'
import { URL } from './url'
import { useAuth } from '../../../contexts/AuthContext'
import { UpdateReceiptMutation, UpdateReceiptMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function updateReceipt(
   newReceipt: UpdateReceiptMutationVariables,
   apiClient: AxiosInstance
): Promise<UpdateReceiptMutation> {
   const { data } = await apiClient.put(URL, newReceipt)
   return data
}

export default function useUpdateReceipt() {
   const { apiClient } = useAuth()
   return useMutation((newReceipt: UpdateReceiptMutationVariables) => updateReceipt(newReceipt, apiClient))
}
