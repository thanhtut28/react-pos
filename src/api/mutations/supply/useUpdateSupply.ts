import { useMutation } from 'react-query'
import { URL } from './url'
import { UpdateSupplyMutation, UpdateSupplyMutationVariables } from './types'
import { useAuth } from '../../../contexts/AuthContext'
import { AxiosInstance } from 'axios'

async function updateSupply(
   newSupply: UpdateSupplyMutationVariables,
   apiClient: AxiosInstance
): Promise<UpdateSupplyMutation> {
   const { data } = await apiClient.put(URL, newSupply)
   return data
}

export default function useUpdateSupply() {
   const { apiClient } = useAuth()
   return useMutation((newSupply: UpdateSupplyMutationVariables) => updateSupply(newSupply, apiClient))
}
