import { useMutation } from 'react-query'
import { apiClient } from '../..'
import { URL } from './url'
import { UpdateSupplyMutation, UpdateSupplyMutationVariables } from './types'

async function updateSupply(newSupply: UpdateSupplyMutationVariables): Promise<UpdateSupplyMutation> {
   const { data } = await apiClient.put(URL, newSupply)
   return data
}

export default function useUpdateSupply() {
   return useMutation((newSupply: UpdateSupplyMutationVariables) => updateSupply(newSupply))
}
