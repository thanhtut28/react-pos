import { useMutation } from 'react-query'
import { useAuth } from '../../../contexts/AuthContext'
import { URL } from './url'
import { CreateSupplyMutation, CreateSupplyMutationVariables } from './types'
import { AxiosInstance } from 'axios'

async function createSupply(
   newSupply: CreateSupplyMutationVariables,
   apiClient: AxiosInstance
): Promise<CreateSupplyMutation> {
   const { data } = await apiClient.post(URL, newSupply)
   return data
}

export default function useCreateSupply(refetch: any) {
   const { apiClient } = useAuth()
   return useMutation((newSupply: CreateSupplyMutationVariables) => createSupply(newSupply, apiClient), {
      onSuccess: async () => await refetch(),
   })
}
