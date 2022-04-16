import { useMutation } from 'react-query'
import { apiClient } from '../..'
import { URL } from './url'
import { UpdateTransferMutation, UpdateTransferMutationVariables } from './types'

async function updateTransfer(newTransfer: UpdateTransferMutationVariables): Promise<UpdateTransferMutation> {
   const { data } = await apiClient.put(URL, newTransfer)
   return data
}

export default function useUpdateTransfer() {
   return useMutation((newTransfer: UpdateTransferMutationVariables) => updateTransfer(newTransfer))
}
