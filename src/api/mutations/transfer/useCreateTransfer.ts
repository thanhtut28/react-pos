import { useMutation } from 'react-query'
import { apiClient } from '../..'
import { URL } from './url'
import { CreateTransferMutation, CreateTransferMutationVariables } from './types'

async function createTransfer(newTransfer: CreateTransferMutationVariables): Promise<CreateTransferMutation> {
   const { data } = await apiClient.post(URL, newTransfer)
   return data
}

export default function useCreateTransfer(refetch: any) {
   return useMutation((newTransfer: CreateTransferMutationVariables) => createTransfer(newTransfer), {
      onSuccess: async () => await refetch(),
   })
}
