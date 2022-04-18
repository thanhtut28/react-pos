import { useMutation } from 'react-query'
import { useAuth } from '../../../contexts/AuthContext'
import { URL } from './url'
import { CreateTransferMutation, CreateTransferMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function createTransfer(
   newTransfer: CreateTransferMutationVariables,
   apiClient: AxiosInstance
): Promise<CreateTransferMutation> {
   const { data } = await apiClient.post(URL, newTransfer)
   return data
}

export default function useCreateTransfer(refetch: any) {
   const { apiClient } = useAuth()
   return useMutation(
      (newTransfer: CreateTransferMutationVariables) => createTransfer(newTransfer, apiClient),
      {
         onSuccess: async () => await refetch(),
      }
   )
}
