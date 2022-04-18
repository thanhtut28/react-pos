import { useMutation } from 'react-query'
import { URL } from './url'
import { useAuth } from '../../../contexts/AuthContext'
import { UpdateTransferMutation, UpdateTransferMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function updateTransfer(
   newTransfer: UpdateTransferMutationVariables,
   apiClient: AxiosInstance
): Promise<UpdateTransferMutation> {
   const { data } = await apiClient.put(URL, newTransfer)
   return data
}

export default function useUpdateTransfer() {
   const { apiClient } = useAuth()
   return useMutation((newTransfer: UpdateTransferMutationVariables) =>
      updateTransfer(newTransfer, apiClient)
   )
}
