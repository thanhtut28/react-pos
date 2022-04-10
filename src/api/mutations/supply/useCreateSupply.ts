import { useMutation } from 'react-query'
import { apiClient } from '../..'
import { URL } from './url'
import { CreateSupplyMutation, CreateSupplyMutationVariables } from './types'

async function createSupply(newSupply: CreateSupplyMutationVariables): Promise<CreateSupplyMutation> {
   const { data } = await apiClient.post(URL, newSupply)
   return data
}

export default function useCreateSupply(refetch: any) {
   return useMutation((newSupply: CreateSupplyMutationVariables) => createSupply(newSupply), {
      onSuccess: async () => await refetch(),
   })
}
